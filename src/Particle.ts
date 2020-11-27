import P5 from "p5";

export default class Particle {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  filespan: number;
  size: number;
  hue: number;
  s: number;
  target: P5.Vector;
  maxForce: number;
  maxSpeed: number;

  constructor(
    p5: P5,
    pos: P5.Vector,
    hue: number,
    t: P5.Vector,
    mf: number = 0.3,
    ms: number = 4
  ) {
    this.p5 = p5;
    this.pos = pos.copy();
    this.vel = p5.createVector();
    this.acc = P5.Vector.random2D().mult(p5.random(0.5, 2));
    this.filespan = 255;
    this.size = 10;
    this.hue = hue + this.p5.random(-5, 5);
    this.s = this.p5.random(40, 70);
    this.target = t.copy();
    this.maxForce = mf;
    this.maxSpeed = ms;
  }
  draw() {
    const p5 = this.p5;
    p5.push();
    p5.colorMode(p5.HSL);
    p5.translate(this.pos.x, this.pos.y);
    p5.fill(this.hue, this.s, this.s, this.filespan / 255);
    p5.stroke("#000");
    p5.ellipse(0, 0, this.size);
    p5.pop();
  }
  applyForce(gravity) {
    this.acc.add(gravity);
  }
  isDead() {
    return this.filespan < 0;
  }
  behaviours() {
    const seek = this.seek(this.target);
    this.applyForce(seek);
  }
  seek(target) {
    const desired: P5.Vector = P5.Vector.sub(target, this.pos);
    const dist: number = desired.mag();
    let speed: number = this.maxSpeed;
    if (dist < 50) {
      speed = this.p5.map(dist, 0, 50, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    const steer: P5.Vector = P5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }
  update() {
    this.draw();
    this.behaviours();
    this.filespan--;
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
}
