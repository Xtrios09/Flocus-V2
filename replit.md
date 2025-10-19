# Flocus V2 - Productivity & Focus Tracker

**Project Type**: Full-stack productivity web application  
**Last Updated**: October 19, 2025

## Overview

Flocus V2 is a modern productivity and focus-tracking web app that helps users manage tasks, track focus sessions, and visualize productivity streaks. Built with React, Vite, and TailwindCSS, it provides a gamified approach to staying productive.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite 5 |
| Backend | Express.js (Node.js) |
| Styling | TailwindCSS 3 + Radix UI components |
| State Management | Zustand + React Query |
| Validation | Zod |
| Database | In-memory storage (Map-based) |
| ORM | Drizzle (schema defined, not currently used) |

## Project Structure

```
/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components (analytics, gamification, todos, etc.)
│   │   ├── pages/       # Page components
│   │   ├── stores/      # Zustand state management
│   │   ├── lib/         # Utilities and helpers
│   │   └── hooks/       # Custom React hooks
│   ├── public/          # Static assets
│   └── index.html       # Entry HTML
├── server/              # Express backend
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── storage.ts      # In-memory data storage
│   └── vite.ts         # Vite dev server integration
├── shared/              # Shared schemas and types
│   └── schema.ts       # Zod schemas and TypeScript types
└── attached_assets/     # App images and icons
```

## Key Features

- **Focus Timer**: Pomodoro-style work and break sessions with XP/coin rewards
- **Task Management**: Create and organize todos with categories, priorities, and due dates
- **Analytics**: Visualize productivity stats, streaks, and session history
- **Gamification**: Level system (1-100), achievements, and unlockable content
- **Shop System**: Purchase themes, avatars, and sounds with earned coins
- **Music Player**: Integrated music player for Spotify, YouTube, and SoundCloud
- **Theme System**: 5 themes (light, dark, cyberpunk, nature, minimal)

## Development Setup

### Running Locally

The project uses a single development command that starts both the Express server and Vite dev server:

```bash
npm run dev
```

This runs on port **5000** and serves:
- Frontend via Vite dev server with HMR
- Backend API routes at `/api/*`
- All on `0.0.0.0:5000` for Replit compatibility

### Build & Production

```bash
npm run build  # Builds both frontend (Vite) and backend (esbuild)
npm start      # Runs production build
```

## Configuration

### Vite Configuration
- Root: `client/`
- Build output: `dist/public`
- Server: `0.0.0.0:5000`
- HMR: Configured for Replit proxy (port 443)
- Host verification: Disabled (`allowedHosts: true`) for Replit iframe preview

### TypeScript
- Type checking: `npm run check`
- Paths: `@/` → `client/src/`, `@shared/` → `shared/`

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection (optional) | - |

## Data Storage

Currently uses **in-memory storage** (Map-based) which resets on server restart. Data includes:
- User profiles (name, avatar, level, XP, coins, streaks)
- Pomodoro sessions (work/break history)
- Stats (total sessions, focus minutes, streaks)

**Note**: The project has Drizzle ORM schema defined for PostgreSQL but is not currently connected to a database.

## API Routes

### Profile
- `GET /api/profile/:id` - Get user profile
- `POST /api/profile` - Create new profile
- `PATCH /api/profile/:id` - Update profile

### Sessions
- `POST /api/sessions` - Create new pomodoro session
- `GET /api/sessions?limit=N` - Get recent sessions

### Stats
- `GET /api/stats/:userId` - Get user statistics

### Music
- `GET /api/music/providers` - Get all available music providers with auth status
- `GET /api/music/:provider/playlists` - Get playlists for a provider
- `GET /api/music/:provider/playlist/:id` - Get specific playlist with tracks
- `GET /api/music/:provider/search?q=query` - Search playlists
- `GET /api/music/:provider/auth/status` - Check authentication status

### Avatars
- `GET /api/avatars/packs` - Get all available avatar packs
- `GET /api/avatars/packs/:packId` - Get specific avatar pack
- `POST /api/avatars/generate` - Generate custom avatar with options
- `GET /api/avatars/random/:style?count=N` - Generate random avatars

### Health
- `GET /api/health` - Health check endpoint

## Recent Changes

### October 19, 2025 - Music Player & Avatar System Integration
- **Music System**: Implemented comprehensive multi-source music player
  - Local audio library with 5 nature sounds and 8 lofi tracks (Pixabay CC0)
  - Backend music service layer with provider abstraction (Local, Spotify, YouTube, SoundCloud)
  - Frontend player with play, pause, skip, volume, repeat, shuffle controls
  - Queue management with track navigation and playlist loading
  - Error handling with user-friendly error messages and boundaries
  - Music API routes: `/api/music/providers`, `/api/music/:provider/playlists`, etc.
- **Avatar System**: Integrated DiceBear API for dynamic avatar generation
  - 10 avatar pack styles (pixel-art, avataaars, bottts, identicon, etc.)
  - Server-side avatar service with API routes
  - Shop integration showing purchasable avatar packs (80-200 coins)
  - Avatar API routes: `/api/avatars/packs`, `/api/avatars/generate`, etc.
- **Shop Updates**: Dynamic avatar packs loaded from DiceBear API
- **State Management**: New Zustand music store for multi-provider playback state
- **API Integration**: Axios-based API clients for music and avatars

### October 19, 2025 - Initial Replit Setup
- Installed missing dependency: `nanoid`
- Configured workflow for development server on port 5000
- Updated `.gitignore` for Node.js/TypeScript best practices
- Verified Vite configuration for Replit proxy compatibility
- Confirmed app runs successfully with frontend and backend integrated

## Notes

- The app is already configured for Replit with proper host settings
- All UI components use Radix UI primitives with TailwindCSS styling
- Uses IndexedDB (Dexie) for potential client-side persistence
- Ready for PostgreSQL integration via existing Drizzle schema
