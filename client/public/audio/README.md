# Audio Library

This directory contains metadata and references to the Flocus audio library.

## Sources

All audio files are sourced from royalty-free, CC0/Creative Commons licensed platforms:

- **Pixabay Music & Sound Effects** - https://pixabay.com (CC0 License)
- Direct streaming URLs are used from Pixabay's CDN
- No attribution required, free for commercial use

## Structure

### library.json
Contains metadata for all available tracks:
- **nature**: Nature sounds (ocean, rain, forest, birds, waterfall)
- **lofi**: Lofi hip-hop music for focus and relaxation
- **playlists**: Pre-curated playlists combining tracks

### Track Format
```json
{
  "id": "unique-track-id",
  "title": "Track Title",
  "artist": "Artist Name",
  "duration": 120,
  "category": "nature|lofi",
  "type": "ambient|music",
  "url": "https://cdn.pixabay.com/audio/...",
  "thumbnail": "https://..."
}
```

## Usage

Import the library in your components:
```typescript
import audioLibrary from '@/../../client/public/audio/library.json';

const natureSounds = audioLibrary.nature;
const lofiTracks = audioLibrary.lofi;
const playlists = audioLibrary.playlists;
```

## Adding New Tracks

1. Find CC0/royalty-free audio from Pixabay or similar platforms
2. Add metadata to library.json
3. Ensure URL is accessible via HTTPS
4. Test playback in the app

## License

All referenced audio files are under CC0 or equivalent free licenses.
See individual source platforms for specific licensing details.
