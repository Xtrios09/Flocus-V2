import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Priority levels
export const PRIORITY_LEVELS = ['high', 'medium', 'low'] as const;
export type PriorityLevel = typeof PRIORITY_LEVELS[number];

// Task categories
export const TASK_CATEGORIES = [
  'Work',
  'Personal',
  'Health',
  'Learning',
  'Creative',
  'Other'
] as const;
export type TaskCategory = typeof TASK_CATEGORIES[number];

// Theme types
export const THEME_TYPES = ['light', 'dark', 'cyberpunk', 'nature', 'minimal'] as const;
export type ThemeType = typeof THEME_TYPES[number];

// Todo interface (client-side with IndexedDB)
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: PriorityLevel;
  category: TaskCategory;
  dueDate?: string; // ISO date string
  createdAt: string;
  completedAt?: string;
  order: number; // for drag-and-drop ordering
}

export const insertTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  priority: z.enum(PRIORITY_LEVELS),
  category: z.enum(TASK_CATEGORIES),
  dueDate: z.string().optional(),
});

export type InsertTodo = z.infer<typeof insertTodoSchema>;

// Pomodoro session interface
export interface PomodoroSession {
  id: string;
  type: 'work' | 'break';
  duration: number; // in minutes
  completedAt: string;
  taskId?: string; // linked to a todo
  category?: TaskCategory;
  coinsEarned: number;
  xpEarned: number;
}

export const insertSessionSchema = z.object({
  type: z.enum(['work', 'break']),
  duration: z.number().min(1).max(120),
  taskId: z.string().optional(),
  category: z.enum(TASK_CATEGORIES).optional(),
});

export type InsertSession = z.infer<typeof insertSessionSchema>;

// User profile interface (localStorage + IndexedDB)
export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // 'avatar1', 'avatar2', etc.
  level: number; // 1-100
  xp: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalFocusMinutes: number;
  lastSessionDate?: string;
  unlockedThemes: ThemeType[];
  unlockedAvatars: string[];
  unlockedSounds: string[];
  selectedTheme: ThemeType;
  createdAt: string;
}

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  avatar: z.string().optional(),
  selectedTheme: z.enum(THEME_TYPES).optional(),
});

export type UpdateProfile = z.infer<typeof updateProfileSchema>;

// Achievement types
export const ACHIEVEMENT_IDS = [
  'first_session',
  'early_bird',
  'night_owl',
  'week_warrior',
  'focus_master',
  'task_crusher',
  'streak_starter',
  'streak_champion',
  'level_10',
  'level_25',
  'level_50',
  'level_100',
  'collector',
  'perfectionist',
  'marathon_runner',
] as const;

export type AchievementId = typeof ACHIEVEMENT_IDS[number];

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string; // lucide icon name
  coinReward: number;
  xpReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

// Shop item interface
export interface ShopItem {
  id: string;
  type: 'theme' | 'avatar' | 'sound';
  name: string;
  description: string;
  price: number;
  itemKey: string; // the actual theme name, avatar id, or sound id
  isPurchased: boolean;
}

// Notification interface
export interface Notification {
  id: string;
  type: 'achievement' | 'level_up' | 'streak' | 'reminder' | 'tip';
  title: string;
  message: string;
  icon?: string;
  createdAt: string;
  read: boolean;
}

// Pomodoro timer settings
export interface TimerSettings {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  longBreakDuration: number; // in minutes
  sessionsUntilLongBreak: number;
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export const defaultTimerSettings: TimerSettings = {
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true,
  notificationsEnabled: true,
};

// Music player state
export interface MusicPlayerState {
  platform: 'spotify' | 'youtube' | 'soundcloud' | null;
  isPlaying: boolean;
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    albumArt?: string;
    duration: number;
  };
  volume: number;
  playlist?: any[];
}

// XP and leveling calculations
export const XP_PER_SESSION = 50;
export const XP_PER_TASK = 20;
export const COINS_PER_SESSION = 10;
export const COINS_PER_TASK = 5;

// Calculate XP needed for a level (exponential curve)
export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Calculate total XP needed to reach a level
export function getTotalXPForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXPForLevel(i);
  }
  return total;
}

// Calculate current level from total XP
export function getLevelFromXP(xp: number): number {
  let level = 1;
  while (level < 100 && getTotalXPForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

// Calculate progress to next level (0-100)
export function getProgressToNextLevel(xp: number): number {
  const currentLevel = getLevelFromXP(xp);
  if (currentLevel >= 100) return 100;
  
  const currentLevelXP = getTotalXPForLevel(currentLevel);
  const nextLevelXP = getTotalXPForLevel(currentLevel + 1);
  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  
  return Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);
}
