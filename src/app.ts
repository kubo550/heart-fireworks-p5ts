import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Firework from "./Firework";

let gravity: P5.Vector;

const sketch = (p5: P5) => {
  let fireworks: Firework[] = [];

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    gravity = p5.createVector(0, 0.05);
  };

  p5.draw = () => {
    if (p5.random(1) > 0.99) {
      fireworks.push(new Firework(p5, gravity));
    }

    p5.background("black");
    fireworks.forEach((f) => f.update());
    fireworks = fireworks.filter((p) => !p.isDead());
  };
};

new P5(sketch);
