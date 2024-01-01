import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class FontInteractive {
  mesh: InteractableMesh<TextGeometry, THREE.MeshBasicMaterial>;
  constructor(
    scene: THREE.Scene,
    font: Font,
    text: string,
    _position: THREE.Vector3,
    _rotation: THREE.Vector3,
    onClick: () => void
  ) {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 200,
      height: 20,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 5,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.name = "text-" + text;
    textMesh.position.set(_position.x, _position.y, _position.z);
    textMesh.rotation.set(_rotation.x, _rotation.y, _rotation.z);
    textMesh.castShadow = true;
    this.mesh = textMesh as InteractableMesh<
      TextGeometry,
      THREE.MeshBasicMaterial
    >;
    this.mesh.onHover = function (): void {
      this.material.color.setHex(0x000000);
    };
    this.mesh.offHover = function (): void {
      this.material.color.setHex(0xffffff);
    };
    this.mesh.onClick = onClick;
    scene.add(textMesh);
  }
}
