import P5 from "p5";

export default class Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  filespan: number;
  size: number;

  constructor(p5: P5, pos: P5.Vector) {
    this.p5 = p5;
    this.pos = pos.copy();
    this.vel = p5.createVector();
    this.acc = P5.Vector.random2D().mult(p5.random(0.5, 2));
    this.filespan = 255;
    this.size = 10;
  }
  draw() {
    const p5 = this.p5;
    p5.fill(145, 185, 94, this.filespan);
    p5.stroke("#000");
    p5.ellipse(this.pos.x, this.pos.y, this.size);
  }
  applyGravity(gravity) {
    this.acc.add(gravity);
  }
  isDead() {
    return this.filespan < 0;
  }
  update() {
    this.draw();
    this.filespan -= 3;
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
}
