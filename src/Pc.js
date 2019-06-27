import Node from '@/Node.js';
import Colors from '@/Colors.js';

export default class Pc extends Node {
  constructor(p, i) {
    const position = p.createVector(100, 100 * i);
    super(p, `PC#${i}`, Colors[i - 1], position, 10, 0);
  }
}
