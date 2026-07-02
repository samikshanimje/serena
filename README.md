# 🌸 Serena — Premium AI-Powered Mental Wellness Platform

Serena is a full-stack, production-ready AI mental wellness SaaS built on the MERN (MongoDB, Express, React, Node.js) stack. It empowers users to reflect, track daily emotional metrics, hold therapeutic conversations with an AI companion, and analyze their mental well-being over time through responsive charts and reports.

---

## 🎨 Design System & Visual Identity

Serena features a state-of-the-art dual-theme architecture built using **Tailwind CSS v4** and **Framer Motion**:
*   ☀️ **Light Mode**: Polished with a soft, luxury-grade **Lavender** palette (`#FAF9FE` backdrops, `#A78BFA` primary lavender highlights) that replaces harsh purples with elegant, high-contrast, WCAG-compliant elements.
*   🌙 **Dark Mode**: Designed around an **Obsidian Black (#09090B)** and **Lavender (#A78BFA)** color scheme inspired by modern developer/AI tooling (Lovable, Cursor, Raycast, Vercel, Linear). 
*   🔄 **Theme Switcher**: Supported by a blocking head script inside `index.html` preventing theme flickering, persistent state caching in `localStorage` (`"serena_theme"`), and real-time OS preference synchronization.

---

## ✨ Features

*   🔑 **JWT Authentication & Security**: Complete secure authorization loop with bcrypt password encryption, cookie/header JWT tokens, and Google Auth integrations.
*   😊 **Structured Mood Logger**: Log daily emotions with beautiful responsive emoji grids, sleep quality, stress levels, water intake, and personal notes.
*   📖 **AI Journal Timeline**: Write reflective notes and get instant emotional analysis cards (Emotion, Stress, Confidence, Summary, Recommendations, Reflection Prompts).
*   💬 **AI Wellness Assistant**: Judgment-free chat area powered by Serena AI to share thoughts, do breathing exercises, or check in on daily stress.
*   📊 **Interactive Wellness Dashboard**: Get custom wellness scores, active streak tracking (flame indicators), recent mood calendars, and Recharts line charts showing wellness trends.
*   ⚙️ **Account Profiles & Security**: Manage security credentials, notifications presets, active streaks, and personal avatars consistently.

---

## 📂 Project Structure

```bash
serena
├── backend
│   ├── config          # Database connectivity (MongoDB Atlas)
│   ├── controllers     # Request-response logic (auth, journals, moods, reports)
│   ├── middleware      # Auth validation check & router guards
│   ├── models          # Mongoose collections schema definition
│   ├── routes          # API endpoints registration
│   └── server.js       # Main server entrypoint
│
└── frontend
    ├── public          # Static public assets
    └── src
        ├── components  # Reusable widgets (Sidebar, TopNavbar, WelcomeCard, ChatInput)
        ├── context     # ThemeContext & AuthContext shells
        ├── hooks       # useTheme, useAuth, useChat, useMood hooks
        ├── pages       # Main page shells (Dashboard, ChatPage, AnalyticsPage, MoodPage)
        ├── services    # Axios API endpoints binders
        ├── index.css   # Base styling, Tailwind v4 @theme, and custom dark overrides
        └── main.tsx    # App shell entry rendering
```

---

## 🛠 Tech Stack

### Frontend
*   **React & TypeScript**: Modern functional components with strict typing.
*   **Vite**: Next-generation frontend developer tool.
*   **Tailwind CSS (v4)**: Utilizing CSS custom-variant configurations and custom variables mapping.
*   **Framer Motion**: Premium, smooth, micro-animations for cards, headers, and navigation.
*   **Recharts**: Custom-themed SVG line graphs showing mood & energy metrics.

### Backend
*   **Node.js & Express.js**: REST API routing.
*   **MongoDB Atlas & Mongoose**: Object modeling schemas for users, moods, and journal entries.
*   **JSON Web Tokens (JWT)**: Security session handling.
*   **bcrypt**: Password security hashing.

---

## 🚀 Getting Started

### 1. Prerequisite Installations
*   Ensure Node.js (v18+) is installed on your local system.

### 2. Clone the Repository
```bash
git clone https://github.com/samikshanimje/serena.git
cd serena
```

### 3. Backend Setup
1.  Navigate into the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure your local `.env` variables (e.g. `MONGO_URI`, `JWT_SECRET`, `PORT`).
4.  Start development mode:
    ```bash
    npm run dev
    ```

### 4. Frontend Setup
1.  In a separate terminal block, navigate to the `frontend/` directory:
    ```bash
    cd ../frontend
    ```
2.  Install packages:
    ```bash
    npm install
    ```
3.  Start the Vite dev server:
    ```bash
    npm run dev
    ```
4.  Open the application at `http://localhost:5173` (or the port specified by Vite).

---

## 👩‍💻 Developer

**Samiksha Nimje**    
Built with ❤️ using React, Express, MongoDB, and AI.
