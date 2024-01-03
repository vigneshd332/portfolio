import * as THREE from "three";
import Spaceship from "../objects/Spaceship";
import {
  getMouseVector2,
  checkRayIntersections,
  getObjectsByName,
} from "../helpers/RayCastHelper";

function onWindowResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

export default function loadEvents(
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  spaceship: Spaceship
) {
  window.addEventListener("resize", () => {
    onWindowResize(camera, renderer);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "w" || e.key === "ArrowUp")
      spaceship.velocity.translation.z = 50;
    if (e.key === "s" || e.key === "ArrowDown")
      spaceship.velocity.translation.z = -50;
    if (e.key === "a" || e.key === "ArrowLeft")
      spaceship.velocity.rotation.y = 0.03;
    if (e.key === "d" || e.key === "ArrowRight")
      spaceship.velocity.rotation.y = -0.03;
    if (e.key === "r") spaceship.velocity.translation.y = 30;
    if (e.key === "f") spaceship.velocity.translation.y = -30;
  });

  window.addEventListener("keyup", (e) => {
    if (
      e.key === "w" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "s"
    )
      spaceship.velocity.translation.z = 0;
    if (
      e.key === "a" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "d"
    )
      spaceship.velocity.rotation.y = 0;
    if (e.key === "r" || e.key === "f") spaceship.velocity.translation.y = 0;
  });

  const raycaster = new THREE.Raycaster();
  const intersectIntersts = ["text", "icon"];

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

    const objectList = getObjectsByName(intersections, intersectIntersts);
    if (hoveredObject) {
      hoveredObject.offHover();
      hoveredObject = null;
    }
    if (!objectList.length) return;
    hoveredObject = objectList[0] as InteractableMesh<
      THREE.BufferGeometry,
      THREE.Material
    >;
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

    const objectList = getObjectsByName(intersections, intersectIntersts);
    if (!objectList.length) return;
    const clickedObject = objectList[0] as InteractableMesh<
      THREE.BufferGeometry,
      THREE.Material
    >;
    clickedObject.onClick();
  });
}
