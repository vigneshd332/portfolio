import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default async function loadShipModel(
  path: string
): Promise<THREE.Group> {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf: GLTF) => {
      resolve(gltf.scene);
    });
  });
}
