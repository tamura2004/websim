import Node from '@/Node.js';

export default class Web extends Node {
  static create(p5) {
    const web = [];
    for (let i = 1; i < 4; i++) {
      web.push(new Web(p5, i));
    }
    return web;
  }

  constructor(p, i) {
    const position = p.createVector(700, i * 200 - 100);
    super(p, `WEB#${i}`, 'white', position, 1, 30);
  }
}