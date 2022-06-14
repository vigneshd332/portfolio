import { PerspectiveCamera, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class CameraControl {
  _camera: PerspectiveCamera;

  constructor(camera: PerspectiveCamera) {
    this._camera = camera;
  }

  update(controls: OrbitControls, position: Vector3) {
    if (!this._camera) return;
    const cameraPosition = position.clone();
    controls.target = cameraPosition.add(new Vector3(0, 40, 0));
    controls.update();
  }
}
