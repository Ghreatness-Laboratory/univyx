# univyX — University Social Network & Digital Ecosystem

> **One platform. Every campus. Every conversation. Every opportunity.**

univyX is a modern, responsive, text-first social network and student ecosystem built specifically for university students, campus entrepreneurs, and collegiate communities.

---

## 🌟 Core Features & Destinations

1. **Home (The Unified Campus Feed)**
   - Text-first social networking (anti-pill metadata discipline, 280-character post limit).
   - Feed tabs: *For You*, *Following*, *My Campus*, *Latest*.
   - Filterable categories: *All, Entertainment, Academics, Career, Gaming, Campus News, Events, Marketplace*.
   - Interactive post interactions: Likes, threaded comments, reposts, quote posts, bookmarks, and native share sheets.

2. **Entertainment (Campus Culture & Trending Conversations)**
   - Campus gossip, student lifestyle, pop culture, sports derbies, and events.
   - Built-in community guidelines & harassment safety guardrails.
   - Verified campus event schedules and RSVP integration.

3. **Academics & CIVYN**
   - **CIVYN Careers**: Dedicated student opportunity engine covering internships, SIWES industrial training placements, scholarships, and graduate trainee positions.
   - **AI Study Mentor**: Server-side AI academic mentor (`gemini-3.8-flash`) grounded in university curricula, GPA calculations, exam prep, and coursework.
   - **Knowledge Directory**: Searchable academic guidelines covering CGPA calculation (5.0 scale), SIWES clearance, course add/drop, and Senate regulations.
   - **Study Notes & Open Textbooks**: Peer-reviewed summaries and reference materials.

4. **univyX Arena (Collegiate Simulation & Leaderboards)**
   - Long-term vision: Browser-based student-life simulation game.
   - Phase 1 MVP: Polished Coming Soon page with planned simulation mechanics roadmap.
   - Alpha Access Waitlist with email registration.
   - **University Power Rankings**: National leaderboard tracking overall collegiate power, academic score, esports titles won, and athletics.

5. **Store (The Campus Marketplace)**
   - Discover student vendors and pre-owned items across participating universities.
   - Filtering by campus, product category, condition (New / Pre-owned), and budget tiers (Under ₦10k, ₦10k-₦25k, ₦25k-₦50k, Custom).
   - Direct peer-to-peer campus pickup and WhatsApp seller connection.
   - Student vendor listing tool with moderation reporting.

6. **Administrative Console (`/admin`)**
   - Role-based access control (`user`, `moderator`, `admin`, `superadmin`).
   - Moderation queue for reported posts, marketplace items, and accounts.
   - Live operational metrics (total posts, pending reports, active opportunities, category distributions).
   - Content curation tools.

7. **Progressive Web App (PWA)**
   - Fully installable on iOS Safari, Android, and Desktop.
   - Compliant Web App Manifest and offline caching.
   - In-app install banner with guided iOS Safari instructions.
   - Offline connectivity indicator.

8. **Personalization & Typography**
   - Light, Dark, and System theme modes.
   - User-selectable typography: Inter, Roboto, Georgia, and Atkinson Dyslexia-friendly.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4 with design tokens
- **Icons**: Lucide React
- **PWA**: `vite-plugin-pwa` with custom service worker & manifest
- **AI Integration**: `@google/genai` (Server-side middleware with `gemini-3.8-flash`)
- **Backend & Database**: Supabase (PostgreSQL schema with Row Level Security)
- **Local Fallback**: Zero-configuration reactive localStorage engine for instant preview and evaluation.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in the configuration variables:
```ini
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Gemini AI API Key
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Database Migration (Supabase)
To deploy the database schema to your Supabase PostgreSQL instance:
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Run the SQL script found in `supabase/migrations/001_initial_schema.sql`.
3. (Optional) Run `supabase/seed.sql` to populate initial universities, rankings, and knowledge entries.

### 4. Running the Dev Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
```

---

## 🛡️ Security & Privacy
- **Row Level Security (RLS)**: Enforced across all tables in `001_initial_schema.sql`.
- **Text-Only Social Network**: Initial release is strictly text-based to protect student privacy and minimize bandwidth consumption.
- **Server-Side AI**: Gemini API keys never reach the client bundle; all requests pass through `/api/ai/chat`.
- **Anti-Harassment**: Interactive reporting workflow with moderator notes and content suspension.
