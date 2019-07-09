import Nodes from '@/Nodes.js';
import Queue from '@/Queue.js';
import { Right, Left, None, Both } from '@/Direction.js';

export default class Edge {
  constructor(p5, speed = 4) {
    this.speed = speed;
    this.p5 = p5;
    this.tasks = new Queue();
    this.nodes = new Nodes();
  }

  reset() {
    this.tasks = new Queue();
  }

  taskDirection(task) {
    if (this.shape === None) {
      throw new Error('Cannot add a task to edge that have no node');
    }
    return this.nodes.taskDirection(task);
  }

  push(task) {
    const direction = this.taskDirection(task);
    task.speed = this.speed;
    task.destination = this.nodes[direction.key].position;
    this.tasks[direction.key].push(task);
  }

  next() {
    this._next(Right);
    this._next(Left);
  }

  _next(direction) {
    const nextQueue = [];
    for (const task of this.tasks[direction.key]) {
      task.next();
      if (task.arrive) {
        this.nodes[direction.key].push(task);
      } else {
        nextQueue.push(task);
      }
    }
    this.tasks[direction.key] = nextQueue;
  }

  draw() {
    if (this.nodes.shape === Both) {
      this.p5.fill(0);
      this.p5.line(this.nodes.left.position.x, this.nodes.left.position.y, this.nodes.right.position.x, this.nodes.right.position.y);
    }
  }
}
