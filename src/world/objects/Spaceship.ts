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
  bobStep: number;

  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    const loader = new GLTFLoader();
    loader.load("models/spaceship/spaceship.gltf", (gltf: GLTF) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(-1350, 90, -3580);
      gltf.scene.scale.set(0.008, 0.008, 0.008);
      gltf.scene.rotation.set(0, 0, 0);

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
    this.bobStep = 0;
  }

  update() {
    if (!this.spaceship) return;

    // Spaceship bobbing movement
    if (this.bobUp) {
      this.spaceship.translateY(0.03);
      this.bobStep++;
      if (this.bobStep > 30) this.bobUp = false;
    } else {
      this.spaceship.translateY(-0.03);
      this.bobStep--;
      if (this.bobStep < -30) this.bobUp = true;
    }

    // Movement and Rotation
    this.spaceship.translateX(this.velocity.translation.x);
    if (
      !(this.spaceship.position.y < 5 && this.velocity.translation.y < 0) &&
      !(this.spaceship.position.y > 2000 && this.velocity.translation.y > 0)
    )
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
