import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, User, Volume2, Check, Lock } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { avatarApi } from '@/lib/api/musicApi';
import type { ThemeType } from '@shared/schema';

interface ShopItem {
  id: string;
  type: 'theme' | 'avatar' | 'sound';
  name: string;
  description: string;
  price: number;
  itemKey: string;
  icon: JSX.Element;
}

const STATIC_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'theme_cyberpunk',
    type: 'theme',
    name: 'Cyberpunk Theme',
    description: 'Neon colors and futuristic vibes',
    price: 500,
    itemKey: 'cyberpunk',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 'theme_nature',
    type: 'theme',
    name: 'Nature Theme',
    description: 'Earth tones and calming greens',
    price: 500,
    itemKey: 'nature',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 'theme_minimal',
    type: 'theme',
    name: 'Minimal Theme',
    description: 'Clean monochrome aesthetic',
    price: 500,
    itemKey: 'minimal',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: 'sound_nature',
    type: 'sound',
    name: 'Nature Sounds',
    description: 'Birds, rain, and forest ambiance',
    price: 200,
    itemKey: 'nature_sounds',
    icon: <Volume2 className="w-6 h-6" />,
  },
  {
    id: 'sound_lofi',
    type: 'sound',
    name: 'Lo-Fi Beats',
    description: 'Relaxing lo-fi music for focus',
    price: 200,
    itemKey: 'lofi_beats',
    icon: <Volume2 className="w-6 h-6" />,
  },
];

export function RewardsShop() {
  const { profile, updateProfile } = useAppStore();
  const { toast } = useToast();
  
  const { data: avatarPacks, isLoading: avatarPacksLoading } = useQuery({
    queryKey: ['avatar-packs'],
    queryFn: () => avatarApi.getAvatarPacks(),
  });
  
  const allShopItems: ShopItem[] = [
    ...STATIC_SHOP_ITEMS,
    ...(avatarPacks?.map((pack: any) => ({
      id: pack.id,
      type: 'avatar' as const,
      name: pack.name,
      description: pack.description,
      price: pack.price,
      itemKey: pack.id,
      icon: <User className="w-6 h-6" />,
    })) || []),
  ];
  
  const isPurchased = (item: ShopItem): boolean => {
    if (!profile) return false;
    
    if (item.type === 'theme') {
      return profile.unlockedThemes.includes(item.itemKey as ThemeType);
    } else if (item.type === 'avatar') {
      return profile.unlockedAvatars.includes(item.itemKey);
    } else {
      return profile.unlockedSounds.includes(item.itemKey);
    }
  };
  
  const canAfford = (price: number): boolean => {
    return (profile?.coins || 0) >= price;
  };
  
  const handlePurchase = async (item: ShopItem) => {
    if (!profile || isPurchased(item) || !canAfford(item.price)) return;
    
    const { purchaseItem } = await import('@/lib/gamification');
    const updatedProfile = purchaseItem(profile, item.type, item.itemKey, item.price);
    
    if (updatedProfile) {
      updateProfile(updatedProfile);
      
      toast({
        title: 'Purchase Successful!',
        description: `You've unlocked ${item.name}`,
      });
    } else {
      toast({
        title: 'Purchase Failed',
        description: 'Not enough coins',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Rewards Shop</h2>
          <p className="text-muted-foreground">Spend your coins on themes, avatars, and sounds</p>
        </div>
        
        {avatarPacksLoading && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Loading avatar packs...</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allShopItems.map((item) => {
            const purchased = isPurchased(item);
            const affordable = canAfford(item.price);
            
            return (
              <Card
                key={item.id}
                className={`p-6 space-y-4 ${purchased ? 'bg-success/5 border-success/20' : ''}`}
                data-testid={`shop-item-${item.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-md ${
                    purchased ? 'bg-success/10' : 'bg-primary/10'
                  }`}>
                    {item.icon}
                  </div>
                  {purchased && (
                    <Badge variant="outline" className="bg-success/10 text-success-foreground border-success/20">
                      <Check className="w-3 h-3 mr-1" />
                      Owned
                    </Badge>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="bg-gold/10 text-gold-foreground border-gold/20">
                    {item.price} coins
                  </Badge>
                  
                  <Button
                    size="sm"
                    disabled={purchased || !affordable}
                    onClick={() => handlePurchase(item)}
                    data-testid={`button-purchase-${item.id}`}
                  >
                    {purchased ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Purchased
                      </>
                    ) : !affordable ? (
                      <>
                        <Lock className="w-4 h-4 mr-1" />
                        Locked
                      </>
                    ) : (
                      'Purchase'
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
