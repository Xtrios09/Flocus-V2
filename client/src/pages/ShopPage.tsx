import { RewardsShop } from '@/components/shop/RewardsShop';
import { useAppStore } from '@/stores/useAppStore';
import { CoinDisplay } from '@/components/gamification/CoinDisplay';

export default function ShopPage() {
  const { profile } = useAppStore();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Rewards Shop</h1>
          <p className="text-muted-foreground">Unlock themes, avatars, and sounds with your coins</p>
        </div>
        {profile && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Your balance:</span>
            <CoinDisplay coins={profile.coins} />
          </div>
        )}
      </div>
      
      <RewardsShop />
    </div>
  );
}
