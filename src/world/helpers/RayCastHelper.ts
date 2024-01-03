import * as THREE from "three";

export function getMouseVector2(
  event: MouseEvent,
  window: Window
): THREE.Vector2 {
  let mousePointer = new THREE.Vector2();

  mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  return mousePointer;
}

export function checkRayIntersections(
  mousePointer: THREE.Vector2,
  camera: THREE.PerspectiveCamera,
  raycaster: THREE.Raycaster,
  scene: THREE.Scene,
  intersectIntersts: string[],
  isRecursive: boolean = false
): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
  raycaster.setFromCamera(mousePointer, camera);
  return raycaster.intersectObjects(
    scene.children.filter((value) => {
      for (let name of intersectIntersts)
        if (value.name.includes(name)) return true;
      return false;
    }),
    isRecursive
  );
}

export function getObjectsByName(
  objectList: THREE.Intersection<THREE.Object3D<THREE.Event>>[],
  names: string[]
) {
  const cardObjects: THREE.Object3D<THREE.Event>[] = [];
  objectList.forEach((object) => {
    const objectName: string = object.object.name || "Unnamed Object";
    for (let name of names)
      if (objectName.includes(name)) cardObjects.push(object.object);
  });

  return cardObjects;
}
