// 3D HERO BACKGROUND SCENE
function initHero3D() {
  const canvas = document.getElementById('hero3DCanvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  camera.position.z = 5;

  // Create 3D objects
  const objects = [];

  // Create rotating cubes
  const geometry1 = new THREE.BoxGeometry(1, 1, 1);
  const material1 = new THREE.MeshPhongMaterial({
    color: 0x00f2ff,
    wireframe: false,
    emissive: 0x00f2ff,
    emissiveIntensity: 0.3,
  });
  const cube1 = new THREE.Mesh(geometry1, material1);
  cube1.position.set(-3, 2, 0);
  scene.add(cube1);
  objects.push({ mesh: cube1, speed: 0.01, axis: 'xyz' });

  // Create rotating sphere
  const geometry2 = new THREE.IcosahedronGeometry(0.8, 4);
  const material2 = new THREE.MeshPhongMaterial({
    color: 0xff006e,
    wireframe: false,
    emissive: 0xff006e,
    emissiveIntensity: 0.2,
  });
  const sphere = new THREE.Mesh(geometry2, material2);
  sphere.position.set(3, 2, 0);
  scene.add(sphere);
  objects.push({ mesh: sphere, speed: 0.008, axis: 'xy' });

  // Create rotating pyramid
  const geometry3 = new THREE.TetrahedronGeometry(1);
  const material3 = new THREE.MeshPhongMaterial({
    color: 0x00f2ff,
    wireframe: false,
    emissive: 0x00f2ff,
    emissiveIntensity: 0.25,
  });
  const pyramid = new THREE.Mesh(geometry3, material3);
  pyramid.position.set(0, -2, 0);
  scene.add(pyramid);
  objects.push({ mesh: pyramid, speed: 0.012, axis: 'xz' });

  // Create octahedron
  const geometry4 = new THREE.OctahedronGeometry(0.7);
  const material4 = new THREE.MeshPhongMaterial({
    color: 0xff006e,
    wireframe: false,
    emissive: 0xff006e,
    emissiveIntensity: 0.2,
  });
  const octahedron = new THREE.Mesh(geometry4, material4);
  octahedron.position.set(-2, -1, -2);
  scene.add(octahedron);
  objects.push({ mesh: octahedron, speed: 0.009, axis: 'yz' });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f2ff, 1);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff006e, 0.8);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate objects
    objects.forEach((obj) => {
      if (obj.axis.includes('x')) obj.mesh.rotation.x += obj.speed;
      if (obj.axis.includes('y')) obj.mesh.rotation.y += obj.speed;
      if (obj.axis.includes('z')) obj.mesh.rotation.z += obj.speed;
    });

    // Camera follows mouse subtly
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// 3D CERTIFICATE SHOWCASE
function initCert3D() {
  const canvas = document.getElementById('cert3DCanvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0.1);

  camera.position.z = 8;

  // Certificate data
  const certData = [
    { name: 'Mastering in SQL', color: 0x00f2ff },
    { name: 'DSA using C', color: 0xff006e },
    { name: 'GU Prerequisite', color: 0x00f2ff },
    { name: 'Java Collections', color: 0xff006e },
    { name: 'Oracle DB', color: 0x00f2ff },
    { name: 'Design Thinking', color: 0xff006e },
  ];

  const certCards = [];
  const numCards = certData.length;

  certData.forEach((cert, index) => {
    // Create card geometry (thin box)
    const geometry = new THREE.BoxGeometry(2, 2.5, 0.1);
    const material = new THREE.MeshPhongMaterial({
      color: cert.color,
      emissive: cert.color,
      emissiveIntensity: 0.3,
      shininess: 100,
    });
    const card = new THREE.Mesh(geometry, material);

    // Position cards in circle
    const angle = (index / numCards) * Math.PI * 2;
    const radius = 4;
    card.position.x = Math.cos(angle) * radius;
    card.position.y = Math.sin(angle) * radius;
    card.position.z = 0;

    // Add text to card (using canvas texture)
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 256;
    textCanvas.height = 320;
    const ctx = textCanvas.getContext('2d');
    ctx.fillStyle = '#0b0b0b';
    ctx.fillRect(0, 0, 256, 320);
    ctx.fillStyle = cert.color === 0x00f2ff ? '#00f2ff' : '#ff006e';
    ctx.font = 'bold 24px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText(cert.name, 128, 100);
    ctx.font = '14px Poppins';
    ctx.fillText('Click to view', 128, 280);

    const texture = new THREE.CanvasTexture(textCanvas);
    const textMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const textMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.98, 2.48),
      textMaterial
    );
    textMesh.position.z = 0.06;
    card.add(textMesh);

    scene.add(card);
    certCards.push({
      mesh: card,
      angle,
      index,
    });
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Mouse control
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let rotation = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    rotation.y += deltaX * 0.01;
    rotation.x += deltaY * 0.01;

    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Scroll zoom
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z += e.deltaY * 0.01;
    camera.position.z = Math.max(5, Math.min(15, camera.position.z));
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Auto-rotate slightly when not dragging
    if (!isDragging) {
      rotation.y += 0.002;
    }

    // Apply rotation to all cards
    certCards.forEach((cert, index) => {
      const angle = cert.angle + rotation.y;
      const radius = 4;
      cert.mesh.position.x = Math.cos(angle) * radius;
      cert.mesh.position.y = Math.sin(angle) * radius;
      cert.mesh.rotation.x = rotation.x;
      cert.mesh.rotation.y = angle + Math.PI / 2;
      cert.mesh.rotation.z = 0;
    });

    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// Initialize both scenes when page loads
document.addEventListener('DOMContentLoaded', () => {
  initHero3D();
  initCert3D();
});
