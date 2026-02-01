/**
 * Main Portfolio Scripts
 * Typewriter effect, theme switching, and other interactive features
 */

// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.html = document.documentElement;
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    this.init();
  }

  init() {
    // Set initial theme
    this.setTheme(this.currentTheme);
    
    // Add click listener to theme toggle button
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeToggle.classList.add('active');
    
    setTimeout(() => {
      this.setTheme(newTheme);
      this.themeToggle.classList.remove('active');
    }, 300);
  }

  updateThemeIcon() {
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector('i');
      if (icon) {
        if (this.currentTheme === 'dark') {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      }
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme
  new ThemeManager();

  // Initialize Typed.js for typewriter effect in hero section
  if (document.getElementById('typed')) {
    const typed = new Typed('#typed', {
      strings: [
        'Full Stack Developer',
        'Problem Solver',
        'Java Enthusiast',
        'UI/UX Creator',
        'Database Designer'
      ],
      typeSpeed: 50,           // Speed of typing (milliseconds per character)
      backSpeed: 30,           // Speed of backspacing (milliseconds per character)
      backDelay: 1500,         // Delay before starting to backspace (milliseconds)
      startDelay: 500,         // Delay before starting typing (milliseconds)
      loop: true,              // Loop the typing animation
      showCursor: true,        // Show blinking cursor
      cursorChar: '|',         // Character to use as cursor
      autoInsertCss: true      // Automatically insert CSS for cursor styling
    });
  }

  // Update year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

