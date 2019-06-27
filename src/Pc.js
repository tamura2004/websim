import Node from '@/Node.js';
import Colors from '@/Colors.js';

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
    super(p, `PC#${i}`, Colors[i - 1], position, 10, 0);
  }
}
