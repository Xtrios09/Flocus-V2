import type { PlaylistProvider, Playlist, Track, AuthStatus } from './types';

export class SoundCloudProvider implements PlaylistProvider {
  name = 'soundcloud' as const;
  private clientId?: string;

  constructor(clientId?: string) {
    this.clientId = clientId;
  }

  async getAuthStatus(): Promise<AuthStatus> {
    return {
      isAuthenticated: !!this.clientId,
      error: this.clientId ? undefined : 'SoundCloud client ID not configured'
    };
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    if (!this.clientId) {
      throw new Error('SoundCloud not configured');
    }

    return [];
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    if (!this.clientId) {
      throw new Error('SoundCloud not configured');
    }

    const response = await fetch(
      `https://api.soundcloud.com/playlists/${playlistId}?client_id=${this.clientId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch SoundCloud playlist: ${response.statusText}`);
    }

    const data = await response.json();
    return this.mapPlaylist(data);
  }

  async searchPlaylists(query: string): Promise<Playlist[]> {
    if (!this.clientId) {
      throw new Error('SoundCloud not configured');
    }

    const response = await fetch(
      `https://api.soundcloud.com/playlists?q=${encodeURIComponent(query)}&client_id=${this.clientId}&limit=20`
    );

    if (!response.ok) {
      throw new Error(`Failed to search SoundCloud: ${response.statusText}`);
    }

    const data = await response.json();
    return data.collection?.map((pl: any) => this.mapPlaylist(pl)) || [];
  }

  private mapPlaylist(data: any): Playlist {
    return {
      id: `soundcloud_${data.id}`,
      name: data.title,
      description: data.description,
      thumbnailUrl: data.artwork_url,
      provider: this.name,
      externalId: String(data.id),
      tracks: (data.tracks || []).map((track: any) => this.mapTrack(track)),
    };
  }

  private mapTrack(data: any): Track {
    return {
      id: `soundcloud_${data.id}`,
      title: data.title,
      artist: data.user?.username || 'Unknown',
      duration: Math.floor(data.duration / 1000),
      thumbnailUrl: data.artwork_url || data.user?.avatar_url,
      streamUrl: data.permalink_url,
      provider: this.name,
    };
  }
}
