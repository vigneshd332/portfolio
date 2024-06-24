import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControl } from "./CameraControl";
import { loadModel } from "../loaders";
import Radar from "../tracking";
import { PI_BY_TWO, RADIANS_TO_DEGREES, TWO_PI } from "../helpers/constants";

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
  radar: Radar;
  turnRestoreStatus: TurnRestoreStatus = {
    pitch: false,
    yaw: false,
    roll: false,
  };
  minHeight: number = 50;
  maxHeight: number = 20000;
  maxVelocity: number = 20;
  maxRotationVelocityYaw: number = 0.02;
  maxRotationRoll: number = 0.4;
  maxRotationPitch: number = 0.4;
  currentRoll: number = 0;
  currentYaw: number = 0;
  currentPitch: number = 0;
  setHUDData: (data: HUDData) => void = () => {};
  preComputedConstants: { [key: string]: number } = {};

  constructor(
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    setHUDData: (data: HUDData) => void
  ) {
    this.setHUDData = setHUDData;

    this.preComputedConstants.VELOCITY_TO_KMPH = 600 / this.maxVelocity;
    const player = loadModel("models/u2/model.glb");
    player.then((model) => {
      scene.add(model);
      model.position.set(-3350, 1200, -7080);
      model.scale.set(5, 5, 5);
      model.rotation.set(0, 0, 0);

      model.traverse((child) => {
        child.name = "player-" + child.name;
      });

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
    this.radar = new Radar(
      scene,
      document.getElementById("radar-canvas") as HTMLCanvasElement,
      this
    );
  }

  private restoreTurnDefaults() {
    if (this.turnRestoreStatus.pitch) {
      // this.velocity.rotation.x = 0;
      // if (this.currentPitch > 0)
      //   if (this.currentPitch < 0.02) {
      //     this.player.rotation.x -= this.currentPitch;
      //     this.currentPitch = 0;
      //   } else this.currentPitch -= 0.02;
      // else if (this.currentPitch < 0)
      //   if (this.currentPitch > -0.02) {
      //     this.player.rotation.x -= this.currentPitch;
      //     this.currentPitch = 0;
      //   } else this.currentPitch += 0.02;
      // else this.turnRestoreStatus.pitch = false;
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
          this.turnRestoreStatus.roll = false;
        } else this.currentRoll -= 0.02;
      else if (this.currentRoll < 0)
        if (this.currentRoll > -0.02) {
          this.player.rotation.z -= this.currentRoll;
          this.currentRoll = 0;
          this.turnRestoreStatus.roll = false;
        } else this.currentRoll += 0.02;
      else this.turnRestoreStatus.roll = false;
    }
  }

  update() {
    if (!this.player) return;

    // Movement
    this.player.translateX(this.velocity.translation.x);
    this.player.translateZ(this.velocity.translation.z);
    if (
      !(
        this.player.position.y < this.minHeight &&
        this.velocity.translation.y < 0
      ) &&
      !(
        this.player.position.y > this.maxHeight &&
        this.velocity.translation.y > 0
      )
    )
      this.player.translateY(this.velocity.translation.y);

    // Rotation Y (Yaw)
    this.player.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      this.velocity.rotation.y
    );

    // Rotation Z (Roll)
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

    // Rotation X (Pitch)
    // this.currentPitch += this.velocity.rotation.x;
    // this.currentPitch =
    //   this.currentPitch > this.maxRotationPitch
    //     ? this.maxRotationPitch
    //     : this.currentPitch;
    // this.currentPitch =
    //   this.currentPitch < -this.maxRotationPitch
    //     ? -this.maxRotationPitch
    //     : this.currentPitch;
    // this.player.rotation.x = this.currentPitch;

    // These fixes are needed because THREE.js inverts the axes beyong -90 and 90 degrees of rotations on the world axis
    this.currentYaw += this.velocity.rotation.y;
    const directionIdentifier = this.currentYaw % TWO_PI;

    if (
      (3 * PI_BY_TWO > directionIdentifier &&
        directionIdentifier > PI_BY_TWO) ||
      (directionIdentifier > -3 * PI_BY_TWO && directionIdentifier < -PI_BY_TWO)
    ) {
      this.player.rotation.z += Math.PI;
    }

    this.restoreTurnDefaults();
    this.cameraControl.update(this.player.position);
    this.radar.update();
    this.setHUDData({
      name: "Lockheed U-2",
      speed: Math.round(
        this.velocity.translation.z * this.preComputedConstants.VELOCITY_TO_KMPH
      ),
      altitude: Math.round(this.player.position.y),
      roll: Math.round(this.currentRoll * RADIANS_TO_DEGREES),
    });
  }
}
