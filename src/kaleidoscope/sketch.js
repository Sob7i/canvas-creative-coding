//? tSide is the length of the side of the triangle
let tSide = 150;

//? This is calculating the height of the triangle based on the side length.
let tHeight = (tSide * Math.sqrt(3)) / 2;

//? mask is a graphics object that is used to create a triangular shape
//? that is used as a mask for the image.
let mask;
//? A hexagon graphic object
let hex;
let img;
let shape1, shape2, shape3, shape4, shape5, shape6;

function preload() {
  img = loadImage("./assets/img3.jpg");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight).background(25);

  //? create a graphics object that is used as a mask
  mask = createGraphics(tSide, tHeight);
  // mask.noStroke();
  mask.beginShape();
  mask.vertex(0, 0);
  mask.vertex(mask.width / 2, mask.height);
  mask.vertex(mask.width, 0);
  mask.endShape(CLOSE);
  img.mask(mask);

  // frameRate(10);
  // noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    if (mask.height >= 2700) return;
    mask.width += 20;
    mask.height = (mask.width * Math.sqrt(3)) / 2;
  } else {
    if (mask.width <= 70) return;
    mask.width -= 20;
    mask.height = (mask.width * Math.sqrt(3)) / 2;
  }
}

function draw() {
  background(25);
  translate(width / 2 - tSide, height / 2 - tHeight);

  const shape1 = createShape(img, false, 0);
  const shape2 = createShape(img, true, 5);
  const shape3 = createShape(img, true, 1);
  const shape4 = createShape(img, false, 4);
  const shape5 = createShape(img, true, 3);
  const shape6 = createShape(img, false, 2);

  hex = createGraphics(mask.width * 2, mask.height * 2); 
  hex.image(shape1, mask.width / 2, 0);
  hex.image(shape2, mask.width, 0);
  hex.image(shape3, 0, 0);
  hex.image(shape4, 0, mask.height);
  hex.image(shape5, mask.width / 2, mask.height);
  hex.image(shape6, mask.width, mask.height);

  createPattern();
}

function createShape(img, reflect, rotations) {
  //? g is the graphics object where we will draw the shape onto
  let g = createGraphics(mask.width, mask.height);
  //? a, b, c are points on the vertical axis of the triangle
  //? a starts at the bottom of the triangle and moves up to its center
  const a = (mask.width / 2) * tan(radians(30));
  //? b starts from the top of the triangle and moves down to its center
  const b = mask.height - a;
  //? c is difference bewtween a and b (the center of the triangle
  //? and the center of the graphics object)
  const c = b - mask.height / 2;

  g.imageMode(CENTER);
  // ? move the image to the center of the graphics object
  g.translate(g.width / 2, b);

  // ? if the number of rotations is even, move the image up
  if (rotations % 2 === 0) {
    g.translate(0, mask.height - 2 * b);
  }

  //? if the image should be reflected, flip the image
  if (reflect) {
    g.scale(-1, 1);
  }

  //? rotate the image by 60 degrees for each rotation
  g.rotate(radians(rotations * 60));
  //? draw the image onto the graphics object
  g.image(img, 0, c, mask.width, mask.height);

  return g;
}

function createPattern() {
  let isOddRow = false;
  let xOffset = 0;

  for (let y = 0; y < height; y += hex.height / 2) {
    if (isOddRow) {
      xOffset = mask.width * 1.5;
    } else {
      xOffset = 0;
    }

    for (let x = 0; x < width; x += hex.width + mask.width) {
      image(hex, x + xOffset, y);
      image(hex, -x - xOffset, y);
      image(hex, x + xOffset, -y);
      image(hex, -x - xOffset, -y);
    }

    isOddRow = !isOddRow;
  }
}

// function createTriangles(x, y) {
//   // Up middle triangle both directions
//   triangle(x, 2 * y, x + tSide / 2, 2 * y + tHeight, x + tSide, 2 * y);
//   triangle(-x, 2 * -y, -x + tSide / 2, 2 * -y + tHeight, -x + tSide, 2 * -y);
//   triangle(x, 2 * -y, x + tSide / 2, 2 * -y + tHeight, x + tSide, 2 * -y);
//   triangle(-x, 2 * y, -x + tSide / 2, 2 * y + tHeight, -x + tSide, 2 * y);

//   // Up right and left triangles
//   triangle(
//     x + tSide / 2,
//     2 * y + tHeight,
//     x + tSide,
//     2 * y,
//     x + tSide + tSide / 2,
//     tHeight + 2 * y
//   );
//   triangle(
//     -x + tSide / 2,
//     2 * -y + tHeight,
//     -x + tSide,
//     2 * -y,
//     -x + tSide + tSide / 2,
//     tHeight + 2 * -y
//   );
//   triangle(
//     -x + tSide / 2,
//     2 * y + tHeight,
//     -x + tSide,
//     2 * y,
//     -x + tSide + tSide / 2,
//     tHeight + 2 * y
//   );
//   triangle(
//     x + tSide / 2,
//     2 * -y + tHeight,
//     x + tSide,
//     2 * -y,
//     x + tSide + tSide / 2,
//     tHeight + 2 * -y
//   );

//   // Down middle triangle both directions
//   triangle(
//     x + tSide / 2,
//     2 * y + tHeight,
//     x + tSide,
//     2 * y + 2 * tHeight,
//     x,
//     2 * y + 2 * tHeight
//   );
//   triangle(
//     -x + tSide / 2,
//     2 * -y + tHeight,
//     -x + tSide,
//     2 * -y + 2 * tHeight,
//     -x,
//     2 * -y + 2 * tHeight
//   );
//   triangle(
//     -x + tSide / 2,
//     2 * y + tHeight,
//     -x + tSide,
//     2 * y + 2 * tHeight,
//     -x,
//     2 * y + 2 * tHeight
//   );
//   triangle(
//     x + tSide / 2,
//     2 * -y + tHeight,
//     x + tSide,
//     2 * -y + 2 * tHeight,
//     x,
//     2 * -y + 2 * tHeight
//   );

//   // Down right and left triangles
//   triangle(
//     x + tSide + tSide / 2,
//     2 * y + tHeight,
//     x + tSide,
//     2 * y + 2 * tHeight,
//     x + tSide / 2,
//     2 * y + tHeight
//   );
//   triangle(
//     -x + tSide + tSide / 2,
//     2 * -y + tHeight,
//     -x + tSide,
//     2 * -y + 2 * tHeight,
//     -x + tSide / 2,
//     2 * -y + tHeight
//   );
//   triangle(
//     -x + tSide + tSide / 2,
//     2 * y + tHeight,
//     -x + tSide,
//     2 * y + 2 * tHeight,
//     -x + tSide / 2,
//     2 * y + tHeight
//   );
//   triangle(
//     x + tSide + tSide / 2,
//     2 * -y + tHeight,
//     x + tSide,
//     2 * -y + 2 * tHeight,
//     x + tSide / 2,
//     2 * -y + tHeight
//   );
// }
