import './style.css'
import * as THREE from 'three'
import { EventDispatcher, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cursor
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BufferGeometry()

// number of triangles
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = Math.random() - 0.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)

// const positionsArray = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0
// ])

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
})

// Cube
const mesh = new THREE.Mesh(
    geometry,
    material
);
scene.add(mesh)

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)

  // Update pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 1
// controls.update()
controls.enableDamping = true

// // Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime()  

  // Update objects
  // mesh.rotation.y = elapsedTime

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick)
}

tick()
