import Queue from '@/Queue.js';
import Edge from '@/Edge.js';
import Edges from '@/Edges.js';
import Task from '@/Task.js';
import Colors from '@/Colors';

const WIDTH = 80;
const HEIGHT = 60;
const WAN_SPEED = 2;

export default class Node {
  constructor(p5, name, color, position, cpu, power) {
    this.p5 = p5;
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
      this._link(node, direction);
    }
  }

  _link(node, direction) {
    direction = direction.toLowerCase();
    const other = direction === 'right' ? 'left' : 'right';
    const edge = new Edge(this.p5);
    if ((node.name === 'LB' && direction === 'right') || (this.name === 'LB' && direction === 'left')) {
      edge.speed = WAN_SPEED;
    }
    edge.nodes[other] = this;
    edge.nodes[direction] = node;
    this.edges[direction].push(edge);
  }

  push(task) {
    task.power = this.power;
    task.speed = 1;
    task.position = this.position.copy();
    task.destination = this.position.copy();
    this._push(task, task.direction);
  }

  _push(task, direction) {
    direction = direction.toLowerCase();
    if (direction !== 'right' && direction !== 'left') {
      throw new Error(`Bad task direction: ${direction}`);
    }
    this.tasks[direction].push(task);
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
              this.p5.random(this.edges.right).push(task);
            }
          } else if (this.edges.shape === 'LEFT') {
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
            const i = Colors.indexOf(task.color);
            const edge = (i !== -1 && this.name === 'LB') ? this.edges.left[i] : this.p5.random(this.edges.left);
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
      this.tasks.right[i].destination = this.p5.createVector(this.position.x + 20, this.position.y + 20 * i);
    }
    for (let i = 0; i < this.tasks.left.length; i++) {
      this.tasks.left[i].destination = this.p5.createVector(this.position.x - 20, this.position.y - 20 * i);
    }
    for (const edge of this.edges.both) {
      edge.next();
    }
    for (const task of this.tasks.both) {
      task.next();
    }
  }

  draw() {
    this.p5.fill(this.color);
    this.p5.rect(this.position.x - WIDTH / 2, this.position.y - HEIGHT / 2, WIDTH, HEIGHT);
    if (this.color === 'white') {
      this.p5.fill('black');
    } else {
      this.p5.fill('white');
    }
    this.p5.text(this.name, this.position.x - WIDTH * 0.4, this.position.y - HEIGHT * 0.2);
    this.p5.text(`${this.tasks.both.length}`, this.position.x - WIDTH * 0.4, this.position.y);
  }

  createTask() {
    const task = new Task(this.p5, this.color);
    this.push(task);
    return task;
  }
}
