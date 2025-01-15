// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add a 3D cube to represent a computer
const geometry = new THREE.BoxGeometry(2, 1.5, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const computer = new THREE.Mesh(geometry, material);
scene.add(computer);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  computer.rotation.x += 0.01;
  computer.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Zoom on click
document.addEventListener('click', () => {
    gsap.to(camera.position, { z: 1, duration: 1 });
  });
