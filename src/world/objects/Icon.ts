import * as THREE from "three";

export interface OffsetMap {
  [details: string]: {
    scale: THREE.Vector3;
    position: THREE.Vector3;
    onClick: () => void;
  };
}

const offsets: OffsetMap = {
  github: {
    scale: new THREE.Vector3(0.5, 0.5, 0.5),
    position: new THREE.Vector3(0, 15, 0),
    onClick: () => {
      window.open("https://github.com/vigneshd332", "_blank");
    },
  },
  twitter: {
    scale: new THREE.Vector3(40, 40, 40),
    position: new THREE.Vector3(0, 135, 20),
    onClick() {
      window.open("https://twitter.com/HBM2E", "_blank");
    },
  },
  linkedin: {
    scale: new THREE.Vector3(50, 50, 50),
    position: new THREE.Vector3(0, -20, 0),
    onClick() {
      window.open("https://www.linkedin.com/in/vduraisamy", "_blank");
    },
  },
};

export class Icon {
  icon: THREE.Group;
  iconName: string;
  rotationHandle?: NodeJS.Timeout;

  constructor(
    scene: THREE.Scene,
    iconModel: THREE.Group,
    _position: THREE.Vector3,
    _iconName: string
  ) {
    const model = iconModel.clone();
    model.name = "icon-" + _iconName;
    const offset = offsets[_iconName];
    model.position.set(
      _position.x + offset.position.x,
      _position.y + offset.position.y,
      _position.z + offset.position.z
    );
    model.scale.set(offset.scale.x, offset.scale.y, offset.scale.z);
    model.traverse((child) => {
      const interactableChild = child as InteractableMesh<
        THREE.BufferGeometry,
        THREE.MeshBasicMaterial
      >;
      interactableChild.name = "icon-" + _iconName;
      interactableChild.onHover = () => {
        if (!this.rotationHandle)
          this.rotationHandle = this.rotationHandle = setInterval(
            () => this.rotate(),
            10
          );
      };
      interactableChild.offHover = () => this.reset();
      interactableChild.onClick = offset.onClick;
    });
    this.icon = model;
    this.iconName = _iconName;

    scene.add(model);
  }

  rotate() {
    this.icon.rotateY(0.01);
  }

  reset() {
    clearInterval(this.rotationHandle);
    this.rotationHandle = undefined;
    this.icon.rotation.set(0, 0, 0);
  }
}
