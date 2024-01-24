import * as THREE from "three";

export class Ship {
  platform: THREE.Group;

  constructor(
    scene: THREE.Scene,
    shipModel: THREE.Group,
    _position: THREE.Vector3,
    _scale: THREE.Vector3,
    _rotation: THREE.Vector3
  ) {
    const model = shipModel.clone();
    scene.add(model);
    model.position.set(_position.x, _position.y, _position.z);
    model.scale.set(_scale.x, _scale.y, _scale.z);
    model.rotation.set(_rotation.x, _rotation.y, _rotation.z);

    this.platform = model;
  }
}
