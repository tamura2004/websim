import Pc from '@/Pc.js';
import Web from '@/Web.js';
import Lb from '@/Lb.js';
import Db from '@/Db.js';

export default class Network {
  constructor(p5) {
    this.p5 = p5;
    this.pc = [];
    for (let i = 1; i < 6; i++) {
      this.pc.push(new Pc(p5, i));
    }
    this.lb = new Lb(p5);
    this.web = [];
    for (let i = 1; i < 4; i++) {
      this.web.push(new Web(p5, i));
    }
    this.db = new Db(p5);
    this.nodes = [...this.pc, this.lb, ...this.web, this.db];
    this.linkNodes();
  }

  linkNodes() {
    for (const pc of this.pc) {
      pc.link([this.lb], 'RIGHT');
    }
    this.lb.link(this.web, 'RIGHT');
    this.lb.link(this.pc, 'LEFT');
    for (const web of this.web) {
      web.link([this.db], 'RIGHT');
      web.link([this.lb], 'LEFT');
    }
    this.db.link(this.web, 'LEFT');
  }

  reset() {
    for (const edge of this.edges()) {
      edge.reset();
    }
    for (const node of this.nodes) {
      node.reset();
    }
  }

  *edges() {
    for (const node of this.nodes) {
      for (const edge of node.edges.both) {
        yield edge;
      }
    }
  }

  createTask() {
    for(const pc of this.pc) {
      pc.createTask();
    }
  }
}
