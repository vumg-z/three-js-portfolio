import * as THREE from 'three';
import PropulsionSimulator from './Propulsion.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Position the camera
camera.position.z = 0;
camera.position.y = -10;
camera.lookAt(new THREE.Vector3(0, 1000, 0));

const propulsionZone = new THREE.Object3D(); // Example propulsionZone object, you can replace it with your own

const propulsionSimulator = new PropulsionSimulator(scene, propulsionZone, renderer, camera); // Create an instance of PropulsionSimulator

// Find the buttons
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');

// Add event listeners to the buttons
startButton.addEventListener('click', () => {
    propulsionSimulator.start();
});

stopButton.addEventListener('click', () => {
    propulsionSimulator.stop();
});
