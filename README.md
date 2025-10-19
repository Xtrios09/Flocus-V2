
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

---

## 🌐 Deployment

### 🟩 Option 1: Frontend Only (Recommended for Vercel)

If you only want to host the UI:

1. Ensure `vite.config.ts` has:

   ```ts
   root: "./client",
   build: { outDir: "./dist", emptyOutDir: true }
   ```
2. Deploy on [Vercel](https://vercel.com):

   * **Root Directory:** `.`
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`

### 🟨 Option 2: Full Stack

If you want the backend running too:

* Use [Render](https://render.com), [Railway](https://railway.app), or [Fly.io](https://fly.io)
* These platforms support persistent Node.js servers.

---

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

```

---

Would you like me to tailor this `README.md` for **a Vercel-only deployment** (i.e., remove backend mentions and describe it as a fully client-side app)?  
That would make it even cleaner for portfolio/demo use.
```
