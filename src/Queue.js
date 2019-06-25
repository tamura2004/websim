export default class Queue {
  constructor() {
    this.right = [];
    this.left = [];
  }

  get both() {
    return this.right.concat(this.left);
  }
}
