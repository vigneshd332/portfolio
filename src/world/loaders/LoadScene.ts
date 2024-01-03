import * as THREE from "three";
import { loadFont } from "./FontLoader";
import {
  loadGithubModel,
  loadTwitterModel,
  loadLinkedinModel,
} from "./IconLoader";
import loadPlatform1Model from "./Platform1Loader";
import loadShipModel from "./ShipLoader";
import loadXQ6Model from "./XQ6Loader";
import FontInteractive from "../objects/FontInteractive";
import Platform from "../objects/Platform";
import Ship from "../objects/Ship";
import XQ6Platform from "../objects/XQ6Platform";

export default async function loadSceneAssets(
  scene: THREE.Scene
): Promise<Updatable[]> {
  // Ship Models
  const updateables: Updatable[] = [];

  const xq6PlatformModel = await loadXQ6Model();
  new XQ6Platform(scene, xq6PlatformModel, new THREE.Vector3(0, 100, 1000));

  const kirovModel = await loadShipModel("models/kirov/model.glb");
  new Ship(
    scene,
    kirovModel,
    new THREE.Vector3(-300, 0, 5700),
    new THREE.Vector3(800, 800, 800),
    new THREE.Vector3(0, Math.PI / 2, 0)
  );

  const shtormModel = await loadShipModel("models/shtorm/scene.gltf");
  new Ship(
    scene,
    shtormModel,
    new THREE.Vector3(4900, 130, -1000),
    new THREE.Vector3(0.9, 0.9, 0.9),
    new THREE.Vector3(0, Math.PI / 3 - 0.5, 0)
  );

  const akulaModel = await loadShipModel("models/akula/model.glb");
  new Ship(
    scene,
    akulaModel,
    new THREE.Vector3(-4000, 10, -1500),
    new THREE.Vector3(60, 60, 60),
    new THREE.Vector3(0, -Math.PI / 3 + 0.55, 0)
  );

  const platform1Model: THREE.Group = await loadPlatform1Model();

  // 3D Text

  const font = await loadFont();
  new FontInteractive(
    scene,
    font,
    "PROJECTS",
    new THREE.Vector3(4900, 400, -2500),
    new THREE.Vector3(0, Math.PI / 3 - 2.5, 0),
    () => {
      window.location.href = "/about#projects";
    }
  );

  new FontInteractive(
    scene,
    font,
    "EXPERIENCE",
    new THREE.Vector3(300, 500, 5700),
    new THREE.Vector3(0, Math.PI, 0),
    () => {
      window.location.href = "/about#experience";
    }
  );

  new FontInteractive(
    scene,
    font,
    "ABOUT",
    new THREE.Vector3(300, 1500, 1000),
    new THREE.Vector3(0, Math.PI, 0),
    () => {
      window.location.href = "/about";
    }
  );

  new FontInteractive(
    scene,
    font,
    "RESUME",
    new THREE.Vector3(-3500, 200, -1500),
    new THREE.Vector3(0, Math.PI, 0),
    () => {
      window.open("/resume.pdf", "_blank");
    }
  );

  // Social Icons
  const githubModel = await loadGithubModel();
  const twitterModel = await loadTwitterModel();
  const linkedinModel = await loadLinkedinModel();
  updateables.push(
    new Platform(
      scene,
      platform1Model,
      new THREE.Vector3(0, 69, -2000),
      githubModel,
      "github"
    )
  );
  updateables.push(
    new Platform(
      scene,
      platform1Model,
      new THREE.Vector3(-500, 69, -2000),
      twitterModel,
      "twitter"
    )
  );
  updateables.push(
    new Platform(
      scene,
      platform1Model,
      new THREE.Vector3(-1000, 69, -2000),
      linkedinModel,
      "linkedin"
    )
  );

  return new Promise((resolve) => {
    resolve(updateables);
  });
}
