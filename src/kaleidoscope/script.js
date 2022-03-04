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
let tSide = 150;

// the space between the triangles.
let offset = 150;
const triangles = [];

// When document is loaded, create particles pattern
window.addEventListener("load", () => {
  // populate particlesArray with particles.
  for (let i = 0; i < 5; i++) {
    triangles.push(new Triangle());
  }
  // Create a pattern of particles.
  createPattern();
});

// window.addEventListener("click", (event) => {
//   console.log("event", event);
//   ctx.scale(10, 5);
// });

class Triangle {
  constructor() {
    /*
     *The equation for calculating an equilateral triangle's height is:
     * h = sqrt(3)/2 * a | where 'a' is the side length and 
     * sqrt(3)/2 is the sin for 60 degrees angle.
     */
    this.tSide = tSide;
    this.tHeight = (Math.sqrt(3) / 2) * tSide;
  }

  draw(leftPos, topPos) {
    // Move to the starting point.
    // ctx.translate(offset, offset);
    /*
     * Here we move only on the x axis to create  a square with
     * (tSide x tSide) dimensions where the triangle is going to be drawn onto .
     * We start from (tSide,0) and draw a line down to (tSide, tHeight),
     * then we draw a line from (tSide, tHeight) to (0, 0), then we close the path
     * and that creates a triangle.
     */
    let leftOffset = leftPos * tSide;
    let topOffset = topPos * this.tHeight;

    if (topPos % 2 !== 0) {
      //use !==0 instead of === 1 because -1 is also possible.
      leftOffset += tSide / 2;
    }

    ctx.strokeStyle = "white";
    ctx.translate(leftOffset, topOffset);
    ctx.beginPath();
    ctx.moveTo(tSide, this.tHeight);
    ctx.lineTo(0.5 * tSide, 0);
    ctx.lineTo(0, this.tHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.translate(-leftOffset, -topOffset);

    //  ctx.moveTo(tSide, 0);
    //   ctx.lineTo(tSide / 2, this.tHeight);
    //   ctx.lineTo(0, 0);
    //   ctx.closePath();
    //   ctx.stroke();
  }
}

function createPattern() {
  // for (let i = 0; i < triangles.length; i++) {
  //   triangles[i].draw(0,0);
  // }
  triangles[0].draw(0, 0);
  triangles[1].draw(1, 0);
  triangles[2].draw(1,1);
  triangles[3].draw(-1,-1);
}

function animate() {
  createPattern();
  requestAnimationFrame(animate);
}

// animate();
