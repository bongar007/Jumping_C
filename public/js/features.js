//Instantiating Rellax parallax library
const rellax = new Rellax(".rellax");

//P5JS Instance for background
const p5Instance = (p5) => {
  const particles = [];
  const particlesEl = document.getElementById("particles");
  let p5width = Number(particlesEl.offsetWidth);
  let p5height = Number(particlesEl.offsetHeight);
  console.log(p5width, p5height);

  class Particle {
    constructor() {
      this.pos = p5.createVector(p5.random(p5width), p5.random(p5height));
      this.vel = p5.createVector(p5.random(-2, 2), p5.random(-2, 2));
      this.size = 5;
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
          const alpha = map(d, 0, 120, 0, 0.25);
          p5.stroke(`rgba(255, 255, 255, ${alpha})`);
          p5.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
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

    particles.forEach((particle, idx) => {
      particle.update();
      particle.draw();
      particle.checkParticles(particles.slice(idx));
    });
  };
};

let particlesBackground = new p5(p5Instance, "particles");
