import './style.css'

import * as THREE from 'three';

//? We import controls for mouse movement
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 )
const material = new THREE.MeshStandardMaterial( {color: 0x5f7185 } );
const torus = new THREE.Mesh( geometry, material)

scene.add(torus)

//? Positions the light source
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(-10, 0, 30)

//? Produces light in all directions
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight)

//? Helps show where the light is coming from
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

//? Defines mouse controls
// const controls = new OrbitControls(camera, renderer.domElement);

//? Adding little white stars randomly throughout the map
function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) )

  star.position.set(x, y, z)
  scene.add(star)
}

//? Number of stars we want to add to the map
const numberOfStars = 200;
Array(numberOfStars).fill().forEach(addStars)


const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
scene.background = spaceTexture

const ollyPFP = new THREE.TextureLoader().load('assets/Avatar_ghostrobe5_320x320px.png')

//? Avatar / profile picture
const olly = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: ollyPFP })
)

scene.add(olly)

// Planet
const saturnTexture = new THREE.TextureLoader().load('assets/saturn.png')

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: saturnTexture,
    normalMap: saturnTexture
  }))
saturn.add(ambientLight)
scene.add(saturn)

saturn.position.z = 30;
saturn.position.setX(-10)

olly.position.z = -5;
olly.position.x = 2

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // saturn.rotation.x += 0.05
  // saturn.rotation.y += 0.015;
  // saturn.rotation.z += 0.05

  olly.rotation.y += 0.03;
  olly.rotation.z += 0.03;

  camera.position.z = t * -0.011;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.00055;
}

document.body.onscroll = moveCamera;
moveCamera()

function animate() {
  requestAnimationFrame( animate )

  torus.rotation.x += 0.02;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  saturn.rotation.x += 0.005;

  // Updates mouse movement so that it functions
  // controls.update

  renderer.render( scene, camera ) 
}

animate()
