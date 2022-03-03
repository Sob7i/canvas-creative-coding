/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')
const particles = []
let particleColor = 'rgba(192,192,192)'

// When document is loaded, create particles pattern
window.addEventListener('load', () => {
  // set canvas size to window size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // set canvas background to black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // populate particles array with particles.
  for (let i = 0; i <= canvas.width / 4; i++) {
    particles.push(new Particle())
  }
  // Create a pattern of particles.
  createPattern()
})

window.addEventListener('resize', () => {
  // Maintain canvas width and height when widow's size changes.
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined
}

// window.addEventListener('mouseover', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 3 - 1
    this.speedY = Math.random() * 3 - 1.5
    this.color = particleColor
  }

  draw() {
    // Draw the particle.
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  move() {
    // Move the particle by adding speed to its position.
    this.x += this.speedX / 4
    this.y += this.speedY / 4

    // If the mouse is over the particle, make it bigger.
    
    // if particle is out of bounds, bounce it back
    if (this.x > canvas.width || this.x < 0) {
      this.speedX = -this.speedX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.speedY = -this.speedY
    }
  }
}

function createPattern() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw()
    // particles[i].move()

    for (let j = 0; j < particles.length; j++) {
      // Pythagorean theorem to calculate distance between particles
      const dX = particles[i].x - particles[j].x
      const dY = particles[i].y - particles[j].y
      const distance = Math.sqrt(dX * dX + dY * dY)

      // Draw line between particles if distance is less than 100
      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particles[i].color
        ctx.lineWidth = particles[i].size / 40
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
        ctx.closePath()
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  createPattern()
  requestAnimationFrame(animate)
}

animate()