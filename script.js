// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Create monitor
const monitorGeometry = new THREE.BoxGeometry(2, 1.5, 1);
const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0xffe6b3 });
const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
monitor.position.set(0, 0.75, 0);
scene.add(monitor);

// Create keyboard
const keyboardGeometry = new THREE.BoxGeometry(2, 0.1, 1);
const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0xfff5e6 });
const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
keyboard.position.set(0, 0.1, 1);
scene.add(keyboard);

// Create a base for the computer
const baseGeometry = new THREE.BoxGeometry(2.5, 0.1, 2);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x331f00 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.set(0, 0, 0);
scene.add(base);

// Position the camera
camera.position.z = 5;

// Create terminal canvas (to be displayed on the monitor)
const terminalCanvas = document.createElement('canvas');
terminalCanvas.width = 512;
terminalCanvas.height = 256;
const terminalContext = terminalCanvas.getContext('2d');
terminalContext.fillStyle = 'rgb(0, 0, 0)';
terminalContext.fillRect(0, 0, terminalCanvas.width, terminalCanvas.height);
terminalContext.font = '20px monospace';
terminalContext.fillStyle = 'rgb(255, 255, 0)';
terminalContext.fillText('> Enter command (type help for options)', 10, 30);

// Create a texture from the canvas and apply it to the monitor
const terminalTexture = new THREE.CanvasTexture(terminalCanvas);
monitor.material = new THREE.MeshBasicMaterial({ map: terminalTexture });

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

let currentInput = ""; // Store current input

// Function to update the terminal display
function updateTerminalDisplay() {
    terminalContext.clearRect(0, 0, terminalCanvas.width, terminalCanvas.height);
    terminalContext.fillStyle = 'yellow';
    terminalContext.fillText(`> ${currentInput}`, 10, 30);
    terminalTexture.needsUpdate = true;
}

// Handle input commands directly in the terminal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        processCommand(currentInput);
        currentInput = '';
    } else if (event.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1); // Handle backspace
        updateTerminalDisplay();
    } else if (event.key.length === 1) { // Only accept single character inputs
        currentInput += event.key;
        updateTerminalDisplay();
    }
    // updateTerminalDisplay(); // Update display on every key press
});

// Function to process user commands
function processCommand(command) {
    terminalContext.clearRect(0, 0, terminalCanvas.width, terminalCanvas.height);
    terminalContext.fillStyle = 'yellow';
    terminalContext.fillText(`> ${command}`, 10, 30);  // Prepend user command

    if (command === 'hello') {
        terminalContext.fillText('Hello, World!', 10, 60);
    } else if (command === 'help') {
        terminalContext.fillText('Available commands: hello, help, go, exit', 10, 60);
    } else if (command === 'go' || command === 'exit') {
        zoomOut();
    terminalContext.fillText('Zooming out...', 10, 60);
    } else {
        terminalContext.fillText('Unknown command', 10, 60);
    }

    // Update the texture so the changes show on the monitor
    terminalTexture.needsUpdate = true;
}

// Zoom out function
function zoomOut() {
    // Calculate final camera position
    const targetPosition = new THREE.Vector3(0, 2, 10); // tweak position
    const targetRotation = new THREE.Euler(-0.2, 0, 0);

    gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 2,
        ease: "power2.inOut", // Smoother easing
    });
    gsap.to(camera.rotation, {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            document.getElementById('terminal').style.display = 'none';

            // Show portfolio content here (using GSAP for smooth transitions) e.g.
            gsap.to("#portfolio-content", {opacity: 1, duration: 1})
        }

    });
}
