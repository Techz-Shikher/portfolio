const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { sendDeploymentNotification, sendContactEmail, testEmailConfiguration } = require('./utils/emailService');
const { createSystemContext, knowledgeBase } = require('./utils/knowledgeBase');

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

// API Config endpoint for frontend
app.get('/api/config', (req, res) => {
  res.json({
    apiUrl: process.env.CHATBOT_API_URL || '/api/chatbot'
  });
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

// Chatbot Endpoint
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Simple local chatbot response logic (no external API required)
    const response = generateChatbotResponse(message, knowledgeBase);

    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Local chatbot response generator
function generateChatbotResponse(userMessage, kb) {
  const message = userMessage.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|greetings|what's up|yo)\b/.test(message)) {
    return `Hello! 👋 I'm an AI assistant representing Shikher Singh. Feel free to ask me about his projects, skills, experience, or professional background!`;
  }

  // Name
  if (/who are you|what is your name|who am i talking to/.test(message)) {
    return `I'm representing **${kb.personalInfo.name}**, a ${kb.personalInfo.title} based in ${kb.personalInfo.location}. I'm here to answer questions about his work, skills, and experience!`;
  }

  // Skills
  if (/skills|technologies|tech stack|what does .* know|proficient/.test(message)) {
    return `**Shikher's Technical Skills:**\n\n*Languages:* ${kb.skills.languages.join(", ")}\n\n*Databases:* ${kb.skills.databases.join(", ")}\n\n*Frontend:* ${kb.skills.frontEnd.join(", ")}\n\n*Backend:* ${kb.skills.backEnd.join(", ")}\n\nHe's most comfortable with Java for backend development and has solid full-stack capabilities!`;
  }

  // Projects
  if (/projects|portfolio|work|built|created/.test(message)) {
    const projectsList = kb.projects.map(p => 
      `• **${p.name}** (${p.status}): ${p.description}`
    ).join("\n\n");
    return `**Shikher's Featured Projects:**\n\n${projectsList}\n\nWould you like more details about any specific project?`;
  }

  // MedConnect specifically
  if (/medconnect|hospital|main project/.test(message)) {
    const medconnect = kb.projects[0];
    return `**${medconnect.name}** is Shikher's main ongoing project!\n\n${medconnect.description}\n\n*Tech Stack:* ${medconnect.tech.join(", ")}\n\nIt includes appointment scheduling, billing, room management, and ambulance services. You can check the code here: ${medconnect.github}`;
  }

  // Experience
  if (/experience|work experience|background|job/.test(message)) {
    const exp = kb.experience[0];
    return `**Current Role:**\n${exp.role} at ${exp.organization}\n${exp.duration} | ${exp.location}\n\n${exp.highlights.map(h => `• ${h}`).join("\n")}\n\nShikher is actively involved in bridging communication between students and administration!`;
  }

  // Education
  if (/education|college|university|degree|study/.test(message)) {
    const edu = kb.education[0];
    return `**Education:**\n${edu.program} in ${edu.field}\n${edu.institution}\n${edu.duration} | ${edu.location}`;
  }

  // Contact
  if (/contact|email|reach|connect|linkedin|github/.test(message)) {
    return `**Contact Shikher:**\n\n📧 Email: ${kb.personalInfo.email}\n🐙 GitHub: ${kb.personalInfo.github}\n🌐 Portfolio: ${kb.personalInfo.portfolio}\n\nFeel free to reach out for collaborations or inquiries!`;
  }

  // About
  if (/about|who is|tell me about|describe/.test(message)) {
    return `**About Shikher Singh:**\n\n${kb.personalInfo.aboutMe}\n\nHe's currently a Student Representative at Galgotias University and has interned at CodeAlpha. His passion lies in system design and clean code practices!`;
  }

  // Interests
  if (/interests|passion|like|enjoy|focus/.test(message)) {
    return `**Shikher's Interests:**\n\n${kb.interests.map(i => `• ${i}`).join("\n")}\n\nHe's particularly interested in backend optimization and real-world system design!`;
  }

  // Certifications
  if (/certificate|certification|award/.test(message)) {
    return `**Certifications:**\n\n${kb.certifications.map(c => `• ${c.name} - ${c.issuer}`).join("\n")}\n\nShikher is committed to continuous learning and skill development!`;
  }

  // Default response for unrelated questions
  if (/^(what is|who is|how is|when is|where is|why is)/.test(message)) {
    return `I'm here to help with questions about Shikher's professional background, skills, and projects. I can't answer general questions as I'm specifically designed to be his portfolio assistant. What would you like to know about Shikher?`;
  }

  // Generic fallback
  return `That's an interesting question! However, I'm specifically designed to provide information about Shikher Singh's professional work and experience. Feel free to ask me about:\n\n• His projects (MedConnect, Banking System, etc.)\n• Technical skills and stack\n• Work experience\n• Education\n• How to contact him\n\nWhat would you like to know?`;
}

// API Health Check
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
