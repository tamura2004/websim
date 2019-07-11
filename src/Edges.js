export default class Edges {
  constructor() {
    this.right = [];
    this.left = [];
  }

  * both() {
    for (const edge of this.right) {
      yield edge;
    }
    for (const edge of this.left) {
      yield edge;
    }
  }
}
