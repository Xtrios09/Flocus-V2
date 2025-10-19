import { db } from './db';
import { addXP, addCoins, updateStreak, saveProfile } from './localStorage';
import type { UserProfile, PomodoroSession, TaskCategory } from '@shared/schema';
import { XP_PER_SESSION, COINS_PER_SESSION, XP_PER_TASK, COINS_PER_TASK } from '@shared/schema';
import confetti from 'canvas-confetti';

// Complete a Pomodoro session
export async function completeSession(
  profile: UserProfile,
  type: 'work' | 'break',
  duration: number,
  taskId?: string,
  category?: TaskCategory
): Promise<{
  updatedProfile: UserProfile;
  leveledUp: boolean;
  newLevel?: number;
  session: PomodoroSession;
}> {
  // Only award for work sessions
  const coinsEarned = type === 'work' ? COINS_PER_SESSION : 0;
  const xpEarned = type === 'work' ? XP_PER_SESSION : 0;
  
  // Save session to IndexedDB
  const session: PomodoroSession = {
    id: crypto.randomUUID(),
    type,
    duration,
    completedAt: new Date().toISOString(),
    taskId,
    category,
    coinsEarned,
    xpEarned,
  };
  
  await db.sessions.add(session);
  
  // Update profile
  let updatedProfile = { ...profile };
  
  if (type === 'work') {
    // Add XP and check for level up
    const xpResult = addXP(profile, xpEarned);
    updatedProfile = xpResult.updatedProfile;
    
    // Add coins
    updatedProfile = addCoins(updatedProfile, coinsEarned);
    
    // Update session count and focus minutes
    updatedProfile = {
      ...updatedProfile,
      totalSessions: updatedProfile.totalSessions + 1,
      totalFocusMinutes: updatedProfile.totalFocusMinutes + duration,
    };
    
    // Update streak
    updatedProfile = updateStreak(updatedProfile);
    
    // Create notification for achievement
    if (xpResult.leveledUp && xpResult.newLevel) {
      await db.notifications.add({
        id: crypto.randomUUID(),
        type: 'level_up',
        title: `Level Up! You're now Level ${xpResult.newLevel}`,
        message: `You earned ${coinsEarned} coins as a reward!`,
        createdAt: new Date().toISOString(),
        read: false,
      });
      
      // Epic confetti
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347'],
      });
    }
    
    return {
      updatedProfile,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      session,
    };
  }
  
  return {
    updatedProfile,
    leveledUp: false,
    session,
  };
}

// Complete a task
export async function completeTask(
  profile: UserProfile,
  taskId: string
): Promise<{
  updatedProfile: UserProfile;
  leveledUp: boolean;
  newLevel?: number;
}> {
  // Add XP and coins
  const xpResult = addXP(profile, XP_PER_TASK);
  let updatedProfile = xpResult.updatedProfile;
  updatedProfile = addCoins(updatedProfile, COINS_PER_TASK);
  
  // Confetti celebration
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.7 }
  });
  
  // Create notification
  if (xpResult.leveledUp && xpResult.newLevel) {
    await db.notifications.add({
      id: crypto.randomUUID(),
      type: 'level_up',
      title: `Level Up! You're now Level ${xpResult.newLevel}`,
      message: `Keep up the great work!`,
      createdAt: new Date().toISOString(),
      read: false,
    });
  }
  
  return {
    updatedProfile: xpResult.updatedProfile,
    leveledUp: xpResult.leveledUp,
    newLevel: xpResult.newLevel,
  };
}

// Purchase shop item
export function purchaseItem(
  profile: UserProfile,
  itemType: 'theme' | 'avatar' | 'sound',
  itemKey: string,
  price: number
): UserProfile | null {
  if (profile.coins < price) {
    return null; // Cannot afford
  }
  
  const updatedProfile = { ...profile };
  updatedProfile.coins -= price;
  
  if (itemType === 'theme') {
    if (!updatedProfile.unlockedThemes.includes(itemKey as any)) {
      updatedProfile.unlockedThemes = [...updatedProfile.unlockedThemes, itemKey as any];
    }
  } else if (itemType === 'avatar') {
    if (!updatedProfile.unlockedAvatars.includes(itemKey)) {
      updatedProfile.unlockedAvatars = [...updatedProfile.unlockedAvatars, itemKey];
    }
  } else {
    if (!updatedProfile.unlockedSounds.includes(itemKey)) {
      updatedProfile.unlockedSounds = [...updatedProfile.unlockedSounds, itemKey];
    }
  }
  
  saveProfile(updatedProfile);
  return updatedProfile;
}
