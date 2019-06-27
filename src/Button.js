export default class Button {
  constructor(p5, label, x, y, cb) {
    this.btn = p5.createButton(label);
    this.btn.position(x, y);
    this.btn.mousePressed(cb);
  }
}
