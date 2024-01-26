import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadFlankerModel(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/flanker/scene.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}

export async function loadF35Model(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/f35/f-35.glb", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
