"use strict";

require("core-js/modules/es6.string.link");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.function.name");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = p5.Vector;
var WIDTH = 80;
var HEIGHT = 60;
var PC = [];
var WEB = [];
var NODES = [];
var LB = null;
var DB = null;
var colors = ['#c93a40', '#0074bf', '#56a764', '#de9610', '#65ace4', '#f2cf01', '#d16b16'];
var WAN_SPEED = 2;
var LAN_SPEED = 4;

var Queue =
/*#__PURE__*/
function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.right = [];
    this.left = [];
  }

  _createClass(Queue, [{
    key: "both",
    get: function get() {
      return this.right.concat(this.left);
    }
  }]);

  return Queue;
}();

var Nodes =
/*#__PURE__*/
function () {
  function Nodes() {
    _classCallCheck(this, Nodes);

    this.right = null;
    this.left = null;
  }

  _createClass(Nodes, [{
    key: "shape",
    get: function get() {
      return this.right ? this.left ? 'BOTH' : 'RIGHT' : this.left ? 'LEFT' : 'NONE';
    }
  }]);

  return Nodes;
}();

var Edges =
/*#__PURE__*/
function () {
  function Edges() {
    _classCallCheck(this, Edges);

    this.right = [];
    this.left = [];
  }

  _createClass(Edges, [{
    key: "shape",
    get: function get() {
      return this.right.length > 0 ? this.left.length > 0 ? 'BOTH' : 'RIGHT' : this.left.length > 0 ? 'LEFT' : 'NONE';
    }
  }, {
    key: "both",
    get: function get() {
      return this.right.concat(this.left);
    }
  }]);

  return Edges;
}();

