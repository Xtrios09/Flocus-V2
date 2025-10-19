# Gamified Pomodoro Productivity App

## Project Overview
A modern, gamified Pomodoro timer application that combines productivity tracking with motivational game mechanics. Built with React, TypeScript, Express, and designed with inspiration from Linear, Duolingo, Spotify, and Notion.

**Current State**: Fully functional development environment running on Replit
**Last Updated**: October 19, 2025

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **UI Components**: Radix UI, Material-UI, TailwindCSS
- **State Management**: Zustand, TanStack Query
- **Database**: PostgreSQL (Drizzle ORM) - currently using in-memory storage
- **Client-side Storage**: IndexedDB (Dexie), LocalStorage

## Project Structure
```
├── client/               # React frontend application
│   ├── src/
│   │   ├── components/   # UI components (timer, todos, music, etc.)
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and hooks
│   │   ├── stores/       # Zustand state management
│   │   └── main.tsx      # Entry point
│   └── index.html
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Storage implementation
│   └── vite.ts           # Vite dev server setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Zod schemas and types
└── package.json
```

## Key Features
1. **Pomodoro Timer**: Customizable work/break sessions with circular progress display
2. **Gamification**: XP points, levels (1-100), coins, achievements, streaks
3. **Todo Management**: Drag-and-drop tasks with priority levels and categories
4. **Music Player**: Integration with Spotify, YouTube, and SoundCloud
5. **Analytics**: Session tracking, category breakdowns, activity heatmaps
6. **Themes**: Light, Dark, Cyberpunk, Nature, and Minimal themes
7. **Rewards Shop**: Purchase themes, avatars, and sounds with earned coins

## Architecture Decisions
- **Hybrid Storage**: Client-side IndexedDB for todos, server-side storage for sessions/profiles
- **In-Memory Backend**: Currently using MemStorage for development (can be upgraded to PostgreSQL)
- **Monorepo Structure**: Single repo with client, server, and shared code
- **Vite Dev Server**: Integrated with Express for seamless development experience

## Development Setup
- **Port**: 5000 (frontend and backend combined)
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **HMR**: Enabled with client port 443 for Replit iframe compatibility
- **Command**: `npm run dev` (starts Express server with Vite middleware)

## Database
- Schema defined using Drizzle ORM in `shared/schema.ts`
- Current implementation uses in-memory storage
- DATABASE_URL environment variable required for PostgreSQL connection (optional)

## Recent Changes
- 2025-10-19: Complete Feature Fix & Enhancement
  - **Custom Timer Settings**: Fixed timer settings to sync with timer state when changed
  - **Timer Presets**: Fixed preset buttons to update both timer display and settings
  - **Focus Mode**: Implemented full focus mode that hides all distractions (header, navigation, presets, todo list, music player)
  - **Sound Effects**: Added custom timer completion sound (chime-alert)
  - **TypeScript**: Fixed all TypeScript compilation errors
  - **Auto-sync**: Timer now automatically syncs with settings when not running
  
- 2025-10-19: UI/UX Improvements
  - Added desktop navigation to AppHeader (Stats and Shop now accessible on tablet/PC)
  - Rebranded from "Pomodoro" to "Flocus" (logo and app name)
  - Fixed SoundCloud icon alignment in music player tabs
  - Fixed timer preset buttons to properly update timer settings
  - Changed "Pomodoro Timer" to "Focus Timer"
  
- 2025-10-19: Initial Replit setup completed
  - Fixed TypeScript compilation (added target: ES2015)
  - Configured Vite server for Replit (host 0.0.0.0, hmr clientPort 443)
  - Set up workflow for development server
  - Verified frontend loads successfully

## User Preferences
None specified yet.

## API Endpoints
- `GET /api/profile/:id` - Get user profile
- `POST /api/profile` - Create new profile
- `PATCH /api/profile/:id` - Update profile
- `POST /api/sessions` - Create Pomodoro session
- `GET /api/sessions` - Get session history
- `GET /api/stats/:userId` - Get user statistics
- `GET /api/health` - Health check

## Build & Deployment
- **Build Command**: `npm run build` (builds both frontend and backend)
- **Start Command**: `npm start` (runs production server)
- **Type Check**: `npm run check`
- **Database Push**: `npm run db:push` (when using PostgreSQL)
