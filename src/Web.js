import Node from '@/Node';

const X_POS = 700;
const CENTER_Y = 300;
const SPACING = 100;

export default class Web extends Node {
  static create(p5, count = 3) {
    const web = [];
    for (let i = 1; i <= count; i++) {
      web.push(new Web(p5, i, count));
    }
    return web;
  }

  constructor(p, i, count) {
    // Center align with LB/DB (y=300) with spacing of 100
    const yPos = CENTER_Y + (i - (count + 1) / 2.0) * SPACING;
    const position = p.createVector(X_POS, yPos);
    super(p, `WEB#${i}`, 'white', position);
  }
}