import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List, Play, X } from 'lucide-react';
import { useMusicStore } from '@/stores/useMusicStore';

export function QueueDisplay() {
  const { queue, queueIndex, currentTrack, skipToTrack, removeFromQueue } = useMusicStore();

  if (queue.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Queue</h3>
        <span className="text-sm text-muted-foreground">({queue.length} tracks)</span>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {queue.map((track, index) => (
            <div
              key={`${track.id}-${index}`}
              className={`flex items-center gap-3 p-2 rounded transition-colors ${
                index === queueIndex
                  ? 'bg-primary/10 border border-primary/20'
                  : 'hover:bg-accent'
              }`}
            >
              <span className="text-sm text-muted-foreground w-6">{index + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <div className="flex gap-1">
                {index !== queueIndex && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => skipToTrack(index)}
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => removeFromQueue(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
