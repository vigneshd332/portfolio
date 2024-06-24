import { Player } from "../objects";
import radarImg from "../../assets/radar.webp";
import * as THREE from "three";

export class Radar {
  scene: THREE.Scene;
  player: Player;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  radarImg: HTMLImageElement;
  currentSweepAngle: number = 0;
  maxRadarDistance: number = 10000;
  currentFrame: number = 0;

  constructor(scene: THREE.Scene, canvas: HTMLCanvasElement, player: Player) {
    this.scene = scene;
    this.player = player;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.radarImg = new Image();
    const canvasStyle = getComputedStyle(canvas);
    this.canvas.width = parseInt(canvasStyle.width) * window.devicePixelRatio;
    this.canvas.height = parseInt(canvasStyle.height) * window.devicePixelRatio;
    this.canvas.style.width = canvasStyle.width;
    this.canvas.style.height = canvasStyle.height;
    this.radarImg.src = radarImg;
  }

  update() {
    this.draw(this.scene.children);
  }

  private draw(targets: THREE.Object3D[]) {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.drawImage(
      this.radarImg,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    const radarTrueRadius = this.canvas.width / 2 - 5;

    // Radar Gradient BG Effect
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      radarTrueRadius,
      0,
      Math.PI * 2
    );
    const gradient = this.canvasContext.createRadialGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.canvas.width / 2,
      this.canvas.width / 2,
      this.canvas.height / 2,
      0
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
    this.canvasContext.fillStyle = gradient;
    this.canvasContext.fill();
    this.canvasContext.closePath();

    // Moving radar arc gradient trail effect
    this.canvasContext.beginPath();
    const angle = this.currentSweepAngle % (Math.PI * 2);

    // calculate gradient line based on angle
    const x2 =
      this.canvas.width / 2 + Math.cos(angle) * (this.canvas.width / 2);
    const y2 =
      this.canvas.height / 2 + Math.sin(angle) * (this.canvas.height / 2);

    // create and render gradient
    const arcGradient = this.canvasContext.createLinearGradient(
      this.canvas.width / 2,
      this.canvas.height / 2,
      x2,
      y2
    );
    arcGradient.addColorStop(0, "rgba(0, 0, 0, 0.75)");
    arcGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    this.canvasContext.fillRect(0, 0, 300, 300);
    this.canvasContext.fillStyle = arcGradient;

    this.canvasContext.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      radarTrueRadius,
      (0 + this.currentSweepAngle) % (Math.PI * 2),
      ((2 * Math.PI) / 3 + this.currentSweepAngle) % (Math.PI * 2),
      false
    );
    this.canvasContext.lineTo(this.canvas.width / 2, this.canvas.height / 2);
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.currentSweepAngle += (Math.PI / 180) * 2;

    // White Player Dot
    this.drawBlimp(
      new THREE.Vector2(this.canvas.width / 2, this.canvas.height / 2),
      "white"
    );

    // Draw Target Blimps
    targets.forEach((target) => {
      if (!target.name.includes("radar")) return;
      const distance = Math.sqrt(
        (target.position.z - this.player.player.position.z) ** 2 +
          (target.position.x - this.player.player.position.x) ** 2
      );
      if (distance < this.maxRadarDistance) {
        // calculate angle based on x and z coordinates only without a tan function
        const angle =
          Math.atan2(
            target.position.z - this.player.player.position.z,
            target.position.x - this.player.player.position.x
          ) +
          this.player.currentYaw +
          Math.PI;
        const x =
          this.canvas.width / 2 +
          Math.cos(angle) *
            (distance / this.maxRadarDistance) *
            radarTrueRadius;
        const y =
          this.canvas.height / 2 +
          Math.sin(angle) *
            (distance / this.maxRadarDistance) *
            radarTrueRadius;
        this.drawBlimp(
          new THREE.Vector2(x, y),
          target.name.includes("platform")
            ? "#1da1f2"
            : target.name.includes("ship")
            ? "#26d266"
            : "#ff7139"
        );
      }
    });
  }

  private drawBlimp(position: THREE.Vector2, fillStyle: string) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(position.x, position.y, 2, 0, Math.PI * 2);
    this.canvasContext.fillStyle = fillStyle;
    this.canvasContext.fill();
    this.canvasContext.closePath();
  }
}
