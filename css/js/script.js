// ===== TYPED.JS INITIALIZATION =====
new Typed("#typed", {
  strings: ["Java Developer", "Backend Enthusiast", "Problem Solver", "Clean Code Advocate"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ANIMATED STATS COUNTER =====
function animateCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// Trigger stats animation on scroll
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}

// ===== PROFICIENCY BAR ANIMATION =====
function animateProficiencyBars() {
  const bars = document.querySelectorAll('.proficiency-fill');
  bars.forEach(bar => {
    bar.style.animation = 'fillBar 1.5s ease-out forwards';
  });
}

const proficiencySection = document.querySelector('.skills-proficiency');
if (proficiencySection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProficiencyBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(proficiencySection);
}

// ===== PROJECT FILTERING =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
}

// ===== TECH CAROUSEL =====
const carouselTrack = document.querySelector('.carousel-track');
const carouselPrevBtn = document.getElementById('carouselPrev');
const carouselNextBtn = document.getElementById('carouselNext');

if (carouselTrack && carouselPrevBtn && carouselNextBtn) {
  let scrollPosition = 0;
  const scrollAmount = 140; // Width of item + gap

  carouselNextBtn.addEventListener('click', () => {
    scrollPosition += scrollAmount;
    carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
  });

  carouselPrevBtn.addEventListener('click', () => {
    if (scrollPosition > 0) {
      scrollPosition -= scrollAmount;
      carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
    }
  });
}

// ===== HIGHLIGHT ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== CONTACT FORM VALIDATION + MAIL REDIRECT =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const formStatus = document.getElementById('formStatus');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
      error.classList.remove('show');
    });
  }

  function showError(inputId, message) {
    const errorElement = document.getElementById(inputId + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    if (nameInput.value.trim().length < 3) {
      showError('name', 'Name must be at least 3 characters');
      isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
      showError('email', 'Please enter a valid email');
      isValid = false;
    }

    if (subjectInput.value.trim().length < 5) {
      showError('subject', 'Subject must be at least 5 characters');
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters');
      isValid = false;
    }

    if (isValid) {
      // ✅ MAIL REDIRECT
      const toEmail = "shikhersingh32286@email.com"; // 🔴 change if needed
      const mailSubject = encodeURIComponent(subjectInput.value);
      const mailBody = encodeURIComponent(
        `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\nMessage:\n${messageInput.value}`
      );

      window.location.href = `mailto:${toEmail}?subject=${mailSubject}&body=${mailBody}`;

      formStatus.textContent = '✓ Opening mail app...';
      formStatus.classList.remove('error');
      formStatus.classList.add('success');

      contactForm.reset();
    } else {
      formStatus.textContent = '✗ Please fix the errors above';
      formStatus.classList.remove('success');
      formStatus.classList.add('error');
    }
  });

  // Clear error on typing
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      const errorElement = input.parentElement.querySelector('.form-error');
      if (errorElement) errorElement.classList.remove('show');
    });
  });
}


// ===== ADD ANIMATION TO SKILL ITEMS ON SCROLL =====
const skillItems = document.querySelectorAll('.skill-item');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

skillItems.forEach(item => observer.observe(item));

console.log('✨ Portfolio enhancements loaded successfully!');
