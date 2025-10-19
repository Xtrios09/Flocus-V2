import type { Achievement, AchievementId, UserProfile, PomodoroSession } from '@shared/schema';
import { Trophy, Sun, Moon, Calendar, Target, CheckCircle, Flame, FlameKindling, Star, TrendingUp, Award, Crown } from 'lucide-react';

// Achievement definitions
export const ACHIEVEMENTS: Record<AchievementId, Omit<Achievement, 'unlocked' | 'unlockedAt'>> = {
  first_session: {
    id: 'first_session',
    title: 'First Step',
    description: 'Complete your first Pomodoro session',
    icon: 'Trophy',
    coinReward: 50,
    xpReward: 100,
  },
  early_bird: {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a session before 8 AM',
    icon: 'Sun',
    coinReward: 30,
    xpReward: 75,
  },
  night_owl: {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a session after 10 PM',
    icon: 'Moon',
    coinReward: 30,
    xpReward: 75,
  },
  week_warrior: {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'Calendar',
    coinReward: 100,
    xpReward: 200,
  },
  focus_master: {
    id: 'focus_master',
    title: 'Focus Master',
    description: 'Complete 50 focus sessions',
    icon: 'Target',
    coinReward: 200,
    xpReward: 500,
  },
  task_crusher: {
    id: 'task_crusher',
    title: 'Task Crusher',
    description: 'Complete 100 tasks',
    icon: 'CheckCircle',
    coinReward: 150,
    xpReward: 400,
  },
  streak_starter: {
    id: 'streak_starter',
    title: 'Streak Starter',
    description: 'Achieve a 3-day streak',
    icon: 'FlameKindling',
    coinReward: 50,
    xpReward: 100,
  },
  streak_champion: {
    id: 'streak_champion',
    title: 'Streak Champion',
    description: 'Achieve a 30-day streak',
    icon: 'Flame',
    coinReward: 500,
    xpReward: 1000,
  },
  level_10: {
    id: 'level_10',
    title: 'Rising Star',
    description: 'Reach level 10',
    icon: 'Star',
    coinReward: 100,
    xpReward: 0,
  },
  level_25: {
    id: 'level_25',
    title: 'Climbing High',
    description: 'Reach level 25',
    icon: 'TrendingUp',
    coinReward: 250,
    xpReward: 0,
  },
  level_50: {
    id: 'level_50',
    title: 'Elite Performer',
    description: 'Reach level 50',
    icon: 'Award',
    coinReward: 500,
    xpReward: 0,
  },
  level_100: {
    id: 'level_100',
    title: 'Master of Focus',
    description: 'Reach the maximum level 100',
    icon: 'Crown',
    coinReward: 1000,
    xpReward: 0,
  },
  collector: {
    id: 'collector',
    title: 'Collector',
    description: 'Unlock all themes',
    icon: 'Award',
    coinReward: 300,
    xpReward: 600,
  },
  perfectionist: {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Complete 10 sessions without skipping any',
    icon: 'Target',
    coinReward: 150,
    xpReward: 300,
  },
  marathon_runner: {
    id: 'marathon_runner',
    title: 'Marathon Runner',
    description: 'Accumulate 100 hours of focus time',
    icon: 'Trophy',
    coinReward: 400,
    xpReward: 800,
  },
};

// Check which achievements should be unlocked based on profile and sessions
export function checkAchievements(
  profile: UserProfile,
  sessions: PomodoroSession[],
  completedTasks: number
): AchievementId[] {
  const newlyUnlocked: AchievementId[] = [];
  
  // Helper to check if achievement is already unlocked
  const isUnlocked = (id: AchievementId) => {
    return profile.unlockedAvatars?.includes(id) || false;
  };
  
  // First session
  if (!isUnlocked('first_session') && profile.totalSessions >= 1) {
    newlyUnlocked.push('first_session');
  }
  
  // Early bird - check if any session was completed before 8 AM
  if (!isUnlocked('early_bird')) {
    const hasEarlySession = sessions.some(s => {
      const hour = new Date(s.completedAt).getHours();
      return hour < 8;
    });
    if (hasEarlySession) newlyUnlocked.push('early_bird');
  }
  
  // Night owl - check if any session was completed after 10 PM
  if (!isUnlocked('night_owl')) {
    const hasLateSession = sessions.some(s => {
      const hour = new Date(s.completedAt).getHours();
      return hour >= 22;
    });
    if (hasLateSession) newlyUnlocked.push('night_owl');
  }
  
  // Streak achievements
  if (!isUnlocked('streak_starter') && profile.currentStreak >= 3) {
    newlyUnlocked.push('streak_starter');
  }
  if (!isUnlocked('week_warrior') && profile.currentStreak >= 7) {
    newlyUnlocked.push('week_warrior');
  }
  if (!isUnlocked('streak_champion') && profile.currentStreak >= 30) {
    newlyUnlocked.push('streak_champion');
  }
  
  // Session count achievements
  if (!isUnlocked('focus_master') && profile.totalSessions >= 50) {
    newlyUnlocked.push('focus_master');
  }
  
  // Task achievements
  if (!isUnlocked('task_crusher') && completedTasks >= 100) {
    newlyUnlocked.push('task_crusher');
  }
  
  // Level achievements
  if (!isUnlocked('level_10') && profile.level >= 10) {
    newlyUnlocked.push('level_10');
  }
  if (!isUnlocked('level_25') && profile.level >= 25) {
    newlyUnlocked.push('level_25');
  }
  if (!isUnlocked('level_50') && profile.level >= 50) {
    newlyUnlocked.push('level_50');
  }
  if (!isUnlocked('level_100') && profile.level >= 100) {
    newlyUnlocked.push('level_100');
  }
  
  // Collector - all themes unlocked
  if (!isUnlocked('collector') && profile.unlockedThemes?.length === 5) {
    newlyUnlocked.push('collector');
  }
  
  // Marathon runner - 100 hours
  if (!isUnlocked('marathon_runner') && profile.totalFocusMinutes >= 6000) {
    newlyUnlocked.push('marathon_runner');
  }
  
  return newlyUnlocked;
}
