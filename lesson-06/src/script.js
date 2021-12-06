import './style.css'
import * as THREE from 'three'
import { EventDispatcher, Mesh } from 'three';
import gsap from 'gsap'

console.log('Hello Three.js Journey')
console.log(THREE)

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

// Cube
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Sizes
const sizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// // Clock
// const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Animations
const tick = () => {
  // Clock
  // const elapsedTime = clock.getElapsedTime()  

  // Update objects
//   camera.position.y = Math.sin(elapsedTime)
//   camera.position.x = Math.cos(elapsedTime)
//   camera.lookAt(mesh.position)

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick)
}

tick()
