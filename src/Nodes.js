import { Right, Left, None, Both } from '@/Direction.js';

export default class Nodes {
  constructor() {
    this.right = null;
    this.left = null;
  }

  get shape() {
    return this.right ? (this.left ? Both : Right) : (this.left ? Left : None);
  }

  get isLeft() {
    return this.shape === Left;
  }

  get isBoth() {
    return this.shape === Both;
  }

  taskDirection(task) {
    return this.isLeft || (this.isBoth && task.direction.isLeft) ? Left : Right;
  }
}
