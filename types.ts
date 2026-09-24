export type NavigationTab =
  | 'dashboard'
  | 'daily-news'
  | 'chat'
  | 'chefly-ai'
  | 'study-mode'
  | 'notes-ai'
  | 'quiz-generator'
  | 'exam-prep'
  | 'coding-lab'
  | 'english-learn'
  | 'group-discussion'
  | 'project-helper'
  | 'career-ai'
  | 'goal-mode'
  | 'image-studio'
  | 'video-lab'
  | 'ai-council';

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  registeredAt: string;
  isPro: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  error?: boolean;
  model?: string;
  accuracyVerified?: boolean;
  verifiedFrom?: string;
}

export interface CouncilMemberAnalysis {
  title: string;
  subtitle: string;
  analysis: string;
  tags?: string[];
  bulletPoints?: string[];
  vulnerability?: string;
}

export interface CouncilConsensus {
  title: string;
  summary: string;
  directives: Array<{
    phase: string;
    action: string;
  }>;
}

export interface CouncilResult {
  researcher: CouncilMemberAnalysis;
  creative: CouncilMemberAnalysis;
  critic: CouncilMemberAnalysis;
  consensus: CouncilConsensus;
}

export interface GeneratedImageItem {
  id: string;
  prompt: string;
  enhancedPrompt?: string;
  style: string;
  aspectRatio: string;
  imageUrl: string;
  timestamp: string;
}

export interface GeneratedVideoItem {
  id: string;
  prompt: string;
  resolution: string;
  duration: string;
  motion: string;
  videoUrl: string;
  thumbnail: string;
  timestamp: string;
}

// Goal Mode Architecture
export interface GoalMilestone {
  id: string;
  title: string;
  description?: string;
  phase?: string;
  completed: boolean;
  subtasks?: Array<{ id: string; text: string; completed: boolean }>;
}

export interface DailyHabit {
  id: string;
  title: string;
  frequency: string;
  completedToday: boolean;
  streak: number;
}

export interface GoalItem {
  id: string;
  title: string;
  category: string;
  timeframe: string;
  smartSummary: string;
  milestones: GoalMilestone[];
  habits: DailyHabit[];
  risksAndContingencies: Array<{ risk: string; contingency: string }>;
  kpis: string[];
  progress: number;
  createdAt: string;
}

// Study Mode Architecture
export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  rating?: 'unrated' | 'hard' | 'medium' | 'easy';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  userSelectedIndex?: number;
}

export interface FeynmanBreakdown {
  topicTitle: string;
  simpleExplanation: string;
  realWorldAnalogy: string;
  deepDiveBreakdown: string[];
  commonMisconceptions: string[];
  coreTerminology: Array<{ term: string; definition: string }>;
}

export interface StudySessionItem {
  id: string;
  topic: string;
  studyType: 'feynman' | 'flashcards' | 'quiz';
  depth: 'beginner' | 'intermediate' | 'advanced';
  feynmanData?: FeynmanBreakdown;
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
  timestamp: string;
}

// Daily Update News Architecture
export type NewsCategory =
  | 'All'
  | 'Artificial Intelligence'
  | 'Robotics & Automation'
  | 'Quantum & Silicon'
  | 'Breakthroughs'
  | 'Tech Policy & Ethics';

export interface DailyNewsItem {
  id: string;
  title: string;
  summary: string;
  category: NewsCategory;
  source: string;
  publishedAt: string;
  readTime: string;
  keyPoints: string[];
  impactScore?: number; // 1-100
  deepDiveUrl?: string;
  imageUrl?: string;
  aiTakeaway?: string;
  bookmarked?: boolean;
}

export interface DailyNewsBriefing {
  date: string;
  headline: string;
  executiveSummary: string;
  keyTrends: string[];
  sentiment: 'Optimistic' | 'Transformative' | 'Cautious';
}

// 1. Notes AI Architecture
export interface CornellNotesData {
  cues: string[];
  notes: string[];
  summary: string;
}

export interface NoteItem {
  id: string;
  title: string;
  topic: string;
  rawContent?: string;
  summary: string;
  cornell: CornellNotesData;
  keyTakeaways: string[];
  cheatSheetBullets: string[];
  tags: string[];
  createdAt: string;
}

// 2. AI Quiz Generator Architecture
export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  hint?: string;
}

export interface QuizSession {
  id: string;
  title: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimitSeconds: number;
  questions: QuizQuestionItem[];
  userAnswers: Record<number, number>;
  score: number;
  completed: boolean;
  completedAt?: string;
}

// 3. Exam Preparation Mode Architecture
export interface SyllabusTopic {
  id: string;
  name: string;
  masteryPercentage: number;
  isHighYield: boolean;
  notesSummary?: string;
}

export interface HighProbabilityExamQuestion {
  id: string;
  question: string;
  answerOutline: string;
  priority: 'critical' | 'high' | 'medium';
  expectedMarks?: number;
}

export interface ExamRevisionDay {
  dayNumber: number;
  theme: string;
  tasks: string[];
}

