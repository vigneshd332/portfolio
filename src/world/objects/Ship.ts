import * as THREE from "three";

export class Ship {
  platform: THREE.Group;

  constructor(
    scene: THREE.Scene,
    shipModel: THREE.Group,
    _position: THREE.Vector3,
    _scale: THREE.Vector3,
    _rotation: THREE.Vector3,
    name: string
  ) {
    const model = shipModel.clone();
    scene.add(model);
    model.position.set(_position.x, _position.y, _position.z);
    model.scale.set(_scale.x, _scale.y, _scale.z);
    model.rotation.set(_rotation.x, _rotation.y, _rotation.z);
    model.traverse((child) => {
      const interactableChild = child as InteractableMesh<
        THREE.BufferGeometry,
        THREE.MeshBasicMaterial
      >;
      interactableChild.name =
        "radar-ship-" + name + "-" + interactableChild.name;
      interactableChild.onHover = () => {};
      interactableChild.offHover = () => {};
      interactableChild.onClick = () => {};
    });

    this.platform = model;
  }
}
