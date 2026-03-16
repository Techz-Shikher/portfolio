# Deployment Guide: Railway + Vercel

## 📱 Backend Deployment (Railway)

### Step 1: Prepare Your Repo
Push your code to GitHub with these new files:
- ✅ `Procfile` (created)
- ✅ `.railwayrc` (created)
- ✅ Updated `package.json`
- ✅ Updated `server.js`

```bash
git add .
git commit -m "Setup Railway deployment"
git push
```

### Step 2: Deploy Backend on Railway

1. Go to **railway.app**
2. Click **New Project** → Select **Deploy from GitHub**
3. Select your portfolio repository
4. Railway auto-detects Node.js project ✅
5. Click **Deploy**

### Step 3: Get Your Railway URL
After deployment:
- Railway gives you a URL like: `https://your-app-abc123.railway.app`
- Copy this URL

### Step 4: Set Environment Variables
In Railway Dashboard:
1. Go to your project → **Variables**
2. Add: `CHATBOT_API_URL=https://your-app-abc123.railway.app/api/chatbot`
3. Save & redeploy

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Create Vercel Config
Create `vercel.json` in root:
```json
{
  "buildCommand": "true",
  "outputDirectory": "public",
  "env": {
    "NEXT_PUBLIC_CHATBOT_API_URL": "@chatbot_api_url"
  }
}
```

### Step 2: Deploy Frontend
1. Go to **vercel.com**
2. Click **Import Project** → Select GitHub repo
3. Configure:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** `public`
4. Click **Deploy**

### Step 3: Update Environment Variables
In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add: `CHATBOT_API_URL=https://your-app-abc123.railway.app/api/chatbot`
3. Redeploy

---

## 🔗 How It Works Now

**Local Development:**
```
Frontend → http://localhost:3000/api/chatbot → Backend
```

**Production:**
```
Vercel Frontend → Railway Backend API
```

The chatbot automatically fetches the correct API URL from server config.

---

## ✅ Testing

1. **Local:** `npm start` → Works ✅
2. **Railway:** Deploy → Works ✅
3. **Vercel:** Deploy frontend → Points to Railway → Works ✅

---

## 🚨 Troubleshooting

### Chatbot still not working?
- Check browser console (F12) for errors
- Verify Railway URL is correct
- Check CORS isn't blocking (already handled in server.js)

### 404 on API?
- Verify Railway URL in Vercel environment variables
- Check Railway deployment logs
- Reset both deployments

### Slow responses?
- Railway free tier has cold starts (~5s first request)
- Normal behavior, gets faster after

---

## 💡 Pro Tips

- **Railway:** Free tier includes 500 hours/month (enough for always-on)
- **Vercel:** Free tier unlimited deployments
- Monitor Railway logs: `railway logs`
- Auto-redeploy on git push (both platforms)

---

## 🎯 Final URLs

After deployment, you'll have:
- **Backend (Railway):** `https://your-app.railway.app/api/chatbot`
- **Frontend (Vercel):** `https://your-portfolio.vercel.app`

Both working together! 🎉
