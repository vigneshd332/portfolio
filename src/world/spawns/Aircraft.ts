import * as THREE from "three";
import { Aircraft } from "../objects/Aircraft";
import { loadModel } from "../loaders";

export async function getFriendlyCarrierAircraftSpawns(): Promise<
  CarrierAircraftSpawn[]
> {
  const flankerModel = await loadModel("models/flanker/model.glb");
  const f35Model = await loadModel("models/f35/model.glb");

  return [
    {
      model: flankerModel,
      name: "Su 27",
      position: new THREE.Vector3(4900, 200, -1500),
      scale: new THREE.Vector3(20, 20, 20),
      rotation: new THREE.Vector3(0, Math.PI / 5, 0),
      final_takeoff_offset: 35,
      launch_delay: 20,
      vtol: false,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z < this.initial_rotation.z + 0.8) {
          this.aircraft.rotateZ(0.005);
        }
        this.aircraft.rotation.y -= 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: flankerModel,
      name: "Su 27",
      position: new THREE.Vector3(5350, 200, -100),
      scale: new THREE.Vector3(20, 20, 20),
      rotation: new THREE.Vector3(0, Math.PI / 5, 0),
      final_takeoff_offset: 23,
      launch_delay: 30,
      vtol: false,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z < this.initial_rotation.z + 0.8) {
          this.aircraft.rotateZ(0.005);
        }
        this.aircraft.rotation.y -= 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: flankerModel,
      name: "Su 27",
      position: new THREE.Vector3(5550, 200, -300),
      scale: new THREE.Vector3(20, 20, 20),
      rotation: new THREE.Vector3(0, Math.PI / 8, 0),
      final_takeoff_offset: 23,
      launch_delay: 7,
      vtol: false,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z > this.initial_rotation.z - 0.8) {
          this.aircraft.rotateZ(-0.005);
        }
        this.aircraft.rotation.y += 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: flankerModel,
      name: "Su 27",
      position: new THREE.Vector3(4700, 200, -1300),
      scale: new THREE.Vector3(20, 20, 20),
      rotation: new THREE.Vector3(0, Math.PI / 6, 0),
      final_takeoff_offset: 35,
      launch_delay: 40,
      vtol: false,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z > this.initial_rotation.z - 0.8) {
          this.aircraft.rotateZ(-0.005);
        }
        this.aircraft.rotation.y += 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: f35Model,
      name: "F35B",
      position: new THREE.Vector3(3900, 250, -2200),
      scale: new THREE.Vector3(1000, 1000, 1000),
      rotation: new THREE.Vector3(0, Math.PI / 6, 0),
      final_takeoff_offset: 0,
      launch_delay: 7,
      vtol: true,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z > this.initial_rotation.z - 0.8) {
          this.aircraft.rotateZ(-0.005);
        }
        this.aircraft.rotation.y += 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: f35Model,
      name: "F35B",
      position: new THREE.Vector3(4000, 250, -2900),
      scale: new THREE.Vector3(1000, 1000, 1000),
      rotation: new THREE.Vector3(0, Math.PI / 6, 0),
      final_takeoff_offset: 0,
      launch_delay: 20,
      vtol: true,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z < this.initial_rotation.z + 0.8) {
          this.aircraft.rotateZ(+0.005);
        }
        this.aircraft.rotation.y -= 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
    {
      model: f35Model,
      name: "F35B",
      position: new THREE.Vector3(4400, 250, -2200),
      scale: new THREE.Vector3(1000, 1000, 1000),
      rotation: new THREE.Vector3(0, Math.PI / 6, 0),
      final_takeoff_offset: 0,
      launch_delay: 35,
      vtol: true,
      post_takeoff_action: function (this: Aircraft) {
        if (this.aircraft.rotation.z > this.initial_rotation.z - 0.8) {
          this.aircraft.rotateZ(-0.005);
        }
        this.aircraft.rotation.y += 0.001;
        this.aircraft.translateZ(this.velocity);
      },
      pre_takeoff_action: function () {},
    },
  ];
}
