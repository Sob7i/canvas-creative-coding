//? tSide is the side's length of the triangle
let tSide = 150;

//? This is calculating the height of the triangle based on the side length.
let tHeight = (tSide * Math.sqrt(3)) / 2;

//? mask is a graphics object that is used to create a triangular shape,
//? that is used as a mask for the image.
let mask;
let hex;
let g;
let imgs = [];
let img;
let imgIndex = 1;
let imgsCount = 3;

function preload() {
  for (let i = 1; i <= imgsCount; i++) {
    imgs[i - 1] = loadImage(`assets/img${i}.jpg`);
    img = imgs[0];
  }
}

function updateImage() {
  let newImg;

  imgIndex = (imgIndex + 1) % imgsCount;
  if (imgs[imgIndex + 1] === imgsCount) newImg = imgs[0];
  else newImg = imgs[imgIndex];
  return newImg;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  frameRate(10);
  noLoop();
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function touchEnded(event) {
  noLoop();
}

function mouseWheel(event) {
  if (event.delta > 0) {
    loop();
    if (tSide <= 150) {
      img = updateImage();
      tSide = 1750;
      tHeight = (tSide * Math.sqrt(3)) / 2;
      return;
    } else if (tSide > 150 && tSide < 700) {
      tSide -= 5;
      tHeight = (tSide * Math.sqrt(3)) / 2;
    } else {
      tSide -= 30;
      tHeight = (tSide * Math.sqrt(3)) / 2;
    }
  } else {
    if (tHeight >= 2700 || tSide >= 1750) {
      return;
    } else {
      tSide += 30;
      tHeight = (tSide * Math.sqrt(3)) / 2;
    }
  }
}

function draw() {
  // background(0);
  translate(width / 2 - tSide, height / 2 - tHeight / 2);

  //? create a graphics object that is used as a mask
  mask = createGraphics(tSide, tHeight);
  mask.beginShape();
  mask.vertex(0, 0);
  mask.vertex(tSide / 2, tHeight);
  mask.vertex(tSide, 0);
  mask.endShape(CLOSE);
  img.mask(mask);

  hex = createGraphics(mask.width * 2, mask.height * 2 - 1);
  hex.image(createShape(img, false, 0), mask.width / 2, 0);
  hex.image(createShape(img, true, 1), mask.width, 0);
  hex.image(createShape(img, true, 5), 0, 0);
  hex.image(createShape(img, false, 4), 0, mask.height - 1);
  hex.image(createShape(img, true, 3), mask.width / 2, mask.height);
  hex.image(createShape(img, false, 2), mask.width, mask.height - 1);
  image(hex, 0, 0);

  createPattern();
}

function createShape(img, reflect, rotations) {
  //? g is the graphics object where we will draw the shape onto
  g = createGraphics(mask.width, mask.height);
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
  // if (reflect) {
  //   g.scale(-1, 1);
  // }

  //? rotate the image by 60 degrees for each rotation
  g.rotate(radians(rotations * 60));
  //? draw the image onto the graphics object
  g.image(img, 0, c, mask.width, mask.height);

  return g;
}

function createPattern() {
  let isOddRow = false;
  let xOffset = 0;

  for (let y = 0; y < height; y += hex.height / 2 - 1) {
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

//? Hexagon
// hex.image(createShape(img, false, 0), 0, 0);
// hex.image(createShape(img, true, 5), mask.width / 2, 0);
// hex.image(createShape(img, true, 1), -mask.width / 2, 0);
// hex.image(createShape(img, false, 4), -mask.width, mask.height);
// hex.image(createShape(img, true, 3), -mask.width / 4, mask.height);
// hex.image(createShape(img, false, 2), mask.width, mask.height);
// image(hex, 0, 0);

//? Masks
// image(createShape(img, false, 0), x, y);
// image(createShape(img, false, 0), -x, -y);
// image(createShape(img, true, 5), x + mask.width / 2, y);
// image(createShape(img, true, 5), - x - mask.width / 2, -y);
// image(createShape(img, true, 1), x -mask.width / 2, y);
// image(createShape(img, true, 1), -x +mask.width / 2, -y);
// image(createShape(img, false, 4), x -mask.width / 2, y - mask.height);
// image(createShape(img, false, 4), x -mask.width / 2, y - mask.height);
// image(createShape(img, true, 3), x, y - mask.height);
// image(createShape(img, true, 3), x, mask.height - y);
// image(createShape(img, false, 2), x + mask.width / 2, y - mask.height);
// image(createShape(img, false, 2), x + mask.width / 2, y - mask.height);

//? Triangles
// triangle(0, 0, tSide / 2, tHeight,  tSide,0);
// triangle(-tSide / 2, tHeight, 0, 0, tSide / 2, tHeight);
// triangle(tSide / 2, tHeight, tSide , 0, tSide / 2 + tSide, tHeight);
// triangle(0, tHeight * 2, tSide / 2, tHeight, tSide, tHeight * 2);
// triangle(-tSide / 2, tHeight, 0, tHeight * 2, tSide /2 , tHeight);
// triangle(tSide / 2, tHeight, tSide, tHeight * 2, tSide + tSide / 2, tHeight)
