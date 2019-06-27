import Network from '@/Network.js';
import Widget from '@/Widget.js';
import Button from '@/Button.js';

new p5((p) => {
  let network, widget;

  p.setup = function() {
    p.createCanvas(1280, 1024);
    network = new Network(p);
    widget = new Widget(p, network);
  };

  p.draw = function() {
    p.background(255);
    widget.draw();

    // New task arrive
    if (p.random() < widget.requestSlider.value / 150) {
      p.random(network.pc).createTask();
    }

    // Update nodes cpu power
    widget.update();

    // Reset task if mouse pressed
    if (p.mouseIsPressed) {
      // network.reset();
    }

    for (const node of network.nodes) {
      for (const edge of node.edges.both) {
        edge.draw();
      }
    }

    for (const node of network.nodes) {
      node.draw();
      node.next();
    }
    for (const node of network.nodes) {
      for (const edge of node.edges.both) {
        for (const task of edge.tasks.both) {
          task.draw();
        }
      }
    }
    for (const node of network.nodes) {
      for (const task of node.tasks.both) {
        task.draw();
      }
    }
  }
});
