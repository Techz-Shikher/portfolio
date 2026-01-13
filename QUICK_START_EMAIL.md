# 🚀 Quick Start: Email Notifications

## ⚡ 5-Minute Setup

### 1️⃣ Get Gmail App Password
Go to: [Gmail App Passwords](https://myaccount.google.com/apppasswords)
- Select "Mail" and "Windows Computer"
- Copy the 16-character password

### 2️⃣ Update Your .env File
```dotenv
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_TO=your-email@gmail.com
DEPLOYMENT_NOTIFY_EMAIL=your-email@gmail.com
```

### 3️⃣ Done! 

Your portfolio now has:
- ✅ **Email notifications on deployment**
- ✅ **Contact form email forwarding**
- ✅ **Automatic email on server start**

---

## 📬 How to Use

### After Deployment
```bash
node scripts/deploy.js production https://your-portfolio-url.com
```

You'll get a beautiful email with:
- Deployment confirmation
- Live portfolio link
- Timestamp and version info

### Contact Form Submissions
Automatically sends you emails when visitors submit the form

---

## 📋 What Was Added

✅ **`utils/emailService.js`** - Email service module
- `sendDeploymentNotification()` - Deploy notifications
- `sendContactEmail()` - Contact form emails
- `testEmailConfiguration()` - Validate setup

✅ **`scripts/deploy.js`** - Deployment script
```bash
node scripts/deploy.js production https://myportfolio.com
```

✅ **Updated `server.js`**
- Auto-tests email on startup
- Sends contact form emails automatically
- Integration with email service

✅ **Updated `.env.example`**
- Configuration template with instructions

---

## 📧 Email Templates

### Deployment Notification
**Includes:**
- 🚀 Status (success/failed)
- 📍 Live URL
- 🏷️ Environment & Version
- ⏰ Deployment timestamp
- Direct link to portfolio

### Contact Form Email
**Includes:**
- Name & email from visitor
- Subject & message
- Can reply directly to visitor

---

## ✅ Verification

When you start your server:
```
🔍 Checking email configuration...
✅ Email configuration is valid and ready to use
📧 Deployment notifications are enabled!
```

---

## 🎯 Ready to Deploy?

1. **Set up Gmail App Password** (2 minutes)
2. **Update `.env` file** (1 minute)
3. **Test server** (automatically checks email config)
4. **Deploy and get notified!** 🎉

Full documentation: `EMAIL_SETUP_GUIDE.md`
