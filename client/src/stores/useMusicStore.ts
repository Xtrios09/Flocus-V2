import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MusicProvider = 'local' | 'spotify' | 'youtube' | 'soundcloud';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  thumbnailUrl?: string;
  streamUrl?: string;
  provider: MusicProvider;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  thumbnailUrl?: string;
  provider: MusicProvider;
  externalId?: string;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  expiresAt?: number;
  error?: string;
}

export interface ProviderStatus {
  provider: MusicProvider;
  status: AuthStatus;
}

interface MusicState {
  currentProvider: MusicProvider | null;
  currentTrack: Track | null;
  currentPlaylist: Playlist | null;
  queue: Track[];
  queueIndex: number;
  isPlaying: boolean;
  volume: number;
  repeat: 'none' | 'one' | 'all';
  shuffle: boolean;
  
  providerStatus: Record<MusicProvider, AuthStatus>;
  
  error: string | null;
  loading: boolean;
  
  setCurrentProvider: (provider: MusicProvider | null) => void;
  setCurrentTrack: (track: Track | null) => void;
  setCurrentPlaylist: (playlist: Playlist | null) => void;
  setQueue: (tracks: Track[]) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  skipToTrack: (index: number) => void;
  
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setRepeat: (repeat: 'none' | 'one' | 'all') => void;
  toggleShuffle: () => void;
  
  setProviderStatus: (provider: MusicProvider, status: AuthStatus) => void;
  updateAllProviderStatus: (statuses: ProviderStatus[]) => void;
  
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  
  loadPlaylist: (playlist: Playlist) => void;
  playTrack: (track: Track, playlist?: Playlist) => void;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      currentProvider: null,
      currentTrack: null,
      currentPlaylist: null,
      queue: [],
      queueIndex: 0,
      isPlaying: false,
      volume: 70,
      repeat: 'none',
      shuffle: false,
      
      providerStatus: {
        local: { isAuthenticated: true },
        spotify: { isAuthenticated: false },
        youtube: { isAuthenticated: false },
        soundcloud: { isAuthenticated: false },
      },
      
      error: null,
      loading: false,
      
      setCurrentProvider: (provider) => set({ currentProvider: provider }),
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
      
      setQueue: (tracks) => set({ queue: tracks, queueIndex: 0 }),
      addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
      removeFromQueue: (index) => set((state) => ({
        queue: state.queue.filter((_, i) => i !== index),
        queueIndex: index < state.queueIndex ? state.queueIndex - 1 : state.queueIndex
      })),
      clearQueue: () => set({ queue: [], queueIndex: 0 }),
      
      nextTrack: () => {
        const state = get();
        const { queue, queueIndex, repeat, shuffle } = state;
        
        if (queue.length === 0) return;
        
        if (repeat === 'one') {
          set({ isPlaying: true });
          return;
        }
        
        let nextIndex = queueIndex + 1;
        
        if (nextIndex >= queue.length) {
          if (repeat === 'all') {
            nextIndex = 0;
          } else {
            set({ isPlaying: false });
            return;
          }
        }
        
        if (shuffle && repeat !== 'one') {
          nextIndex = Math.floor(Math.random() * queue.length);
        }
        
        set({
          queueIndex: nextIndex,
          currentTrack: queue[nextIndex],
          isPlaying: true,
        });
      },
      
      previousTrack: () => {
        const state = get();
        const { queue, queueIndex } = state;
        
        if (queue.length === 0) return;
        
        const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
        set({
          queueIndex: prevIndex,
          currentTrack: queue[prevIndex],
          isPlaying: true,
        });
      },
      
      skipToTrack: (index) => {
        const { queue } = get();
        if (index >= 0 && index < queue.length) {
          set({
            queueIndex: index,
            currentTrack: queue[index],
            isPlaying: true,
          });
        }
      },
      
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),
      setRepeat: (repeat) => set({ repeat }),
      toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
      
      setProviderStatus: (provider, status) => set((state) => ({
        providerStatus: { ...state.providerStatus, [provider]: status }
      })),
      
      updateAllProviderStatus: (statuses) => set((state) => {
        const newStatus = { ...state.providerStatus };
        statuses.forEach(({ provider, status }) => {
          newStatus[provider] = status;
        });
        return { providerStatus: newStatus };
      }),
      
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      
      loadPlaylist: (playlist) => {
        set({
          currentPlaylist: playlist,
          queue: playlist.tracks,
          queueIndex: 0,
          currentTrack: playlist.tracks[0] || null,
          currentProvider: playlist.provider,
          error: null,
        });
      },
      
      playTrack: (track, playlist) => {
        if (playlist) {
          const trackIndex = playlist.tracks.findIndex(t => t.id === track.id);
          set({
            currentPlaylist: playlist,
            queue: playlist.tracks,
            queueIndex: trackIndex >= 0 ? trackIndex : 0,
            currentTrack: track,
            currentProvider: track.provider,
            isPlaying: true,
            error: null,
          });
        } else {
          set({
            currentTrack: track,
            currentProvider: track.provider,
            queue: [track],
            queueIndex: 0,
            isPlaying: true,
            error: null,
          });
        }
      },
    }),
    {
      name: 'flocus-music-storage',
      partialize: (state) => ({
        volume: state.volume,
        repeat: state.repeat,
        shuffle: state.shuffle,
        currentPlaylist: state.currentPlaylist,
        queue: state.queue,
        queueIndex: state.queueIndex,
      }),
    }
  )
);
