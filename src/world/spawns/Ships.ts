import * as THREE from "three";
import { loadShipModel } from "../loaders";

export async function getFriendlyShipSpawns(): Promise<FriendlyShipSpawn[]> {
  const kirovModel = await loadShipModel("models/kirov/model.glb");
  const shtormModel = await loadShipModel("models/shtorm/scene.gltf");
  const akulaModel = await loadShipModel("models/akula/model.glb");

  return [
    {
      model: kirovModel,
      position: new THREE.Vector3(-300, 0, 5700),
      scale: new THREE.Vector3(800, 800, 800),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
    },
    {
      model: shtormModel,
      position: new THREE.Vector3(4900, 130, -1000),
      scale: new THREE.Vector3(0.9, 0.9, 0.9),
      rotation: new THREE.Vector3(0, Math.PI / 3 - 0.5, 0),
    },
    {
      model: akulaModel,
      position: new THREE.Vector3(-4000, 10, -1500),
      scale: new THREE.Vector3(60, 60, 60),
      rotation: new THREE.Vector3(0, -Math.PI / 3 + 0.55, 0),
    },
  ];
}
