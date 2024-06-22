import * as THREE from "three";
import {
  getMouseVector2,
  checkRayIntersections,
  getObjectsByName,
} from "../helpers";
import { Player } from "../objects";

function onWindowResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

export function loadEvents(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  player: Player
) {
  window.addEventListener("resize", () => {
    onWindowResize(camera, renderer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp")
      player.velocity.translation.z = 20;
    if (e.key === "s" || e.key === "ArrowDown")
      player.velocity.translation.z = -20;
    if (e.key === "a" || e.key === "ArrowLeft")
      player.velocity.rotation.y = 0.02;
    if (e.key === "d" || e.key === "ArrowRight")
      player.velocity.rotation.y = -0.02;
    if (e.key === "r") player.velocity.translation.y = 10;
    if (e.key === "f") player.velocity.translation.y = -10;
  });

  window.addEventListener("keyup", (e) => {
    if (
      e.key === "w" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "s"
    )
      player.velocity.translation.z = 0;
    if (
      e.key === "a" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "d"
    )
      player.velocity.rotation.y = 0;
    if (e.key === "r" || e.key === "f") player.velocity.translation.y = 0;
  });

  const raycaster = new THREE.Raycaster();
  const intersectIntersts = ["text", "icon", "ship", "aircraft"]; // Interests to check for intersection for effects like hover etc

  window.addEventListener("mousemove", onMouseMove, false);

  let hoveredObject: InteractableMesh<
    THREE.BufferGeometry,
    THREE.Material
  > | null = null;

  function onMouseMove(event: MouseEvent) {
    const mousePointer = getMouseVector2(event, window);

    const intersections = checkRayIntersections(
      mousePointer,
      camera,
      raycaster,
      scene,
      intersectIntersts,
      true
    );

    const objectList = getObjectsByName(
      intersections,
      intersectIntersts
    ) as InteractableMesh<THREE.BufferGeometry, THREE.Material>[];
    if (hoveredObject && hoveredObject !== objectList[0]) {
      hoveredObject.offHover();
      hoveredObject = null;
    }
    if (!objectList.length) return;
    hoveredObject = objectList[0];
    hoveredObject.onHover();
  }

  window.addEventListener("click", (event: MouseEvent) => {
    const mousePointer = getMouseVector2(event, window);

    const intersections = checkRayIntersections(
      mousePointer,
      camera,
      raycaster,
      scene,
      intersectIntersts,
      true
    );

    const objectList = getObjectsByName(
      intersections,
      intersectIntersts
    ) as InteractableMesh<THREE.BufferGeometry, THREE.Material>[];
    if (!objectList.length) return;
    const clickedObject = objectList[0];
    clickedObject.onClick();
  });
}
