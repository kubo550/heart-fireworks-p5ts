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

  constructor(p5: P5, gravity: P5.Vector) {
    this.p5 = p5;
    this.pos = this.p5.createVector(this.p5.random(400), 400);
    this.vel = this.p5.createVector();
    this.acc = this.p5.createVector(0, this.p5.random(-3, -6));
    this.size = 8;
    this.exploded = false;
    this.particles = [];
    this.gravity = gravity;
  }
  draw() {
    const p5 = this.p5;
    if (this.exploded) return;
    p5.fill(255, 255, 125);
    p5.stroke("red");
    p5.ellipse(this.pos.x, this.pos.y, this.size);
  }
  applyGravity(gravity) {
    this.acc.add(gravity);
  }
  isDead() {
    return this.exploded && !this.particles.length;
  }
  update() {
    this.draw();
    if (this.vel.y > 0 && !this.exploded) {
      for (let i = 0; i < 30; i++) {
        const p = new Particle(this.p5, this.pos);
        this.particles.push(p);
      }
      this.exploded = true;
    }

    this.applyGravity(this.gravity);

    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

    this.particles.forEach((p) => {
      p.update();
      p.applyGravity(this.gravity);
    });
    this.particles = this.particles.filter((p) => !p.isDead());
  }
}
