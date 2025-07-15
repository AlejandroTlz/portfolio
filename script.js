
// Dissuade les gens du F12 ou Crtl+U
document.addEventListener('keydown', function(e) {
      if (e.key === 'F12') {
        e.preventDefault();
        alert("Whoa there, Sherlock! No peeking under the hood!");
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        alert("Too curious! This code's a secret 🤫");
      }
    });

// Pour le fond en mouvement
const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 1 + Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = 0.5 + Math.random() * 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(29, 233, 182, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particlesCount = 70;
  const maxLinkDistance = 140;
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw links
    for(let i = 0; i < particlesCount; i++) {
      for(let j = i + 1; j < particlesCount; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < maxLinkDistance) {
          ctx.strokeStyle = `rgba(29, 233, 182, ${1 - dist / maxLinkDistance})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

animate();

// Pour les boutons de "About Me" et "Project" 
function showSection(id) {
  const sections = ['about', 'languages', 'softskills', 'passions'];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      el.classList.toggle('hidden-section', sec !== id);
    }
  });
}
  
function showSection2(id) {
  const sections = ['projects-school', 'projects-perso', 'projects-work'];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) {
      el.classList.toggle('hidden-section', sec !== id);
    }
  });
}