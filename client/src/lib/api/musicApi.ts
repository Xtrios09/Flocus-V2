import axios from 'axios';
import type { Playlist, Track, ProviderStatus, MusicProvider } from '@/stores/useMusicStore';

const api = axios.create({
  baseURL: '/api',
});

export const musicApi = {
  async getProviders(): Promise<ProviderStatus[]> {
    const { data } = await api.get('/music/providers');
    return data;
  },

  async getPlaylists(provider: MusicProvider): Promise<Playlist[]> {
    const { data } = await api.get(`/music/${provider}/playlists`);
    return data;
  },

  async getPlaylist(provider: MusicProvider, playlistId: string): Promise<Playlist> {
    const { data } = await api.get(`/music/${provider}/playlist/${playlistId}`);
    return data;
  },

  async searchPlaylists(provider: MusicProvider, query: string): Promise<Playlist[]> {
    const { data } = await api.get(`/music/${provider}/search`, {
      params: { q: query },
    });
    return data;
  },

  async getAuthStatus(provider: MusicProvider) {
    const { data } = await api.get(`/music/${provider}/auth/status`);
    return data;
  },
};

export const avatarApi = {
  async getAvatarPacks() {
    const { data } = await api.get('/avatars/packs');
    return data;
  },

  async getAvatarPack(packId: string) {
    const { data } = await api.get(`/avatars/packs/${packId}`);
    return data;
  },

  async generateAvatar(options: {
    style: string;
    seed?: string;
    backgroundColor?: string;
    size?: number;
  }) {
    const { data } = await api.post('/avatars/generate', options);
    return data;
  },

  async getRandomAvatars(style: string, count: number = 10) {
    const { data } = await api.get(`/avatars/random/${style}`, {
      params: { count },
    });
    return data;
  },
};
