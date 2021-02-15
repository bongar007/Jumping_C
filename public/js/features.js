const particles = [];

const p5Instance = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.window.innerWidth, p5.window.innerHeight);

    const particlesLength = Math.min(
      Math.floor(p5.window.innerWidth / 10),
      100
    );
    for (let i = 0; i < particlesLength; i++) {
      p5.particles.push(new Particle());
    }
  };

  p5.draw = () => {
    p5.background(20);

    particles.forEach((particle, idx) => {
      particle.update();
      particle.draw();
      particle.checkParticles(particles.slice(idx));
    });
  };
};

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.size = 5;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  draw() {
    noStroke();
    fill("rgba(255, 255, 255, 0.5)");
    circle(this.pos.x, this.pos.y, this.size * 2);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 120) {
        const alpha = map(d, 0, 120, 0, 0.25);
        stroke(`rgba(255, 255, 255, ${alpha})`);
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}

let particlesBackground = new p5(p5Instance, "particles");