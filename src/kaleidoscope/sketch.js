//? tSide is the length of the side of the triangle
let tSide = 250;

//? This is calculating the height of the triangle based on the side length.
let tHeight = (tSide * Math.sqrt(3)) / 2;

//? mask is a graphics object that is used to create a triangular shape
//? that is used as a mask for the image.
let mask;
let img;
let hex;

function preload() {
  img = loadImage("./assets/img3.jpg");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(25);

  //? create a graphics object that is used as a mask
  mask = createGraphics(tSide, tHeight);
  // mask.noStroke();
  mask.beginShape();
  mask.vertex(0, 0);
  mask.vertex(mask.width / 2, mask.height);
  mask.vertex(mask.width, 0);
  mask.endShape(CLOSE);
  img.mask(mask);

  //? create a hexagon graphic object
  hex = createGraphics(tSide * 2, tHeight * 2);

  //? create shapes with the image, reflections, and rotations
  const shape1 = createShape(img, false, 0);
  const shape2 = createShape(img, true, 1);
  const shape3 = createShape(img, false, 5);
  const shape4 = createShape(img, true, 4);
  const shape5 = createShape(img, false, 3);
  const shape6 = createShape(img, false, 2);

  // //? draw the shapes
  hex.image(shape1, mask.width / 2, 0);
  hex.image(shape2, mask.width, 0);
  hex.image(shape3, 0, 0);
  hex.image(shape4, 0, mask.height);
  hex.image(shape5, mask.width / 2, mask.height);
  hex.image(shape6, mask.width, mask.height);

  image(hex, 0, 0);

  // frameRate(10);
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
  // translate(width / 2 - tSide / 2, height / 2 - tHeight / 2);
}

function createShape(img, reflect, rotations) {
  //? g is the graphics object where we will draw the shape onto
  let g = createGraphics(tSide, tHeight);
  //? a, b, c are points on the vertical axis of the triangle
  //? a starts at the bottom of the triangle and moves up to its center
  const a = (tSide / 2) * tan(radians(30));
  //? b starts from the top of the triangle and moves down to its center
  const b = tHeight - a;
  //? c is difference bewtween a and b (the center of the triangle
  //? and the center of the graphics object)
  const c = b - tHeight / 2;

  // g.background('green');
  g.imageMode(CENTER);
  // ? move the image to the center of the graphics object
  g.translate(g.width / 2, b);

  // ? if the number of rotations is even, move the image up
  if (rotations % 2 === 0) {
    g.translate(0, tHeight - 2 * b);
  }

  //? if the image should be reflected, flip the image
  if (reflect) {
    // g.scale(-1, 1);
  }

  //? rotate the image by 60 degrees for each rotation
  g.rotate(radians(rotations * 60));
  //? draw the image onto the graphics object
  g.image(img, 0, c, tSide, tHeight);

  return g;
}

//? create shapes with the image, reflections, and rotations
// const shape1 = createShape(img, false, 0);
// const shape2 = createShape(img, true, 1);
// const shape3 = createShape(img, false, 1);
// const shape4 = createShape(img, true, 2);
// const shape5 = createShape(img, false, 1);
// const shape6 = createShape(img, true, 2);
// const shape7 = createShape(img, false, 0);
// const shape8 = createShape(img, true, 1);
// const shape9 = createShape(img, false, 1);
// const shape10 = createShape(img, true, 1);
// const shape11 = createShape(img, true, 1);
// const shape12 = createShape(img, true, 1);
// //? draw the shapes
// image(shape1, tSide, 0);
// image(shape2, 2 * tSide + 20, 0);
// image(shape3, -20, 0);
// image(shape4, 2 * tSide + 20, tHeight + 20);
// image(shape5, tSide, tHeight + 20);
// image(shape6, -20, tHeight + 20);

// function createPattern() {
//   for (let x = 0; x < width; x += tSide) {
//     for (let y = 0; y < height; y += tHeight) {
//     image(img, x, y, tSide, tHeight);
//     image(img, -x, -y, tSide, tHeight);
//     image(img, x, -y, tSide, tHeight);
//     image(img, -x, y, tSide, tHeight);
//     }
//   }
// }

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
