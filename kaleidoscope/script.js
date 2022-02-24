/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

// const baseImg = document.getElementById("base");
// const baseRImg = document.getElementById("baseR");
// const pat = ctx.createPattern(baseImg, "repeat");
// const patR = ctx.createPattern(baseRImg, "repeat");

const patDim = 150;	//pattern is 150x150 square.
const offset = 150; // the space between the triangles is 1/2 the height of the triangle.
const SqrtOf3_4 = Math.sqrt(3)/2;
console.log('SqrtOf3_4', SqrtOf3_4)
//height of triangle side given side length of 150 is:
const height =  SqrtOf3_4 * patDim;
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
    // Move to the starting point.
    ctx.translate(offset,offset);
    ctx.strokeStyle='white';
    ctx.beginPath();
    ctx.moveTo(patDim, height);
    ctx.lineTo(patDim/2, 0);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function createPattern() {
  for (let i = 0; i < triangles.length; i++) {
    triangles[i].draw()
  }
}

function animate() {
  createPattern()
  requestAnimationFrame(animate)
}

animate()