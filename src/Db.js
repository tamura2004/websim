import Node from '@/Node.js';

// DB server
export default class Db extends Node {
  constructor(p) {
    super(p, 'DB', 'white', p.createVector(1000, 300), 3, 30)
  }
}