// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// // Add a 3D cube to represent a computer
// const geometry = new THREE.BoxGeometry(2, 1.5, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
// const computer = new THREE.Mesh(geometry, material);
// scene.add(computer);

// Create monitor
const monitorGeometry = new THREE.BoxGeometry(2, 1.5, 1);
const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
monitor.position.set(0, 0.75, 0);
scene.add(monitor);

// Create keyboard
const keyboardGeometry = new THREE.BoxGeometry(2, 0.1, 1);
const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0x00aa00 });
const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
keyboard.position.set(0, 0.1, 1);
scene.add(keyboard);

// Create a base for the computer
const baseGeometry = new THREE.BoxGeometry(2.5, 0.1, 2);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x005500 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.set(0, 0, 0);
scene.add(base);


// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  //computer.rotation.x += 0.01;
  //computer.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// Zoom on click
document.addEventListener('click', () => {
    zoomOut();
});

const terminal = document.getElementById('terminal');
const input = document.getElementById('input');
const output = document.getElementById('output');

let showTerminal = false;

// Toggle terminal display when the computer is clicked
document.addEventListener('click', () => {
  showTerminal = !showTerminal;
  terminal.style.display = showTerminal ? 'block' : 'none';
});

// Handle input commands
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const command = input.value.toLowerCase();
    input.value = '';

    // Simple command responses
    if (command === 'hello') {
      output.innerHTML += `<div>Hello, World!</div>`;
    } else if (command === 'help') {
      output.innerHTML += `<div>Available commands: hello, help</div>`;
    } else if (command === 'go' || command === 'exit') {
        zoomOut();
    } else {
        output.innerHTML += `<div>> ${command}</div><div>Unknown command: ${command}</div>`;
    }

    // Scroll to bottom of output
    output.scrollTop = output.scrollHeight;
  }
});

function zoomOut() {
    gsap.to(camera.position, { z: 10, duration: 2 });
    output.innerHTML += `<div>> Zooming out...</div>`;
  };