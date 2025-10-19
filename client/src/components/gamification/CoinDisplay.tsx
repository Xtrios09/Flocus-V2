import { Coins } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CoinDisplayProps {
  coins: number;
  animated?: boolean;
}

export function CoinDisplay({ coins, animated = false }: CoinDisplayProps) {
  return (
    <Badge 
      variant="outline" 
      className="gap-2 bg-gold/10 text-gold-foreground border-gold/20 font-mono"
      data-testid="text-coin-count"
    >
      <Coins className={`w-4 h-4 ${animated ? 'animate-coin-flip' : ''}`} />
      <span className="font-semibold">{coins.toLocaleString()}</span>
    </Badge>
  );
}
