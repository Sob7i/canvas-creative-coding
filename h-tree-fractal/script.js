const generateBtn = document.getElementById('generate-tree-btn')
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

function drawTree(startX, startY,length, angle, branchWidth, sColor, fColor, ) {
  ctx.beginPath()
  ctx.save()
  ctx.strokeStyle = sColor
  ctx.fillStyle = fColor
  ctx.lineWidth = branchWidth
  ctx.translate(startX, startY)
  ctx.rotate(angle * Math.PI / 180) // convert to radians
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -length)
  ctx.stroke()

  if (length < 10) {
    ctx.restore()
    return
  }

  drawTree(0, -length, length * 0.75, angle , branchWidth)
  drawTree(0, -length, length * 0.75, angle , branchWidth)

  ctx.restore()
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 2, 'brown', 'green')
 


// Create H-TREE class.
// class Htree {
//   constructor(x, y, size, depth) {
//     this.x = x
//     this.y = y
//     this.size = size
//     this.depth = depth
//   }

//   draw() {
//   }
// }