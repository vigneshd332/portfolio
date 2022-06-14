import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import CameraControl from "./CameraControl";

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
  cameraControl!: CameraControl;
  controls: OrbitControls;
  bobUp: boolean;

  constructor(
    scene: THREE.Scene,
    loader: GLTFLoader,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    loader.load("models/spaceship/spaceship.gltf", (gltf: GLTF) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 3, 0);
      gltf.scene.scale.set(0.0065, 0.0065, 0.0065);
      gltf.scene.rotation.set(0, Math.PI, 0);

      this.spaceship = gltf.scene;
      this.cameraControl = new CameraControl(camera);
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

    this.controls = controls;
    this.bobUp = true;
  }

  update() {
    if (!this.spaceship) return;

    // Spaceship bobbing movement
    if (this.bobUp) {
      this.spaceship.translateY(0.02);
      if (this.spaceship.position.y >= 3.5) this.bobUp = false;
    } else {
      this.spaceship.translateY(-0.02);
      if (this.spaceship.position.y <= 2.5) this.bobUp = true;
    }

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

    this.cameraControl.update(this.controls, this.spaceship.position);
  }
}
