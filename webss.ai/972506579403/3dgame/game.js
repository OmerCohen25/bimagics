import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

let scene, camera, renderer;
let player, obstacles = [], obstacleSpeed = 0.2;
let clock = new THREE.Clock();
let moveLeft = false, moveRight = false;
let gameOver = false;

const playerSize = 1;
const laneWidth = 2;
let score = 0;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 10;
  camera.position.y = 5;
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  // Player
  const geometry = new THREE.BoxGeometry(playerSize, playerSize, playerSize);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  player = new THREE.Mesh(geometry, material);
  scene.add(player);

  // Events
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft = true;
    if (e.key === 'ArrowRight') moveRight = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') moveLeft = false;
    if (e.key === 'ArrowRight') moveRight = false;
  });

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Generate initial obstacles
  for (let i = 0; i < 5; i++) addObstacle(i * -5);
}

function addObstacle(zPos) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const obstacle = new THREE.Mesh(geometry, material);

  const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
  obstacle.position.x = lane * laneWidth;
  obstacle.position.z = zPos;
  scene.add(obstacle);
  obstacles.push(obstacle);
}

function animate() {
  requestAnimationFrame(animate);
  if (gameOver) return;

  const delta = clock.getDelta();

  // Move player
  if (moveLeft) player.position.x = Math.max(player.position.x - 0.2, -laneWidth);
  if (moveRight) player.position.x = Math.min(player.position.x + 0.2, laneWidth);

  // Move obstacles
  for (let i = 0; i < obstacles.length; i++) {
    const o = obstacles[i];
    o.position.z += obstacleSpeed;

    // Collision detection
    if (
      Math.abs(o.position.z - player.position.z) < 0.5 &&
      Math.abs(o.position.x - player.position.x) < 1
    ) {
      gameOver = true;
      document.getElementById("overlay").innerText = `Game Over! Final Score: ${score}`;
      return;
    }

    // Recycle obstacle
    if (o.position.z > 10) {
      o.position.z = -30;
      o.position.x = (Math.floor(Math.random() * 3) - 1) * laneWidth;
      score++;
      document.getElementById("overlay").innerText = `Score: ${score}`;
    }
  }

  renderer.render(scene, camera);
}
