import Node from '@/Node';
import { DB } from '@/Config';
import { Left } from '@/Direction';

// DB server
export default class Db extends Node {
  constructor(p) {
    super(p, 'DB', 'white', p.createVector(DB.X_POS, DB.Y_POS));
  }

  push(task) {
    task.direction = Left;
    super.push(task);
  }

  dispatch(task) {
    if (task.direction.isLeft) {
      this.edges.left[task.webId].push(task);
    }
  }
}
