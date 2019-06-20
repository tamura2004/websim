class Ball {
  constructor(path, color) {
    this.p = path.shift();
    this.path = path.map((p) => p.add(p5.Vector.random2D().mult(20)).copy());
    this.q = this.path.shift();
    this.wait = 20;
    this.visible = true;
    this.color = color;
  }

  get dist() {
    return p5.Vector.dist(this.p, this.q);
  }

  get v() {
    const l = this.path.length;
    const speed = [5, 3, 2, 0].includes(l) ? 4 : 8;
    return p5.Vector.sub(this.q, this.p).normalize().mult(speed);
  }

  move() {
    if (this.dist < 4) {
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
    fill(this.color);
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
  const WIDTH = 80;
  const HEIGHT = 60;

  const START = createVector(100, 300);
  const LB = createVector(400, 300);
  const WEB1 = createVector(700, 100);
  const WEB2 = createVector(700, 300);
  const WEB3 = createVector(700, 500);
  const DB = createVector(1000, 300);

  // network
  line(START.x, START.y, LB.x, LB.y);
  line(LB.x, LB.y, WEB1.x, WEB1.y);
  line(LB.x, LB.y, WEB2.x, WEB2.y);
  line(LB.x, LB.y, WEB3.x, WEB3.y);
  line(DB.x, DB.y, WEB1.x, WEB1.y);
  line(DB.x, DB.y, WEB2.x, WEB2.y);
  line(DB.x, DB.y, WEB3.x, WEB3.y);

  // server
  fill(255);
  rect(START.x - WIDTH / 2, START.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(WEB1.x - WIDTH / 2, WEB1.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(WEB2.x - WIDTH / 2, WEB2.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(WEB3.x - WIDTH / 2, WEB3.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(LB.x - WIDTH / 2, LB.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(DB.x - WIDTH / 2, DB.y - HEIGHT / 2, WIDTH, HEIGHT);

  // label
  fill(0);
  textSize(18);
  text('端末', START.x - WIDTH * 0.4, START.y);
  text('LB', LB.x - WIDTH * 0.4, LB.y);
  text('WEB#1', WEB1.x - WIDTH * 0.4, WEB1.y);
  text('WEB#2', WEB2.x - WIDTH * 0.4, WEB2.y);
  text('WEB#3', WEB3.x - WIDTH * 0.4, WEB3.y);
  text('DB', DB.x - WIDTH * 0.4, DB.y);
  fill(50);

  if (random() < 0.03) {
    const WEB = random([WEB1, WEB2, WEB3]);
    balls.push(new Ball(
      [
        START.copy(),
        LB,
        WEB,
        DB,
        WEB,
        LB,
        START,
      ],
      color(random(256),random(256),random(256)),
    ));
  }

  for (const ball of balls) {
    ball.move();
    ball.draw();
  }

  balls = balls.filter((ball) => ball.visible);
}
