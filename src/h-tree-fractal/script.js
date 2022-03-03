const generateBtn = document.getElementById("generate-tree-btn");

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

let startX = canvas.width / 2;
let startY = canvas.height - 80;
let curve = 2;
let curve2 = 2;

function drawTree(
  startX,
  startY,
  length,
  angle,
  branchWidth,
  strokeColor,
  fillColor
) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180); // convert to radians
  ctx.moveTo(0, 0);

  if (angle < 0) {
    ctx.bezierCurveTo(curve, -length / 2, curve, -length / 2, 0, -length);
  } else {
    ctx.bezierCurveTo(curve2, -length / 2, -curve2, -length / 2, 0, -length);
  }

  ctx.stroke();

  if (length < 15) {
    ctx.beginPath();
    ctx.arc(0, -length, 20, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  curve = Math.random() * 10 + 10;
  curve2 = Math.random() * 50;

  drawTree(0, -length, length * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -length, length * 0.75, angle - curve, branchWidth * 0.6);

  ctx.restore();
}

drawTree(startX, startY, 120, 0, 15, "brown", "green");

function generateRandomTree() {
  let angle = 0;
  const len = Math.floor(Math.random() * 20 + 100);
  const branchWidth = Math.random() * 50 + 1;
  const strokeColor =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  const fillColor =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateBtn.style.background = strokeColor;
  drawTree(startX, startY, len, angle, branchWidth, strokeColor, fillColor);
}

generateBtn.addEventListener("click", generateRandomTree);
