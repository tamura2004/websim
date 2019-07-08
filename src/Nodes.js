import Direction from '@/Direction.js';

export default class Nodes {
  constructor() {
    this.right = null;
    this.left = null;
  }

  get shape() {
    return this.right ? (this.left ? 'BOTH' : 'RIGHT') : (this.left ? 'LEFT' : 'NONE');
  }

  get isLeft() {
    return this.shape === 'LEFT';
  }

  get isBoth() {
    return this.shape === 'BOTH';
  }

  taskDirection(task) {
    return this.isLeft || (this.isBoth && task.direction.isLeft) ? Direction.Left : Direction.Right;
  }
}
