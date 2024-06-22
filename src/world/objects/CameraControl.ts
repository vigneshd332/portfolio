import { PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class CameraControl {
  camera: PerspectiveCamera;
  controls: OrbitControls;

  constructor(camera: PerspectiveCamera, controls: OrbitControls) {
    this.camera = camera;
    this.controls = controls;
  }

  update(position: Vector3) {
    const cameraPosition = position.clone();
    this.controls.target = cameraPosition.add(new Vector3(0, 60, 0));
    this.controls.update();
  }
}
