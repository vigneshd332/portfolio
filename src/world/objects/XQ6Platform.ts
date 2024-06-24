import * as THREE from "three";

export class XQ6Platform {
  platform: THREE.Group;

  constructor(
    scene: THREE.Scene,
    platformModel: THREE.Group,
    _position: THREE.Vector3
  ) {
    const model = platformModel.clone();
    scene.add(model);
    model.position.set(
      _position.x,
      _position.y + Math.random() * 1,
      _position.z
    );
    model.scale.set(8, 8, 8);
    model.rotation.set(0, Math.PI + 1, 0);
    model.traverse((child) => {
      child.name = "radar-platform-" + child.name;
    });

    this.platform = model;
  }

  update() {
    if (!this.platform) return;
  }
}
