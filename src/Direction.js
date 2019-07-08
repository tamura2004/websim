const R = 'right';
const L = 'left';

class Direction {
  constructor(value) {
    this.value = value;
  }

  get isRight() {
    return this.value === R;
  }

  get isLeft() {
    return this.value === L;
  }

  get key() {
    return this.isRight ? R : L;
  }

  get other() {
    return this.isRight ? L : R;
  }
}

export const Right = new Direction(R);
export const Left = new Direction(L);
