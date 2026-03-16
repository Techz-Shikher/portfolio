# Railway + Vercel Deployment Checklist

## ✅ Done (Code is ready)
- [x] Procfile created
- [x] .railwayrc created  
- [x] server.js updated with /api/config endpoint
- [x] avatarChatbot.js uses dynamic API URL
- [x] .env configured
- [x] Server tested locally ✓

## 📝 Next Steps (Your action needed)

### 1️⃣ Push to GitHub
```bash
cd e:\portfolio
git add .
git commit -m "Setup Railway + Vercel deployment"
git push origin main
```

### 2️⃣ Deploy Backend on Railway
1. Visit: https://railway.app
2. Sign up (GitHub account)
3. Create new project → Deploy from GitHub
4. Select your portfolio repo
5. Wait ~2min for deployment ✓
6. **Copy your Railway URL** (looks like: `https://portfolio-abc123.railway.app`)

### 3️⃣ Add Environment Variables to Railway
1. In Railway dashboard → Variables
2. Add: 
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
3. Redeploy

### 4️⃣ Deploy Frontend on Vercel
1. Visit: https://vercel.com
2. Import project from GitHub (your portfolio)
3. Framework: Other
4. Build command: (leave empty)
5. Output: `public`
6. Deploy!

### 5️⃣ Link Frontend to Backend
In Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add: `CHATBOT_API_URL=https://your-railway-url/api/chatbot`
3. Redeploy

---

## 🧪 Test It!
- Visit your Vercel URL
- Click chat button → Send message
- If it works = Success! 🎉

---

## 📞 URLs You'll Have
- **Vercel Frontend:** `https://your-name.vercel.app`
- **Railway Backend:** `https://portfolio-xyz.railway.app`

---

## 🆘 If Chatbot Not Working
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab → /api/config call
4. Verify Railway URL is set correctly in Vercel env vars
