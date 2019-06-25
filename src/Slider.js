export default class Slider {
  constructor(p5, min, max, current, x, y, label) {
    this.p5 = p5;
    this.label = label;
    this.slider = this.p5.createSlider(min, max, current);
    this.slider.position(x, y);
  }

  draw() {
    const label = typeof this.label === 'function' ? this.label(this.value) : this.label;
    this.p5.text(label, this.slider.x + this.slider.width, this.slider.y + 5);
  }

  get value() {
    return this.slider.value();
  }
}
