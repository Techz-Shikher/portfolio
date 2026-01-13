/**
 * Scroll Animations and Interactions
 * Responsive animations for portfolio
 */

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Intersection Observer for fade-in animations
    this.setupIntersectionObserver();

    // Mouse parallax effect (desktop only)
    if (window.innerWidth > 768) {
      this.setupMouseParallax();
    }

    // Scroll progress indicator
    this.setupScrollProgress();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
  }

  setupMouseParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const angleX = (clientY - centerY) / centerY;
      const angleY = (clientX - centerX) / centerX;

      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 10;
        el.style.transform = `rotateX(${angleX * speed}deg) rotateY(${angleY * speed}deg)`;
      });
    });
  }

  setupScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        this.showSuccess('Message sent successfully! I will get back to you soon.');
        this.form.reset();
      } else {
        this.showError(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.showError('Server error. Please try again later.');
    }
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimations();
  new ContactFormHandler();
  
  // Update footer year automatically
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
