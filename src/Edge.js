import Nodes from '@/Nodes';
import Queue from '@/Queue';
import { Right, Left } from '@/Direction';

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

  push(task) {
    const key = task.direction.key
    task.speed = this.speed;
    task.destination = this.nodes[key].position;
    this.tasks[key].push(task);
  }

  next() {
    this._next(Right);
    this._next(Left);
  }

  _next(direction) {
    const tasks = this.tasks[direction.key];
    for (const task of tasks) {
      task.next();
    }
    while (tasks.length > 0 && tasks[0].arrive) {
      const task = tasks.shift();
      this.nodes[direction.key].push(task);
    }
  }

  draw() {
    this.p5.fill(0);
    this.p5.line(this.nodes.left.position.x, this.nodes.left.position.y, this.nodes.right.position.x, this.nodes.right.position.y);
  }
}
