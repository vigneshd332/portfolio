import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface spaceshipVelocity {
  translation: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

export default class Spaceship {
  spaceship!: THREE.Group;
  velocity!: spaceshipVelocity;

  constructor(scene: THREE.Scene, loader: GLTFLoader) {
    loader.load("models/spaceship/spaceship.gltf", (gltf: GLTF) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 3, 0);
      gltf.scene.scale.set(0.0065, 0.0065, 0.0065);
      gltf.scene.rotation.set(0, Math.PI, 0);

      this.spaceship = gltf.scene;
      this.velocity = {
        translation: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
      };
    });
  }

  update() {
    if (!this.spaceship) return;
  }
}
