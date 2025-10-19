import type { PlaylistProvider, Playlist, Track, AuthStatus } from './types';

export class YouTubeProvider implements PlaylistProvider {
  name = 'youtube' as const;

  async getAuthStatus(): Promise<AuthStatus> {
    const hasToken = !!process.env.YOUTUBE_ACCESS_TOKEN;
    if (!hasToken) {
      return {
        isAuthenticated: false,
        error: 'Please connect your YouTube account in the Integrations panel'
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
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=50',
        {
          headers: {
            'Authorization': `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('YouTube authentication expired. Please reconnect your account.');
        }
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return (data.items || []).map((item: any) => ({
        id: item.id,
        name: item.snippet.title,
        description: item.snippet.description || 'YouTube playlist',
        thumbnailUrl: item.snippet.thumbnails?.default?.url || '',
        provider: this.name,
        externalId: item.id,
        tracks: [],
      }));
    } catch (error: any) {
      console.error('YouTube getUserPlaylists error:', error);
      throw new Error(error.message || 'Failed to fetch YouTube playlists');
    }
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    const authStatus = await this.getAuthStatus();
    if (!authStatus.isAuthenticated) {
      throw new Error(authStatus.error || 'Not authenticated');
    }

    try {
      const [playlistRes, itemsRes] = await Promise.all([
        fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
            },
          }
        ),
        fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
            },
          }
        ),
      ]);

      if (!playlistRes.ok || !itemsRes.ok) {
        throw new Error('Failed to fetch playlist data');
      }

      const playlistData = await playlistRes.json();
      const itemsData = await itemsRes.json();

      if (!playlistData.items || playlistData.items.length === 0) {
        throw new Error('Playlist not found');
      }

      const playlist = playlistData.items[0];
      
      const tracks: Track[] = (itemsData.items || []).map((item: any) => ({
        id: item.contentDetails.videoId,
        title: item.snippet.title,
        artist: item.snippet.videoOwnerChannelTitle || 'Unknown',
        duration: 0,
        thumbnailUrl: item.snippet.thumbnails?.default?.url || '',
        streamUrl: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
        provider: this.name,
      }));

      return {
        id: playlistId,
        name: playlist.snippet.title,
        description: playlist.snippet.description || '',
        thumbnailUrl: playlist.snippet.thumbnails?.default?.url || '',
        provider: this.name,
        externalId: playlistId,
        tracks,
      };
    } catch (error: any) {
      console.error('YouTube getPlaylist error:', error);
      throw new Error(error.message || 'Failed to fetch YouTube playlist');
    }
  }

  async searchPlaylists(query: string): Promise<Playlist[]> {
    const authStatus = await this.getAuthStatus();
    if (!authStatus.isAuthenticated) {
      throw new Error(authStatus.error || 'Not authenticated');
    }

    try {
      const params = new URLSearchParams({
        part: 'snippet',
        q: query,
        type: 'playlist',
        maxResults: '20',
      });

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return (data.items || []).map((item: any) => ({
        id: item.id.playlistId,
        name: item.snippet.title,
        description: item.snippet.description || '',
        thumbnailUrl: item.snippet.thumbnails?.default?.url || '',
        provider: this.name,
        externalId: item.id.playlistId,
        tracks: [],
      }));
    } catch (error: any) {
      console.error('YouTube searchPlaylists error:', error);
      throw new Error(error.message || 'Failed to search YouTube playlists');
    }
  }
}
