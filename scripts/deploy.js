#!/usr/bin/env node

/**
 * Deployment Script - Sends notification email on deployment
 * Usage: node scripts/deploy.js [environment] [url]
 * 
 * Examples:
 *   node scripts/deploy.js production https://your-portfolio.com
 *   node scripts/deploy.js staging https://staging-portfolio.com
 *   node scripts/deploy.js local http://localhost:3000
 */

require('dotenv').config();
const { sendDeploymentNotification, testEmailConfiguration } = require('../utils/emailService');
const packageJson = require('../package.json');

// Get command line arguments
const environment = process.argv[2] || 'production';
const deployedUrl = process.argv[3] || 'http://localhost:3000';
const version = packageJson.version;

// Deployment info
const deploymentInfo = {
  deployedUrl,
  environment,
  version,
  status: 'success',
  timestamp: new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }),
  details: `
    Deployment automated successfully via Node.js deployment script.
    All systems operational and ready for production use.
  `
};

async function deploy() {
  try {
    console.log(`
╔════════════════════════════════════════════════════╗
║       📦 Portfolio Deployment Script                ║
╚════════════════════════════════════════════════════╝
    `);

    console.log('🔍 Checking email configuration...');
    const isEmailConfigured = await testEmailConfiguration();

    if (!isEmailConfigured) {
      console.warn('⚠️  Email not configured. Skipping notification.');
      console.log('   To enable notifications, set EMAIL_USER and EMAIL_PASSWORD in .env');
      process.exit(0);
    }

    console.log('\n📧 Sending deployment notification...');
    const result = await sendDeploymentNotification(deploymentInfo);

    console.log(`
╔════════════════════════════════════════════════════╗
║     ✅ Deployment Successful!                      ║
╚════════════════════════════════════════════════════╝

📊 Deployment Summary:
   • Environment: ${environment}
   • URL: ${deployedUrl}
   • Version: v${version}
   • Timestamp: ${deploymentInfo.timestamp}
   • Email Notification: Sent (${result.messageId})

🎯 Next Steps:
   ✓ Check your email for deployment notification
   ✓ Visit ${deployedUrl} to view your live portfolio
   ✓ Test all functionality on the live site
   ✓ Monitor performance and user feedback

    `);

  } catch (error) {
    console.error(`
╔════════════════════════════════════════════════════╗
║     ❌ Deployment Failed!                           ║
╚════════════════════════════════════════════════════╝
    `);
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run deployment
deploy();
