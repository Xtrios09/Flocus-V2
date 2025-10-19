import type { UserProfile, PomodoroSession, Todo } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for Pomodoro app
export interface IStorage {
  // Profile management
  getProfile(id: string): Promise<UserProfile | undefined>;
  createProfile(profile: Omit<UserProfile, 'id'>): Promise<UserProfile>;
  updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null>;
  
  // Session tracking
  createSession(session: Omit<PomodoroSession, 'id'>): Promise<PomodoroSession>;
  getSessions(userId?: string, limit?: number): Promise<PomodoroSession[]>;
  
  // Stats
  getStats(userId: string): Promise<{
    totalSessions: number;
    totalFocusMinutes: number;
    currentStreak: number;
    longestStreak: number;
  }>;
}

export class MemStorage implements IStorage {
  private profiles: Map<string, UserProfile>;
  private sessions: Map<string, PomodoroSession>;

  constructor() {
    this.profiles = new Map();
    this.sessions = new Map();
  }

  // Profile methods
  async getProfile(id: string): Promise<UserProfile | undefined> {
    return this.profiles.get(id);
  }

  async createProfile(profile: Omit<UserProfile, 'id'>): Promise<UserProfile> {
    const id = randomUUID();
    const newProfile: UserProfile = { ...profile, id };
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const profile = this.profiles.get(id);
    if (!profile) return null;
    
    const updated: UserProfile = { ...profile, ...updates };
    this.profiles.set(id, updated);
    return updated;
  }

  // Session methods
  async createSession(session: Omit<PomodoroSession, 'id'>): Promise<PomodoroSession> {
    const id = randomUUID();
    const newSession: PomodoroSession = { ...session, id };
    this.sessions.set(id, newSession);
    return newSession;
  }

  async getSessions(userId?: string, limit: number = 100): Promise<PomodoroSession[]> {
    const allSessions = Array.from(this.sessions.values());
    const sorted = allSessions.sort((a, b) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    return sorted.slice(0, limit);
  }

  // Stats methods
  async getStats(userId: string): Promise<{
    totalSessions: number;
    totalFocusMinutes: number;
    currentStreak: number;
    longestStreak: number;
  }> {
    const sessions = await this.getSessions(userId);
    const workSessions = sessions.filter(s => s.type === 'work');
    
    const totalSessions = workSessions.length;
    const totalFocusMinutes = workSessions.reduce((sum, s) => sum + s.duration, 0);
    
    // Calculate streak (simplified - days with at least one session)
    const sessionDates = workSessions.map(s => 
      new Date(s.completedAt).toDateString()
    );
    const uniqueDates = [...new Set(sessionDates)].sort();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    // Calculate streaks
    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      if (i === uniqueDates.length - 1) {
        if (uniqueDates[i] === today || uniqueDates[i] === yesterday) {
          tempStreak = 1;
          currentStreak = 1;
        }
      } else {
        const curr = new Date(uniqueDates[i + 1]);
        const prev = new Date(uniqueDates[i]);
        const diffDays = Math.floor((curr.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000));
        
        if (diffDays === 1) {
          tempStreak++;
          if (i === uniqueDates.length - 2 && (uniqueDates[uniqueDates.length - 1] === today || uniqueDates[uniqueDates.length - 1] === yesterday)) {
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }
    
    return {
      totalSessions,
      totalFocusMinutes,
      currentStreak,
      longestStreak,
    };
  }
}

export const storage = new MemStorage();
