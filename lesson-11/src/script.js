import './style.css'
import * as THREE from 'three'
import { EventDispatcher, LineLoop, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => { console.log('onStart') }
// loadingManager.onLoad = () => { console.log('onLoad') }
// loadingManager.onProgress = () => { console.log('onProgress') }
// loadingManager.onError = () => { console.log('onError') }
const textureLoader = new THREE.TextureLoader()
// const colorTexture = textureLoader.load('door/color.jpg')
const colorTexture = textureLoader.load('minecraft.png')
// const alphaTexture = textureLoader.load('door/alpha.jpg')
// const heightTexture = textureLoader.load('door/height.jpg')
// const normalTexture = textureLoader.load('door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('door/metalness.jpg')
// const roughtnessTexture = textureLoader.load('door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Debug
const gui = new dat.GUI({
  closed: true,
  width: 400
})

const parameters = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + 10,
      duration: 1
    })
  }
}

gui
  .addColor(parameters, 'color')
  .onChange(() => {
    mesh.material.color.set(parameters.color)
  })

gui
  .add(parameters, 'spin')

// Cursor
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

// Debug
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Red cube elevation')
gui
  .add(mesh, 'visible')
gui
  .add(mesh.material, 'wireframe')

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
