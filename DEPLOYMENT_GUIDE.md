# 🚀 Deployment Guide - Doctor Booking System

## 📋 Table of Contents
- [Problem: Network Error Solution](#problem-network-error-solution)
- [Environment Variables Setup](#environment-variables-setup)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Common Issues & Solutions](#common-issues--solutions)

---

## ❌ Problem: Network Error Solution

### Error जो आ रहा है:
```
Network Error: GET http://localhost:4000/api/doctor/list
net::ERR_CONNECTION_REFUSED
```

### क्यों हो रहा है?
Frontend deployed होने के बाद भी `localhost:4000` पर request जा रही है, जबकि deployed backend URL use करना चाहिए।

### ✅ Solution:
Environment variables use करके backend URL configure करना होगा।

---

## 🔧 Environment Variables Setup

### 1. Frontend Setup

**Step 1:** `frontend` folder में `.env` file बनाएं:

```bash
cd frontend
```

**Step 2:** `.env` file में ये add करें:

```env
VITE_BACKEND_URL=https://docotr-booking-system-with-new-ui.vercel.app
```

**Important Notes:**
- Vite में environment variables को `VITE_` prefix से start होना चाहिए
- URL में trailing slash `/` न डालें
- Local development के लिए: `VITE_BACKEND_URL=http://localhost:4000`

### 2. Admin Panel Setup

**Step 1:** `admin` folder में `.env` file बनाएं:

```bash
cd admin
```

**Step 2:** `.env` file में ये add करें:

```env
VITE_BACKEND_URL=https://docotr-booking-system-with-new-ui.vercel.app
```

---

## 🌐 Frontend Deployment

### Vercel Deployment:

**Step 1:** Environment Variables Set करें:

1. Vercel Dashboard में अपने project पर जाएं
2. **Settings** → **Environment Variables** पर जाएं
3. Add करें:
   - **Name:** `VITE_BACKEND_URL`
   - **Value:** `https://docotr-booking-system-with-new-ui.vercel.app`
   - **Environment:** Production, Preview, Development (सभी select करें)

**Step 2:** Rebuild करें:

1. **Deployments** tab पर जाएं
2. Latest deployment के right side पर **⋮** (three dots) पर click करें
3. **Redeploy** select करें
4. **Use existing Build Cache** uncheck करें (optional, लेकिन recommended)
5. Click **Redeploy**

**Step 3:** Verify करें:

Browser console में check करें कि अब `https://docotr-booking-system-with-new-ui.vercel.app/api/doctor/list` पर request जा रही है।

### Netlify Deployment:

**Step 1:** Environment Variables Set करें:

1. Netlify Dashboard → **Site settings** → **Environment variables**
2. Add करें:
   - **Key:** `VITE_BACKEND_URL`
   - **Value:** `https://docotr-booking-system-with-new-ui.vercel.app`
   - **Scopes:** All scopes (Production, Deploy Previews, Branch Deploys)

**Step 2:** Redeploy करें:

1. **Deploys** tab → **Trigger deploy** → **Clear cache and deploy site**

### Local Development:

Local development के लिए `.env.local` file बनाएं (optional):

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🔙 Backend Deployment

### Current Backend URL:
```
https://docotr-booking-system-with-new-ui.vercel.app
```

### Backend Environment Variables:
Backend के लिए `.env` file में ये variables होने चाहिए:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=4000
```

**Vercel पर Backend Deploy करते समय:**
- Vercel Dashboard → **Settings** → **Environment Variables** में सभी variables add करें

---

## 🐛 Common Issues & Solutions

### Issue 1: अभी भी `localhost:4000` पर request जा रही है

**Solution:**
1. `.env` file `frontend` folder में है या नहीं check करें
2. `.env` file में `VITE_BACKEND_URL` correctly set है या नहीं
3. Frontend को **rebuild** करें (deployment platform पर redeploy)
4. Browser cache clear करें (Ctrl+Shift+Delete)

### Issue 2: Environment Variable काम नहीं कर रहा

**Solution:**
- Vite में environment variables को **build time** पर inject होना चाहिए
- Development server restart करें: `npm run dev`
- Production में rebuild/redeploy करना जरूरी है

### Issue 3: CORS Error आ रहा है

**Solution:**
Backend में CORS properly configured होना चाहिए। `server.js` में check करें:

```javascript
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://your-frontend-url.vercel.app',
    'https://your-admin-url.vercel.app'
  ],
  credentials: true
}));
```

### Issue 4: Build के बाद भी old URL use हो रहा है

**Solution:**
- Deployment platform पर **Clear Build Cache** करें
- Fresh deployment trigger करें
- Browser hard refresh करें (Ctrl+F5)

---

## 📝 File Structure

```
PROJECT_ROOT/
├── frontend/
│   ├── .env                 # Frontend environment variables
│   ├── src/
│   │   └── Context/
│   │       └── AppContext.jsx  # Backend URL configuration
│   └── ...
├── admin/
│   ├── .env                 # Admin environment variables
│   ├── src/
│   │   └── Context/
│   │       └── AdminContext.jsx  # Backend URL configuration
│   └── ...
└── backend/
    ├── .env                 # Backend environment variables
    └── ...
```

---

## ✅ Quick Checklist

Before deploying frontend, ensure:

- [ ] `frontend/.env` file में `VITE_BACKEND_URL` set है
- [ ] `admin/.env` file में `VITE_BACKEND_URL` set है
- [ ] Deployment platform पर environment variables set हैं
- [ ] Frontend rebuild/redeploy किया गया है
- [ ] Browser console में correct URL दिख रहा है
- [ ] CORS properly configured है backend में

---

## 🔗 Important URLs

- **Backend URL:** `https://docotr-booking-system-with-new-ui.vercel.app`
- **Frontend URL:** (अपनी frontend URL यहाँ add करें)
- **Admin URL:** (अपनी admin URL यहाँ add करें)

---

## 💡 Pro Tips

1. **Development vs Production:**
   - Local में `.env.local` use करें
   - Production में deployment platform के environment variables use करें

2. **Testing:**
   - Deploy करने से पहले local में test करें
   - Build करके check करें: `npm run build`

3. **Debugging:**
   - Browser DevTools → Network tab में check करें कि कौन सी URL use हो रही है
   - Console में `import.meta.env.VITE_BACKEND_URL` log करके verify करें

---

## 📞 Need Help?

अगर अभी भी issue आ रहा है:

1. Browser console में full error check करें
2. Network tab में failed requests देखें
3. Backend logs check करें
4. Environment variables verify करें deployment platform पर

---

**Last Updated:** जब भी deployment करें, इस guide को follow करें!

