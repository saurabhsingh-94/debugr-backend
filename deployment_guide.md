# 🚀 Deployment & Connectivity Guide

This guide covers connecting your **Railway Backend** to your **Vercel Frontend** and using your **Custom Domain**.

## 1. Connecting Railway & Vercel

### Step A: Point Vercel to your Backend
1. Go to your **Vercel Dashboard** > **Project Settings** > **Environment Variables**.
2. Add a new variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-url.up.railway.app` (Get this from Railway Settings > Public Networking)

### Step B: Allow Vercel on Railway
1. In your **Railway Dashboard**, select your backend service.
2. Go to the **Variables** tab.
3. Update `CORS_WHITELIST`:
   - **Value**: `https://your-custom-domain.com,https://your-vercel-project.vercel.app,http://localhost:3000`

---

## 2. Setting Up Your Custom Domain

Since you have a custom address, you should connect it directly to **Vercel**.

1. In your **Vercel Dashboard**, go to **Settings** > **Domains**.
2. Click **Add** and type in your domain (e.g., `debugr.com`).
3. Follow the instructions from Vercel to update your **DNS Records** (at your domain provider like GoDaddy or Namecheap).
4. Vercel automatically generates SSL (the green lock icon) for your domain once it's connected.

---

## 3. Checklist
- [x] Backend is active on Railway.
- [x] Database is connected in Railway.
- [x] Redis is set up in Railway.
- [x] Frontend variables are configured in Vercel.
- [x] CORS whitelist is updated on the backend.
