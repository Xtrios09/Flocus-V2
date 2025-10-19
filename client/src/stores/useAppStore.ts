import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeType, UserProfile, TimerSettings, MusicPlayerState, defaultTimerSettings } from '@shared/schema';

interface AppState {
  // User profile
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  
  // Theme
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  
  // Timer settings
  timerSettings: TimerSettings;
  updateTimerSettings: (settings: Partial<TimerSettings>) => void;
  
  // Timer state
  timerState: {
    isRunning: boolean;
    isPaused: boolean;
    timeRemaining: number; // in seconds
    totalTime: number;
    currentSession: number;
    type: 'work' | 'break' | 'longBreak';
  };
  setTimerState: (state: Partial<AppState['timerState']>) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  
  // Focus mode
  focusMode: boolean;
  toggleFocusMode: () => void;
  
  // Music player
  musicPlayer: MusicPlayerState;
  updateMusicPlayer: (state: Partial<MusicPlayerState>) => void;
  
  // Notifications panel
  notificationsPanelOpen: boolean;
  toggleNotificationsPanel: () => void;
  
  // Settings panel
  settingsPanelOpen: boolean;
  toggleSettingsPanel: () => void;
  
  // Profile panel
  profilePanelOpen: boolean;
  toggleProfilePanel: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),
      
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Apply theme class to document
        document.documentElement.className = theme;
      },
      
      timerSettings: {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        autoStartBreaks: false,
        autoStartWork: false,
        soundEnabled: true,
        notificationsEnabled: true,
      },
      updateTimerSettings: (settings) => set((state) => ({
        timerSettings: { ...state.timerSettings, ...settings }
      })),
      
      timerState: {
        isRunning: false,
        isPaused: false,
        timeRemaining: 25 * 60,
        totalTime: 25 * 60,
        currentSession: 1,
        type: 'work',
      },
      setTimerState: (newState) => set((state) => ({
        timerState: { ...state.timerState, ...newState }
      })),
      startTimer: () => set((state) => ({
        timerState: { ...state.timerState, isRunning: true, isPaused: false }
      })),
      pauseTimer: () => set((state) => ({
        timerState: { ...state.timerState, isRunning: false, isPaused: true }
      })),
      resetTimer: () => set((state) => ({
        timerState: {
          ...state.timerState,
          isRunning: false,
          isPaused: false,
          timeRemaining: state.timerState.totalTime,
        }
      })),
      
      focusMode: false,
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
      
      musicPlayer: {
        platform: null,
        isPlaying: false,
        volume: 70,
      },
      updateMusicPlayer: (newState) => set((state) => ({
        musicPlayer: { ...state.musicPlayer, ...newState }
      })),
      
      notificationsPanelOpen: false,
      toggleNotificationsPanel: () => set((state) => ({
        notificationsPanelOpen: !state.notificationsPanelOpen
      })),
      
      settingsPanelOpen: false,
      toggleSettingsPanel: () => set((state) => ({
        settingsPanelOpen: !state.settingsPanelOpen
      })),
      
      profilePanelOpen: false,
      toggleProfilePanel: () => set((state) => ({
        profilePanelOpen: !state.profilePanelOpen
      })),
    }),
    {
      name: 'pomodoro-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        timerSettings: state.timerSettings,
        focusMode: state.focusMode,
      }),
    }
  )
);
