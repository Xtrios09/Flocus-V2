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

export type MusicProvider = 'local' | 'spotify' | 'youtube' | 'soundcloud';

export interface AuthStatus {
  isAuthenticated: boolean;
  expiresAt?: number;
  error?: string;
}

export interface PlaylistProvider {
  name: MusicProvider;
  
  getAuthStatus(): Promise<AuthStatus>;
  
  getAuthUrl?(): Promise<string>;
  
  handleAuthCallback?(code: string): Promise<void>;
  
  getUserPlaylists(): Promise<Playlist[]>;
  
  getPlaylist(playlistId: string): Promise<Playlist>;
  
  searchPlaylists(query: string): Promise<Playlist[]>;
}

export interface MusicServiceConfig {
  providers: {
    spotify?: {
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
    youtube?: {
      apiKey: string;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    };
    soundcloud?: {
      clientId: string;
    };
  };
}
