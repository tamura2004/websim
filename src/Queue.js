import { Right, Left } from '@/Direction.js';

export default class Queue {
  constructor() {
    this.right = [];
    this.left = [];
  }

  get both() {
    return this.right.concat(this.left);
  }

  isNotEmpty(direction) {
    if (direction === undefined) {
      return this.right.length > 0 || this.left.length > 0;
    } else if (direction === Right) {
      return this.right.length > 0;
    } else if (direction === Left) {
      return this.left.length > 0;
    }
  }
}
