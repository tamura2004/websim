import Node from '@/Node.js';

export default class Lb extends Node {
  constructor(p) {
    super(p, 'LB', 'white', p.createVector(400, 300), 3, 30);
  }
}
