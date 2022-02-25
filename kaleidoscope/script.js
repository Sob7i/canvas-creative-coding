/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// const baseImg = document.getElementById("base");
// const baseRImg = document.getElementById("baseR");
// const pat = ctx.createPattern(baseImg, "repeat");
// const patR = ctx.createPattern(baseRImg, "repeat");

// The triangle side length.
let tSide = 350;
// the space between the triangles.
let offset = 150;
const triangles = [];

// When document is loaded, create particles pattern
window.addEventListener("load", () => {
  // populate particlesArray with particles.
  for (let i = 0; i < 1; i++) {
    triangles.push(new Triangle());
  }
  // Create a pattern of particles.
  createPattern();
});

class Triangle {
  constructor() {
    // The equation for calculating an equilateral triangle's height is:
    // h = sqrt(3)/2 * a | where 'a' is the side length.
    this.tSide = tSide;
    this.tHeight = (Math.sqrt(3) / 2) * this.tSide;
  }

  draw() {
    // Move to the starting point.
    ctx.translate(offset, offset);
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.tSide, this.tHeight);
    ctx.lineTo(this.tSide / 2, 0);
    ctx.lineTo(0, this.tHeight);
    ctx.closePath();
    ctx.stroke();
  }
}

function createPattern() {
  console.log('triangles', triangles)
  for (let i = 0; i < triangles.length; i++) {
    triangles[i].draw();
  }
}

function animate() {
  createPattern();
  requestAnimationFrame(animate);
}

// animate();
