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

    // Movement and Rotation
    this.spaceship.translateX(this.velocity.translation.x);
    this.spaceship.translateY(this.velocity.translation.y);
    this.spaceship.translateZ(this.velocity.translation.z);
    this.spaceship.rotateX(this.velocity.rotation.x);
    this.spaceship.rotateY(
      this.velocity.translation.z >= 0
        ? this.velocity.rotation.y
        : -this.velocity.rotation.y
    );
    this.spaceship.rotateZ(this.velocity.rotation.z);
  }
}
