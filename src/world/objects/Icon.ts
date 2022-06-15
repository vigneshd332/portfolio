import * as THREE from "three";

export interface OffsetMap {
  [details: string]: {
    scale: THREE.Vector3;
    position: THREE.Vector3;
  };
}

const offsets: OffsetMap = {
  github: {
    scale: new THREE.Vector3(0.5, 0.5, 0.5),
    position: new THREE.Vector3(0, 15, 0),
  },
  twitter: {
    scale: new THREE.Vector3(40, 40, 40),
    position: new THREE.Vector3(0, 135, 20),
  },
  linkedin: {
    scale: new THREE.Vector3(50, 50, 50),
    position: new THREE.Vector3(0, -20, 0),
  },
};

export default class Icon {
  icon: THREE.Group;
  iconName: string;

  constructor(
    scene: THREE.Scene,
    iconModel: THREE.Group,
    _position: THREE.Vector3,
    _iconName: string
  ) {
    const model = iconModel.clone();
    scene.add(model);
    this.icon = model;
    this.iconName = _iconName;
    const offset = offsets[_iconName];

    model.position.set(
      _position.x + offset.position.x,
      _position.y + offset.position.y,
      _position.z + offset.position.z
    );
    model.scale.set(offset.scale.x, offset.scale.y, offset.scale.z);
  }

  update() {
    if (!this.icon) return;
    this.icon.rotateY(0.01);
  }
}
