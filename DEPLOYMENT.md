# SoulMate AI — Deployment & Operations Guide

## 1. Architecture Overview
SoulMate AI is structured as a **single, unified full-stack Next.js application** (App Router) containing:
- **Frontend UI**: Server & Client components styled with Tailwind CSS v4 and Framer Motion glassmorphism.
- **Backend API**: Next.js Route Handlers (`/api/*`) executing on Node.js Serverless runtime.
- **Real-Time Communication**: Pusher server REST triggers and Pusher-js client subscriptions.
- **Database**: MongoDB Atlas with cached serverless singleton connection pool.
- **AI Matchmaker**: OpenAI integration with structured function calling.

## 2. Deploying to Vercel (Recommended)

### Step A: Push Code to GitHub
```bash
git add .
git commit -m "feat: complete SoulMate AI platform MVP"
git remote add origin https://github.com/<your-username>/soulmate-ai.git
git branch -M main
git push -u origin main
```

### Step B: Connect Project to Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Select your `soulmate-ai` GitHub repository.
3. Configure the Environment Variables in the Vercel dashboard:
   - `NEXTAUTH_SECRET`: Random 32+ character string
   - `NEXTAUTH_URL`: Your live domain (e.g., `https://soulmate-ai.vercel.app`)
   - `MONGODB_URI`: Your MongoDB Atlas connection URI
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`, `PUSHER_APP_ID`, `PUSHER_SECRET`
4. Click **Deploy**.

### Step C: Post-Deploy Verification
- Test the health check endpoint: `https://<your-domain>/api/health`
- Verify that `status: "healthy"` is returned.
- Sign up with a test phone or email and complete the AI conversational profile onboarding.

## 3. Alternative Hosting (Railway / Render / Docker)

SoulMate AI includes a single-command build that can be hosted on any Node.js container:

```bash
# Build production bundle
npm run build

# Start unified server
npm run start -p $PORT
```

## 4. Rollback Strategy
- **Instant Rollback (Vercel)**: Navigate to Deployments tab → find previous stable deployment → click "Promote to Production".
- **Git Rollback**:
  ```bash
  git revert HEAD
  git push origin main
  ```
