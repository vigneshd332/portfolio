import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export async function loadPlatform1Model(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/floating_platform/platform1.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
