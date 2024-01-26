import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Spaceship } from "./objects";
import { loadEvents, loadSceneAssets } from "./loaders";

let container: Element,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  spaceship: Spaceship,
  water: Water,
  sun: THREE.Vector3,
  rendered: boolean = false,
  updatables: Updatable[] = [];

export default async function init(setLoaded: (loaded: boolean) => void) {
  container = document.getElementById("world") as Element;

  if (!container || rendered) return;
  rendered = true;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  THREE.DefaultLoadingManager.onProgress = function (_item, loaded, _) {
    const progressBar = document.getElementById("LoaderText") as Element;
    progressBar.innerHTML = `${loaded} / 57 objects loaded...`;
    if (loaded === 57) setLoaded(true);
  };

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    40000
  );

  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.minDistance = 40.0;
  controls.maxDistance = 150.0;
  controls.update();

  spaceship = new Spaceship(scene, camera, controls);

  // Water

  const waterGeometry = new THREE.PlaneGeometry(60000, 60000);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "textures/waternormals.jpg",
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
  sun = new THREE.Vector3();
  const sky = new Sky();
  sky.scale.setScalar(60000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;
  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;

  const parameters = {
    elevation: 8,
    azimuth: 40,
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
  const theta = THREE.MathUtils.degToRad(parameters.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();

  // @ts-ignore-next-line
  scene.environment = pmremGenerator.fromScene(sky).texture;

  // Assets
  updatables = await loadSceneAssets(scene);
  updatables.push(spaceship);

  // Events
  loadEvents(scene, camera, renderer, spaceship);

  // Animate
  animate();
}

function animate() {
  updatables.forEach((updatable) => updatable.update());
  render();

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / 90); // 90 fps limiter
}

function render() {
  water.material.uniforms["time"].value += 1.0 / 60.0;
  renderer.render(scene, camera);
}
