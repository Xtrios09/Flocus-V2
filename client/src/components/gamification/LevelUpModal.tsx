import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
  newLevel: number;
  coinsEarned: number;
}

export function LevelUpModal({ open, onClose, newLevel, coinsEarned }: LevelUpModalProps) {
  useEffect(() => {
    if (open) {
      // Epic confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347'],
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Trophy className="w-24 h-24 text-gold animate-pulse-soft" />
              <Sparkles className="absolute top-0 right-0 w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          
          <DialogTitle className="text-4xl font-bold">
            Level Up!
          </DialogTitle>
          
          <DialogDescription className="text-xl">
            You've reached <span className="text-primary font-bold">Level {newLevel}</span>!
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">Rewards</p>
            <div className="flex justify-center gap-4">
              <div className="bg-gold/10 px-6 py-3 rounded-md border border-gold/20">
                <p className="text-sm text-muted-foreground">Coins Earned</p>
                <p className="text-2xl font-bold text-gold">+{coinsEarned}</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full"
            size="lg"
            data-testid="button-level-up-close"
          >
            Awesome!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
