import * as THREE from "three";

export enum AircraftState {
  takeoff,
  takeoff_climb,
  fly,
  landing,
  firing,
  dead,
}

const AircraftStateActions: { [key in AircraftState]: () => void } = {
  [AircraftState.takeoff]: function (this: Aircraft) {
    // Launch
    this.launch();
  },
  [AircraftState.takeoff_climb]: function (this: Aircraft) {
    this.vtol ? this.vtolTakeOff() : this.correctTakeOffAltitude();
  },
  [AircraftState.fly]: function (this: Aircraft) {
    this.post_takeoff_action();
  },
  [AircraftState.landing]: function () {},
  [AircraftState.firing]: function () {},
  [AircraftState.dead]: function () {},
};

export class Aircraft {
  aircraft: THREE.Group;
  launch_time: number;
  final_takeoff_offset: number;
  current_takeoff_offset: number;
  initial_rotation: THREE.Vector3;
  state: AircraftState;
  velocity: number;
  vtol: boolean;
  pre_takeoff_action: (this: Aircraft) => void;
  post_takeoff_action: (this: Aircraft) => void;

  constructor(
    scene: THREE.Scene,
    aircraftModel: THREE.Group,
    _position: THREE.Vector3,
    _scale: THREE.Vector3,
    _rotation: THREE.Vector3,
    _final_takeoff_offset: number,
    _launch_delay: number = 0,
    vtol: boolean = false,
    _post_takeoff_action_callback: (this: Aircraft) => void = () => {},
    _pre_takeoff_action_callback: (this: Aircraft) => void = () => {},
    name: string
  ) {
    const model = aircraftModel.clone();
    scene.add(model);
    model.position.set(_position.x, _position.y, _position.z);
    model.scale.set(_scale.x, _scale.y, _scale.z);
    model.rotation.set(_rotation.x, _rotation.y, _rotation.z);
    model.traverse((child) => {
      const interactableChild = child as InteractableMesh<
        THREE.BufferGeometry,
        THREE.MeshBasicMaterial
      >;
      interactableChild.name =
        "radar-aircraft-" + name + "-" + interactableChild.name;
      interactableChild.onHover = () => {};
      interactableChild.offHover = () => {};
      interactableChild.onClick = () => {};
    });

    this.aircraft = model;
    this.launch_time = new Date().getTime() + _launch_delay * 1000;
    this.state = vtol ? AircraftState.takeoff_climb : AircraftState.takeoff;
    this.final_takeoff_offset = _final_takeoff_offset;
    this.current_takeoff_offset = 0;
    this.initial_rotation = _rotation;
    this.velocity = 0.1;
    this.vtol = vtol;
    this.pre_takeoff_action = _pre_takeoff_action_callback;
    this.post_takeoff_action = _post_takeoff_action_callback;
  }

  launch(): void {
    if (this.current_takeoff_offset > this.final_takeoff_offset) {
      if (this.state === AircraftState.takeoff)
        this.state = AircraftState.takeoff_climb;
    }
    this.aircraft.translateZ(this.velocity);
    if (this.velocity < 15) this.velocity += 0.05;
    this.current_takeoff_offset += 0.1;
    if (this.current_takeoff_offset > 0.8 * this.final_takeoff_offset)
      this.aircraft.rotateX(-0.005);
  }

  correctTakeOffAltitude(): void {
    // Takeoff Climb
    if (this.aircraft.position.y < 3000) {
      this.aircraft.translateZ(this.velocity);
      return;
    }
    // Reversing takeoff rotation
    if (this.aircraft.position.y >= 3000 && this.aircraft.rotation.x < 0) {
      this.aircraft.rotateX(0.005);
      this.aircraft.translateZ(this.velocity);
      return;
    }
    this.state = AircraftState.fly;
  }

  vtolTakeOff(): void {
    if (this.aircraft.position.y >= 3000) this.state = AircraftState.fly;
    if (this.aircraft.position.y >= 1000) {
      if (this.velocity < 10) this.velocity += 0.05;
      this.aircraft.translateZ(this.velocity);
    }
    this.aircraft.translateY(2);
  }

  update() {
    // Launch Delay
    if (new Date().getTime() < this.launch_time) return;
    // Pre Takeoff Action
    this.pre_takeoff_action();
    // State Action
    AircraftStateActions[this.state].call(this);
  }
}
