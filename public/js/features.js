//Instantiating Rellax parallax library
const rellax = new Rellax(".rellax");

//P5JS Instance for background
const p5Instance = (p5) => {
  const particles = [];
  const particlesEl = document.getElementById("particles");
  let p5width = Number(particlesEl.offsetWidth);
  let p5height = Number(particlesEl.offsetHeight);

  class Particle {
    constructor() {
      this.pos = p5.createVector(p5.random(p5width), p5.random(p5height));
      this.vel = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
      this.size = 3;
    }

    update() {
      this.pos.add(this.vel);
      this.edges();
    }

    draw() {
      p5.noStroke();
      p5.fill("rgba(255, 255, 255, 0.5)");
      p5.circle(this.pos.x, this.pos.y, this.size * 2);
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > p5width) {
        this.vel.x *= -1;
      }

      if (this.pos.y < 0 || this.pos.y > p5height) {
        this.vel.y *= -1;
      }
    }

    checkParticles(particles) {
      particles.forEach((particle) => {
        const d = p5.dist(
          this.pos.x,
          this.pos.y,
          particle.pos.x,
          particle.pos.y
        );
        if (d < 120) {
          const alpha = p5.map(d, 0, 120, 0, 0.25);
          p5.stroke(`rgba(255, 255, 255, ${alpha})`);
          p5.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
  }

  function polygon(x, y, radius, npoints) {
    let angle = p5.TWO_PI / npoints;
    p5.beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + p5.cos(a) * radius;
      let sy = y + p5.sin(a) * radius;
      p5.vertex(sx, sy);
    }
    p5.endShape(CLOSE);
  }

  p5.setup = () => {
    p5.createCanvas(p5width, p5height);

    const particlesLength = Math.min(Math.floor(p5width / 10), 100);
    for (let i = 0; i < particlesLength; i++) {
      particles.push(new Particle());
    }
  };

  p5.draw = () => {
    p5.background(55, 100, 144);

    polygon(
      p5width * 0.73 - p5.mouseX / 50,
      p5height * 0.58 - p5.mouseY / 50,
      200,
      6
    );
    polygon(
      p5width * 0.5 - p5.mouseX / 50,
      p5height * 0.2 - p5.mouseY / 50,
      200,
      6
    );
    polygon(
      p5width * 0.73 - p5.mouseX / 50,
      p5height * 0.33 - p5.mouseY / 50,
      200,
      6
    );
    polygon(
      p5width * 0.5 - p5.mouseX / 50,
      p5height * 0.45 - p5.mouseY / 50,
      200,
      6
    );

    particles.forEach((particle, idx) => {
      particle.update();
      particle.draw();
      particle.checkParticles(particles.slice(idx));
    });
  };
};

let particlesBackground = new p5(p5Instance, "particles");
