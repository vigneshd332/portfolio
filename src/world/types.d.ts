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

interface FriendlyShipSpawn {
  model: THREE.Group;
  position: THREE.Vector3;
  scale: THREE.Vector3;
  rotation: THREE.Vector3;
  name: string;
}

interface CarrierAircraftSpawn {
  model: THREE.Group;
  name: string;
  position: THREE.Vector3;
  scale: THREE.Vector3;
  rotation: THREE.Vector3;
  final_takeoff_offset: number;
  launch_delay: number;
  vtol: boolean;
  pre_takeoff_action: (this: Aircraft) => void;
  post_takeoff_action: (this: Aircraft) => void;
}

interface FontSpawn {
  font: THREE.Font;
  text: string;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  onClick: () => void;
}

interface SocialSpawn {
  platformModel: THREE.Group;
  position: THREE.Vector3;
  socialModel: THREE.Group;
  iconName: string;
}
