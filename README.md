# Design Guidelines: Gamified Pomodoro Productivity App

## Design Approach

**Reference-Based Approach** drawing inspiration from:
- **Linear**: Modern typography, smooth animations, professional aesthetic
- **Duolingo**: Playful gamification, XP progress, achievement celebrations
- **Spotify**: Music player controls, playlist browsing patterns
- **Notion**: Clean dashboard layouts, organized content hierarchy

**Core Principles**: Motivational aesthetics, smooth gamification feedback, data-driven insights, seamless multi-device experience

---

## Color Palettes

### Light Theme
- **Primary**: 236 68% 54% (vibrant purple-blue)
- **Secondary**: 142 71% 45% (success green)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text**: 222 47% 11%
- **Accent (XP/Coins)**: 45 93% 58% (gold)

### Dark Theme
- **Primary**: 236 68% 64%
- **Secondary**: 142 71% 55%
- **Background**: 222 47% 11%
- **Surface**: 217 33% 17%
- **Text**: 0 0% 98%
- **Accent**: 45 93% 68%

### Cyberpunk Theme
- **Primary**: 320 100% 60% (neon magenta)
- **Secondary**: 180 100% 50% (cyan)
- **Background**: 240 20% 8%
- **Surface**: 240 15% 12%
- **Text**: 180 100% 90%
- **Accent**: 280 100% 70% (electric purple)
- **Neon Glow**: Use box-shadow with blur for neon effects on cards, buttons, progress bars

### Nature Theme
- **Primary**: 142 50% 45% (forest green)
- **Secondary**: 35 75% 55% (warm orange)
- **Background**: 40 20% 94% (cream)
- **Surface**: 0 0% 100%
- **Text**: 142 30% 20%
- **Accent**: 35 80% 60%

### Minimal Theme
- **Primary**: 0 0% 20%
- **Secondary**: 0 0% 40%
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text**: 0 0% 10%
- **Accent**: 0 0% 50%
- **Monochrome Palette**: Use only grayscale values with subtle shadows for depth

---

## Typography

- **Font Families**: 
  - Primary: Inter (headings, UI elements) via Google Fonts
  - Secondary: JetBrains Mono (timer display, stats) for monospace clarity
- **Headings**: 
  - H1: 2.5rem/bold (Dashboard titles)
  - H2: 2rem/semibold (Section headers)
  - H3: 1.5rem/medium (Card titles)
- **Body**: 1rem/regular, 1.125rem for readability on larger screens
- **Stats/Timer**: 3-4rem/bold with JetBrains Mono for timer countdown
- **Micro-text**: 0.875rem/medium for labels, badges

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 24 consistently
- Component padding: p-4 (mobile), p-8 (desktop)
- Section margins: mt-8, mb-12
- Grid gaps: gap-4 (cards), gap-8 (major sections)

**Responsive Grid**:
- Mobile: Single column, full-width cards
- Tablet (md): 2-column for todo/timer split
- Desktop (lg): 3-column grid (timer, todos, music player)
- Ultrawide (xl): 4-column with analytics sidebar

**Container Max-widths**:
- Dashboard: max-w-7xl centered
- Timer/Focus sections: max-w-4xl
- Cards: Full width within grid

---

## Component Library

### Timer Component
- **Large Circular Progress**: 300px diameter with gradient stroke showing remaining time
- **Central Time Display**: 4rem JetBrains Mono font, white/theme color
- **Control Buttons**: Circular FAB-style (play/pause, skip) with icon-only design
- **Session Counter**: Small badge showing "Session 3/4" below timer
- **Preset Chips**: Horizontal scrollable chips (25/5, 50/10, Custom) with active state

### Todo List
- **Card-Based Items**: Elevated cards with left border indicating priority (red/yellow/green)
- **Drag Handle**: Left icon (☰) for reordering
- **Checkbox**: MUI Checkbox with smooth check animation
- **Task Details**: Title (1rem/medium), category badge, due date chip
- **Priority Indicators**: Color-coded left border (4px thick)
- **Completion Animation**: Confetti burst + coin flip animation on check

