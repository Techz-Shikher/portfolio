/**
 * Enhanced Three.js Scenes for 3D Animated Portfolio
 * Subtle background animations that don't interfere with content
 */

class PortfolioScene {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.objects = [];
    this.animationId = null;
    this.isMobile = window.innerWidth < 768;
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);
    this.scene.fog = new THREE.Fog(0x0a0e27, 150, 1000);

    // Camera setup (responsive)
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = this.isMobile ? 80 : 60;

    // Renderer setup
    const container = document.getElementById('three-container');
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;

    // Clear container and add renderer
    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    // Lighting - Much subtler
    this.setupLights();

    // Particles only
    this.createParticles();

    // Create minimal objects
    if (!this.isMobile) {
      this.createMinimalObjects();
    }

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
  }

  setupLights() {
    // Ambient Light - Darker
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);

    // Directional Light - Much dimmer
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.3);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Subtle Point Lights
    const pointLight1 = new THREE.PointLight(0x00ff88, 0.2);
    pointLight1.position.set(-30, 30, 30);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.2);
    pointLight2.position.set(30, -30, 30);
    this.scene.add(pointLight2);
  }

  createParticles() {
    const particleCount = this.isMobile ? 40 : 80;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );

      velocities.push(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      );
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
      fog: true
    });

    this.particles = new THREE.Points(geometry, material);
    this.particleVelocities = velocities;
    this.scene.add(this.particles);
  }

  createMinimalObjects() {
    // Create very subtle floating objects
    this.createTorus(0, 0, -20, 0x00ffff, 0.1);
  }

  createTorus(x, y, z, color = 0xff00ff, intensity = 0.15) {
    const geometry = new THREE.TorusGeometry(5, 1.5, 8, 16);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.7,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: intensity,
      transparent: true,
      opacity: 0.6,
      wireframe: false
    });

    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(x, y, z);
    torus.castShadow = true;
    torus.receiveShadow = true;

    torus.userData = {
      rotationSpeed: {
        x: 0.001,
        y: 0.002,
        z: 0.0005
      }
    };

    this.scene.add(torus);
    this.objects.push(torus);
    return torus;
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Animate particles slowly
    if (this.particles) {
      const positionAttribute = this.particles.geometry.getAttribute('position');
      const positions = positionAttribute.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += this.particleVelocities[i] * 0.3;
        positions[i + 1] += this.particleVelocities[i + 1] * 0.3;
        positions[i + 2] += this.particleVelocities[i + 2] * 0.3;

        // Wrap around
        if (Math.abs(positions[i]) > 150) this.particleVelocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 150) this.particleVelocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 150) this.particleVelocities[i + 2] *= -1;
      }
      positionAttribute.needsUpdate = true;
    }

    // Animate objects slowly
    this.objects.forEach(obj => {
      if (obj.userData.rotationSpeed) {
        obj.rotation.x += obj.userData.rotationSpeed.x;
        obj.rotation.y += obj.userData.rotationSpeed.y;
        obj.rotation.z += obj.userData.rotationSpeed.z;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioScene = new PortfolioScene();
});
