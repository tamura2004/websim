import Node from '@/Node';
import Colors from '@/Colors';

export default class Lb extends Node {
  constructor(p) {
    super(p, 'LB', 'white', p.createVector(400, 300));
    this.webId = 0;
  }

  dispatch(task) {
    if (task.direction.isRight) {
      // ラウンドロビンでWEBサーバへ振り分け
      this.edges.right[this.webId].push(task);
      task.webId = this.webId;
      this.webId = (this.webId + 1) % this.edges.right.length;
    } else {
      // 発信元クライアントに戻す
      const i = Colors.indexOf(task.color);
      this.edges.left[i].push(task);
    }
  }
}
