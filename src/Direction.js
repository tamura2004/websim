export default class Direction {
  constructor(value) {
    if (value !== 'RIGHT' && value !== 'LEFT') {
      throw new Error(`Direction must be right or left, but it is initialized by ${value}`);
    }
    this.value = value;
  }

  static get Right() {
    return new Direction('RIGHT');
  }

  static get Left() {
    return new Direction('LEFT');
  }

  get isRight() {
    return this.value === 'RIGHT';
  }

  get isLeft() {
    return this.value === 'LEFT';
  }

  get key() {
    return this.isRight ? 'right': 'left';
  }

  get other() {
    return this.isRight ? 'left': 'right';
  }

  setRight() {
    this.value = 'RIGHT';
  }

  setLeft() {
    this.value = 'LEFT';
  }
}
