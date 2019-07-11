import Node from '@/Node';
import Colors from '@/Colors';

export default class Pc extends Node {
  static create(p5) {
    const pc = [];
    for (let i = 1; i < 6; i++) {
      pc.push(new Pc(p5, i));
    }
    return pc;
  }

  constructor(p, i) {
    const position = p.createVector(100, 100 * i);
    super(p, `PC#${i}`, Colors[i - 1], position);
    this.power = 0;
  }

  dispatch(task) {
    if (task.direction.isLeft) {
      // クライアント到着後は次の転送先は無い
    } else {
      super.dispatch(task);
    }
  }
}
