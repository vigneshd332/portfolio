interface InteractableMesh<
  T extends THREE.BufferGeometry,
  U extends THREE.Material | THREE.Material[]
> extends THREE.Mesh<T, U> {
  onHover: () => void;
  offHover: () => void;
  onClick: () => void;
}

interface Updatable {
  update: () => void;
}
