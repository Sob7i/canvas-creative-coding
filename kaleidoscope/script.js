/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')
const triangles = []

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
    triangles.push(new Triangle())
  }
  console.log('triangles :>> ', triangles);
  // Create a pattern of particles.
  createPattern()
})

class Triangle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 3 + 1
  }

  // Draw a white triangle.
  draw() {
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.size, this.y + this.size)
    ctx.lineTo(this.x - this.size, this.y + this.size)
    ctx.fill()
  }
}

function createPattern() {

}

function animate() {
  createPattern()
  requestAnimationFrame(animate)
}

animate()