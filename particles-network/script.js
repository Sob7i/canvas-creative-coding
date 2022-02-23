/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')
const particlesArray = []

// When document is loaded, create particles pattern
window.addEventListener('load', () => {
  // set canvas size to window size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // set canvas background to black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // populate particlesArray with particles.
  for (let i = 0; i <= canvas.width / 4; i++) {
    particlesArray.push(new Particles())
  }
  // Create a pattern of particles.
  createPattern()
})

// When document loose focus, reacreate the pattern.
window.addEventListener('onblur', () => {
  // Set the canvas background to black.
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // Reacrate the pattern.
  createPattern()
})

window.addEventListener('resize', () => {
  // Maintain canvas width and height when widow's size changes.
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  // Set the canvas background to black.
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set array of particles to empty,
  // then populate particlesArray with particles again
  particlesArray.length = 0
  for (let i = 0; i <= canvas.width / 4; i++) {
    particlesArray.push(new Particles())
  }
  createPattern()
})

class Particles {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 3 - 1
    this.speedY = Math.random() * 3 - 1.5
  }

  draw() {
    // Draw the particle.
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  move() {
    // Move the particle by adding speed to its position.
    this.x += this.speedX / 4
    this.y += this.speedY / 4

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
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].draw()
    particlesArray[i].move()

    for (let j = 0; j < particlesArray.length; j++) {
      // Pythagorean theorem to calculate distance between particles
      const dX = particlesArray[i].x - particlesArray[j].x
      const dY = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dX * dX + dY * dY)

      // Draw line between particles if distance is less than 100
      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = particlesArray[i].size / 40
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
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