# 💖 SoulMate AI — AI-Powered Relationship & Matrimonial Platform

> **"Find Your Perfect Soulmate with AI"**  
> *The only matchmaking AI that tells you why.*

---

## 🌟 Overview & Concept

**SoulMate AI** is a relationship and matrimonial platform built specifically to move beyond shallow swipe-based matchmaking. By combining deep semantic compatibility analysis, natural language conversational profiling, and cultural understanding (including family trust verification, marriage readiness metrics, and 7-day intentional communication stages), SoulMate AI provides clarity and emotional alignment.

---

## 🚀 Key Features

### 1. 🤖 AI Conversational Matchmaker
Instead of tedious 50-field profile forms, users describe their ideal partner, core values, and life vision naturally in chat. The AI extracts structured attributes, confirms them with the user, and uses them for vector compatibility ranking.

### 2. 🔍 Explainable Match Compatibility
Every match reveals a **compatibility percentage** paired with a **clear, natural-language explanation** ("*You both value family closely, share passion for fitness, and want to settle in Maharashtra*"), including highlighted **Green Flags** and **Topics to Discuss**.

### 3. ⏳ 7-Day Intentional Chat Window
Matched pairs enter a focused 7-day conversation window featuring:
- Live countdown & daily milestone indicators
- AI icebreakers and conversation sparkers
- Day 7 **Mutual Confirmation Stage** unlocking deeper relationship pathways

### 4. 🛡️ Multi-Tier Trust Badges
- **ID Verified**: Verified government credentials
- **Video Verified**: Short video prompt response analyzed for authenticity
- **Family Verified**: Optional trusted family member confirmation

### 5. 📊 Marriage Readiness Score
A private, evolving self-reflection metric that helps individuals assess and track their relationship readiness.

### 6. 🛡️ Comprehensive Admin & Moderation Suite
- Real-time KPI monitoring (active matches, verification pipeline)
- User profile review & badge allocation
- Flagged message and behavior moderation queue

---

## 🛠️ Architecture & Tech Stack

SoulMate AI is built as a **single, unified Next.js application** (one repository, one dev command, one deployed service):

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: TypeScript throughout
- **Styling**: Tailwind CSS v4 (Deep Lavender `#8B5FBF`, Dusty Rose `#E8A0BF`, AI Gold `#F59E0B`, Plum-Black `#0F0B13`)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Physics-based drag gestures, glassmorphism highlights, staggered reveals)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/) with mobile OTP and session JWTs
- **Database**: MongoDB with cached serverless singleton connection pool
- **Real-Time Messaging**: [Pusher](https://pusher.com/) for serverless WebSockets
- **AI Intelligence**: [OpenAI API](https://openai.com/) (GPT-4o) with structured outputs & fallback demo mode

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.17+ or 20+
- npm or pnpm

### 1. Clone & Install
```bash
cd soulmate-ai
npm install
```

### 2. Configure Environment
Create `.env.local` by copying `.env.example`:
```bash
cp .env.example .env.local
```
*(Note: SoulMate AI includes realistic demo mode fallbacks for all services, so you can test all flows without external API keys immediately).*

### 3. Run the Unified Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing the Core User Flows

1. **Landing & 3D Hero**: Visit `/` to experience the animated brand presentation, explainability showcase, and feature breakdown.
2. **Authentication**: Navigate to `/login` or `/signup`. Enter any 10-digit number and use demo OTP `123456`.
3. **AI Onboarding**: Visit `/dashboard/profile/create` and chat with the AI matchmaker.
4. **Discover & Swipe**: Visit `/dashboard` to view and swipe on recommended matches.
5. **Compatibility Detail**: Click into any match to view the animated compatibility score and natural language explanation.
6. **Chat Room**: Open `/chat` to test real-time messaging, countdown timer, and mutual confirmation.
7. **Admin Portal**: Access `/admin` to view platform metrics and the moderation queue.

---

## 🚢 Deployment

Refer to [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full instructions on deploying to **Vercel**, configuring MongoDB Atlas, and setting up automated CI/CD via GitHub Actions.
