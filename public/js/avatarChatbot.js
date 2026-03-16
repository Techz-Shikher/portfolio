// Avatar Chatbot Component
class AvatarChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isLoading = false;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.avatar = null;
    // Use environment variable or local API
    this.apiUrl = window.CHATBOT_API_URL || '/api/chatbot';
    this.init();
  }

  init() {
    this.createChatbotUI();
    this.setupEventListeners();
    this.initThreeJsScene();
  }

  createChatbotUI() {
    // Main chatbot container
    const chatbotHTML = `
      <div id="avatar-chatbot-widget" class="avatar-chatbot-widget">
        <!-- Floating Button -->
        <button class="chatbot-toggle-btn" id="chatbotToggle" title="Chat with Shikher">
          <i class="fas fa-robot"></i>
          <span class="chatbot-badge">Online</span>
        </button>

        <!-- Chat Window -->
        <div class="chatbot-window" id="chatbotWindow">
          <!-- Header -->
          <div class="chatbot-header">
            <div class="avatar-display" id="avatarContainer"></div>
            <div class="header-info">
              <h3>Shikher Singh</h3>
              <p>Ask me about my projects, skills & experience</p>
            </div>
            <button class="close-chatbot-btn" id="closeChat">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Messages Container -->
          <div class="chatbot-messages" id="chatMessages">
            <div class="message bot-message welcome-msg">
              <div class="message-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div class="message-content">
                <p>Hi! I'm an AI assistant representing Shikher Singh. Feel free to ask me about his projects, skills, experience, or anything professional!</p>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="chatbot-input-area">
            <input 
              type="text" 
              id="chatInput" 
              placeholder="Ask me something..." 
              class="chat-input"
              autocomplete="off"
            >
            <button class="send-btn" id="sendBtn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Append to body
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');

    toggleBtn.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.toggleChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
  }

  initThreeJsScene() {
    const container = document.getElementById('avatarContainer');
    if (!container) {
      console.warn('Avatar container not found');
      return;
    }

    try {
      // Check if WebGL is supported
      if (!window.THREE) {
        console.error('Three.js is not loaded');
        return;
      }

      // Scene setup
      this.scene = new THREE.Scene();
      
      // Get container dimensions with fallback
      const width = container.clientWidth || 50;
      const height = container.clientHeight || 50;

      this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'low-power'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      
      // Clear container first
      container.innerHTML = '';
      container.appendChild(this.renderer.domElement);

      // Create simple avatar
      this.createAvatarMesh();

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      this.scene.add(directionalLight);

      this.camera.position.z = 3;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (this.avatar) {
          this.avatar.rotation.y += 0.005;
        }
        this.renderer.render(this.scene, this.camera);
      };
      animate();

      // Handle window resize
      window.addEventListener('resize', () => this.onWindowResize());
    } catch (error) {
      console.error('Error initializing Three.js scene:', error);
    }
  }

  createAvatarMesh() {
    // Create a simple avatar using basic geometries
    const group = new THREE.Group();

    // Head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.5;
    group.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 1.1, 0.7);
    leftEye.scale.z = 0.5;
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 1.1, 0.7);
    rightEye.scale.z = 0.5;
    group.add(rightEye);

    // Body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.5, 1.5, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4a90e2 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.5;
    group.add(body);

    this.avatar = group;
    this.scene.add(group);
  }

  onWindowResize() {
    const container = document.getElementById('avatarContainer');
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  toggleChat() {
    const window = document.getElementById('chatbotWindow');
    this.isOpen = !this.isOpen;
    window.classList.toggle('open');
  }

  async sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to UI
    this.addMessageToUI(message, 'user');
    input.value = '';
    input.focus();

    // Show loading state
    this.isLoading = true;
    this.showTypingIndicator();

    try {
      // Send to backend with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: this.messages
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Remove typing indicator
      this.removeTypingIndicator();

      // Add bot response to UI
      if (data.response) {
        this.addMessageToUI(data.response, 'bot');
      } else if (data.error) {
        this.addMessageToUI(`Error: ${data.error}`, 'bot');
      } else {
        this.addMessageToUI('Sorry, I encountered an error. Please try again.', 'bot');
      }
    } catch (error) {
      console.error('Chat error:', error);
      this.removeTypingIndicator();
      
      // Provide helpful error message
      if (error.name === 'AbortError') {
        this.addMessageToUI('Request timed out. Please try again.', 'bot');
      } else {
        this.addMessageToUI('Sorry, I couldn\'t process your message. Please check your connection and try again.', 'bot');
      }
    }

    this.isLoading = false;
  }

  addMessageToUI(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}-message`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'message-avatar';
    avatarEl.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    
    // Simple markdown-like formatting
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
    
    contentEl.innerHTML = `<p>${formattedText}</p>`;

    messageEl.appendChild(avatarEl);
    messageEl.appendChild(contentEl);
    messagesContainer.appendChild(messageEl);

    // Store message
    this.messages.push({ role: sender === 'user' ? 'user' : 'assistant', content: text });

    // Auto scroll
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingEl = document.createElement('div');
    typingEl.id = 'typingIndicator';
    typingEl.className = 'message bot-message typing';
    typingEl.innerHTML = `
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="message-content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) {
      typingEl.remove();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch API config from server
    const configResponse = await fetch('/api/config');
    const config = await configResponse.json();
    window.CHATBOT_API_URL = config.apiUrl;
  } catch (error) {
    console.warn('Could not load config, using default API URL', error);
    window.CHATBOT_API_URL = '/api/chatbot';
  }
  
  // Initialize chatbot
  window.avatarChatbot = new AvatarChatbot();
});
