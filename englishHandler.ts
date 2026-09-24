import { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

export async function handleEnglishConverse(
  req: Request,
  res: Response,
  getAiClient: () => GoogleGenAI | null,
  generateWithResilience: (ai: GoogleGenAI, opts: any) => Promise<{ text: string; modelUsed: string }>
) {
  try {
    const { scenario = "tech-interview", userUtterance = "", conversationHistory = [] } = req.body;
    const ai = getAiClient();

    const SCENARIOS: Record<string, { role: string; persona: string; fallback: string }> = {
      "tech-interview": {
        role: "Hiring Manager (Sarah)",
        persona: "Silicon Valley Tech Interviewer assessing system design, scale, and clarity.",
        fallback: "That demonstrates clear technical reasoning. How would you handle state synchronization across distributed instances if latency spiked?",
      },
      "investor-pitch": {
        role: "Venture Capital Partner (David)",
        persona: "Venture Capitalist evaluating unit economics, CAC, defensible moats, and organic acquisition loops.",
        fallback: "The unit economics look viable. How does your churn profile evolve once you expand outside early adopters?",
      },
      "airport-travel": {
        role: "Border Control Officer",
        persona: "Polite, diligent customs officer verifying itinerary, duration of stay, and accommodation details.",
        fallback: "Thank you for the documentation. How long do you intend to stay, and what is your confirmed address during the trip?",
      },
      "casual-coffee": {
        role: "Colleague / Friend (Alex)",
        persona: "Warm, conversational peer meeting at a cafe, discussing weekend plans, projects, and work-life balance.",
        fallback: "I completely agree! It's so refreshing to take a breather. Have you tried that new bakery down the street?",
      },
    };

    const sc = SCENARIOS[scenario] || {
      role: "English Coach",
      persona: "Supportive English communication and pronunciation mentor.",
      fallback: "Great phrasing! Could you share another practical example or detail?",
    };

    if (ai && userUtterance) {
      try {
        const prompt = `You are ${sc.role} in an interactive English speaking simulation.
Persona: ${sc.persona}
User spoken input: "${userUtterance}"
Recent dialogue: ${JSON.stringify(conversationHistory.slice(-4))}

Tasks:
1. "replyText": Your natural spoken response in character (2-3 realistic sentences).
2. "feedback":
   - "grammarCorrections": Array of { "original": "...", "corrected": "...", "explanation": "..." }. Empty array if flawless.
   - "nativePhrasing": More natural idiomatic expression for the user's thought.
   - "advancedVocabulary": Array of 2 advanced vocabulary words or idioms with { "word": "...", "definition": "...", "cefrLevel": "B2"|"C1"|"C2" }.
   - "pronunciationTips": 1-2 practical tips regarding word stress or linking.

Return ONLY strict valid JSON:
{
  "replyText": "...",
  "feedback": {
    "grammarCorrections": [],
    "nativePhrasing": "...",
    "advancedVocabulary": [
      { "word": "Spearhead", "definition": "To lead an initiative", "cefrLevel": "C1" },
      { "word": "Tradeoff", "definition": "Balancing two competing qualities", "cefrLevel": "B2" }
    ],
    "pronunciationTips": ["..."]
  }
}`;

        const response = await generateWithResilience(ai, {
          preferredModel: "gemini-flash-lite-latest",
          contents: prompt,
          config: { responseMimeType: "application/json", temperature: 0.6 },
        });

        let clean = response.text.trim().replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
        const parsed = JSON.parse(clean);

        res.json({
          success: true,
          turn: {
            id: "turn-" + Date.now() + "-ai",
            role: "ai",
            text: parsed.replyText || sc.fallback,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
          feedback: {
            grammarCorrections: Array.isArray(parsed.feedback?.grammarCorrections) ? parsed.feedback.grammarCorrections : [],
            nativePhrasing: parsed.feedback?.nativePhrasing || `More fluent alternative: "In my experience, prioritizing this delivers immediate impact."`,
            advancedVocabulary: Array.isArray(parsed.feedback?.advancedVocabulary)
              ? parsed.feedback.advancedVocabulary
              : [
                  { word: "Spearhead", definition: "To lead or initiate an initiative", cefrLevel: "C1" },
                  { word: "Benchmark", definition: "A standard against which things may be compared", cefrLevel: "B2" },
                ],
            pronunciationTips: Array.isArray(parsed.feedback?.pronunciationTips)
              ? parsed.feedback.pronunciationTips
              : ["Focus on linking words smoothly: connect final consonants to initial vowels."],
          },
        });
        return;
      } catch (e) {
        console.warn("[English AI converse fallback]", e);
      }
    }

    // High quality resilient fallback
    res.json({
      success: true,
      turn: {
        id: "turn-" + Date.now() + "-ai",
        role: "ai",
        text: sc.fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      feedback: {
        grammarCorrections: [],
        nativePhrasing: `To sound exceptionally natural: "From my standpoint, the key priority is establishing open communication."`,
        advancedVocabulary: [
          { word: "Pivotal", definition: "Of crucial importance in relation to the development of something", cefrLevel: "C1" },
          { word: "Iterate", definition: "To perform repeatedly, refining through successive cycles", cefrLevel: "B2" },
        ],
        pronunciationTips: [
          "Link words naturally: 'think of it' sounds like 'thin-ku-vit'.",
          "Keep voice inflection relaxed at the end of statements rather than rising.",
        ],
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "English converse error." });
  }
}
