import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadTwitterModel(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/icons/twitter.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
export async function loadGithubModel(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/icons/github.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}

export async function loadLinkedinModel(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/icons/linkedin.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
