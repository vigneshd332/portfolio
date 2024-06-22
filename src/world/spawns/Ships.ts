import * as THREE from "three";
import { loadModel } from "../loaders";

export async function getFriendlyShipSpawns(): Promise<FriendlyShipSpawn[]> {
  const kirovModel = await loadModel("models/kirov/model.glb");
  const shtormModel = await loadModel("models/shtorm/model.glb");
  const akulaModel = await loadModel("models/akula/model.glb");
  const burkeModel = await loadModel("models/burke/model.glb");

  return [
    {
      model: kirovModel,
      position: new THREE.Vector3(-300, 0, 5700),
      scale: new THREE.Vector3(1000, 1000, 1000),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
      name: "kirov",
    },
    {
      model: shtormModel,
      position: new THREE.Vector3(4900, 130, -1000),
      scale: new THREE.Vector3(0.9, 0.9, 0.9),
      rotation: new THREE.Vector3(0, Math.PI / 3 - 0.5, 0),
      name: "shtorm",
    },
    {
      model: akulaModel,
      position: new THREE.Vector3(-4000, 10, -1500),
      scale: new THREE.Vector3(60, 60, 60),
      rotation: new THREE.Vector3(0, -Math.PI / 3 + 0.55, 0),
      name: "akula",
    },
    {
      model: burkeModel,
      position: new THREE.Vector3(-7000, 0, 6000),
      scale: new THREE.Vector3(12, 12, 12),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
      name: "burke",
    },
    {
      model: burkeModel,
      position: new THREE.Vector3(9000, 0, 3000),
      scale: new THREE.Vector3(12, 12, 12),
      rotation: new THREE.Vector3(0, -Math.PI / 3, 0),
      name: "burke",
    },
    {
      model: burkeModel,
      position: new THREE.Vector3(1000, 0, 9000),
      scale: new THREE.Vector3(12, 12, 12),
      rotation: new THREE.Vector3(0, -Math.PI / 4, 0),
      name: "burke",
    },
  ];
}
