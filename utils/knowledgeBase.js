// Knowledge Base - Personal Information about Shikher Singh
const knowledgeBase = {
  personalInfo: {
    name: "Shikher Singh",
    title: "Java Developer",
    subtitle: "Full-Stack Developer focused on clean frontend, backend & real-world systems",
    location: "Noida, India",
    email: "techzshikher@gmail.com",
    github: "https://github.com/Techz-Shikher",
    portfolio: "https://techz-shikher.github.io/portfolio/",
    aboutMe: "I'm a Java Developer passionate about clean code, efficient backends, and building real-world systems. I focus on creating scalable applications with strong database design and user-friendly interfaces."
  },

  skills: {
    languages: ["Java", "JavaScript", "Python", "HTML5", "CSS3"],
    databases: ["MySQL", "JDBC"],
    frameworks: ["Spring", "Servlets", "JSP"],
    frontEnd: ["JavaScript", "HTML5", "CSS3", "UI/UX Design"],
    backEnd: ["Java", "Servlets", "JDBC", "MySQL"],
    tools: ["Git", "GitHub", "REST APIs", "FastAPI"]
  },

  projects: [
    {
      name: "MedConnect",
      status: "Ongoing - Main Project",
      description: "Complete Hospital Management System with Admin, Doctor & Patient login, appointment scheduling, billing, room and ambulance management.",
      tech: ["Java", "Swing", "JDBC", "MySQL"],
      github: "https://github.com/Techz-Shikher/MedConnect-1"
    },
    {
      name: "CGPA Calculator",
      status: "Completed",
      description: "Java Swing based academic calculator to compute semester-wise and overall CGPA with accurate grading logic.",
      tech: ["Java", "Swing"],
      github: "https://github.com/Techz-Shikher/CodeAlpha_CGPA_Calculator"
    },
    {
      name: "Banking System",
      status: "Completed",
      description: "Secure banking application supporting login, deposit, withdrawal, balance enquiry and transaction handling.",
      tech: ["Java", "JDBC", "MySQL"],
      github: "https://github.com/Techz-Shikher/CodeAlpha_LoginSystem"
    },
    {
      name: "AgriConnect",
      status: "Completed",
      description: "Agriculture support system to help farmers with crop information, resource management and data-driven assistance.",
      tech: ["Java", "Database", "Web Basics"],
      github: "https://github.com/Techz-Shikher/Agriconnect"
    },
    {
      name: "Voice Detection API",
      status: "Completed",
      description: "REST API for AI-generated voice detection using FastAPI. Accepts structured audio input and returns standardized JSON responses.",
      tech: ["FastAPI", "Python", "REST API", "Security"],
      github: "https://github.com/Techz-Shikher/ai-voice-api",
      live: "https://ai-voice-api-uhdz.onrender.com/docs"
    }
  ],

  experience: [
    {
      role: "Student Representative",
      organization: "Galgotias University",
      duration: "Oct 2024 - Present",
      status: "Currently Active",
      location: "Noida, India",
      highlights: [
        "Bridge between student body and administration",
        "Full-time representative role",
        "On-site leadership presence"
      ]
    },
    {
      role: "Cloud Tech Intern",
      organization: "CodeAlpha",
      duration: "Jul 2024 - Aug 2024",
      highlights: [
        "Built multiple projects using Java and modern tech stacks",
        "Gained expertise in system design and architecture",
        "Hands-on experience with enterprise applications"
      ]
    }
  ],

  education: [
    {
      institution: "Galgotias University",
      program: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      duration: "2022-2026",
      location: "Noida, India"
    }
  ],

  certifications: [
    {
      name: "Advanced SQL Concepts",
      issuer: "HackerEarth"
    },
    {
      name: "Java Mastery",
      issuer: "Various online platforms"
    }
  ],

  interests: [
    "System Design",
    "Database Architecture",
    "Clean Code Practices",
    "Full-Stack Development",
    "Open Source Contributions",
    "Backend Optimization"
  ]
};

// Create a comprehensive context string for the chatbot
const createSystemContext = () => {
  return `You are an AI assistant representing Shikher Singh, a Java Developer. You only answer questions about Shikher Singh's skills, projects, experience, education, and professional background.

IMPORTANT RULES:
1. You ONLY answer questions about Shikher Singh and his work
2. If someone asks about anything unrelated to Shikher Singh, politely decline and redirect
3. Be friendly, professional, and concise
4. When asked about projects, provide accurate details
5. When asked about skills, list relevant technologies
6. Always be honest about what Shikher Singh knows and doesn't know

ABOUT SHIKHER SINGH:
- Name: Shikher Singh
- Title: Java Developer
- Location: Noida, India
- Bio: ${knowledgeBase.personalInfo.aboutMe}

SKILLS:
Languages: ${knowledgeBase.skills.languages.join(", ")}
Databases: ${knowledgeBase.skills.databases.join(", ")}
Framework Knowledge: ${knowledgeBase.skills.frameworks.join(", ")}

MAIN PROJECTS:
${knowledgeBase.projects.map(p => 
  `- ${p.name} (${p.status}): ${p.description}\n  Tech: ${p.tech.join(", ")}\n  Link: ${p.github || "Portfolio only"}`
).join("\n")}

CURRENT ROLE:
${knowledgeBase.experience[0].role} at ${knowledgeBase.experience[0].organization} (${knowledgeBase.experience[0].duration})

CONTACT: 
Email: ${knowledgeBase.personalInfo.email}
GitHub: ${knowledgeBase.personalInfo.github}

Answer conversationally but stay focused on Shikher Singh's professional profile.`;
};

module.exports = {
  knowledgeBase,
  createSystemContext
};
