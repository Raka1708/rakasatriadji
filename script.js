
function toggleDropdown() {
  const dropdown = document.getElementById('igDropdown');
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}


const dots = [];
const maxDots = 100;
const maxDistance = 120;

const mouseDot = { x: null, y: null, active: false };

class Dot {
  constructor(x, y) {
    this.x = x || Math.random() * width;
    this.y = y || Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = 2;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}

function connectDots() {
  const allDots = [...dots];
  if (mouseDot.active) allDots.push(mouseDot);

  for (let i = 0; i < allDots.length; i++) {
    for (let j = i + 1; j < allDots.length; j++) {
      const dx = allDots[i].x - allDots[j].x;
      const dy = allDots[i].y - allDots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.moveTo(allDots[i].x, allDots[i].y);
        ctx.lineTo(allDots[j].x, allDots[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDistance})`;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  dots.forEach(dot => {
    dot.move();
    dot.draw();
  });

  if (mouseDot.active) {
    ctx.beginPath();
    ctx.arc(mouseDot.x, mouseDot.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  connectDots();
  requestAnimationFrame(animate);
}

for (let i = 0; i < maxDots; i++) {
  dots.push(new Dot());
}

window.addEventListener('mousemove', (e) => {
  mouseDot.x = e.clientX;
  mouseDot.y = e.clientY;
  mouseDot.active = true;
});

window.addEventListener('mouseleave', () => {
  mouseDot.active = false;
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

animate();
