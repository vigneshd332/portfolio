import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Player } from "./objects";
import { loadEvents, loadSceneAssets } from "./loaders";

const MAP_SIZE = 150000;

let container: Element,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  water: Water,
  rendered: boolean = false,
  updatables: Updatable[] = [];

export default async function init(setLoaded: (loaded: boolean) => void) {
  container = document.getElementById("world") as Element;

  if (!container || rendered) return;
  rendered = true;

  renderer = new THREE.WebGLRenderer({ precision: "lowp", antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.CineonToneMapping;
  container.appendChild(renderer.domElement);

  THREE.DefaultLoadingManager.onProgress = function (_item, loaded, _) {
    const progressBar = document.getElementById("LoaderText") as Element;
    progressBar.innerHTML = `${loaded} / 71 objects loaded...`;
    if (loaded === 71) setLoaded(true);
  };

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    40000
  );

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.minDistance = 40.0;
  controls.maxDistance = 150.0;
  controls.update();

  const player = new Player(scene, camera, controls);

  // Water

  const waterGeometry = new THREE.PlaneGeometry(MAP_SIZE, MAP_SIZE);

  water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load(
      "textures/waternormals.webp",
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
  const sun = new THREE.Vector3();
  const sky = new Sky();
  sky.scale.setScalar(MAP_SIZE);
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
  updatables.push(player);

  // Events
  loadEvents(scene, camera, renderer, player);

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
