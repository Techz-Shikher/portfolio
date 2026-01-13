const nodemailer = require('nodemailer');

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use App Password, not regular password
  }
});

/**
 * Send deployment notification email
 * @param {Object} deploymentInfo - Deployment information
 * @returns {Promise<Object>} Email sending result
 */
const sendDeploymentNotification = async (deploymentInfo) => {
  const {
    deployedUrl = 'http://localhost:3000',
    environment = 'production',
    timestamp = new Date().toLocaleString(),
    version = '1.0.0',
    status = 'success',
    details = ''
  } = deploymentInfo;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #00ff88 0%, #00ffff 100%);
          color: #000;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 14px;
          opacity: 0.8;
        }
        .content {
          padding: 30px 20px;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 15px;
        }
        .status-success {
          background-color: #d4edda;
          color: #155724;
        }
        .status-failed {
          background-color: #f8d7da;
          color: #721c24;
        }
        .info-block {
          background-color: #f9f9f9;
          border-left: 4px solid #00ff88;
          padding: 15px;
          margin: 15px 0;
          border-radius: 4px;
        }
        .info-block strong {
          color: #00ff88;
        }
        .info-block p {
          margin: 6px 0;
          color: #333;
          font-size: 14px;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #00ff88 0%, #00ffff 100%);
          color: #000;
          padding: 12px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 20px;
          text-align: center;
          transition: transform 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #666;
        }
        .footer p {
          margin: 5px 0;
        }
        .divider {
          height: 1px;
          background-color: #eee;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Portfolio Deployed!</h1>
          <p>Your portfolio is live and ready to go</p>
        </div>

        <div class="content">
          <div class="status-badge status-${status}">
            ${status === 'success' ? '✓ Deployment Successful' : '✗ Deployment Failed'}
          </div>

          <h2 style="color: #333; margin-top: 0;">Deployment Details</h2>

          <div class="info-block">
            <strong>📍 Live URL:</strong>
            <p><a href="${deployedUrl}" style="color: #00ff88; text-decoration: none;">${deployedUrl}</a></p>
          </div>

          <div class="info-block">
            <strong>🏷️ Environment:</strong>
            <p>${environment.charAt(0).toUpperCase() + environment.slice(1)}</p>
          </div>

          <div class="info-block">
            <strong>📦 Version:</strong>
            <p>v${version}</p>
          </div>

          <div class="info-block">
            <strong>⏰ Deployed At:</strong>
            <p>${timestamp}</p>
          </div>

          ${details ? `
          <div class="info-block">
            <strong>📝 Details:</strong>
            <p>${details}</p>
          </div>
          ` : ''}

          <div class="divider"></div>

          <a href="${deployedUrl}" class="cta-button">View Live Portfolio</a>

          <h3 style="color: #333; margin-top: 30px; font-size: 16px;">What's Next?</h3>
          <ul style="color: #666; font-size: 14px; line-height: 1.8;">
            <li>✅ Check portfolio responsiveness across devices</li>
            <li>✅ Test contact form functionality</li>
            <li>✅ Verify all links and navigation</li>
            <li>✅ Monitor performance and user feedback</li>
          </ul>
        </div>

        <div class="footer">
          <p><strong>Portfolio 3D Animated</strong> - Your Professional Showcase</p>
          <p>Keep updating your portfolio to stay ahead in your career!</p>
          <p style="color: #999; margin-top: 10px;">This is an automated deployment notification</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.DEPLOYMENT_NOTIFY_EMAIL || process.env.EMAIL_TO,
      subject: `✅ Portfolio Deployment Successful - ${new Date().toLocaleDateString()}`,
      html: htmlContent,
      text: `
        Portfolio Deployment Notification
        ===================================
        
        Status: ${status}
        URL: ${deployedUrl}
        Environment: ${environment}
        Version: ${version}
        Deployed At: ${timestamp}
        
        View your live portfolio: ${deployedUrl}
      `
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Deployment notification email sent successfully!');
    console.log(`   Message ID: ${result.messageId}`);
    
    return {
      success: true,
      messageId: result.messageId,
      timestamp: new Date()
    };

  } catch (error) {
    console.error('❌ Error sending deployment notification:', error.message);
    throw error;
  }
};

/**
 * Send contact form email (optional - if contact form needs to send email too)
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Email sending result
 */
const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const htmlContent = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `📧 New Contact Form: ${subject}`,
      html: htmlContent,
      replyTo: email
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Contact form email sent - Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error sending contact email:', error.message);
    throw error;
  }
};

/**
 * Test email configuration
 * @returns {Promise<boolean>} True if email is configured correctly
 */
const testEmailConfiguration = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email configuration is valid and ready to use');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    console.log('Please check your EMAIL_USER and EMAIL_PASSWORD in .env file');
    return false;
  }
};

module.exports = {
  sendDeploymentNotification,
  sendContactEmail,
  testEmailConfiguration,
  transporter
};
