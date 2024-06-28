import { Player } from "../objects";
import radarImg from "../../assets/radar.webp";
import * as THREE from "three";
import { DEGREES_TO_RADIANS, PI_BY_THREE, TWO_PI } from "../helpers/constants";

export class Radar {
  scene: THREE.Scene;
  player: Player;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;
  radarImg: HTMLImageElement;
  currentSweepAngle: number = 0;
  maxRadarDistance: number = 10000;
  currentFrame: number = 0;
  preComputedConstants: { [key: string]: number } = {};

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

    this.preComputedConstants.HALF_CANVAS_HEIGHT = this.canvas.height / 2;
    this.preComputedConstants.HALF_CANVAS_WIDTH = this.canvas.width / 2;
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

    const radarTrueRadius = this.preComputedConstants.HALF_CANVAS_WIDTH - 5;

    // Radar Gradient BG Effect
    this.canvasContext.beginPath();
    this.canvasContext.arc(
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT,
      radarTrueRadius,
      0,
      TWO_PI
    );
    const gradient = this.canvasContext.createRadialGradient(
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT,
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT,
      0
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
    this.canvasContext.fillStyle = gradient;
    this.canvasContext.fill();
    this.canvasContext.closePath();

    // Moving radar arc gradient trail effect
    this.canvasContext.beginPath();
    const angle = this.currentSweepAngle % TWO_PI;

    // calculate gradient line based on angle
    const x2 =
      this.preComputedConstants.HALF_CANVAS_WIDTH +
      Math.cos(angle) * this.preComputedConstants.HALF_CANVAS_WIDTH;
    const y2 =
      this.preComputedConstants.HALF_CANVAS_HEIGHT / 2 +
      Math.sin(angle) * this.preComputedConstants.HALF_CANVAS_HEIGHT;

    // create and render gradient
    const arcGradient = this.canvasContext.createLinearGradient(
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT,
      x2,
      y2
    );
    arcGradient.addColorStop(0, "rgba(0, 0, 0, 0.75)");
    arcGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    this.canvasContext.fillRect(0, 0, 300, 300);
    this.canvasContext.fillStyle = arcGradient;

    this.canvasContext.arc(
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT,
      radarTrueRadius,
      (0 + this.currentSweepAngle) % TWO_PI,
      (2 * PI_BY_THREE + this.currentSweepAngle) % TWO_PI,
      false
    );
    this.canvasContext.lineTo(
      this.preComputedConstants.HALF_CANVAS_WIDTH,
      this.preComputedConstants.HALF_CANVAS_HEIGHT
    );
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.currentSweepAngle += DEGREES_TO_RADIANS * 2;

    // White Player Dot
    this.drawBlimp(
      new THREE.Vector2(
        this.preComputedConstants.HALF_CANVAS_WIDTH,
        this.preComputedConstants.HALF_CANVAS_HEIGHT
      ),
      "white",
      ""
    );

    // Draw Target Blimps
    targets.forEach((target) => {
      if (!target.name.includes("radar")) return;
      const distance = Math.sqrt(
        (target.position.z - this.player.player.position.z) ** 2 +
          (target.position.x - this.player.player.position.x) ** 2
      );
      if (distance < this.maxRadarDistance) {
        const angle =
          Math.atan2(
            target.position.z - this.player.player.position.z,
            target.position.x - this.player.player.position.x
          ) +
          this.player.currentYaw +
          Math.PI;
        const x =
          this.preComputedConstants.HALF_CANVAS_WIDTH +
          Math.cos(angle) *
            (distance / this.maxRadarDistance) *
            radarTrueRadius;
        const y =
          this.preComputedConstants.HALF_CANVAS_HEIGHT +
          Math.sin(angle) *
            (distance / this.maxRadarDistance) *
            radarTrueRadius;
        this.drawBlimp(
          new THREE.Vector2(x, y),
          target.name.includes("platform")
            ? "#1da1f2"
            : target.name.includes("ship")
            ? "#26d266"
            : "#ff7139",
          target.name.split("-")[2]
        );
      }
    });
  }

  private drawBlimp(position: THREE.Vector2, fillStyle: string, name: string) {
    this.canvasContext.beginPath();
    this.canvasContext.arc(position.x, position.y, 2, 0, TWO_PI);
    this.canvasContext.fillStyle = fillStyle;
    this.canvasContext.fill();
    this.canvasContext.closePath();
    this.canvasContext.fillStyle = "white";
    this.canvasContext.font = "10px Arial";
    this.canvasContext.fillText(name, position.x + 5, position.y + 5);
  }
}