### Music Player
- **Embedded Player Card**: Fixed bottom or sidebar card
- **Album Art**: Square thumbnail (80x80px) with rounded corners
- **Playback Controls**: Standard play/pause, skip, volume slider
- **Playlist Browser**: Scrollable list with album art thumbnails
- **Platform Tabs**: Spotify/YouTube/SoundCloud icon tabs

### Analytics Dashboard
- **Chart Cards**: Elevated cards with title, icon, and MUI X Chart
- **Session Chart**: Bar chart showing daily sessions (7-day view)
- **Category Pie**: Breakdown by task categories with legend
- **Heatmap Calendar**: Grid showing activity intensity (GitHub-style)
- **Streak Display**: Large number with fire icon and multiplier badge

### Gamification Elements
- **XP Progress Bar**: Linear gradient progress bar with level indicator (1-100)
- **Coin Display**: Animated coin icon + count in header
- **Achievement Badges**: Grid of unlocked/locked badges (grayscale when locked)
- **Level-Up Modal**: Full-screen celebration with confetti, new level announcement
- **Rewards Shop**: Grid cards showing purchasable items (themes, avatars, sounds)

### Navigation
- **Top AppBar**: Logo, title, coin count, XP bar, theme switcher, profile icon
- **Bottom Nav (Mobile)**: Timer, Todos, Music, Stats, Profile icons
- **Sidebar (Desktop)**: Vertical nav with icons + labels

### Notifications
- **Toast Notifications**: Bottom-right snackbars for achievements, reminders
- **Notification Center**: Slide-out drawer with achievement history, tips
- **Break Reminder**: Gentle modal overlay with calming imagery

---

## Animations

**Micro-interactions** (use sparingly but impactfully):
- **Task Complete**: Scale + fade out task, coin flip animation (+10 coins)
- **Level Up**: Confetti explosion, scale pulse on level number
- **Timer Start**: Smooth circular progress animation (360° rotation)
- **Streak Increment**: Fire icon pulse animation
- **Theme Switch**: 300ms crossfade transition on all colors

**Transition Timings**:
- Quick: 150ms (hover states)
- Standard: 300ms (theme transitions, card reveals)
- Slow: 500ms (level-up celebrations)

---

## Images

### Dashboard Hero (Optional but Recommended)
- **Motivational Hero Image**: Top section with semi-transparent overlay
- **Description**: Abstract workspace/productivity imagery (desk, plants, laptop) with warm lighting
- **Placement**: Top of dashboard, 40vh height with centered "Welcome back, [Name]" text
- **Treatment**: Slight blur with gradient overlay (dark to transparent)

### Theme Previews (Rewards Shop)
- **Thumbnail Images**: 200x150px preview cards showing each theme's color scheme
- **Placement**: In rewards shop grid

### Achievement Badges
- **Icon-Based**: Use Hero Icons or custom SVG badges (trophy, star, fire, target)
- **No photographic images needed**

---

## Responsive Design

**Mobile (< 768px)**:
- Single column layout
- Bottom navigation bar
- Full-width timer (250px)
- Stacked todo cards
- Collapsible music player (minimize to bottom bar)

**Tablet (768px - 1024px)**:
- 2-column grid (timer + todos)
- Side drawer for music player
- Persistent top navigation

**Desktop (1024px - 1920px)**:
- 3-column grid with sidebar
- Larger timer (350px)
- Split analytics dashboard (2x2 chart grid)

**Ultrawide (> 1920px)**:
- 4-column layout with dedicated analytics column
- Persistent music player sidebar
- Expanded chart visualizations

---

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios in all themes
- Consistent dark mode across all components (no white form inputs in dark theme)
- Keyboard shortcuts overlay (press '?' to reveal)
- Focus indicators with 2px outline in theme primary color
- Screen reader labels for all interactive elements

---

This design prioritizes motivational aesthetics, satisfying feedback loops, and seamless multi-device productivity. The gamification layer adds delight without compromising core timer/todo functionality.