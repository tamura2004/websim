class Ball {
  constructor(path) {
    this.p = path.shift();
    this.q = path.shift();
    this.path = path;
    this.wait = 20;
    this.visible = true;
  }

  get dist() {
    return p5.Vector.dist(this.p, this.q);
  }

  get v() {
    return p5.Vector.sub(this.q, this.p).sub(p5.Vector.random2D().mult(20)).normalize().mult(4);
  }

  move() {
    if (this.dist < 2) {
      this.park();
    } else {
      this.p = this.p.add(this.v);
    }
  }

  park() {
    this.wait--;
    if (this.wait === 0) {
      this.nextDestination();
      this.wait = 20;
    }
  }

  nextDestination() {
    if (this.path.length > 0) {
      this.q = this.path.shift();
    } else {
      this.visible = false;
    }
  }

  draw() {
    ellipse(this.p.x, this.p.y, 20);
    // text(`${this.path}`, this.p.x, this.p.y)
  }
}

let balls = [];

function setup() {
  createCanvas(1280, 1024);
}

function draw() {
  background(255);
  rect(80, 280, 40, 40);
  rect(280, 280, 40, 40);
  rect(480, 80, 40, 40);
  rect(480, 280, 40, 40);
  rect(480, 480, 40, 40);
  rect(680, 280, 40, 40);

  const START = createVector(100, 300);
  const LB = createVector(300, 300);
  const WEB1 = createVector(500, 100);
  const WEB2 = createVector(500, 300);
  const WEB3 = createVector(500, 500);
  const DB = createVector(700, 300);

  if (random() < 0.02) {
    balls.push(new Ball([
      START.copy(),
      LB,
      random([WEB1, WEB2, WEB3]),
      DB,
      random([WEB1, WEB2, WEB3]),
      LB,
      START,
    ]));
  }

  for (const ball of balls) {
    ball.move();
    ball.draw();
  }

  balls = balls.filter((ball) => ball.visible);
}
