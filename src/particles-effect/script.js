/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

const particlesArray = []
let hue = 0

// Canvas base setup 
window.addEventListener('load', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Maintain canvas width and height when widow's size changes
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// Create mouse coordinates object
const mouse = {
  x: undefined,
  y: undefined
}

// listener to update mouse coordinates
canvas.addEventListener('mousemove', (evt) => {
  mouse.x = evt.x
  mouse.y = evt.y

  for (let i = 0; i <= 30; i++) {
    if (particlesArray.length > 100) particlesArray.length = 70
    else particlesArray.push(new Particles())
  }
})

// Add particles to array on mouse click
canvas.addEventListener('click', (evt) => {
  mouse.x = evt.x
  mouse.y = evt.y

  for (let i = 0; i <= 10; i++) {
    if (particlesArray.length > 100) particlesArray.length = 70
    else particlesArray.push(new Particles())
  }
})

// Particles class that creates x, y particle coordinates,
// creates particle radius and movement speed, and
// adds methods to update and draw particles.
class Particles {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 15 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.color = 'hsl(' + hue + ', 100%, 50%)'
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.size > 0.2) {
      this.size -= 0.1
    }
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Add particles to array
function init() {
  for (let i = 0; i <= 100; i++) {
    particlesArray.push(new Particles())
  }
}

// Update x, y coordinates and draw particles
function createPattern() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()

    for (let j = 0; j < particlesArray.length; j++) {
      // Pythagorean theorem to calculate distance between particles
      const dX = particlesArray[i].x - particlesArray[j].x
      const dY = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dX * dX + dY * dY)

      // Draw line between particles if distance is less than 100
      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[i].color
        ctx.lineWidth = particlesArray[i].size / 10
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
        ctx.closePath()
      }
    }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1)
      i--
    }
  }
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
  createPattern()
  hue += 0.5
  requestAnimationFrame(animate)
}

init()
animate()