import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControl } from "./CameraControl";
import { loadModel } from "../loaders";

interface playerVelocity {
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

export class Player {
  player!: THREE.Group;
  velocity!: playerVelocity;
  cameraControl!: CameraControl;
  controls: OrbitControls;
  bobUp: boolean;
  bobStep: number;

  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    const player = loadModel("models/u2/model.glb");
    player.then((model) => {
      scene.add(model);
      model.position.set(-3350, 1200, -7080);
      model.scale.set(3, 3, 3);
      model.rotation.set(0, 0, 0);

      this.player = model;
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
    if (!this.player) return;

    // player bobbing movement
    if (this.bobUp) {
      this.player.translateY(0.03);
      this.bobStep++;
      if (this.bobStep > 30) this.bobUp = false;
    } else {
      this.player.translateY(-0.03);
      this.bobStep--;
      if (this.bobStep < -30) this.bobUp = true;
    }

    // Movement and Rotation
    this.player.translateX(this.velocity.translation.x);
    if (
      !(this.player.position.y < 5 && this.velocity.translation.y < 0) &&
      !(this.player.position.y > 4000 && this.velocity.translation.y > 0)
    )
      this.player.translateY(this.velocity.translation.y);
    this.player.translateZ(this.velocity.translation.z);
    this.player.rotateX(this.velocity.rotation.x);
    this.player.rotateY(
      this.velocity.translation.z >= 0
        ? this.velocity.rotation.y
        : -this.velocity.rotation.y
    );
    this.player.rotateZ(this.velocity.rotation.z);

    this.cameraControl.update(this.controls, this.player.position);
  }
}
