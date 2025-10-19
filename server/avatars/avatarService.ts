export type AvatarStyle = 
  | 'pixel-art'
  | 'avataaars'
  | 'bottts'
  | 'identicon'
  | 'lorelei'
  | 'adventurer'
  | 'big-smile'
  | 'fun-emoji'
  | 'personas'
  | 'shapes';

export interface AvatarOptions {
  style: AvatarStyle;
  seed?: string;
  backgroundColor?: string;
  size?: number;
}

export interface AvatarPack {
  id: string;
  name: string;
  description: string;
  style: AvatarStyle;
  price: number;
  previews: string[];
}

const DICEBEAR_BASE_URL = 'https://api.dicebear.com/9.x';

export class AvatarService {
  generateAvatarUrl(options: AvatarOptions): string {
    const { style, seed = Math.random().toString(36).substring(7), backgroundColor, size } = options;
    
    let url = `${DICEBEAR_BASE_URL}/${style}/svg?seed=${encodeURIComponent(seed)}`;
    
    if (backgroundColor) {
      url += `&backgroundColor=${encodeURIComponent(backgroundColor)}`;
    }
    
    if (size) {
      url += `&size=${size}`;
    }
    
    return url;
  }

  generateRandomAvatars(style: AvatarStyle, count: number = 10): string[] {
    const avatars: string[] = [];
    for (let i = 0; i < count; i++) {
      const seed = `${style}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      avatars.push(this.generateAvatarUrl({ style, seed }));
    }
    return avatars;
  }

  getAvatarPacks(): AvatarPack[] {
    const styles: Array<{ style: AvatarStyle; name: string; description: string; price: number }> = [
      { style: 'pixel-art', name: 'Pixel Art Pack', description: '8-bit retro style avatars', price: 100 },
      { style: 'avataaars', name: 'Cartoon Pack', description: 'Colorful cartoon face avatars', price: 150 },
      { style: 'bottts', name: 'Robot Pack', description: 'Futuristic robot avatars', price: 200 },
      { style: 'identicon', name: 'Geometric Pack', description: 'GitHub-style geometric avatars', price: 80 },
      { style: 'lorelei', name: 'Character Pack', description: 'Illustrated character avatars', price: 180 },
      { style: 'adventurer', name: 'Adventurer Pack', description: 'Adventure-themed avatars', price: 150 },
      { style: 'big-smile', name: 'Smiley Pack', description: 'Happy smiley face avatars', price: 120 },
      { style: 'fun-emoji', name: 'Emoji Pack', description: 'Fun emoji-style avatars', price: 100 },
      { style: 'personas', name: 'Persona Pack', description: 'Professional persona avatars', price: 160 },
      { style: 'shapes', name: 'Abstract Pack', description: 'Abstract shape avatars', price: 90 },
    ];

    return styles.map(({ style, name, description, price }) => ({
      id: `avatar-pack-${style}`,
      name,
      description,
      style,
      price,
      previews: this.generateRandomAvatars(style, 5),
    }));
  }

  getAvatarPackById(packId: string): AvatarPack | null {
    const packs = this.getAvatarPacks();
    return packs.find(pack => pack.id === packId) || null;
  }
}

export const avatarService = new AvatarService();
