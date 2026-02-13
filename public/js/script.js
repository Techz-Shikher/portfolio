/**
 * Main Portfolio Scripts
 * Typewriter effect and other interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
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

  // Certificates Modal Handler
  const modal = document.getElementById('certificatesModal');
  const viewAllBtn = document.getElementById('viewAllCertsBtn');
  const closeBtn = document.getElementById('closeCertsModal');

  if (viewAllBtn && modal) {
    // Open modal
    viewAllBtn.addEventListener('click', function() {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  }
});

