import * as THREE from "three";

export enum AircraftState {
  takeoff,
  takeoff_climb,
  fly,
  landing,
  firing,
  dead,
}

export class Aircraft {
  aircraft: THREE.Group;
  launch_time: number;
  final_takeoff_offset: number;
  current_takeoff_offset: number;
  initial_rotation: THREE.Vector3;
  state: AircraftState;
  velocity: number;
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
    _post_takeoff_action_callback: (this: Aircraft) => void = () => {},
    _pre_takeoff_action_callback: (this: Aircraft) => void = () => {}
  ) {
    const model = aircraftModel.clone();
    scene.add(model);
    model.position.set(_position.x, _position.y, _position.z);
    model.scale.set(_scale.x, _scale.y, _scale.z);
    model.rotation.set(_rotation.x, _rotation.y, _rotation.z);

    this.aircraft = model;
    this.launch_time = new Date().getTime() + _launch_delay * 1000;
    this.state = AircraftState.takeoff;
    this.final_takeoff_offset = _final_takeoff_offset;
    this.current_takeoff_offset = 0;
    this.initial_rotation = _rotation;
    this.velocity = 0.1;
    this.pre_takeoff_action = _pre_takeoff_action_callback;
    this.post_takeoff_action = _post_takeoff_action_callback;
  }

  launch(): boolean {
    if (this.current_takeoff_offset > this.final_takeoff_offset) {
      if (this.state === AircraftState.takeoff)
        this.state = AircraftState.takeoff_climb;
      return true;
    }
    this.aircraft.translateZ(this.velocity);
    if (this.velocity < 15) this.velocity += 0.05;
    this.current_takeoff_offset += 0.1;
    if (this.current_takeoff_offset > 0.8 * this.final_takeoff_offset)
      this.aircraft.rotateX(-0.005);
    return false;
  }

  correctTakeOffAltitude(): boolean {
    if (this.state === AircraftState.takeoff) return false;
    // Reversing takeoff rotation
    if (this.aircraft.position.y >= 3000 && this.aircraft.rotation.x < 0) {
      this.state = AircraftState.fly;
      this.aircraft.rotateX(0.005);
      return false;
    }
    return true;
  }

  update() {
    // Launch Delay
    if (new Date().getTime() < this.launch_time) return;
    // Pre Takeoff Action
    this.pre_takeoff_action();
    // Take Off
    if (!this.launch()) return;
    // Climb to Altitude
    this.aircraft.translateZ(this.velocity);
    // Level Off at Altitude
    if (!this.correctTakeOffAltitude()) return;
    if (this.state === AircraftState.takeoff_climb) return;
    // Post Takeoff Action
    this.post_takeoff_action();
  }
}
