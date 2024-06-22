import * as THREE from "three";
import {
  getFontSpawns,
  getFriendlyCarrierAircraftSpawns,
  getFriendlyShipSpawns,
  getSocialSpawns,
} from "../spawns";
import { Aircraft } from "../objects/Aircraft";
import { XQ6Platform, Ship, FontInteractive, Platform } from "../objects";
import { loadModel } from "./ModelLoader";

export async function loadSceneAssets(
  scene: THREE.Scene
): Promise<Updatable[]> {
  const updateables: Updatable[] = [];

  const xq6PlatformModel = await loadModel("models/xq6_platform/model.glb");
  new XQ6Platform(scene, xq6PlatformModel, new THREE.Vector3(0, 100, 1000));

  // Friendly Ships
  const friendlyShipSpawns = await getFriendlyShipSpawns();
  friendlyShipSpawns.forEach((spawn) => {
    new Ship(
      scene,
      spawn.model,
      spawn.position,
      spawn.scale,
      spawn.rotation,
      spawn.name
    );
  });

  // 3D Text
  const fontSpawns = await getFontSpawns();
  fontSpawns.forEach((spawn) => {
    new FontInteractive(
      scene,
      spawn.font,
      spawn.text,
      spawn.position,
      spawn.rotation,
      spawn.onClick
    );
  });

  // Aircraft
  const friendlyCarrierAircraft = await getFriendlyCarrierAircraftSpawns();
  friendlyCarrierAircraft.forEach((spawn) => {
    updateables.push(
      new Aircraft(
        scene,
        spawn.model,
        spawn.position,
        spawn.scale,
        spawn.rotation,
        spawn.final_takeoff_offset,
        spawn.launch_delay,
        spawn.vtol,
        spawn.post_takeoff_action,
        spawn.pre_takeoff_action,
        spawn.name
      )
    );
  });

  // Social Icons
  const socialSpawns = await getSocialSpawns();
  socialSpawns.forEach((spawn) => {
    updateables.push(
      new Platform(
        scene,
        spawn.platformModel,
        spawn.position,
        spawn.socialModel,
        spawn.iconName
      )
    );
  });

  return updateables;
}