var Edge =
/*#__PURE__*/
function () {
  function Edge() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LAN_SPEED;

    _classCallCheck(this, Edge);

    this.speed = speed;
    this.tasks = new Queue();
    this.nodes = new Nodes();
  }

  _createClass(Edge, [{
    key: "reset",
    value: function reset() {
      this.tasks = new Queue();
    }
  }, {
    key: "push",
    value: function push(task) {
      if (task.direction !== 'RIGHT' && task.direction !== 'LEFT') {
        throw new Error("Task direction must be right or left, but it is actually ".concat(task.direction));
      }

      if (this.shape === 'NONE') {
        throw new Error('Cannot add a task to edge that have no node');
      } else if (this.nodes.shape === 'LEFT' || this.nodes.shape === 'BOTH' && task.direction === 'LEFT') {
        task.destination = this.nodes.left.position;
        task.speed = this.speed;
        this.tasks.left.push(task);
      } else {
        task.destination = this.nodes.right.position;
        task.speed = this.speed;
        this.tasks.right.push(task);
      }
    }
  }, {
    key: "next",
    value: function next() {
      var nextRightQueue = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tasks.right[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var task = _step.value;
          task.next();

          if (task.arrive) {
            this.nodes.right.push(task);
          } else {
            nextRightQueue.push(task);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.tasks.right = nextRightQueue;
      var nextLeftQueue = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.tasks.left[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _task = _step2.value;

          _task.next();

          if (_task.arrive) {
            this.nodes.left.push(_task);
          } else {
            nextLeftQueue.push(_task);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.tasks.left = nextLeftQueue;
    }
  }, {
    key: "draw",
    value: function draw() {
      if (this.nodes.shape === 'BOTH') {
        fill(0);
        line(this.nodes.left.position.x, this.nodes.left.position.y, this.nodes.right.position.x, this.nodes.right.position.y);
      }
    }
  }]);

  return Edge;
}();

var Node =
/*#__PURE__*/
function () {
  function Node(name, color, position, cpu, power) {
    _classCallCheck(this, Node);

    this.name = name;
    this.color = color;
    this.position = position;
    this.cpu = cpu;
    this.power = power; // CPU power consumed by a task to exit

    this.tasks = new Queue();
    this.edges = new Edges();
    this.webId = 0;
  }

  _createClass(Node, [{
    key: "reset",
    value: function reset() {
      this.tasks = new Queue();
    }
  }, {
    key: "link",
    value: function link(nodes, direction) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var node = _step3.value;
          var edge = new Edge();

          if (direction === 'RIGHT') {
            if (node.name === 'LB') {
              edge.speed = WAN_SPEED;
            }

            edge.nodes.left = this;
            edge.nodes.right = node;
            this.edges.right.push(edge);
          } else if (direction === 'LEFT') {
            if (this.name === 'LB') {
              edge.speed = WAN_SPEED;
            }

            edge.nodes.right = this;
            edge.nodes.left = node;
            this.edges.left.push(edge);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: "push",
    value: function push(task) {
      task.power = this.power;
      task.speed = 1;
      task.position = this.position.copy();

      if (task.direction === 'RIGHT') {
        task.destination = this.position.copy();
        this.tasks.right.push(task);
      } else if (task.direction === 'LEFT') {
        task.destination = this.position.copy();
        this.tasks.left.push(task);
      } else {
        throw new Error("Bad task direction: ".concat(task.direction));
      }
    }
  }, {
    key: "next",
    value: function next() {
      var work = this.cpu;

      while (work > 0 && (this.tasks.right.length > 0 || this.tasks.left.length > 0)) {
        if (this.tasks.right.length > 0) {
          if (this.tasks.right[0].power <= work) {
            var task = this.tasks.right.shift();
            work -= task.power;
            task.power = 0;

            if (this.edges.shape === 'BOTH' || this.edges.shape === 'RIGHT') {
              if (this.name === 'LB') {
                this.edges.right[this.webId].push(task);
                task.webId = this.webId;
                this.webId = (this.webId + 1) % 3;
              } else {
                random(this.edges.right).push(task);
              }
            } else if (this.edges.shape === 'LEFT') {
              task.direction = 'LEFT';
              this.edges.left[task.webId].push(task); // this.edges.left[0].push(task);
            } else {
              throw new Error("Node ".concat(this.name, " has no edge"));
            }
          } else {
            this.tasks.right[0].power -= work / 2;
            work /= 2;
          }
        }

        if (this.tasks.left.length > 0) {
          if (this.tasks.left[0].power <= work) {
            var _task2 = this.tasks.left.shift();

            work -= _task2.power;
            _task2.power = 0;

            if (this.edges.shape === 'BOTH' || this.edges.shape === 'LEFT') {
              var i = colors.indexOf(_task2.color);
              var edge = i !== -1 && this.name === 'LB' ? this.edges.left[i] : random(this.edges.left);
              edge.push(_task2);
            } else if (this.edges.shape === 'RIGHT') {// I'm home.
            } else {
              throw new Error('Node has no edge');
            }
          } else {
            this.tasks.left[0].power -= work;
            work = 0;
          }
        }
      }

      for (var _i = 0; _i < this.tasks.right.length; _i++) {
        this.tasks.right[_i].destination = new Vector(this.position.x + 20, this.position.y + 20 * _i);
      }

      for (var _i2 = 0; _i2 < this.tasks.left.length; _i2++) {
        this.tasks.left[_i2].destination = new Vector(this.position.x - 20, this.position.y - 20 * _i2);
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.edges.both[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _edge = _step4.value;

          _edge.next();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = this.tasks.both[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _task3 = _step5.value;

          _task3.next();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      fill(this.color);
      rect(this.position.x - WIDTH / 2, this.position.y - HEIGHT / 2, WIDTH, HEIGHT);

      if (this.color === 'white') {
        fill('black');
      } else {
        fill('white');
      }

      text(this.name, this.position.x - WIDTH * 0.4, this.position.y - HEIGHT * 0.2);
      text("".concat(this.tasks.both.length), this.position.x - WIDTH * 0.4, this.position.y);
    }
  }, {
    key: "createTask",
    value: function createTask() {
      this.push(new Task(this.color));
    }
  }]);

  return Node;
}();

var Task =
/*#__PURE__*/
function () {
  function Task() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'RIGHT';

    _classCallCheck(this, Task);

    this.color = color;
    this.direction = direction;
    this.position = null;
    this.destination = null;
    this.speed = null;
    this.power = null; // Consumed CPU power to exit from node

    this.size = 15;
    this.webId = null;
  }

  _createClass(Task, [{
    key: "next",
    value: function next() {
      if (this.position === null || this.destination === null || this.speed === null) {
        throw new Error('Bad task property');
      }

      var v = p5.Vector.sub(this.destination, this.position).normalize().mult(this.speed);
      this.position.add(v);
    }
  }, {
    key: "draw",
    value: function draw() {
      fill(this.color);
      ellipse(this.position.x, this.position.y, this.size);
      fill('black'); // text(String(this), this.position.x, this.position.y);
    }
  }, {
    key: "distance",
    get: function get() {
      if (this.destination === null || this.position === null) {
        throw new Error('Bad task property');
      }

      return p5.Vector.dist(this.position, this.destination);
    }
  }, {
    key: "arrive",
    get: function get() {
      return this.distance < this.speed / 2 + 1;
    }
  }]);

  return Task;
}();

var arriveRato;
var lbPower, webPower, dbPower;

function setup() {
  createCanvas(1280, 1024);

  for (var i = 1; i < 6; i++) {
    var position = new Vector(100, 100 * i);
    PC.push(new Node("PC#".concat(i), colors[i - 1], position, 10, 0));
  }

  LB = new Node('LB', 'white', new Vector(400, 300), 3, 30);

  for (var _i3 = 1; _i3 < 4; _i3++) {
    var _position = new Vector(700, _i3 * 200 - 100);

    WEB.push(new Node("WEB#".concat(_i3), 'white', _position, 1, 30));
  }

  DB = new Node('DB', 'white', new Vector(1000, 300), 3, 30);

  for (var _i4 = 0, _PC = PC; _i4 < _PC.length; _i4++) {
    var pc = _PC[_i4];
    pc.link([LB], 'RIGHT');
  }

  LB.link(WEB, 'RIGHT');
  LB.link(PC, 'LEFT');

  for (var _i5 = 0, _WEB = WEB; _i5 < _WEB.length; _i5++) {
    var web = _WEB[_i5];
    web.link([DB], 'RIGHT');
    web.link([LB], 'LEFT');
  }

  DB.link(WEB, 'LEFT');
  NODES = [].concat(PC, [LB], WEB, [DB]);
  var button = createButton('Reset');
  button.position(10, 10);
  button.mousePressed(function () {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = NODES[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var node = _step6.value;
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = node.edges.both[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var edge = _step7.value;
            edge.reset();
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        node.reset();
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  });
  arriveRato = createSlider(0, 10, 2);
  arriveRato.position(200, 10);
  lbPower = createSlider(0, 10, 4);
  lbPower.position(200, 40);
  webPower = createSlider(0, 10, 1);
  webPower.position(200, 70);
  dbPower = createSlider(0, 10, 2);
  dbPower.position(200, 100);
}

function draw() {
  background(255);
  var ratio = arriveRato.value() / 30;
  text("\u30EA\u30AF\u30A8\u30B9\u30C8\u6570\uFF1A".concat(Math.floor(ratio * 30), "tps"), arriveRato.x + arriveRato.width, 15);

  if (random() < ratio) {
    random(PC).createTask();
  }

  text("LB\u6027\u80FD:".concat(lbPower.value(), "tps"), lbPower.x + lbPower.width, 45);
  text("WEB/AP\u6027\u80FD:".concat(webPower.value(), "tps"), webPower.x + webPower.width, 75);
  text("DB\u6027\u80FD:".concat(dbPower.value(), "tps"), dbPower.x + dbPower.width, 105);
  LB.cpu = lbPower.value();
  DB.cpu = dbPower.value();

  for (var _i6 = 0, _WEB2 = WEB; _i6 < _WEB2.length; _i6++) {
    var web = _WEB2[_i6];
    web.cpu = webPower.value();
  }

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = NODES[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var node = _step8.value;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = node.edges.both[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var edge = _step12.value;
          edge.draw();
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return != null) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = NODES[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _node = _step9.value;

      _node.draw();

      _node.next();
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = NODES[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var _node2 = _step10.value;
      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = _node2.edges.both[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var _edge2 = _step13.value;
          var _iteratorNormalCompletion14 = true;
          var _didIteratorError14 = false;
          var _iteratorError14 = undefined;

          try {
            for (var _iterator14 = _edge2.tasks.both[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
              var task = _step14.value;
              task.draw();
            }
          } catch (err) {
            _didIteratorError14 = true;
            _iteratorError14 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion14 && _iterator14.return != null) {
                _iterator14.return();
              }
            } finally {
              if (_didIteratorError14) {
                throw _iteratorError14;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return != null) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
        _iterator10.return();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = NODES[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var _node3 = _step11.value;
      var _iteratorNormalCompletion15 = true;
      var _didIteratorError15 = false;
      var _iteratorError15 = undefined;

      try {
        for (var _iterator15 = _node3.tasks.both[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          var _task4 = _step15.value;

          _task4.draw();
        }
      } catch (err) {
        _didIteratorError15 = true;
        _iteratorError15 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion15 && _iterator15.return != null) {
            _iterator15.return();
          }
        } finally {
          if (_didIteratorError15) {
            throw _iteratorError15;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
        _iterator11.return();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }
}