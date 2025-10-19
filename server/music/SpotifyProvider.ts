import type { PlaylistProvider, Playlist, Track, AuthStatus } from './types';

export class SpotifyProvider implements PlaylistProvider {
  name = 'spotify' as const;

  async getAuthStatus(): Promise<AuthStatus> {
    const hasToken = !!process.env.SPOTIFY_ACCESS_TOKEN;
    if (!hasToken) {
      return {
        isAuthenticated: false,
        error: 'Please connect your Spotify account in the Integrations panel'
      };
    }
    return { isAuthenticated: true };
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    const authStatus = await this.getAuthStatus();
    if (!authStatus.isAuthenticated) {
      throw new Error(authStatus.error || 'Not authenticated');
    }

    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
        headers: {
          'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Spotify authentication expired. Please reconnect your account.');
        }
        throw new Error(`Spotify API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description || 'Spotify playlist',
        thumbnailUrl: item.images?.[0]?.url || '',
        provider: this.name,
        externalId: item.id,
        tracks: [],
      }));
    } catch (error: any) {
      console.error('Spotify getUserPlaylists error:', error);
      throw new Error(error.message || 'Failed to fetch Spotify playlists');
    }
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    const authStatus = await this.getAuthStatus();
    if (!authStatus.isAuthenticated) {
      throw new Error(authStatus.error || 'Not authenticated');
    }

    try {
      const [playlistRes, tracksRes] = await Promise.all([
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
          },
        }),
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=100`, {
          headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
          },
        }),
      ]);

      if (!playlistRes.ok || !tracksRes.ok) {
        throw new Error('Failed to fetch playlist data');
      }

      const playlist = await playlistRes.json();
      const tracksData = await tracksRes.json();

      const tracks: Track[] = tracksData.items
        .filter((item: any) => item.track)
        .map((item: any) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists.map((a: any) => a.name).join(', '),
          duration: Math.floor(item.track.duration_ms / 1000),
          thumbnailUrl: item.track.album.images?.[0]?.url || '',
          streamUrl: item.track.preview_url || '',
          provider: this.name,
        }));

      return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description || '',
        thumbnailUrl: playlist.images?.[0]?.url || '',
        provider: this.name,
        externalId: playlist.id,
        tracks,
      };
    } catch (error: any) {
      console.error('Spotify getPlaylist error:', error);
      throw new Error(error.message || 'Failed to fetch Spotify playlist');
    }
  }

  async searchPlaylists(query: string): Promise<Playlist[]> {
    const authStatus = await this.getAuthStatus();
    if (!authStatus.isAuthenticated) {
      throw new Error(authStatus.error || 'Not authenticated');
    }

    try {
      const params = new URLSearchParams({
        q: query,
        type: 'playlist',
        limit: '20',
      });

      const response = await fetch(
        `https://api.spotify.com/v1/search?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return data.playlists.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        thumbnailUrl: item.images?.[0]?.url || '',
        provider: this.name,
        externalId: item.id,
        tracks: [],
      }));
    } catch (error: any) {
      console.error('Spotify searchPlaylists error:', error);
      throw new Error(error.message || 'Failed to search Spotify playlists');
    }
  }
}
