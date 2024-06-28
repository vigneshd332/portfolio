import * as THREE from "three";
import { loadModel } from "../loaders";

export async function getSocialSpawns(): Promise<SocialSpawn[]> {
  const githubModel = await loadModel("models/icons/github.glb");
  const twitterModel = await loadModel("models/icons/twitter.glb");
  const linkedinModel = await loadModel("models/icons/linkedin.glb");
  const platform1Model = await loadModel("models/floating_platform/model.glb");

  return [
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(0, 69, -2000),
      socialModel: githubModel,
      iconName: "GitHub",
    },
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(-500, 69, -2000),
      socialModel: twitterModel,
      iconName: "Twitter",
    },
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(-1000, 69, -2000),
      socialModel: linkedinModel,
      iconName: "LinkedIn",
    },
  ];
}
