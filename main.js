import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer, controls, loader;
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(1, 1, 50);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  loader = new GLTFLoader();

  const bgcol = new THREE.Color(0xababab);
  scene.background = bgcol;
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);
  loader.load('./assets/testenviro.glb', function (gltf) {
    // gltf.scene.scale.set(0.2, 0.2, 0.2);
    var sce = gltf.scene;
    // gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;
    scene.add(gltf.scene);
    // console.log(sce)
  }, undefined, function (error) {

    console.log("an issue occured!");
    console.error(error);

  });

  // const geometry = new THREE.SphereGeometry(1, 32, 16);
  // const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
  // const sphere = new THREE.Mesh(geometry, material);
  // scene.add(sphere)
}
// const tester = new THREE.Mesh(asts, material);
// scene.add(tester);

// camera.position.z = 20;

// renderer.render(scene, camera);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();