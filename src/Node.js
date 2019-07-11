import Queue from '@/Queue';
import Edge from '@/Edge';
import Edges from '@/Edges';
import Task from '@/Task';

import { Right, Left } from '@/Direction';

const WIDTH = 80;
const HEIGHT = 60;
const WAN_SPEED = 2;

export default class Node {
  constructor(p5, name, color, position) {
    this.p5 = p5;
    this.name = name;
    this.color = color;
    this.position = position;
    this.cpu = 1; // 1TPS
    this.power = 150; // CPU power consumed by a task to exit
    this.tasks = new Queue();
    this.edges = new Edges();
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
    const edge = new Edge(this.p5);
    if ((node.name === 'LB' && direction.isRight) || (this.name === 'LB' && direction.isLeft)) {
      edge.speed = WAN_SPEED;
    }
    edge.nodes[direction.other] = this;
    edge.nodes[direction.key] = node;
    this.edges[direction.key].push(edge);
  }

  push(task) {
    task.power = this.power;
    task.speed = 1;
    task.position = this.position.copy();
    task.destination = this.position.copy();
    this._push(task, task.direction);
  }

  _push(task, direction) {
    this.tasks[direction.key].push(task);
  }

  dispatch(task) {
    this.p5.random(this.edges[task.direction.key]).push(task);
  }

  _next(direction) {
    let work = this.cpu;
    const tasks = this.tasks[direction.key];
    for (const task of tasks) {
      if (work === 0) {
        break;
      }
      if (task.power <= work) {
        work -= task.power;
        task.power = 0;
      } else {
        task.power -= work;
        work = 0;
      }
    }
    while (tasks.length > 0 && tasks[0].power === 0) {
      const task = tasks.shift();
      this.dispatch(task);
    }
    tasks.forEach((task, index) => {
      const offset = task.direction.offset;
      task.destination = this.p5.createVector(this.position.x + offset, this.position.y + offset * index);
    });
  }

  next() {
    this._next(Right);
    this._next(Left);

    for (const edge of this.edges.both()) {
      edge.next();
    }
    for (const task of this.tasks.both()) {
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
    this.p5.text(`${this.tasks.right.length + this.tasks.left.length}`, this.position.x - WIDTH * 0.4, this.position.y);
  }

  createTask() {
    const task = new Task(this.p5, this.color, Right);
    this.push(task);
    return task;
  }
}
