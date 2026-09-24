export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface GreetingInfo {
  timeOfDay: TimeOfDay;
  greetingText: string;
  formattedTime: string;
  subtext: string;
  cycleBadge: string;
  gradient: string;
  iconName: 'Sunrise' | 'Sun' | 'Sunset' | 'Moon';
}

export function getGreetingInfo(customHour?: number): GreetingInfo {
  const now = new Date();
  const hour = customHour !== undefined ? customHour : now.getHours();

  // Format local 12-hour time
  const formattedTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  if (hour >= 5 && hour < 12) {
    return {
      timeOfDay: 'morning',
      greetingText: 'Good morning',
      formattedTime,
      subtext: 'Dawn synchronization complete. Ready to architect your highest-impact goals and creative visions.',
      cycleBadge: 'Solar Dawn • 05:00-12:00',
      gradient: 'from-amber-400/20 via-[#cfbcff]/15 to-transparent',
      iconName: 'Sunrise',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      timeOfDay: 'afternoon',
      greetingText: 'Good afternoon',
      formattedTime,
      subtext: 'Peak cognitive momentum engaged. Execute decisions, analyze datasets, and accelerate productivity.',
      cycleBadge: 'Solar Zenith • 12:00-17:00',
      gradient: 'from-[#cfbcff]/25 via-[#9a7dec]/15 to-transparent',
      iconName: 'Sun',
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      timeOfDay: 'evening',
      greetingText: 'Good evening',
      formattedTime,
      subtext: 'Twilight synthesis cycle active. Consolidate your breakthroughs and review strategic roadmaps.',
      cycleBadge: 'Twilight Dusk • 17:00-21:00',
      gradient: 'from-[#9a7dec]/25 via-[#4f378b]/20 to-transparent',
      iconName: 'Sunset',
    };
  } else {
    return {
      timeOfDay: 'night',
      greetingText: 'Good night',
      formattedTime,
      subtext: 'Nocturnal deep-focus protocol initiated. Uninterrupted ideation and contemplative reasoning.',
      cycleBadge: 'Nocturnal Singularity • 21:00-05:00',
      gradient: 'from-[#6750a4]/30 via-[#1c0f38]/40 to-transparent',
      iconName: 'Moon',
    };
  }
}
