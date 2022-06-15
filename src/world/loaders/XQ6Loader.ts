import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default async function loadXQ6Model(): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load("models/star_wars_xq6_platform/xq6.gltf", (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
