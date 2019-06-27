import Node from '@/Node.js';

export default class Web extends Node {
  constructor(p, i) {
    const position = p.createVector(700, i * 200 - 100);
    super(p, `WEB#${i}`, 'white', position, 1, 30);
  }
}