import type { PlaylistProvider, MusicProvider, MusicServiceConfig, Playlist, AuthStatus } from './types';
import { LocalProvider } from './LocalProvider';
import { SoundCloudProvider } from './SoundCloudProvider';
import { SpotifyProvider } from './SpotifyProvider';
import { YouTubeProvider } from './YouTubeProvider';

export class MusicService {
  private providers: Map<MusicProvider, PlaylistProvider>;

  constructor(config?: MusicServiceConfig) {
    this.providers = new Map();
    
    this.providers.set('local', new LocalProvider());
    this.providers.set('spotify', new SpotifyProvider());
    this.providers.set('youtube', new YouTubeProvider());
    
    if (config?.providers?.soundcloud?.clientId) {
      this.providers.set('soundcloud', new SoundCloudProvider(config.providers.soundcloud.clientId));
    }
  }

  getProvider(provider: MusicProvider): PlaylistProvider | undefined {
    return this.providers.get(provider);
  }

  async getAuthStatus(provider: MusicProvider): Promise<AuthStatus> {
    const prov = this.providers.get(provider);
    if (!prov) {
      return { isAuthenticated: false, error: 'Provider not configured' };
    }
    return prov.getAuthStatus();
  }

  async getUserPlaylists(provider: MusicProvider): Promise<Playlist[]> {
    const prov = this.providers.get(provider);
    if (!prov) {
      throw new Error(`Provider ${provider} not available`);
    }
    return prov.getUserPlaylists();
  }

  async getPlaylist(provider: MusicProvider, playlistId: string): Promise<Playlist> {
    const prov = this.providers.get(provider);
    if (!prov) {
      throw new Error(`Provider ${provider} not available`);
    }
    return prov.getPlaylist(playlistId);
  }

  async searchPlaylists(provider: MusicProvider, query: string): Promise<Playlist[]> {
    const prov = this.providers.get(provider);
    if (!prov) {
      throw new Error(`Provider ${provider} not available`);
    }
    return prov.searchPlaylists(query);
  }

  getAllProviders(): MusicProvider[] {
    return Array.from(this.providers.keys());
  }

  async getAvailableProviders(): Promise<Array<{ provider: MusicProvider; status: AuthStatus }>> {
    const results = await Promise.all(
      Array.from(this.providers.entries()).map(async ([name, prov]) => ({
        provider: name,
        status: await prov.getAuthStatus(),
      }))
    );
    return results;
  }
}

export const musicService = new MusicService({
  providers: {
    soundcloud: process.env.SOUNDCLOUD_CLIENT_ID ? {
      clientId: process.env.SOUNDCLOUD_CLIENT_ID,
    } : undefined,
  },
});
