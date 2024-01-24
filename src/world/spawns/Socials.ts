import * as THREE from "three";
import {
  loadGithubModel,
  loadLinkedinModel,
  loadPlatform1Model,
  loadTwitterModel,
} from "../loaders";

export async function getSocialSpawns(): Promise<SocialSpawn[]> {
  const githubModel = await loadGithubModel();
  const twitterModel = await loadTwitterModel();
  const linkedinModel = await loadLinkedinModel();
  const platform1Model: THREE.Group = await loadPlatform1Model();

  return [
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(0, 69, -2000),
      socialModel: githubModel,
      iconName: "github",
    },
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(-500, 69, -2000),
      socialModel: twitterModel,
      iconName: "twitter",
    },
    {
      platformModel: platform1Model,
      position: new THREE.Vector3(-1000, 69, -2000),
      socialModel: linkedinModel,
      iconName: "linkedin",
    },
  ];
}
