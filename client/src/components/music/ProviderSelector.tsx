import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, ExternalLink } from 'lucide-react';
import { SiSpotify, SiYoutube, SiSoundcloud } from 'react-icons/si';
import { LocalAudioPlayer } from './LocalAudioPlayer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMusicStore } from '@/stores/useMusicStore';

export function ProviderSelector() {
  const { providerStatus } = useMusicStore();

  const handleSpotifyConnect = () => {
    window.open('https://replit.com/@' + window.location.pathname.split('/')[1] + '/~/deployment/integrations', '_blank');
  };

  const handleYouTubeConnect = () => {
    window.open('https://replit.com/@' + window.location.pathname.split('/')[1] + '/~/deployment/integrations', '_blank');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Music Sources</h3>
      </div>

      <Tabs defaultValue="local" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="local" className="inline-flex items-center gap-2">
            <Music className="w-4 h-4" />
            Local
          </TabsTrigger>
          <TabsTrigger value="spotify" className="inline-flex items-center gap-2">
            <SiSpotify className="w-4 h-4" />
            Spotify
          </TabsTrigger>
          <TabsTrigger value="youtube" className="inline-flex items-center gap-2">
            <SiYoutube className="w-4 h-4" />
            YouTube
          </TabsTrigger>
          <TabsTrigger value="soundcloud" className="inline-flex items-center gap-2">
            <SiSoundcloud className="w-4 h-4" />
            SoundCloud
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="mt-4">
          <div className="mb-3">
            <h4 className="font-medium mb-1">Built-in Audio Library</h4>
            <p className="text-sm text-muted-foreground">
              Curated nature sounds and lofi music for focus
            </p>
          </div>
          <LocalAudioPlayer />
        </TabsContent>

        <TabsContent value="spotify" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiSpotify className="w-12 h-12 mx-auto mb-4 opacity-50" />
            {providerStatus.spotify.isAuthenticated ? (
              <>
                <p className="text-sm mb-2 text-primary">✓ Connected to Spotify</p>
                <p className="text-xs mb-4">Browse your playlists below</p>
              </>
            ) : (
              <>
                <p className="text-sm mb-2">Connect your Spotify account to play music</p>
                <p className="text-xs mb-4">Uses secure OAuth authentication through Replit</p>
                <Button
                  variant="outline"
                  className="mt-4 gap-2"
                  onClick={handleSpotifyConnect}
                >
                  <ExternalLink className="w-4 h-4" />
                  Connect Spotify
                </Button>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiYoutube className="w-12 h-12 mx-auto mb-4 opacity-50" />
            {providerStatus.youtube.isAuthenticated ? (
              <>
                <p className="text-sm mb-2 text-primary">✓ Connected to YouTube</p>
                <p className="text-xs mb-4">Browse your playlists below</p>
              </>
            ) : (
              <>
                <p className="text-sm mb-2">Connect YouTube Music to browse playlists</p>
                <p className="text-xs mb-4">Uses secure OAuth authentication through Replit</p>
                <Button
                  variant="outline"
                  className="mt-4 gap-2"
                  onClick={handleYouTubeConnect}
                >
                  <ExternalLink className="w-4 h-4" />
                  Connect YouTube
                </Button>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="soundcloud" className="mt-4">
          <div className="text-center py-8 text-muted-foreground">
            <SiSoundcloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm mb-2">SoundCloud support coming soon</p>
            <p className="text-xs">Direct playlist embedding</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
