import { Right, Left } from '@/Direction';

export default class Queue {
  constructor() {
    this.right = [];
    this.left = [];
  }

  *both() {
    for (const task of this.right) {
      yield task;
    }
    for (const task of this.left) {
      yield task;
    }
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
