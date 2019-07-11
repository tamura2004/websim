import Network from '@/Network';
import Widget from '@/Widget';

new p5((p) => {
  let network, widget;

  p.setup = function() {
    p.createCanvas(1280, 1024);
    network = new Network(p);
    widget = new Widget(p, network);
  };

  p.draw = function() {
    p.background(255);

    widget.next();
    widget.draw();

    network.next();
    network.draw();
  }
});
