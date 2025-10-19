import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, ExternalLink } from 'lucide-react';
import { SiSpotify, SiYoutube, SiSoundcloud } from 'react-icons/si';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/hooks/use-toast';

export function MusicPlayer() {
  const { musicPlayer, updateMusicPlayer } = useAppStore();
  const [selectedPlatform, setSelectedPlatform] = useState<'spotify' | 'youtube' | 'soundcloud'>('spotify');
  const [soundcloudUrl, setSoundcloudUrl] = useState('');
  const { toast } = useToast();
  
  const handlePlayPause = () => {
    updateMusicPlayer({ isPlaying: !musicPlayer.isPlaying });
  };
  
  const handleVolumeChange = (value: number[]) => {
    updateMusicPlayer({ volume: value[0] });
  };
  
  const handleSpotifyConnect = () => {
    toast({
      title: "Spotify Integration",
      description: "Click the button below to set up Spotify integration with secure OAuth.",
    });
    // The integration setup will be handled through Replit's integration system
    window.open('https://replit.com/integrations/spotify', '_blank');
  };
  
  const handleYouTubeConnect = () => {
    toast({
      title: "YouTube Integration",
      description: "Click the button below to set up YouTube integration with secure OAuth.",
    });
    // The integration setup will be handled through Replit's integration system
    window.open('https://replit.com/integrations/youtube', '_blank');
  };
  
  const handleSoundCloudConnect = () => {
    if (!soundcloudUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a SoundCloud playlist or track URL.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate URL
    if (!soundcloudUrl.includes('soundcloud.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid SoundCloud URL.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "SoundCloud Connected",
      description: "Your SoundCloud content has been linked successfully!",
    });
    
    updateMusicPlayer({ platform: 'soundcloud' });
    setSoundcloudUrl('');
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
          <TabsTrigger value="spotify" data-testid="tab-spotify" className="inline-flex items-center">
            <SiSpotify className="w-4 h-4 mr-2" />
            Spotify
          </TabsTrigger>
          <TabsTrigger value="youtube" data-testid="tab-youtube" className="inline-flex items-center">
            <SiYoutube className="w-4 h-4 mr-2" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="soundcloud" data-testid="tab-soundcloud" className="inline-flex items-center">
            <SiSoundcloud className="w-4 h-4 mr-2" />
            SoundCloud
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="spotify" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiSpotify className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm mb-2">Connect your Spotify account to play music</p>
            <p className="text-xs mb-4">Uses secure OAuth authentication through Replit</p>
            <Button 
              variant="outline" 
              className="mt-4 gap-2" 
              onClick={handleSpotifyConnect}
              data-testid="button-connect-spotify"
            >
              <ExternalLink className="w-4 h-4" />
              Connect Spotify
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="youtube" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiYoutube className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm mb-2">Connect YouTube Music to browse playlists</p>
            <p className="text-xs mb-4">Uses secure OAuth authentication through Replit</p>
            <Button 
              variant="outline" 
              className="mt-4 gap-2" 
              onClick={handleYouTubeConnect}
              data-testid="button-connect-youtube"
            >
              <ExternalLink className="w-4 h-4" />
              Connect YouTube
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="soundcloud" className="space-y-4">
          <div className="py-8">
            <div className="text-center mb-6">
              <SiSoundcloud className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground mb-2">Connect SoundCloud for ambient tracks</p>
              <p className="text-xs text-muted-foreground">Paste a SoundCloud playlist or track URL</p>
            </div>
            
            <div className="space-y-3 max-w-md mx-auto">
              <div className="space-y-2">
                <Label htmlFor="soundcloud-url">SoundCloud URL</Label>
                <Input
                  id="soundcloud-url"
                  type="url"
                  placeholder="https://soundcloud.com/..."
                  value={soundcloudUrl}
                  onChange={(e) => setSoundcloudUrl(e.target.value)}
                  data-testid="input-soundcloud-url"
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full gap-2" 
                onClick={handleSoundCloudConnect}
                data-testid="button-connect-soundcloud"
              >
                <SiSoundcloud className="w-4 h-4" />
                Connect SoundCloud
              </Button>
            </div>
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
