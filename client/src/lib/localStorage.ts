import type { UserProfile, ThemeType } from '@shared/schema';
import { getLevelFromXP, getTotalXPForLevel } from '@shared/schema';

const PROFILE_KEY = 'pomodoro_user_profile';

// Initialize or get user profile from localStorage
export function initializeProfile(): UserProfile {
  const stored = localStorage.getItem(PROFILE_KEY);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored profile', e);
    }
  }
  
  // Create new profile
  const newProfile: UserProfile = {
    id: crypto.randomUUID(),
    name: 'Focused User',
    avatar: 'avatar1',
    level: 1,
    xp: 0,
    coins: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    totalFocusMinutes: 0,
    unlockedThemes: ['light', 'dark'],
    unlockedAvatars: ['avatar1'],
    unlockedSounds: ['default'],
    selectedTheme: 'light',
    createdAt: new Date().toISOString(),
  };
  
  saveProfile(newProfile);
  return newProfile;
}

// Save profile to localStorage
export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

// Add XP to profile and handle level ups
export function addXP(profile: UserProfile, xp: number): { 
  updatedProfile: UserProfile; 
  leveledUp: boolean;
  newLevel?: number;
} {
  const oldLevel = profile.level;
  const newXP = profile.xp + xp;
  const newLevel = getLevelFromXP(newXP);
  
  const updatedProfile: UserProfile = {
    ...profile,
    xp: newXP,
    level: newLevel,
  };
  
  saveProfile(updatedProfile);
  
  return {
    updatedProfile,
    leveledUp: newLevel > oldLevel,
    newLevel: newLevel > oldLevel ? newLevel : undefined,
  };
}

// Add coins to profile
export function addCoins(profile: UserProfile, coins: number): UserProfile {
  const updatedProfile: UserProfile = {
    ...profile,
    coins: profile.coins + coins,
  };
  
  saveProfile(updatedProfile);
  return updatedProfile;
}

// Spend coins
export function spendCoins(profile: UserProfile, amount: number): UserProfile | null {
  if (profile.coins < amount) {
    return null;
  }
  
  const updatedProfile: UserProfile = {
    ...profile,
    coins: profile.coins - amount,
  };
  
  saveProfile(updatedProfile);
  return updatedProfile;
}

// Update streak
export function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toDateString();
  const lastSession = profile.lastSessionDate ? new Date(profile.lastSessionDate).toDateString() : null;
  
  let newStreak = profile.currentStreak;
  
  if (!lastSession || lastSession !== today) {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (lastSession === yesterday) {
      // Continue streak
      newStreak += 1;
    } else if (lastSession && lastSession !== today) {
      // Streak broken, reset
      newStreak = 1;
    } else {
      // First session ever
      newStreak = 1;
    }
  }
  
  const updatedProfile: UserProfile = {
    ...profile,
    currentStreak: newStreak,
    longestStreak: Math.max(profile.longestStreak, newStreak),
    lastSessionDate: new Date().toISOString(),
  };
  
  saveProfile(updatedProfile);
  return updatedProfile;
}

// Unlock theme
export function unlockTheme(profile: UserProfile, theme: ThemeType): UserProfile {
  if (profile.unlockedThemes.includes(theme)) {
    return profile;
  }
  
  const updatedProfile: UserProfile = {
    ...profile,
    unlockedThemes: [...profile.unlockedThemes, theme],
  };
  
  saveProfile(updatedProfile);
  return updatedProfile;
}
