import P5 from "p5";
import "p5/lib/addons/p5.dom";

import Firework from "./Firework";

const sketch = (p5: P5) => {
  let fireworks: Firework[] = [];

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    setInterval(() => fireworks.push(new Firework(p5)), 1800);
  };

  p5.draw = () => {
    p5.background("black");
    fireworks.forEach((f) => f.update());
    fireworks = fireworks.filter((p) => !p.isDead());
  };
};

new P5(sketch);
