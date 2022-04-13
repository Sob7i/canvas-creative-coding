const canvasSketch = require("canvas-sketch");
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: "A4",
  pixelsPerInch: 300,
};

const margin = 400;

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 5;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, height - margin, v)
      
      context.beginPath();
      context.arc(x, y, 100, 0, Math.PI * 2, false);
      context.strokeStyle = "black";
      context.lineWidth = 40;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
