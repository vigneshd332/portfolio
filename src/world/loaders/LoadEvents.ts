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
    switch (e.key) {
      case "w":
      case "ArrowUp":
        if (player.velocity.translation.z < player.maxVelocity)
          player.velocity.translation.z += 0.5;
        break;
      case "s":
      case "ArrowDown":
        if (player.velocity.translation.z > 0)
          player.velocity.translation.z -= 0.5;
        break;
      case "a":
      case "ArrowLeft":
        if (player.velocity.rotation.y < player.maxRotationVelocityYaw)
          player.velocity.rotation.y += 0.02;
        if (player.velocity.rotation.z > -player.maxRotationRoll)
          player.velocity.rotation.z -= 0.03;
        break;
      case "d":
      case "ArrowRight":
        if (player.velocity.rotation.y > -player.maxRotationVelocityYaw)
          player.velocity.rotation.y -= 0.02;
        if (player.velocity.rotation.z < player.maxRotationRoll)
          player.velocity.rotation.z += 0.03;
        break;
      case "r":
        player.velocity.translation.y = 10;
        // if (player.velocity.rotation.x > -player.maxRotationPitch)
        //   player.velocity.rotation.x -= 0.03;
        break;
      case "f":
        player.velocity.translation.y = -10;
        // if (player.velocity.rotation.x < player.maxRotationPitch)
        //   player.velocity.rotation.x += 0.03;
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "a":
      case "ArrowLeft":
      case "ArrowRight":
      case "d":
        player.turnRestoreStatus.yaw = true;
        player.turnRestoreStatus.roll = true;
        break;
      case "r":
      case "f":
        player.velocity.translation.y = 0;
        //player.turnRestoreStatus.pitch = true;
        break;
    }
  });

  const raycaster = new THREE.Raycaster();
  // Interests to check for intersection for effects like hover etc
  const intersectIntersts = ["text", "icon", "ship", "aircraft"];

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
