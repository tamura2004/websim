const Vector = p5.Vector;
const WIDTH = 80;
const HEIGHT = 60;
const PC = [];
const WEB = [];
let NODES = [];
let LB = null;
let DB = null;
const colors = ['#c93a40', '#0074bf', '#56a764', '#de9610', '#65ace4', '#f2cf01', '#d16b16'];

const WAN_SPEED = 2;
const LAN_SPEED = 4;

class Queue {
  constructor() {
    this.right = [];
    this.left = [];
  }

  get both() {
    return this.right.concat(this.left);
  }
}

class Nodes {
  constructor() {
    this.right = null;
    this.left = null;
  }

  get shape() {
    return this.right ? (this.left ? 'BOTH' : 'RIGHT') : (this.left ? 'LEFT' : 'NONE');
  }
}

class Edges {
  constructor() {
    this.right = [];
    this.left = [];
  }

  get shape() {
    return this.right.length > 0 ? (this.left.length > 0 ? 'BOTH' : 'RIGHT') : (this.left.length > 0 ? 'LEFT' : 'NONE');
  }

  get both() {
    return this.right.concat(this.left);
  }
}

class Edge {
  constructor(speed = LAN_SPEED) {
    this.speed = speed;
    this.tasks = new Queue();
    this.nodes = new Nodes();
  }

  reset() {
    this.tasks = new Queue();
  }
  
  push(task) {
    if (task.direction !== 'RIGHT' && task.direction !== 'LEFT') {
      throw new Error(`Task direction must be right or left, but it is actually ${task.direction}`);
    }

    if (this.shape === 'NONE') {
      throw new Error('Cannot add a task to edge that have no node');

    } else if (this.nodes.shape === 'LEFT' || (this.nodes.shape === 'BOTH' && task.direction === 'LEFT')) {
      task.destination = this.nodes.left.position;
      task.speed = this.speed;
      this.tasks.left.push(task);
      
    } else {
      task.destination = this.nodes.right.position;
      task.speed = this.speed;
      this.tasks.right.push(task);
    }
  }

  next() {
    const nextRightQueue = [];
    for (const task of this.tasks.right) {
      task.next();
      if (task.arrive) {
        this.nodes.right.push(task);
      } else {
        nextRightQueue.push(task);
      }
    }
    this.tasks.right = nextRightQueue;

    const nextLeftQueue = [];
    for (const task of this.tasks.left) {
      task.next();
      if (task.arrive) {
        this.nodes.left.push(task);
      } else {
        nextLeftQueue.push(task);
      }
    }
    this.tasks.left = nextLeftQueue;
  }

  draw() {
    if (this.nodes.shape === 'BOTH') {
      fill(0);
      line(this.nodes.left.position.x, this.nodes.left.position.y, this.nodes.right.position.x, this.nodes.right.position.y);
    }
  }
}

class Node {
  constructor(name, color, position, cpu, power) {
    this.name = name;
    this.color = color;
    this.position = position;
    this.cpu = cpu;
    this.power = power; // CPU power consumed by a task to exit
    this.tasks = new Queue();
    this.edges = new Edges();
    this.webId = 0;
  }

  reset() {
    this.tasks = new Queue();
  }

  link(nodes, direction) {
    for (const node of nodes) {
      const edge = new Edge();
      if (direction === 'RIGHT') {
        if (node.name === 'LB') {
          edge.speed = WAN_SPEED;
        }
        edge.nodes.left = this;
        edge.nodes.right = node;
        this.edges.right.push(edge);
      } else if (direction === 'LEFT') {
        if (this.name === 'LB') {
          edge.speed = WAN_SPEED;
        }
        edge.nodes.right = this;
        edge.nodes.left = node;
        this.edges.left.push(edge);
      }
    }
  }

  push(task) {
    task.power = this.power;
    task.speed = 1;
    task.position = this.position.copy();
    if (task.direction === 'RIGHT') {
      task.destination = this.position.copy();
      this.tasks.right.push(task);
    } else if (task.direction === 'LEFT') {
      task.destination = this.position.copy();
      this.tasks.left.push(task);
    } else {
      throw new Error(`Bad task direction: ${task.direction}`);
    }
  }

