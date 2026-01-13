const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { sendDeploymentNotification, sendContactEmail, testEmailConfiguration } = require('./utils/emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    console.log('📧 Contact Form Submission:', { name, email, subject, message });

    // Send email notification to portfolio owner
    try {
      await sendContactEmail({ name, email, subject, message });
      console.log('✅ Contact form email sent successfully');
    } catch (emailError) {
      console.warn('⚠️  Contact form email failed:', emailError.message);
      // Don't fail the request, just warn
    }

    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, async () => {
  console.log(`
  ╔════════════════════════════════════╗
  ║  🚀 Portfolio Server Running       ║
  ║  📍 http://localhost:${PORT}         ║
  ║  💡 Press Ctrl+C to stop           ║
  ╚════════════════════════════════════╝
  `);

  // Test email configuration on startup
  console.log('\n🔍 Checking email configuration...');
  const emailConfigured = await testEmailConfiguration();
  if (emailConfigured) {
    console.log('📧 Deployment notifications are enabled!');
    console.log('   Use: node scripts/deploy.js [environment] [url]');
    console.log('   Example: node scripts/deploy.js production https://myportfolio.com\n');
  } else {
    console.log('⚠️  Deployment notifications disabled (email not configured)\n');
  }
});

module.exports = app;
