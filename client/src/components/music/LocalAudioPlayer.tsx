import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Play } from 'lucide-react';
import { musicApi } from '@/lib/api/musicApi';
import { useMusicStore } from '@/stores/useMusicStore';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export function LocalAudioPlayer() {
  const { loadPlaylist } = useMusicStore();
  const { toast } = useToast();

  const { data: playlists, isLoading, error } = useQuery({
    queryKey: ['local-playlists'],
    queryFn: () => musicApi.getPlaylists('local'),
  });

  const handlePlayPlaylist = (playlist: any) => {
    loadPlaylist(playlist);
    toast({
      title: "Playlist Loaded",
      description: `Now playing: ${playlist.name}`,
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Loading local audio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        <p className="text-sm font-medium">Failed to load local audio library</p>
        <p className="text-xs mt-2 text-muted-foreground">
          {error instanceof Error ? error.message : 'Network error occurred'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {playlists?.map((playlist: any) => (
          <Card key={playlist.id} className="p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{playlist.name}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {playlist.tracks?.length || 0} tracks
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {playlist.description}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handlePlayPlaylist(playlist)}
                title="Play playlist"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
