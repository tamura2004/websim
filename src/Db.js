import Node from '@/Node.js';
import { DB } from '@/Config.js';

// DB server
export default class Db extends Node {
  constructor(p) {
    super(p, 'DB', 'white', p.createVector(DB.X_POS, DB.Y_POS), DB.CPU, DB.POWER);
  }
}