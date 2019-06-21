const Vector = p5.Vector;

class Edge {
  constructor(v, node) {
    this.v = v;
    this.node = node;
    this.tasks = [];
  }

  push(task) {
    task.v = this.v;
    task.dest = this.node.pos;
  }

  next() {
    for (const task of this.tasks) {
      if (task.arrive) {
        this.node.push(this.tasks.shift());
      }
    }
  }
}

class Node {
  constructor(pos, cpu, work, dir, edge) {
    this.pos = pos; // p5.Vector .. position
    this.cpu = cpu; // CPU power produced by this node
    this.work = work; // CPU power required for each task
    this.dir = dir; // 1 for upstream, -1 for downstream
    this.edge = edge;
    this.tasks = [];
  }

  push(task) {
    task.wait = this.work;
    task.v = 2;
    task.dest = new Vector(this.pos.x - 30 * this.tasks.length * this.dir, this.pos.y);
    this.tasks.push(task);
  }

  next() {
    let pool = this.cpu;
    while (pool > 0 && this.tasks.length > 0) {
      const task = this.tasks[0];
      if (task.wait > pool) {
        task.wait -= pool;
        pool = 0;
      } else {
        pool -= task.wait;
        task.wait = 0;
        this.tasks.shift();
        if (this.edge !== undefined) {
          this.edge.push(task);
        }
      }
    }
    for (let i = 0; i < this.tasks.length; i++) {
      task.dest = new Vector(this.pos.x - 30 * i, this.pos.y);
    }
  }
}

class Ball {
  constructor(color) {
    this.dest = dest; // destination position p5.Vector
    this.p = path.shift()[0].copy();
    const q = path.shift();
    this.q = q[0];
    this.wait = q[1];
    this.path = path;
    this.visible = true;
    this.color = color;
  }

  get dist() {
    return p5.Vector.dist(this.p, this.q);
  }

  get v() {
    const l = this.path.length;
    // const speed = [5, 3, 2, 0].includes(l) ? 4 : 8;
    const speed = 4;
    return p5.Vector.sub(this.q, this.p).normalize().mult(speed);
  }

  move() {
    if (this.dist < 10) {
      this.park();
    } else {
      this.p = this.p.add(this.v);
    }
  }

  park() {
    this.wait--;
    if (this.wait === 0) {
      this.nextDestination();
      // this.wait = 20;
    }
  }

  nextDestination() {
    if (this.path.length > 0) {
      const q = this.path.shift();
      this.q = q[0];
      this.wait = q[1];
    } else {
      this.visible = false;
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.p.x, this.p.y, 15);
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

  const PC = [1,2,3,4,5].map((i) => createVector(100, i * 100 ));
  const LB = createVector(400, 300);
  const WEB = [1,2,3].map((i) => createVector(700, i * 200 - 100));
  const DB = createVector(1000, 300);
  const NODES = [...PC, LB, ...WEB, DB];
  const colors = ['#c93a40', '#0074bf', '#56a764', '#de9610', '#65ace4', '#f2cf01', '#d16b16'];

  // network
  for (let i = 0; i < 5; i++) {
    fill(0);
    line(PC[i].x, PC[i].y, LB.x, LB.y);
    fill(colors[i]);
    rect(PC[i].x - WIDTH / 2, PC[i].y - HEIGHT / 2, WIDTH, HEIGHT);
    fill(255);
    text(`PC#${i+1}`, PC[i].x - WIDTH * 0.4, PC[i].y);
  }
  for (let i = 0; i < 3; i++) {
    fill(0);
    line(LB.x, LB.y, WEB[i].x, WEB[i].y);
    line(DB.x, DB.y, WEB[i].x, WEB[i].y);
    fill(255);
    rect(WEB[i].x - WIDTH / 2, WEB[i].y - HEIGHT / 2, WIDTH, HEIGHT);
    fill(0);
    text(`WEB#${i+1}`, WEB[i].x - WIDTH * 0.4, WEB[i].y);
  }

  fill(255);
  rect(LB.x - WIDTH / 2, LB.y - HEIGHT / 2, WIDTH, HEIGHT);
  rect(DB.x - WIDTH / 2, DB.y - HEIGHT / 2, WIDTH, HEIGHT);
  fill(0);
  textSize(18);
  text('LB', LB.x - WIDTH * 0.4, LB.y);
  text('DB', DB.x - WIDTH * 0.4, DB.y);

  const pcIndex = random([0,1,2,3,4]);
  const path = [
    [ PC[pcIndex], 1 ],
    [ LB, 1 ],
    [ random(WEB), 100 ],
    [ DB, 300 ],
    [ random(WEB), 100 ],
    [ LB, 1 ],
    [ PC[pcIndex], 1 ],
  ];
  const rv = p5.Vector.random2D().mult(20);
  if (random() < 0.1) {
    balls.push(new Ball(
      path.map((p) => [p[0].copy().add(rv), p[1]]),
      color(colors[pcIndex]),
    ));
  }

  for (const ball of balls) {
    ball.move();
    ball.draw();
  }

  balls = balls.filter((ball) => ball.visible);
}
