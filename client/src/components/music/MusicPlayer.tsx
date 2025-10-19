import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react';
import { SiSpotify, SiYoutube, SiSoundcloud } from 'react-icons/si';
import { useAppStore } from '@/stores/useAppStore';

export function MusicPlayer() {
  const { musicPlayer, updateMusicPlayer } = useAppStore();
  const [selectedPlatform, setSelectedPlatform] = useState<'spotify' | 'youtube' | 'soundcloud'>('spotify');
  
  const handlePlayPause = () => {
    updateMusicPlayer({ isPlaying: !musicPlayer.isPlaying });
  };
  
  const handleVolumeChange = (value: number[]) => {
    updateMusicPlayer({ volume: value[0] });
  };
  
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Music className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Music Player</h3>
      </div>
      
      {/* Platform Tabs */}
      <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spotify" data-testid="tab-spotify">
            <SiSpotify className="w-4 h-4 mr-2" />
            Spotify
          </TabsTrigger>
          <TabsTrigger value="youtube" data-testid="tab-youtube">
            <SiYoutube className="w-4 h-4 mr-2" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="soundcloud" data-testid="tab-soundcloud">
            <SiSoundcloud className="w-4 h-4 mr-2" />
            SoundCloud
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="spotify" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiSpotify className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Connect your Spotify account to play music</p>
            <Button variant="outline" className="mt-4" disabled>
              Connect Spotify
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="youtube" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiYoutube className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Connect YouTube Music to browse playlists</p>
            <Button variant="outline" className="mt-4" disabled>
              Connect YouTube
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="soundcloud" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiSoundcloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Connect SoundCloud for ambient tracks</p>
            <Button variant="outline" className="mt-4" disabled>
              Connect SoundCloud
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Playback Controls */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="outline" disabled data-testid="button-music-previous">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            onClick={handlePlayPause}
            disabled
            data-testid="button-music-play-pause"
          >
            {musicPlayer.isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button size="icon" variant="outline" disabled data-testid="button-music-next">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[musicPlayer.volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="flex-1"
            data-testid="slider-music-volume"
          />
          <span className="text-sm text-muted-foreground w-10 text-right">
            {musicPlayer.volume}%
          </span>
        </div>
      </div>
    </Card>
  );
}
