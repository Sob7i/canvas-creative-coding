// Explain the code below

// 1. What is the purpose of the code?
// Answer: The code below is a sketch that uses perlin noise
// to create a flow field. The flow field is used to move particles
// around the screen. The particles are attracted to the flow field 
//and move around the screen.


let inc = 0.01
// const width = 484
// const height = 684
const width = 500
const height = 600
const scl = 20
let cols, rows
const fr = document.getElementById('frame-rate')
let zOffset = 0

const particles = []
let flowField

// The setup function creates a canvas and sets the number of columns and rows
// based on the width and height of the canvas. It also creates an array of particles
// and an array of vectors that will be used to create the flow field.
function setup() {
  createCanvas(width, height)
  // Here we define the scale of the flow field by dividing the width and height of the canvas
  // by the scale. This will give us the number of columns and rows.
  cols = floor(width / scl)
  rows = floor(height / scl)

  // Here we define the flow field as an array of vectors.The number of vectors in the array
  // is equal to the number of columns multiplied by the number of rows. 
  // This is because each vector in the array represents a point in the flow field.
  // and multiplying columns by rows will give us the number of points in the flow field.
  // In our case we have 25 columns and 30 rows so we will have 750 vectors in the array.
  flowField = new Array(cols * rows)

  // for (let i = 0; i < 1000; i++) {
  //   particles[i] = new Particle()
  // }

  noLoop()
}

function draw() {
  background(255)
  let yOffset = 0

  for (let y = 0; y < rows; y++) {
    // Here we define the x offset as 0. This will be used to calculate the angle of the vector
    let xOffset = 0

    for (let x = 0; x < cols; x++) {
      // Here we calculate the index of the vector in the array. The index is calculated by
      // multiplying the x and y coordinates of the vector by the number of columns.
      // Why do we multiply the x and y coordinates by the number of columns?
      // Answer: We multiply the x and y coordinates by the number of columns because
      // the index of the vector in the array is equal to the x coordinate of the vector
      // multiplied by the number of columns plus the y coordinate of the vector.

      // For example, if we have 25 columns and 30 rows, the index of the vector at
      // coordinates (0, 0) will be 0. The index of the vector at coordinates (1, 0) will be 1.
      // The index of the vector at coordinates (0, 1) will be 25. The index of the vector at
      // coordinates (1, 1) will be 26. The index of the vector at coordinates (2, 1) will be 27.
      // The index of the vector at coordinates (1, 2) will be 51. The index of the vector at
      const index = (x + y) * cols
      const angle = noise(xOffset, yOffset, zOffset) * TWO_PI
      const vector = p5.Vector.fromAngle(angle)

      vector.setMag(0.1)

      flowField[index] = vector

      xOffset += inc

      stroke(0)
      strokeWeight(0.5)
      push()
      translate(x * scl, y * scl)
      rotate(vector.heading())
      line(0, 0, scl, 0)
      pop()
    }

    yOffset += inc
    zOffset += 0.0001
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField)
    particles[i].update()
    particles[i].show()
    particles[i].edges()
  }

  fr.innerText = `Frame Rate: ${floor(frameRate())}`
}

function windowResized() {
  resizeCanvas(width, height)
}

function draw() {
  background(255); // Clear the screen with a white background

  let yOffset = 0; // Initialize the y-offset for the noise function

  for (let y = 0; y < rows; y++) { // Loop through each row of the flow field
    let xOffset = 0; // Initialize the x-offset for the noise function

    for (let x = 0; x < cols; x++) { // Loop through each column of the flow field
      const index = (x + y) * cols; // Calculate the index of the current grid cell in the flow field array

      // Generate a random angle based on the noise function at the current x, y, and z offsets
      const angle = noise(xOffset, yOffset, zOffset) * TWO_PI;

      // Convert the angle to a 2D vector using the p5.js vector library
      const vector = p5.Vector.fromAngle(angle);

      // Scale the vector
      vector.setMag(0.1);

      // Store the vector in the flow field array
      flowField[index] = vector;

      // Increment the x-offset for the noise function
      xOffset += inc;

      // Draw a line to visualize the flow field
      stroke(0);
      strokeWeight(0.5);
      push();
      translate(x * scl, y * scl);
      rotate(vector.heading());
      line(0, 0, scl, 0);
      pop();
    }

    // Increment the y-offset for the noise function
    yOffset += inc;

    // Increment the z-offset for the noise function to change the Perlin noise seed for the next frame
    zOffset += 0.0001;
  }

  for (let i = 0; i < particles.length; i++) { // Loop through each particle in the particles array
    // Update the particle's position and velocity based on the flow field
    particles[i].follow(flowField);
    particles[i].update();

    // Draw the particle on the screen
    particles[i].show();

    // Check if the particle goes off the screen and reset it if necessary
    particles[i].edges();
  }
}
