
# 🌸 Flocus V2

**Flocus V2** is a modern productivity and focus-tracking web app built with **React**, **Vite**, and **TailwindCSS**.  
It provides a minimal yet gamified way to manage tasks, track focus sessions, and visualize your productivity streaks — all from your browser.

---
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-48-31" src="https://github.com/user-attachments/assets/4ad81067-451b-451b-a646-335b0a0879d6" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-50-13" src="https://github.com/user-attachments/assets/bac207fa-3698-4846-bed5-09625e17522a" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-50-26" src="https://github.com/user-attachments/assets/590a593e-c8a6-42eb-a8e3-36e9740645e4" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-50-48" src="https://github.com/user-attachments/assets/10b76b7b-418a-421a-830d-7cdc99fbe84f" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-50-50" src="https://github.com/user-attachments/assets/bbae495e-a8cf-4d52-a821-c9484d041b90" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-53-54" src="https://github.com/user-attachments/assets/a49e8a09-1be4-4d9a-a282-1738875d3d35" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 13-53-57" src="https://github.com/user-attachments/assets/a9b1131f-9c08-450e-8a5e-04a7af78c313" />

<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-10-10" src="https://github.com/user-attachments/assets/fea067ee-7932-4065-a161-159ea9336805" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-10-21" src="https://github.com/user-attachments/assets/febdefa3-b2ba-483b-b8bf-c29184cd6499" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-10-25" src="https://github.com/user-attachments/assets/410b65ae-a4b2-4923-b518-b67f9d49b180" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-10-31" src="https://github.com/user-attachments/assets/9595bb6a-219e-41eb-93f7-2665d567708e" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-10-34" src="https://github.com/user-attachments/assets/bec2c0be-4b35-47d7-b1e6-2923dc1ce858" />

<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-16-51" src="https://github.com/user-attachments/assets/4de9c5f0-228d-47cc-a086-152c2f134ae8" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-16-54" src="https://github.com/user-attachments/assets/2c5bceca-ab86-49c6-9940-37fd0d596e23" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-16-59" src="https://github.com/user-attachments/assets/f18622af-3f72-4b6c-b705-d0a135327b39" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-17-09" src="https://github.com/user-attachments/assets/cbe187aa-d4e8-4585-9636-a5b2f1db226b" />
<img width="1420" height="1069" alt="Screenshot From 2025-10-19 14-17-12" src="https://github.com/user-attachments/assets/1d0f6bfe-4274-4211-96f2-a087b95a1188" />
<img width="1670" height="1075" alt="Screenshot From 2025-10-19 14-17-32" src="https://github.com/user-attachments/assets/b45e234c-dd4a-4ffc-b14c-749596af753c" />
<img width="1670" height="1075" alt="Screenshot From 2025-10-19 14-17-36" src="https://github.com/user-attachments/assets/088fb745-f3da-4e81-bd69-d1d63b28cb2c" />


## 🚀 Features

- 🕒 **Focus Sessions:** Start and complete "work" or "break" sessions with XP and coin rewards.  
- 🧠 **Stats Tracking:** View total sessions, focus minutes, and streak data.  
- 🧾 **Task Management:** Create to-dos with categories, due dates, and priorities.  
- 🎨 **Customizable Themes:** Light, Dark, Cyberpunk, Nature, and Minimal modes.  
- 💾 **Local Memory Backend:** Uses in-memory storage for testing (no real database).  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript + Vite |
| Styling | TailwindCSS |
| Validation | Zod |
| Backend (Mock) | Express (in-memory storage) |
| Database (optional) | Drizzle ORM (schema only) |

---

## 📂 Project Structure

```
FLOCUS-V2/
├── attached_assets/   # App images and icons
├── client/            # Frontend source code
│   ├── public/        # Static files
│   └── src/           # React components and hooks
├── server/            # Express backend (in-memory)
├── shared/            # Shared schemas and types
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # TailwindCSS setup
├── tsconfig.json      # TypeScript configuration
└── package.json

```

## 🧩 How It Works

### Backend
The backend (`/server`) is a lightweight Express server that simulates data persistence in memory using JavaScript `Map()` objects:
```ts
this.profiles = new Map();
this.sessions = new Map();
````

No real database is used — the data resets when the server restarts.

### Frontend

The frontend (`/client`) is built with **Vite** and **React**. It fetches mock API routes from the local Express server (during development) or can be configured to use browser storage for persistence when deployed.



## 🧰 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Xtrios09/Flocus-V2.git
   cd Flocus-V2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   By default, the frontend runs on [http://localhost:5000](http://localhost:5000).

## ⚙️ Environment Variables

| Variable       | Description                 | Example                        |
| -------------- | --------------------------- | ------------------------------ |
| `PORT`         | Express server port         | `5000`                         |
| `VITE_API_URL` | API base URL (for frontend) | `https://your-backend-url.com` |

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## ❤️ Credits

Developed by [Abhijeet Prabhakar](https://github.com/Xtrios09).
Built with creativity, caffeine, and focus ☕✨

