import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { waternormals } from "./textures/waternormals";
import Spaceship from "./objects/Spaceship";

let container: Element;
let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;
export let controls: OrbitControls;
let spaceship: Spaceship, water: Water, sun: THREE.Vector3;
let rendered: boolean = false;

const loader = new GLTFLoader();

export default function init() {
  container = document.getElementsByClassName("App")[0];
  if (!container || rendered) return;
  rendered = true;
  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  //

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(90, 60, 40);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.minDistance = 40.0;
  controls.maxDistance = 120.0;
  controls.update();

  spaceship = new Spaceship(scene, loader, camera, controls);

  sun = new THREE.Vector3();

  // Water

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      waternormals,
      function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined,
  });

  water.rotation.x = -Math.PI / 2;

  scene.add(water);

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;

  const parameters = {
    elevation: 2,
    azimuth: 180,
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  function updateSun() {
    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms["sunPosition"].value.copy(sun);
    water.material.uniforms["sunDirection"].value.copy(sun).normalize();

    //@ts-ignore
    scene.environment = pmremGenerator.fromScene(sky).texture;
  }

  updateSun();

  //

  window.addEventListener("resize", onWindowResize);

  // Controls

  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp")
      spaceship.velocity.translation.z = 3;
    if (e.key === "s" || e.key === "ArrowDown")
      spaceship.velocity.translation.z = -3;
    if (e.key === "a" || e.key === "ArrowLeft")
      spaceship.velocity.rotation.y = 0.03;
    if (e.key === "d" || e.key === "ArrowRight")
      spaceship.velocity.rotation.y = -0.03;
  });

  window.addEventListener("keyup", (e) => {
    if (
      e.key === "w" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "s"
    )
      spaceship.velocity.translation.z = 0;
    if (
      e.key === "a" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "d"
    )
      spaceship.velocity.rotation.y = 0;
  });

  //

  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  spaceship.update();
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / 60); // 60 fps limiter
  render();
}

function render() {
  water.material.uniforms["time"].value += 1.0 / 60.0;

  renderer.render(scene, camera);
}
