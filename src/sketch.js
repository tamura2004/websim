import Node from '@/Node.js';
import Slider from '@/Slider.js';
import Colors from '@/Colors.js';

new p5((p) => {

  const PC = [];
  const WEB = [];
  let NODES = [];
  let LB = null;
  let DB = null;

  let arriveRato;
  let lbPower, webPower, dbPower;

  p.setup = function() {
    p.createCanvas(1280, 1024);

    for (let i = 1; i < 6; i++) {
      const position = p.createVector(100, 100 * i);
      PC.push(new Node(p, `PC#${i}`, Colors[i - 1], position, 10, 0));
    }
    LB = new Node(p, 'LB', 'white', p.createVector(400, 300), 3, 30);
    for (let i = 1; i < 4; i++) {
      const position = p.createVector(700, i * 200 - 100);
      WEB.push(new Node(p, `WEB#${i}`, 'white', position, 1, 30));
    }
    DB = new Node(p, 'DB', 'white', p.createVector(1000, 300), 3, 30)

    for (const pc of PC) {
      pc.link([LB], 'RIGHT');
    }
    LB.link(WEB, 'RIGHT');
    LB.link(PC, 'LEFT');
    for (const web of WEB) {
      web.link([DB], 'RIGHT');
      web.link([LB], 'LEFT');
    }
    DB.link(WEB, 'LEFT');
    NODES = [...PC, LB, ...WEB, DB];

    const button = p.createButton('Reset');
    button.position(10, 10);
    button.mousePressed(() => {
      for (const node of NODES) {
        for (const edge of node.edges.both) {
          edge.reset();
        }
        node.reset();
      }
    });

    const addButton = p.createButton('Add Request');
    addButton.position(10, 40);
    addButton.mousePressed(() => {
      p.random(PC).createTask();
    });

    arriveRato = new Slider(p, 0, 10, 3, 200, 10, (value) => `リクエスト数：${value}tps`);
    lbPower = new Slider(p, 0, 10, 3, 200, 40, (value) => `LB性能:${value}tps`);
    webPower = new Slider(p, 0, 10, 1, 200, 70, (value) => `WEB/AP性能:${value}tps`);
    dbPower = new Slider(p, 0, 10, 3, 200, 100, (value) => `DB性能:${value}tps`);
  }

  p.draw = function() {
    p.background(255);

    arriveRato.draw();
    lbPower.draw();
    webPower.draw();
    dbPower.draw();

    if (p.random() < arriveRato.value / 150) {
      p.random(PC).createTask();
    }
    LB.cpu = lbPower.value * 0.4;
    DB.cpu = dbPower.value * 0.2;
    for (const web of WEB) {
      web.cpu = webPower.value * 0.4;
    }

    for (const node of NODES) {
      for (const edge of node.edges.both) {
        edge.draw();
      }
    }
    for (const node of NODES) {
      node.draw();
      node.next();
    }
    for (const node of NODES) {
      for (const edge of node.edges.both) {
        for (const task of edge.tasks.both) {
          task.draw();
        }
      }
    }
    for (const node of NODES) {
      for (const task of node.tasks.both) {
        task.draw();
      }
    }
  }
});
