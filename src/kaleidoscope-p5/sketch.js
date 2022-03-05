let tSide = 450;
let tHeight = (tSide * Math.sqrt(3)) / 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    if (tSide >= 700) return;
    tSide += 30;
    tHeight = (tSide * Math.sqrt(3)) / 2;
  } else {
    if (tSide <= 70) return;
    tSide -= 30;
    tHeight = (tSide * Math.sqrt(3)) / 2;
  }
}

function draw() {
  background("black");
  // translate(width / 2 - tSide / 2, height / 2 - tHeight / 2);
  createPattern();
}

function createPattern() {
  let isOddRow = false;
  let xOffset = 0;
  let yOffset = 0;

  for (let x = 0; x < width; x += tSide) {
    if (isOddRow) {
      xOffset = tSide / 2;
      yOffset = tHeight;
    } else {
      xOffset = 0;
      yOffset = 0;
    }

    for (let y = 0; y < height; y += tHeight) {
      // Draw the triangle.
      // triangle(i, y, i + tSide / 2, y + tHeight, i + tSide, y);

      if (isOddRow) triangle(x, y, x + tSide / 2, y + tHeight, x + tSide, y);
      else triangle(x, y, x + tSide / 2, y + tHeight, x + tSide, y);
    }

    isOddRow = !isOddRow;
  }
}

// ellipse(i + tSide / 2, tHeight, 50, 50);
// triangle(
//   i + tSide / 2,
//   j + tHeight,
//   i + tSide,
//   j ,
//   i + tSide + tSide / 2,
//   j + tHeight
// );

// Draw a row of triangles
// for (let i = 0; i < width; i += tSide) {
//   // Up middle triangle both directions
//   triangle(i, 0, i + tSide / 2, tHeight, i + tSide, 0);
//   triangle(-i, 0, -i + tSide / 2, tHeight, -i + tSide, 0);

//   // Up right and left triangles
//   triangle(
//     i + tSide / 2,
//     tHeight,
//     i + tSide,
//     0,
//     i + tSide + tSide / 2,
//     tHeight
//   );
//   triangle(
//     -i + tSide / 2,
//     tHeight,
//     -i + tSide,
//     0,
//     -i + tSide + tSide / 2,
//     tHeight
//   );

//   // Down middle triangle both directions
//   triangle(i + tSide / 2, tHeight, i + tSide, 2 * tHeight, i, 2 * tHeight);
//   triangle(-i + tSide / 2, tHeight, -i + tSide, 2 * tHeight, -i, 2 * tHeight);

//   // Down right and left triangles
//   triangle(
//     i + tSide + tSide / 2,
//     tHeight,
//     i + tSide,
//     2 * tHeight,
//     i + tSide / 2,
//     tHeight
//   );
//   triangle(
//     -i + tSide + tSide / 2,
//     tHeight,
//     -i + tSide,
//     2 * tHeight,
//     -i + tSide / 2,
//     tHeight
//   );
// }
