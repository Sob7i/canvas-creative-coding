
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D()
    this.acc = createVector(0, 0)
    this.maxSpeed = 5
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  show() {
    stroke(0)
    strokeWeight(4)
    point(this.pos.x, this.pos.y)
  }

  applyForce(force) {
    this.acc.add(force)
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = width
    if (this.pos.x > width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = height
    if (this.pos.y > height) this.pos.y = 0
  }

  follow(vectors) {
    const x = floor(this.pos.x / scl)
    const y = floor(this.pos.y / scl)
    const index = x + y * cols
    const force = vectors[index]
    this.applyForce(force)
  }
}
