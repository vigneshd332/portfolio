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

interface TurnRestoreStatus {
  pitch: boolean;
  yaw: boolean;
  roll: boolean;
}

export class Player {
  player!: THREE.Group;
  velocity!: playerVelocity;
  cameraControl!: CameraControl;
  controls: OrbitControls;
  turnRestoreStatus: TurnRestoreStatus = {
    pitch: false,
    yaw: false,
    roll: false,
  };
  maxVelocity: number = 20;
  maxRotationVelocityYaw: number = 0.02;
  maxRotationRoll: number = 0.4;
  currentRoll: number = 0;
  currentYaw: number = 0;

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
      this.cameraControl = new CameraControl(camera, controls);
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
  }

  update() {
    if (!this.player) return;

    // Movement and Rotation
    this.player.translateX(this.velocity.translation.x);
    if (
      !(this.player.position.y < 50 && this.velocity.translation.y < 0) &&
      !(this.player.position.y > 4000 && this.velocity.translation.y > 0)
    )
      this.player.translateY(this.velocity.translation.y);

    this.player.translateZ(this.velocity.translation.z);
    this.player.rotateX(this.velocity.rotation.x);
    this.player.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      this.velocity.rotation.y
    );

    this.currentRoll += this.velocity.rotation.z;
    this.currentRoll =
      this.currentRoll > this.maxRotationRoll
        ? this.maxRotationRoll
        : this.currentRoll;
    this.currentRoll =
      this.currentRoll < -this.maxRotationRoll
        ? -this.maxRotationRoll
        : this.currentRoll;
    this.player.rotation.z = this.currentRoll;

    // These fixes are needed because THREE.js inverts the axes beyong -90 and 90 degrees of rotations on the world axis
    this.currentYaw += this.velocity.rotation.y;
    const directionIdentifier = this.currentYaw % (2 * Math.PI);
    if (
      ((3 * Math.PI) / 2 > directionIdentifier &&
        directionIdentifier > Math.PI / 2) ||
      (directionIdentifier > (-3 * Math.PI) / 2 &&
        directionIdentifier < -Math.PI / 2)
    ) {
      this.player.rotation.z += Math.PI;
    }

    this.restoreTurnDefaults();
    this.cameraControl.update(this.player.position);
  }

  restoreTurnDefaults() {
    if (this.turnRestoreStatus.pitch) {
      // TODO: Implement pitch restoration
    }
    if (this.turnRestoreStatus.yaw) {
      if (this.velocity.rotation.y > 0)
        this.velocity.rotation.y = Math.round(this.velocity.rotation.y - 0.002);
      else if (this.velocity.rotation.y < 0)
        this.velocity.rotation.y = Math.round(this.velocity.rotation.y + 0.002);
      else this.turnRestoreStatus.yaw = false;
    }
    if (this.turnRestoreStatus.roll) {
      this.velocity.rotation.z = 0;
      if (this.currentRoll > 0)
        if (this.currentRoll < 0.02) {
          this.player.rotation.z -= this.currentRoll;
          this.currentRoll = 0;
        } else this.currentRoll = this.currentRoll - 0.02;
      else if (this.currentRoll < 0)
        if (this.currentRoll > -0.02) {
          this.player.rotation.z -= this.currentRoll;
          this.currentRoll = 0;
        } else this.currentRoll = this.currentRoll + 0.02;
      else this.turnRestoreStatus.roll = false;
    }
  }
}
