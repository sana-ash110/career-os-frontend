# CareerOS — Personal AI/ML Career Tracking System

![CareerOS Dashboard](https://via.placeholder.com/800x400/0a0a0a/6EE7B7?text=CareerOS+Dashboard)

> A full-stack productivity app built to track a 56-week journey to a 7-figure AI/ML + Cloud engineering career.

🚀 **[Live Demo](https://career-os-frontend-seven.vercel.app/)** · ⭐ Star this repo if it helped you

---

## What is CareerOS?

CareerOS is a personal career operating system I built to stay consistent, track progress, and master the skills needed for a $300K–$500K+ AI/ML + Cloud engineering career.

Think of it as **Notion + Habit Tracker + Roadmap Planner + AI Coach** — built specifically for the AI/ML career path.

---

## Features

### 🏠 Dashboard
- Today's task checklist with XP rewards
- Streak tracking (consistency system)
- Phase progress bars across all 5 career phases
- AI Coach insight based on your actual behavior

  <img width="1792" height="821" alt="image" src="https://github.com/user-attachments/assets/13a238cf-da5d-4602-a44e-2fde6279c03f" />


### 📋 Daily System
- Auto-generated daily tasks per career phase
- Time estimates for each task
- 7-day completion heatmap
- Session notes

  <img width="1368" height="849" alt="image" src="https://github.com/user-attachments/assets/e86cb715-a3fd-4fb2-b943-d20f3457450c" />


### 🗺️ Roadmap (56 Weeks)
- **Phase 1:** Foundation — Python, DSA, SQL, Linux, Git (12 weeks)
- **Phase 2:** AI/ML + Cloud — ML, Deep Learning, AWS, MLOps (20 weeks)
- **Phase 3:** Portfolio Projects — 4 high-impact projects (8 weeks)
- **Phase 4:** Certifications — AWS SAA, TensorFlow Dev (10 weeks)
- **Phase 5:** Job Preparation — Resume, System Design, Negotiation (6 weeks)

  <img width="1230" height="846" alt="image" src="https://github.com/user-attachments/assets/b31bf352-bbec-4424-af6d-a4d5ceb6a8a9" />


Each phase includes subtopics, free learning resources, practice tasks, and milestones.

### 🔨 Project Builder
4 high-signal portfolio projects broken into Planning → Development → Deployment:
1. LLM Document Intelligence System (RAG + LangChain)
2. Real-Time Fraud Detection API (XGBoost + FastAPI)
3. Cloud-Native MLOps Platform (Airflow + Kubernetes)
4. Multi-Modal AI Content Platform (GPT-4 + Next.js)

   <img width="1268" height="527" alt="image" src="https://github.com/user-attachments/assets/d16463ab-086d-4224-b643-e093612b0faa" />


### 📊 Skill Tracker
- 10 skills tracked across Core Engineering, AI/ML, and Cloud & Ops
- Beginner → Intermediate → Advanced → Expert progression
- Visual progress bars

  <img width="1456" height="867" alt="image" src="https://github.com/user-attachments/assets/1de01ad7-00df-4425-b607-18d958b3b112" />


### 🤖 AI Coach
- Powered by Groq LLM API (llama-3.3-70b)
- Context-aware: knows your streak, phase, and today's completion
- Gives concrete next actions, not generic advice
- Adjusts recommendations when you fall behind

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Backend | Node.js + Express |
| AI | Groq API (llama-3.3-70b-versatile) |
| Storage | localStorage (browser-based) |
| Deployment | Vercel (frontend) + Railway (backend) |

---

## Getting Started

### Prerequisites
- Node.js v18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repos
git clone https://github.com/yourusername/career-os
git clone https://github.com/yourusername/career-os-backend

# Install frontend dependencies
cd career-os
npm install

# Install backend dependencies
cd ../career-os-backend
npm install
```

### Configuration

Create `.env` in the backend folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

### Running Locally

```bash
# Terminal 1 - Backend
cd career-os-backend
node server.js

# Terminal 2 - Frontend
cd career-os
npm run dev
```

Open `http://localhost:5173`

---

## Deployment

**Frontend → Vercel**
```bash
# Push to GitHub, then import on vercel.com
```

**Backend → Railway**
```bash
# Push to GitHub, import on railway.app
# Add GROQ_API_KEY in environment variables
```

---

## Project Structure

```
career-os/
├── src/
│   └── App.jsx          # Full app (components + styles)
├── index.html
├── vite.config.js
└── package.json

career-os-backend/
├── server.js            # Express API proxy
├── .env                 # API keys (never commit)
└── package.json
```

---

## Roadmap (Future Features)

- [ ] Mobile responsive design
- [ ] User authentication (NextAuth.js)
- [ ] Cloud database sync (Supabase)
- [ ] GitHub integration (auto-log commits)
- [ ] LeetCode progress sync
- [ ] Pomodoro timer per task
- [ ] Monthly review system
- [ ] Export progress to PDF

---

## Why I Built This

I couldn't find a tool that combined a structured AI/ML learning roadmap with daily habit tracking and an AI coach that actually knew my progress. So I built one.

This is the system I'm using daily to go from where I am now to a $300K+ AI/ML engineering role.

---

## License

MIT — use it, fork it, build on it.

---

⭐ If this helped you, star the repo and share it with someone on the same journey.
