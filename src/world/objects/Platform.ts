import * as THREE from "three";
import { Icon } from "./Icon";

export class Platform {
  platform: THREE.Group;
  bobUp: boolean;
  bobLeft: boolean;
  bobLeftSteps: number;
  icon?: Icon;
  iconName?: string;

  constructor(
    scene: THREE.Scene,
    platformModel: THREE.Group,
    _position: THREE.Vector3,
    iconModel?: THREE.Group,
    iconName?: string
  ) {
    const model = platformModel.clone();
    scene.add(model);
    model.position.set(
      _position.x,
      _position.y + Math.random() * 1,
      _position.z
    );
    model.scale.set(2.5, 2.5, 2.5);
    model.rotation.set(0, Math.PI, 0);
    model.traverse((child) => {
      child.name = "radar-platform-" + child.name;
    });

    this.platform = model;
    this.icon =
      iconModel && iconName
        ? new Icon(scene, iconModel, _position, iconName)
        : undefined;
    if (iconName) this.iconName = iconName;

    this.bobUp = true;
    this.bobLeft = false;
    this.bobLeftSteps = 0 + Math.random() * 90 - 45;
  }

  update() {
    if (!this.platform) return;

    // Platform up down bobbing movement
    if (this.bobUp) {
      this.platform.translateY(0.015);
      if (this.platform.position.y > 70) this.bobUp = false;
    } else {
      this.platform.translateY(-0.015);
      if (this.platform.position.y < 68) this.bobUp = true;
    }
    // Platform right left bobbing movement
    if (this.bobLeft) {
      this.platform.rotateX(0.0005);
      this.bobLeftSteps++;
      if (this.bobLeftSteps > 90) this.bobLeft = false;
    } else {
      this.platform.rotateX(-0.0005);
      this.bobLeftSteps--;
      if (this.bobLeftSteps < -90) this.bobLeft = true;
    }
  }
}
