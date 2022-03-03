const p = new p5();

function setup() {
  const canvas = p
    .createCanvas(window.innerWidth, window.innerHeight)
    .parent("#sketch-holder");
  p.background(48);
  p.noLoop();

  return canvas;
}

function draw() {
  p.fill(color(random(255), random(200, 210), random(200, 255), 78)); // blue
  petals();
  stalk();
}

function petals() {
  p.translate(width / 4, 40);

  for (var i = 0; i < 200; i++) {
    p.beginShape();
    p.curveVertex(0, 0);
    p.curveVertex(400, 350);
    p.curveVertex(random(300), random(700));
    p.curveVertex(random(400), random(400));
    p.endShape();
  }
}

function stalk() {
  for (var i = 0; i < 30; i++) {
    p.fill(color(144, random(200, 255), 144, 60));
    p.beginShape();
    p.curveVertex(400, i);
    p.curveVertex(400, 350);
    p.curveVertex(800, 700);
    p.curveVertex(random(600), random(700));
    p.endShape();
  }
}
