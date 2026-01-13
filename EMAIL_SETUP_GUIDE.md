# 📧 Email Notification Setup Guide

## Overview
Your portfolio now has **two email notification features**:
1. **Deployment Notifications** - Get notified when your portfolio is deployed
2. **Contact Form Notifications** - Receive emails when visitors submit the contact form

---

## 🔧 Setup Instructions

### Step 1: Enable Gmail App Password

1. **Sign in to your Google Account**
   - Go to [myaccount.google.com](https://myaccount.google.com)

2. **Enable 2-Step Verification** (if not already enabled)
   - Click "Security" in the left menu
   - Find "2-Step Verification"
   - Click "Enable" and follow the prompts

3. **Generate App Password**
   - Go back to Security settings
   - Find "App passwords" (appears after 2FA is enabled)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google generates a 16-character password
   - Copy this password (without spaces)

### Step 2: Configure Environment Variables

1. **Open `.env` file** in your portfolio directory
   ```bash
   # If .env doesn't exist, copy from .env.example
   cp .env.example .env
   ```

2. **Add your Gmail credentials**
   ```dotenv
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   EMAIL_TO=your-email@gmail.com
   DEPLOYMENT_NOTIFY_EMAIL=your-email@gmail.com
   ```

3. **Example (real values)**
   ```dotenv
   EMAIL_USER=john.doe@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   EMAIL_TO=john.doe@gmail.com
   DEPLOYMENT_NOTIFY_EMAIL=john.doe@gmail.com
   ```

### Step 3: Test Email Configuration

1. **Start your server**
   ```bash
   npm start
   ```

2. **Check the console output**
   ```
   🔍 Checking email configuration...
   ✅ Email configuration is valid and ready to use
   ```

✅ If you see the success message, emails are configured!
❌ If you see an error, double-check your EMAIL_USER and EMAIL_PASSWORD

---

## 🚀 Using Deployment Notifications

### Automatic Deployment Notification

After deploying to production, run:

```bash
node scripts/deploy.js production https://your-portfolio-url.com
```

**Examples:**
```bash
# Deploy to production
node scripts/deploy.js production https://myportfolio.com

# Deploy to staging
node scripts/deploy.js staging https://staging.myportfolio.com

# Deploy to local (for testing)
node scripts/deploy.js local http://localhost:3000
```

### What You'll Get

You'll receive an email with:
- ✅ Deployment status (success/failed)
- 📍 Live portfolio URL
- 🏷️ Environment (production, staging, local)
- 📦 Version number
- ⏰ Deployment timestamp
- Direct link to view your portfolio

**Email Template Preview:**
```
Subject: ✅ Portfolio Deployment Successful - January 13, 2026

🚀 Portfolio Deployed!

Status: ✓ Deployment Successful
URL: https://myportfolio.com
Environment: Production
Version: v1.0.0
Deployed At: Monday, January 13, 2026 at 2:30:45 PM

[View Live Portfolio Button]

What's Next?
✓ Check portfolio responsiveness across devices
✓ Test contact form functionality
✓ Verify all links and navigation
✓ Monitor performance and user feedback
```

---

## 📬 Contact Form Email Notifications

### How It Works

When someone submits your contact form:
1. Form submission goes to `/api/contact` endpoint
2. Server validates the form data
3. Email is sent to you automatically
4. Visitor gets a success message

### What You'll Receive

**Email from:** The visitor's email address (can reply directly)
**Subject:** 📧 New Contact Form: [Their Subject]
**Content:**
- Visitor's name
- Visitor's email
- Subject
- Message (formatted with line breaks)

**Example Email:**
```
New Contact Form Submission

From: John Smith (john.smith@example.com)
Subject: Project Inquiry

Message:
Hi! I'm interested in discussing a project collaboration.
Would love to schedule a call this week.

Thanks!
John
```

### Visitor Experience

The visitor sees:
```
✅ Thank you for your message! I will get back to you soon.
```

---

## 🔐 Security Best Practices

### 1. Keep App Password Safe
- Never commit `.env` file to Git
- Already in `.gitignore` ✅
- Only share with authorized team members

### 2. Use App Password, NOT Regular Password
- ✅ Always use 16-character App Password
- ❌ Never use your main Google password
- More secure and revocable at any time

### 3. Verify Recipients
- `EMAIL_TO` - Who receives contact form emails
- `DEPLOYMENT_NOTIFY_EMAIL` - Who receives deployment notifications
- Can be the same or different emails

### 4. Monitor Email Activity
- Gmail shows recent device activity
- Review "App passwords" page regularly
- Revoke access anytime if suspicious activity

---

## 🛠️ Troubleshooting

### Email Not Sending?

**Error: "Invalid login credentials"**
- Check EMAIL_USER and EMAIL_PASSWORD
- Verify 2FA is enabled on Gmail
- Regenerate App Password (old one might have been revoked)

**Error: "SMTP Error"**
- Verify internet connection
- Check firewall/antivirus blocking email
- Use Gmail instead of other email providers initially

**Error: "No error, but email not received"**
- Check spam/junk folder
- Wait a few seconds (emails take time)
- Verify EMAIL_TO address is correct

### Deployment Script Issues

**Error: "Cannot find module"**
```bash
# Make sure files are in correct locations:
# utils/emailService.js
# scripts/deploy.js
npm install  # Reinstall dependencies
```

**Error: "ENOENT .env"**
```bash
# Create .env file from template
cp .env.example .env
# Edit .env with your credentials
```

---

## 📊 Email Configuration Verification

### Check Configuration on Server Start

Every time your server starts, it automatically tests email configuration:

```
🚀 Portfolio Server Running
📍 http://localhost:3000

🔍 Checking email configuration...
✅ Email configuration is valid and ready to use
📧 Deployment notifications are enabled!
   Use: node scripts/deploy.js [environment] [url]
```

### Manual Test (Optional)

Create a test file `test-email.js`:

```javascript
require('dotenv').config();
const { testEmailConfiguration } = require('./utils/emailService');

testEmailConfiguration();
```

Run:
```bash
node test-email.js
```

---

## 📧 Email Configuration Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `EMAIL_USER` | Gmail account sending emails | john@gmail.com |
| `EMAIL_PASSWORD` | App Password (16 chars) | abcd efgh ijkl mnop |
| `EMAIL_TO` | Receives contact form emails | john@gmail.com |
| `DEPLOYMENT_NOTIFY_EMAIL` | Receives deployment notifications | john@gmail.com |
| `DEPLOYED_URL` | Your portfolio URL | https://myportfolio.com |
| `DEPLOYMENT_ENVIRONMENT` | Current environment | production, staging, local |

---

## 🎯 Common Scenarios

### Scenario 1: Local Development
```bash
# .env file
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_TO=your@gmail.com
DEPLOYMENT_NOTIFY_EMAIL=your@gmail.com
```

### Scenario 2: Multiple Environments
```bash
# Production deployment
node scripts/deploy.js production https://myportfolio.com

# Staging deployment
node scripts/deploy.js staging https://staging-portfolio.com

# Local test
node scripts/deploy.js local http://localhost:3000
```

### Scenario 3: Team Notifications
```bash
# Get notifications at multiple addresses by updating the server
# utils/emailService.js - modify sendDeploymentNotification() to:
// to: [EMAIL_TO, 'manager@example.com', 'team@example.com']
```

---

## 📝 Files Added/Modified

**New Files:**
- `utils/emailService.js` - Email service with Nodemailer
- `scripts/deploy.js` - Deployment script with notifications

**Modified Files:**
- `server.js` - Added email service integration
- `.env.example` - Added email configuration variables

**No changes to:**
- HTML/CSS files
- Frontend functionality
- Database or data storage

---

## 🚀 Next Steps

1. ✅ Set up Gmail App Password
2. ✅ Configure `.env` file
3. ✅ Test email configuration
4. ✅ Deploy portfolio
5. ✅ Send deployment notification
6. ✅ Test contact form
7. ✅ Monitor emails

---

## ❓ FAQ

**Q: Can I use a different email provider?**
A: Yes, Nodemailer supports all major providers (Outlook, Yahoo, custom SMTP, etc.)

**Q: Will emails be sent to users who fill the form?**
A: No, only you receive emails. Visitors see a success message instead.

**Q: Can I add more recipients?**
A: Yes, modify `emailService.js` to add more addresses in the `to:` field.

**Q: What if I change my password?**
A: Generate a new App Password and update `.env` file.

**Q: Can I test without actual deployment?**
A: Yes, run: `node scripts/deploy.js local http://localhost:3000`

---

## 💡 Tips

- Save App Password in a password manager
- Regularly review Gmail App Passwords page
- Test email config before actual deployment
- Keep `.env` file private and never commit to Git
- Monitor email spam folder during first deployment

**Happy deploying! 🎉**
