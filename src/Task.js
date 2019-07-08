import Direction from '@/Direction.js';

export default class Task {
  constructor(p5, color, direction) {
    this.p5 = p5;
    this.color = color;
    this.direction = new Direction(direction.value);
    this.position = null;
    this.destination = null;
    this.speed = null;
    this.power = null; // Consumed CPU power to exit from node
    this.size = 15;
    this.webId = null;
  }

  get distance() {
    if (this.destination === null || this.position === null) {
      throw new Error('Bad task property');
    }
    return p5.Vector.dist(this.position, this.destination);
  }

  get arrive() {
    return this.distance < this.speed / 2 + 1;
  }

  next() {
    if (this.position === null || this.destination === null || this.speed === null) {
      throw new Error('Bad task property');
    }
    const dest = this.destination.copy();
    const v = dest.sub(this.position).normalize().mult(this.speed);
    if (!this.arrive) {
      this.position.add(v);
    }
  }

  draw() {
    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, this.size);
    this.p5.fill('black');
  }
}
