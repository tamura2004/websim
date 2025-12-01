import Pc from '@/Pc';
import Web from '@/Web';
import Lb from '@/Lb';
import Db from '@/Db';
import { Right, Left } from '@/Direction';

export default class Network {
  constructor(p5) {
    this.p5 = p5;
    this.webCount = 3;

    this.pc = Pc.create(p5);
    this.lb = new Lb(p5);
    this.web = Web.create(p5, this.webCount);
    this.db = new Db(p5);
    this.nodes = [...this.pc, this.lb, ...this.web, this.db];
    this.linkNodes();
  }

  linkNodes() {
    for (const pc of this.pc) {
      pc.link([this.lb], Right);
    }
    this.lb.link(this.web, Right);
    this.lb.link(this.pc, Left);
    for (const web of this.web) {
      web.link([this.db], Right);
      web.link([this.lb], Left);
    }
    this.db.link(this.web, Left);
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
      for (const edge of node.edges.both()) {
        yield edge;
      }
    }
  }

  *tasks() {
    for (const edge of this.edges()) {
      for (const task of edge.tasks.both()) {
        yield task;
      }
    }
    for (const node of this.nodes) {
      for (const task of node.tasks.both()) {
        yield task;
      }
    }
  }

  createTask() {
    for(const pc of this.pc) {
      pc.createTask();
    }
  }

  draw() {
    for (const edge of this.edges()) {
      edge.draw();
    }
    for (const node of this.nodes) {
      node.draw();
    }
    for (const task of this.tasks()) {
      task.draw();
    }
  }

  next() {
    for (const node of this.nodes) {
      node.next();
    }
  }

  updateWebCount(count) {
    if (this.webCount === count) {
      return;
    }

    const CENTER_Y = 300;
    const SPACING = 100;

    if (count > this.webCount) {
      // Add new web servers
      for (let i = this.webCount + 1; i <= count; i++) {
        const newWeb = new Web(this.p5, i, count);
        this.web.push(newWeb);
        // Link LB to new web server
        this.lb.link([newWeb], Right);
        // Link new web server to LB and DB
        newWeb.link([this.lb], Left);
        newWeb.link([this.db], Right);
        // Link DB to new web server
        this.db.link([newWeb], Left);
      }

      // Update positions of existing web servers to maintain center alignment
      for (let i = 0; i < this.web.length; i++) {
        const yPos = CENTER_Y + (i + 1 - (count + 1) / 2.0) * SPACING;
        this.web[i].position.y = yPos;
      }
    } else {
      // Remove web servers and preserve their tasks
      const removedWebs = this.web.splice(count);

      // Collect all tasks from removed web servers
      const tasksToPreserve = [];
      for (const removedWeb of removedWebs) {
        // Collect tasks from removed web server
        for (const task of removedWeb.tasks.both()) {
          tasksToPreserve.push(task);
        }

        // Collect tasks from edges connected to this web server
        for (const edge of removedWeb.edges.both()) {
          for (const task of edge.tasks.both()) {
            tasksToPreserve.push(task);
          }
        }
      }

      // Distribute tasks to remaining web servers
      if (this.web.length > 0 && tasksToPreserve.length > 0) {
        for (const task of tasksToPreserve) {
          // Assign to random web server
          const targetIndex = Math.floor(this.p5.random() * this.web.length);
          const targetWeb = this.web[targetIndex];

          // Reset task state for target web server
          task.position = targetWeb.position.copy();
          task.destination = targetWeb.position.copy();
          task.power = targetWeb.power > 0 ? targetWeb.power : 150;
          task.webId = targetIndex; // Update webId to match new server index

          // Push to target web server's task queue
          targetWeb.tasks[task.direction.key].push(task);
        }
      }

      // Remove edges from LB and DB to removed web servers
      for (const removedWeb of removedWebs) {
        this.lb.edges.right = this.lb.edges.right.filter(edge => edge.nodes.right !== removedWeb);
        this.db.edges.left = this.db.edges.left.filter(edge => edge.nodes.left !== removedWeb);
      }

      // Reset LB's webId to be within valid range
      if (this.lb.webId >= count) {
        this.lb.webId = 0;
      }

      // Update positions of remaining web servers to maintain center alignment
      for (let i = 0; i < this.web.length; i++) {
        const yPos = CENTER_Y + (i + 1 - (count + 1) / 2.0) * SPACING;
        this.web[i].position.y = yPos;
      }
    }

    this.webCount = count;
    this.nodes = [...this.pc, this.lb, ...this.web, this.db];
  }
}
