import Nodes from '@/Nodes.js';
import Queue from '@/Queue.js';

const LAN_SPEED = 4;

export default class Edge {
  constructor(p5, speed = LAN_SPEED) {
    this.speed = speed;
    this.p5 = p5;
    this.tasks = new Queue();
    this.nodes = new Nodes();
  }

  reset() {
    this.tasks = new Queue();
  }

  taskDirection(task) {
    if (task.direction !== 'RIGHT' && task.direction !== 'LEFT') {
      throw new Error(`Task direction must be right or left, but it is actually ${task.direction}`);
    }
    if (this.shape === 'NONE') {
      throw new Error('Cannot add a task to edge that have no node');
    }
    return this.nodes.shape === 'LEFT' || (this.nodes.shape === 'BOTH' && task.direction === 'LEFT') ? 'LEFT' : 'RIGHT';
  }

  push(task) {
    const direction = this.taskDirection(task).toLowerCase();
    task.speed = this.speed;
    task.destination = this.nodes[direction].position;
    this.tasks[direction].push(task);
  }

  next() {
    this._next('RIGHT');
    this._next('LEFT');
  }

  _next(direction) {
    direction = direction.toLowerCase();
    if (direction !== 'right' && direction !== 'left') {
      throw new Error(`Edge _next called with bad direction: ${direction}`);
    }
    const nextQueue = [];
    for (const task of this.tasks[direction]) {
      task.next();
      if (task.arrive) {
        this.nodes[direction].push(task);
      } else {
        nextQueue.push(task);
      }
    }
    this.tasks[direction] = nextQueue;
  }

  draw() {
    if (this.nodes.shape === 'BOTH') {
      this.p5.fill(0);
      this.p5.line(this.nodes.left.position.x, this.nodes.left.position.y, this.nodes.right.position.x, this.nodes.right.position.y);
    }
  }
}
