import P5 from "p5";
import Particle from "./Particle";

export default class Firework {
  p5: P5;
  pos: P5.Vector;
  vel: P5.Vector;
  acc: P5.Vector;
  size: number;
  exploded: boolean;
  particles: Particle[];
  gravity: P5.Vector;
  hue: number;
  s: number;

  constructor(p5: P5) {
    this.p5 = p5;
    this.pos = this.p5.createVector(
      this.p5.random(window.innerWidth),
      window.innerHeight
    );
    this.vel = this.p5.createVector();
    this.acc = this.p5.createVector(0, this.p5.random(-4, -8));
    this.size = 8;
    this.exploded = false;
    this.particles = [];
    this.gravity = this.p5.createVector(this.p5.random(-0.02, 0.02), 0.05);
    this.hue = this.p5.random(200, 400);
    this.s = this.p5.random(30, 80);
  }

  draw() {
    const p5 = this.p5;
    if (this.exploded) return;
    p5.push();
    p5.colorMode(p5.HSL);
    p5.fill(this.hue, this.s, this.s);
    p5.stroke("white");
    p5.ellipse(this.pos.x, this.pos.y, this.size);
    p5.pop();
  }

  applyGravity(gravity) {
    this.acc.add(gravity);
  }

  isDead() {
    return this.exploded && !this.particles.length;
  }
  explode() {
    this.exploded = true;
    const p5 = this.p5;
    let maxForce: number,
      maxSpeed: number,
      size: number = 10;
    for (let a = 0; a < p5.TWO_PI; a += 0.08) {
      const r = size;
      const x = r * 16 * p5.pow(p5.sin(a), 3) - 10;
      const y =
        -r *
        (13 * p5.cos(a) -
          5 * p5.cos(2 * a) -
          2 * p5.cos(3 * a) -
          p5.cos(4 * a));
      const newX = p5.random(x - 10, x + 10);
      const newY = p5.random(y - 10, y + 10);
      let target: P5.Vector;
      if (true) {
        target = p5.createVector(this.pos.x + x, this.pos.y + y);
      } else {
        target = p5.createVector(this.pos.x + newX, this.pos.y + newY);
        maxForce = p5.random(0.1, 1);
        maxSpeed = p5.random(2, 5);
        size = 13;
      }
      const p = new Particle(
        this.p5,
        this.pos,
        this.hue,
        target,
        maxForce,
        maxSpeed
      );
      this.particles.push(p);
    }
  }
  update() {
    this.draw();
    if (this.vel.y > 0 && !this.exploded) {
      this.explode();
    }

    this.applyGravity(this.gravity);

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    this.particles.forEach((p) => {
      p.update();
      p.applyForce(this.gravity);
    });
    this.particles = this.particles.filter((p) => !p.isDead());
  }
}

