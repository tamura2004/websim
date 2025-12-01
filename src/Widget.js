import Slider from '@/Slider';
import Button from '@/Button';

export default class Widget {
  constructor(p5, network) {
    this.p5 = p5;
    this.network = network;

    new Button(p5, 'Reset', 10, 10, () => network.reset());
    new Button(p5, 'Add Req', 10, 40, () => network.createTask());

    this.requestSlider = new Slider(p5, 0, 10, 3, 200, 10, (value) => `リクエスト数：${value}tps`);
    this.lbSlider      = new Slider(p5, 0, 10, 3, 200, 40, (value) => `LB性能:${value}tps`);
    this.webCountSlider = new Slider(p5, 1, 6, 3, 200, 70, (value) => `WEB/AP台数:${value}台`);
    this.webSlider     = new Slider(p5, 0, 10, 1, 200, 100, (value) => `WEB/AP性能:${value}tps`);
    this.dbSlider      = new Slider(p5, 0, 10, 3, 200, 130, (value) => `DB性能:${value}tps`);
  }

  draw() {
    this.requestSlider.draw();
    this.lbSlider.draw();
    this.webCountSlider.draw();
    this.webSlider.draw();
    this.dbSlider.draw();
  }

  next() {
    // Add new task
    if (this.p5.random() < this.requestSlider.value / 150) {
      this.p5.random(this.network.pc).createTask();
    }

    // Update web server count
    this.network.updateWebCount(this.webCountSlider.value);

    // Update nodes cpu power
    this.network.lb.cpu = this.lbSlider.value;
    this.network.db.cpu = this.dbSlider.value;
    for (const web of this.network.web) {
      web.cpu = this.webSlider.value;
    }
  }
}