export interface ExamPrepPlan {
  id: string;
  subject: string;
  targetExamDate?: string;
  daysUntilExam?: number;
  lastUpdated?: string;
  syllabus?: SyllabusTopic[];
  cheatSheets?: Array<{ title: string; points: string[] }>;
  highProbQuestions: HighProbabilityExamQuestion[];
  sevenDayPlan?: ExamRevisionDay[];
  highYieldFormulas?: Array<{
    name: string;
    formula: string;
    usageContext: string;
    example?: string;
  }>;
  sprintSchedule?: Array<{
    day: number;
    theme: string;
    tasks: string[];
    durationHours?: number;
  }>;
}

// 4. AI Coding Lab Architecture
export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'rust' | 'go' | 'sql';

export interface CodeExecutionResult {
  stdout: string;
  stderr?: string;
  executionTimeMs?: number;
  status: 'success' | 'runtime_error' | 'syntax_error';
}

export interface CodeComplexityAnalysis {
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  potentialOptimizations: string[];
}

export interface CodeBugReport {
  hasBugs: boolean;
  issues: string[];
  fixedCode?: string;
  explanation: string;
}

// 5. English Speaking & Learn Architecture
export interface GrammarCorrectionItem {
  original: string;
  corrected: string;
  explanation: string;
}

export interface AdvancedVocabItem {
  word: string;
  definition: string;
  cefrLevel: string;
}

export interface DialogueTurn {
  id: string;
  role: 'ai' | 'user';
  text: string;
  timestamp: string;
  feedback?: {
    grammarCorrections?: GrammarCorrectionItem[] | string[];
    nativePhrasing?: string;
    nativeAlternative?: string;
    advancedVocabulary?: AdvancedVocabItem[];
    vocabularyTip?: string;
    pronunciationTips?: string[];
    pronunciationNote?: string;
  };
}

export interface EnglishScenario {
  id: string;
  title: string;
  roleDescription: string;
  aiPersona: string;
  level: 'Beginner (A2)' | 'Intermediate (B1-B2)' | 'Advanced (C1)';
  initialGreeting: string;
  recommendedPhrases: string[];
}

// 6. AI Group Discussion Mode Architecture
export interface GDPersona {
  id: string;
  name: string;
  role: 'Moderator' | 'Proponent' | 'Skeptic' | 'Visionary';
  avatarBg: string;
  perspective: string;
}

export interface GDSpeechTurn {
  id: string;
  speakerId: string;
  speakerName: string;
  role: string;
  text: string;
  timestamp: string;
  isUser?: boolean;
}

export interface GDScorecard {
  communicationScore: number; // 0 - 100
  logicScore: number;
  leadershipScore: number;
  activeListeningScore: number;
  overallScore: number;
  feedbackSummary: string;
  keyStrengths: string[];
  improvementSuggestions: string[];
}

// 7. Assignment & Project Helper Architecture
export interface ProjectMilestone {
  id: string;
  phase: string;
  title: string;
  deliverables: string[];
  estimatedDays: number;
}

export interface CitationItem {
  id: string;
  author: string;
  title: string;
  year: string;
  publisherOrJournal: string;
  formattedApa: string;
  formattedIeee: string;
  formattedMla: string;
}

export interface ProjectHelperPlan {
  id: string;
  projectTitle: string;
  fieldOfStudy: string;
  academicLevel: string;
  thesisStatement: string;
  problemStatement: string;
  methodologyOverview: string;
  milestones: ProjectMilestone[];
  suggestedCitations?: CitationItem[];
  recommendedCitations?: Array<{
    title: string;
    authors: string;
    year: number;
    formatAPA: string;
    formatIEEE?: string;
  }>;
  rubricEvaluationTips?: string[];
  rubricAdvice?: string[];
  keyToolsAndFrameworks?: string[];
}

// 8. Career AI Architecture
export interface ResumeBulletCritique {
  original: string;
  improved: string;
  rationale: string;
}

export interface ResumeAtsAnalysis {
  targetRole: string;
  atsScore: number; // 0 - 100
  matchedKeywords: string[];
  missingCriticalKeywords: string[];
  bulletCritiques: ResumeBulletCritique[];
  summaryFeedback: string;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  category: 'Technical' | 'Behavioral' | 'System Architecture';
  sampleStrongAnswer: string;
  userAnswer?: string;
  aiEvaluation?: {
    score: number; // 0 - 100
    strengths: string;
    improvements: string;
  };
}

export interface CareerRoadmapPhase {
  phase: string;
  duration: string;
  coreSkills: string[];
  handsOnProjects: string[];
  certificationOrMilestone: string;
}

// AI Chefly AI - Kitchen Helper for Mothers
export type CheflyMode =
  | 'fridge-magic'
  | 'quick-meals'
  | 'kids-lunchbox'
  | 'leftover-revamp'
  | 'meal-planner'
  | 'chefly-chat';

export interface CheflyIngredient {
  name: string;
  amount: string;
  isPantryCommon?: boolean;
  substitute?: string;
}

export interface CheflyInstructionStep {
  step: number;
  title: string;
  instruction: string;
  timerMinutes?: number;
  momTip?: string;
}

export interface CheflyRecipe {
  title: string;
  tagline: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  difficulty: string;
  servings: string;
  estimatedCalories: string;
  healthBenefits: string[];
  ingredients: CheflyIngredient[];
  steps: CheflyInstructionStep[];
  momHacks: string[];
  kidFriendlyTwist: string;
  leftoverStorage: string;
  groceryAisleList: {
    produce: string[];
    dairyOrPantry: string[];
    spices: string[];
  };
}

export interface CheflyChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}



