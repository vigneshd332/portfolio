import * as THREE from "three";
import { loadFont } from "../loaders/FontLoader";

export async function getFontSpawns(): Promise<FontSpawn[]> {
  const font = await loadFont();

  return [
    {
      font: font,
      text: "PROJECTS",
      position: new THREE.Vector3(4900, 400, -2500),

      rotation: new THREE.Vector3(0, Math.PI / 3 - 2.5, 0),
      onClick: () => {
        window.location.href = "/about#projects";
      },
    },
    {
      font: font,
      text: "EXPERIENCE",
      position: new THREE.Vector3(300, 500, 5700),
      rotation: new THREE.Vector3(0, Math.PI, 0),
      onClick: () => {
        window.location.href = "/about#experience";
      },
    },
    {
      font: font,
      text: "ABOUT",
      position: new THREE.Vector3(300, 1500, 1000),
      rotation: new THREE.Vector3(0, Math.PI, 0),
      onClick: () => {
        window.location.href = "/about";
      },
    },
    {
      font: font,
      text: "RESUME",
      position: new THREE.Vector3(-3500, 200, -1500),
      rotation: new THREE.Vector3(0, Math.PI, 0),
      onClick: () => {
        window.open("/resume.pdf", "_blank");
      },
    },
  ];
}
