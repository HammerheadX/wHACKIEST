# wHACKIEST

An immersive, gamified exploration platform that combines real-world discovery with AI-driven interaction. Whackiest allows users to explore heritage sites, complete quests, and interact with an AI Game Master, all wrapped in a sleek, responsive interface with dark mode support.

## 🚀 Features

### 🔐 Authentication & Onboarding
Secure signup and login functionality powered by Supabase, ensuring a personalized user experience from the start.

![Signup Page](./Screenshot%202025-12-13%20at%2010.54.14.png)

### 🌍 Wanderer Mode
Experience the world freely. Wanderer mode lets users roam the map, discovering hidden gems and points of interest dynamically.

![Wanderer Mode](./Screenshot%202025-12-13%20at%2010.55.15.png)

### 🗺️ Explorer Page
A comprehensive map interface for planning your journey. Visualize locations, track your position, and identify key landmarks using interactive maps.

![Explorer Page](./Screenshot%202025-12-13%20at%2010.55.40.png)

### 📜 Quests System
Engage with the history and culture of your surroundings through structured quests. Complete challenges to earn rewards and level up your profile.

![Quests](./Screenshot%202025-12-13%20at%2010.55.58.png)

### 🤖 AI Chatbot
Integrated with Google Gemini, the AI chatbot acts as your intelligent guide, offering contextual information, answering queries, and enhancing the storytelling aspect of your journey.

![Chatbot](./Screenshot%202025-12-13%20at%2010.56.06.png)

### 👤 User Profile
Track your progress, view completed quests, and manage your account settings.

![Profile](./Screenshot%202025-12-13%20at%2010.56.21.png)

### 🌙 Dark Mode
Fully supported dark mode for a comfortable viewing experience in low-light environments, automatically adjusting the UI and map styles.

---

## 🛠️ Tech Stack

**Frontend:**
* [React](https://react.dev/) - UI Library
* [Vite](https://vitejs.dev/) - Build Tool
* [Tailwind CSS](https://tailwindcss.com/) - Styling
* [Framer Motion](https://www.framer.com/motion/) - Animations
* [Lucide React](https://lucide.dev/) - Icons

**Maps & Geolocation:**
* [MapLibre GL](https://maplibre.org/) & [React Map GL](https://visgl.github.io/react-map-gl/) - Interactive Maps
* [Turf.js](https://turfjs.org/) - Geospatial Analysis

**Backend & Services:**
* [Supabase](https://supabase.com/) - Authentication & Database
* [Google Generative AI](https://ai.google.dev/) - AI Chatbot (Gemini)

---

## 💻 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/hammerheadx/whackiest.git](https://github.com/hammerheadx/whackiest.git)
    cd whackiest
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your keys for Supabase and Google Gemini:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_GOOGLE_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📜 License

This project is private and proprietary.