  next() {
    let work = this.cpu;
    while (work > 0 && (this.tasks.right.length > 0 || this.tasks.left.length > 0)) {
      if (this.tasks.right.length > 0) {
        if (this.tasks.right[0].power <= work) {
          const task = this.tasks.right.shift();
          work -= task.power;
          task.power = 0;
          if (this.edges.shape === 'BOTH' || this.edges.shape === 'RIGHT') {
            if (this.name === 'LB') {
              this.edges.right[this.webId].push(task);
              task.webId = this.webId;
              this.webId = (this.webId + 1) % 3;
            } else {
              random(this.edges.right).push(task);
            }
          } else if (this.edges.shape === 'LEFT' ) {
            task.direction = 'LEFT';
            this.edges.left[task.webId].push(task);
            // this.edges.left[0].push(task);
          } else {
            throw new Error(`Node ${this.name} has no edge`);
          }
        } else {
          this.tasks.right[0].power -= work / 2;
          work /= 2;
        }
      }
      if (this.tasks.left.length > 0) {
        if (this.tasks.left[0].power <= work) {
          const task = this.tasks.left.shift();
          work -= task.power;
          task.power = 0;
          if (this.edges.shape === 'BOTH' || this.edges.shape === 'LEFT') {
            const i = colors.indexOf(task.color);
            const edge = (i !== -1 && this.name === 'LB') ? this.edges.left[i] : random(this.edges.left);
            edge.push(task);
          } else if (this.edges.shape === 'RIGHT') {
            // I'm home.
          } else {
            throw new Error('Node has no edge');
          }
        } else {
          this.tasks.left[0].power -= work;
          work = 0;
        }
      }
    }
    for (let i = 0; i < this.tasks.right.length; i++) {
      this.tasks.right[i].destination = new Vector(this.position.x + 20, this.position.y + 20 * i);
    }
    for (let i = 0; i < this.tasks.left.length; i++) {
      this.tasks.left[i].destination = new Vector(this.position.x - 20, this.position.y - 20 * i);
    }
    for (const edge of this.edges.both) {
      edge.next();
    }
    for (const task of this.tasks.both) {
      task.next();
    }
  }

  draw() {
    fill(this.color);
    rect(this.position.x - WIDTH / 2, this.position.y - HEIGHT / 2, WIDTH, HEIGHT);
    if (this.color === 'white') {
      fill('black');
    } else {
      fill('white');
    }
    text(this.name, this.position.x - WIDTH * 0.4, this.position.y - HEIGHT * 0.2);
    text(`${this.tasks.both.length}`, this.position.x - WIDTH * 0.4, this.position.y);
  }

  createTask() {
    this.push(new Task(this.color));
  }
}

class Task {
  constructor(color = 128, direction = 'RIGHT') {
    this.color = color;
    this.direction = direction;
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
    const v = p5.Vector.sub(this.destination, this.position).normalize().mult(this.speed);
    this.position.add(v);
  }

  draw() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);
    fill('black');
    // text(String(this), this.position.x, this.position.y);
  }
}

let arriveRato;
let lbPower, webPower, dbPower;

function setup() {
  createCanvas(1280, 1024);
  for (let i = 1; i < 6; i++) {
    const position = new Vector(100, 100 * i);
    PC.push(new Node(`PC#${i}`, colors[i - 1], position, 10, 0));
  }
  LB = new Node('LB', 'white', new Vector(400, 300), 3, 30);
  for (let i = 1; i < 4; i++) {
    const position = new Vector(700, i * 200 - 100);
    WEB.push(new Node(`WEB#${i}`, 'white', position, 1, 30));
  }
  DB = new Node('DB', 'white', new Vector(1000, 300), 3, 30)

  for (const pc of PC) {
    pc.link([LB], 'RIGHT');
  }
  LB.link(WEB, 'RIGHT');
  LB.link(PC, 'LEFT');
  for (const web of WEB) {
    web.link([DB], 'RIGHT');
    web.link([LB], 'LEFT');
  }
  DB.link(WEB, 'LEFT');
  NODES = [...PC, LB, ...WEB, DB];

  const button = createButton('Reset');
  button.position(10, 10);
  button.mousePressed(() => {
    for (const node of NODES) {
      for (const edge of node.edges.both) {
        edge.reset();
      }
      node.reset();
    }
  });

  arriveRato = createSlider(0, 10, 2);
  arriveRato.position(200, 10);

  lbPower = createSlider(0, 10, 4);
  lbPower.position(200, 40);

  webPower = createSlider(0, 10, 1);
  webPower.position(200, 70);

  dbPower = createSlider(0, 10, 2);
  dbPower.position(200, 100)
}

function draw() {
  background(255);

  const ratio = arriveRato.value() / 30;
  text(`リクエスト数：${Math.floor(ratio * 30)}tps`, arriveRato.x + arriveRato.width, 15);
  if (random() < ratio) {
    random(PC).createTask();
  }

  text(`LB性能:${lbPower.value()}tps`, lbPower.x + lbPower.width, 45);
  text(`WEB/AP性能:${webPower.value()}tps`, webPower.x + webPower.width, 75);
  text(`DB性能:${dbPower.value()}tps`, dbPower.x + dbPower.width, 105);
  LB.cpu = lbPower.value();
  DB.cpu = dbPower.value();
  for (const web of WEB) {
    web.cpu = webPower.value();
  }

  for (const node of NODES) {
    for (const edge of node.edges.both) {
      edge.draw();
    }
  }
  for (const node of NODES) {
    node.draw();
    node.next();
  }
  for (const node of NODES) {
    for (const edge of node.edges.both) {
      for (const task of edge.tasks.both) {
        task.draw();
      }
    }
  }
  for (const node of NODES) {
    for (const task of node.tasks.both) {
      task.draw();
    }
  }
}
