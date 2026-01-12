// Neon Waves 3D Animation Background
class NeonWavesAnimation {
  constructor() {
    this.canvas = document.getElementById('hero3DCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    
    this.time = 0;
    this.particles = [];
    this.waveOffset = 0;
    
    // Neon colors
    this.colors = [
      '#00d4ff', // Cyan
      '#0088ff', // Blue
      '#6600ff', // Purple
      '#ff00ff', // Magenta
      '#ff0088'  // Pink
    ];
    
    this.initParticles();
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', () => this.resize());
  }
  
  initParticles() {
    this.particles = [];
    for (let i = 0; i < 150; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }
  
  drawWaves() {
    const waveCount = 5;
    const waveHeight = 80;
    const waveLength = 200;
    
    for (let waveIndex = 0; waveIndex < waveCount; waveIndex++) {
      const yOffset = (this.height / (waveCount + 1)) * (waveIndex + 1);
      const colorIndex = waveIndex % this.colors.length;
      const color = this.colors[colorIndex];
      
      // Draw main wave
      this.ctx.beginPath();
      this.ctx.moveTo(0, yOffset);
      
      for (let x = 0; x <= this.width; x += 10) {
        const y = yOffset + 
          Math.sin((x / waveLength) + this.time * 0.005) * waveHeight +
          Math.sin((x / (waveLength * 1.5)) + this.time * 0.003 + waveIndex) * (waveHeight * 0.5);
        this.ctx.lineTo(x, y);
      }
      
      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.closePath();
      
      // Gradient fill
      const gradient = this.ctx.createLinearGradient(0, yOffset - waveHeight, 0, yOffset + waveHeight);
      gradient.addColorStop(0, color + '00');
      gradient.addColorStop(0.5, color + '40');
      gradient.addColorStop(1, color + '00');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      
      // Glowing outline
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = 0.8;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }
  
  drawFlowingLines() {
    const lineCount = 8;
    
    for (let i = 0; i < lineCount; i++) {
      const startY = (this.height / (lineCount + 1)) * (i + 1);
      const color = this.colors[i % this.colors.length];
      
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1.5;
      this.ctx.globalAlpha = 0.6;
      
      this.ctx.beginPath();
      
      for (let x = 0; x <= this.width; x += 15) {
        const y = startY + 
          Math.sin((x / 150) + this.time * 0.008 + i * 0.5) * 40 +
          Math.sin((x / 300) + this.time * 0.004) * 20;
        
        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }
  
  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around
      if (particle.x < 0) particle.x = this.width;
      if (particle.x > this.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.height;
      if (particle.y > this.height) particle.y = 0;
      
      // Oscillate opacity
      particle.opacity = 0.3 + Math.sin(this.time * 0.01 + particle.x * 0.01) * 0.3;
    });
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }
  
  animate() {
    // Dark background
    this.ctx.fillStyle = '#0a0e27';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Add subtle grid
    this.drawSubtleGrid();
    
    // Draw animations
    this.drawWaves();
    this.drawFlowingLines();
    this.updateParticles();
    this.drawParticles();
    
    this.time++;
    requestAnimationFrame(() => this.animate());
  }
  
  drawSubtleGrid() {
    this.ctx.strokeStyle = '#1a2f5a';
    this.ctx.lineWidth = 0.5;
    this.ctx.globalAlpha = 0.1;
    
    const gridSize = 100;
    
    // Vertical lines
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
    
    this.ctx.globalAlpha = 1;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NeonWavesAnimation();
  });
} else {
  new NeonWavesAnimation();
}
