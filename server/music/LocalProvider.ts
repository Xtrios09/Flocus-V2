import type { PlaylistProvider, Playlist, Track, AuthStatus } from './types';
import fs from 'fs/promises';
import path from 'path';

export class LocalProvider implements PlaylistProvider {
  name = 'local' as const;
  private libraryPath: string;

  constructor() {
    this.libraryPath = path.resolve(import.meta.dirname, '../../client/public/audio/library.json');
  }

  async getAuthStatus(): Promise<AuthStatus> {
    return { isAuthenticated: true };
  }

  async getUserPlaylists(): Promise<Playlist[]> {
    const library = await this.loadLibrary();
    return library.playlists.map(pl => ({
      id: pl.id,
      name: pl.name,
      description: pl.description,
      thumbnailUrl: pl.thumbnail,
      provider: this.name,
      externalId: pl.id,
      tracks: pl.tracks.map((trackId: string) => {
        const trackData = [...library.nature, ...library.lofi].find(t => t.id === trackId);
        if (!trackData) {
          throw new Error(`Track ${trackId} not found`);
        }
        return this.mapTrack(trackData);
      }),
    }));
  }

  async getPlaylist(playlistId: string): Promise<Playlist> {
    const library = await this.loadLibrary();
    const playlistData = library.playlists.find(p => p.id === playlistId);
    
    if (!playlistData) {
      throw new Error(`Playlist ${playlistId} not found`);
    }

    return {
      id: playlistData.id,
      name: playlistData.name,
      description: playlistData.description,
      thumbnailUrl: playlistData.thumbnail,
      provider: this.name,
      externalId: playlistData.id,
      tracks: playlistData.tracks.map((trackId: string) => {
        const trackData = [...library.nature, ...library.lofi].find(t => t.id === trackId);
        if (!trackData) {
          throw new Error(`Track ${trackId} not found`);
        }
        return this.mapTrack(trackData);
      }),
    };
  }

  async searchPlaylists(query: string): Promise<Playlist[]> {
    const playlists = await this.getUserPlaylists();
    const lowerQuery = query.toLowerCase();
    return playlists.filter(pl =>
      pl.name.toLowerCase().includes(lowerQuery) ||
      pl.description?.toLowerCase().includes(lowerQuery)
    );
  }

  private async loadLibrary() {
    const content = await fs.readFile(this.libraryPath, 'utf-8');
    return JSON.parse(content) as {
      nature: any[];
      lofi: any[];
      playlists: any[];
    };
  }

  private mapTrack(trackData: any): Track {
    return {
      id: trackData.id,
      title: trackData.title,
      artist: trackData.artist,
      duration: trackData.duration,
      thumbnailUrl: trackData.thumbnail,
      streamUrl: trackData.url,
      provider: this.name,
    };
  }
}
