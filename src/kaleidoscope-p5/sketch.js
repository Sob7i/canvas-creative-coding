function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

let tSide = 150;
let tHeight = (tSide * Math.sqrt(3)) / 2;

function draw() {
  background(220);
  translate(width / 2 - tSide / 2, height / 2 - tHeight / 2);

  // * Draw a Hexagon 
  // // Top middle
  // triangle(tSide, 0, tSide / 2, tHeight, 0, 0);
  // // Top left
  // triangle(0, 0, -tSide / 2, tHeight, tSide / 2, tHeight);
  // // Top right
  // triangle(tSide, 0, tSide + tSide / 2, tHeight, tSide / 2, tHeight);

  // // Bottom right
  // triangle(tSide + tSide / 2, tHeight, tSide, 2* tHeight, tSide / 2, tHeight);
  // // Bottom left
  // triangle(tSide / 2, tHeight, 0, 2 * tHeight, -tSide / 2, tHeight);
  // // Bottom middle
  // triangle(tSide / 2, tHeight, 0, 2 * tHeight, tSide, 2 * tHeight);


  // Fill up the screen with triangles programmatically
  for (let i = 0; i < width; i += tSide) {
    for (let j = 0; j < height; j += tHeight) {
      // Top middle
      triangle(i, j, i + tSide / 2, j + tHeight, i, j + tHeight);
      // Top left
      triangle(i, j, i - tSide / 2, j + tHeight, i + tSide / 2, j + tHeight);
      // Top right
      triangle(i + tSide, j, i + tSide / 2, j + tHeight, i + tSide / 2, j + tHeight);

      // Bottom right
      triangle(i + tSide / 2, j + tHeight, i + tSide, j + 2 * tHeight, i + tSide / 2, j + tHeight);
      // Bottom left
      triangle(i + tSide / 2, j + tHeight, i, j + 2 * tHeight, i - tSide / 2, j + tHeight);
      // Bottom middle
      triangle(i + tSide / 2, j + tHeight, i, j + 2 * tHeight, i, j + 2 * tHeight);
    }
  }

}

function mouseWheel(event) {
  if (event.delta > 0) {
    tSide += 30;
    tHeight = (tSide * Math.sqrt(3)) / 2;
  } else {
    tSide -= 30;
    tHeight = (tSide * Math.sqrt(3)) / 2;
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}