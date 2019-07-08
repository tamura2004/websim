!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}n.r(e);var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.right=[],this.left=[]}var e,n,i;return e=t,(n=[{key:"both",get:function(){return this.right.concat(this.left)}}])&&r(e.prototype,n),i&&r(e,i),t}();function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.right=null,this.left=null}var e,n,r;return e=t,(n=[{key:"shape",get:function(){return this.right?this.left?"BOTH":"RIGHT":this.left?"LEFT":"NONE"}}])&&o(e.prototype,n),r&&o(e,r),t}();function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=4,l=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.speed=n,this.p5=e,this.tasks=new i,this.nodes=new a}var e,n,r;return e=t,(n=[{key:"reset",value:function(){this.tasks=new i}},{key:"taskDirection",value:function(t){if("RIGHT"!==t.direction&&"LEFT"!==t.direction)throw new Error("Task direction must be right or left, but it is actually ".concat(t.direction));if("NONE"===this.shape)throw new Error("Cannot add a task to edge that have no node");return"LEFT"===this.nodes.shape||"BOTH"===this.nodes.shape&&"LEFT"===t.direction?"LEFT":"RIGHT"}},{key:"push",value:function(t){var e=this.taskDirection(t).toLowerCase();t.speed=this.speed,t.destination=this.nodes[e].position,this.tasks[e].push(t)}},{key:"next",value:function(){this._next("RIGHT"),this._next("LEFT")}},{key:"_next",value:function(t){if("right"!==(t=t.toLowerCase())&&"left"!==t)throw new Error("Edge _next called with bad direction: ".concat(t));var e=[],n=!0,r=!1,i=void 0;try{for(var o,a=this.tasks[t][Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;s.next(),s.arrive?this.nodes[t].push(s):e.push(s)}}catch(t){r=!0,i=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}this.tasks[t]=e}},{key:"draw",value:function(){"BOTH"===this.nodes.shape&&(this.p5.fill(0),this.p5.line(this.nodes.left.position.x,this.nodes.left.position.y,this.nodes.right.position.x,this.nodes.right.position.y))}}])&&s(e.prototype,n),r&&s(e,r),t}();function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.right=[],this.left=[]}var e,n,r;return e=t,(n=[{key:"shape",get:function(){return this.right.length>0?this.left.length>0?"BOTH":"RIGHT":this.left.length>0?"LEFT":"NONE"}},{key:"both",get:function(){return this.right.concat(this.left)}}])&&c(e.prototype,n),r&&c(e,r),t}();function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var p=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:128,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"RIGHT";!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.p5=e,this.color=n,this.direction=r,this.position=null,this.destination=null,this.speed=null,this.power=null,this.size=15,this.webId=null}var e,n,r;return e=t,(n=[{key:"next",value:function(){if(null===this.position||null===this.destination||null===this.speed)throw new Error("Bad task property");var t=this.destination.copy().sub(this.position).normalize().mult(this.speed);this.arrive||this.position.add(t)}},{key:"draw",value:function(){this.p5.fill(this.color),this.p5.ellipse(this.position.x,this.position.y,this.size),this.p5.fill("black")}},{key:"distance",get:function(){if(null===this.destination||null===this.position)throw new Error("Bad task property");return p5.Vector.dist(this.position,this.destination)}},{key:"arrive",get:function(){return this.distance<this.speed/2+1}}])&&h(e.prototype,n),r&&h(e,r),t}(),y=["#c93a40","#0074bf","#56a764","#de9610","#65ace4","#f2cf01","#d16b16"];function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var v=function(){function t(e,n,r,o,a,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.p5=e,this.name=n,this.color=r,this.position=o,this.cpu=a,this.power=s,this.tasks=new i,this.edges=new f,this.webId=0,this.cpuUsage=0}var e,n,r;return e=t,(n=[{key:"reset",value:function(){this.tasks=new i}},{key:"link",value:function(t,e){var n=!0,r=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;this._link(s,e)}}catch(t){r=!0,i=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}}},{key:"_link",value:function(t,e){var n="right"===(e=e.toLowerCase())?"left":"right",r=new l(this.p5);("LB"===t.name&&"right"===e||"LB"===this.name&&"left"===e)&&(r.speed=2),r.nodes[n]=this,r.nodes[e]=t,this.edges[e].push(r)}},{key:"push",value:function(t){t.power=this.power,t.speed=1,t.position=this.position.copy(),t.destination=this.position.copy(),this._push(t,t.direction)}},{key:"_push",value:function(t,e){if("right"!==(e=e.toLowerCase())&&"left"!==e)throw new Error("Bad task direction: ".concat(e));this.tasks[e].push(t)}},{key:"next",value:function(){for(var t=this.cpu;t>0&&(this.tasks.right.length>0||this.tasks.left.length>0);){if(this.tasks.right.length>0)if(this.tasks.right[0].power<=t){var e=this.tasks.right.shift();if(t-=e.power,e.power=0,"BOTH"===this.edges.shape||"RIGHT"===this.edges.shape)"LB"===this.name?(this.edges.right[this.webId].push(e),e.webId=this.webId,this.webId=(this.webId+1)%3):this.p5.random(this.edges.right).push(e);else{if("LEFT"!==this.edges.shape)throw new Error("Node ".concat(this.name," has no edge"));e.direction="LEFT",this.edges.left[e.webId].push(e)}}else this.tasks.right[0].power-=t/2,t/=2;if(this.tasks.left.length>0)if(this.tasks.left[0].power<=t){var n=this.tasks.left.shift();if(t-=n.power,n.power=0,"BOTH"===this.edges.shape||"LEFT"===this.edges.shape){var r=y.indexOf(n.color);(-1!==r&&"LB"===this.name?this.edges.left[r]:this.p5.random(this.edges.left)).push(n)}else if("RIGHT"!==this.edges.shape)throw new Error("Node has no edge")}else this.tasks.left[0].power-=t,t=0}this.cpuUsage=100-Math.floor(t/this.cpu*100);for(var i=0;i<this.tasks.right.length;i++)this.tasks.right[i].destination=this.p5.createVector(this.position.x+20,this.position.y+20*i);for(var o=0;o<this.tasks.left.length;o++)this.tasks.left[o].destination=this.p5.createVector(this.position.x-20,this.position.y-20*o);var a=!0,s=!1,u=void 0;try{for(var l,c=this.edges.both[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){l.value.next()}}catch(t){s=!0,u=t}finally{try{a||null==c.return||c.return()}finally{if(s)throw u}}var f=!0,h=!1,p=void 0;try{for(var b,v=this.tasks.both[Symbol.iterator]();!(f=(b=v.next()).done);f=!0){b.value.next()}}catch(t){h=!0,p=t}finally{try{f||null==v.return||v.return()}finally{if(h)throw p}}}},{key:"draw",value:function(){this.p5.fill(this.color),this.p5.rect(this.position.x-40,this.position.y-30,80,60),"white"===this.color?this.p5.fill("black"):this.p5.fill("white"),this.p5.text(this.name,this.position.x-32,this.position.y-12),this.p5.text("".concat(this.tasks.both.length),this.position.x-32,this.position.y),this.p5.text("".concat(this.cpuUsage,"%"),this.position.x-32,this.position.y+12)}},{key:"createTask",value:function(){var t=new p(this.p5,this.color);return this.push(t),t}}])&&b(e.prototype,n),r&&b(e,r),t}();function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function k(t){return(k=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var x=function(t){var e,n,r;function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i);var n=t.createVector(100,100*e);return w(this,k(i).call(this,t,"PC#".concat(e),y[e-1],n,10,0))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(i,v),e=i,r=[{key:"create",value:function(t){for(var e=[],n=1;n<6;n++)e.push(new i(t,n));return e}}],(n=null)&&g(e.prototype,n),r&&g(e,r),i}();function O(t){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e){return!e||"object"!==O(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _(t,e){return(_=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var j=function(t){var e,n,r;function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i);var n=t.createVector(700,200*e-100);return S(this,T(i).call(this,t,"WEB#".concat(e),"white",n,1,30))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_(t,e)}(i,v),e=i,r=[{key:"create",value:function(t){for(var e=[],n=1;n<4;n++)e.push(new i(t,n));return e}}],(n=null)&&E(e.prototype,n),r&&E(e,r),i}();function P(t){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function L(t,e){return!e||"object"!==P(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function C(t){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function R(t,e){return(R=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var B=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),L(this,C(e).call(this,t,"LB","white",t.createVector(400,300),3,30))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&R(t,e)}(e,v),e}();function I(t){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function H(t,e){return!e||"object"!==I(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function F(t){return(F=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function G(t,e){return(G=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var N=function(t){function e(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),H(this,F(e).call(this,t,"DB","white",t.createVector(1e3,300),3,30))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&G(t,e)}(e,v),e}();function A(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function V(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var M=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.p5=e,this.pc=x.create(e),this.lb=new B(e),this.web=j.create(e),this.db=new N(e),this.nodes=[].concat(A(this.pc),[this.lb],A(this.web),[this.db]),this.linkNodes()}var e,n,r;return e=t,(n=[{key:"linkNodes",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,i=this.pc[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.link([this.lb],"RIGHT")}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}this.lb.link(this.web,"RIGHT"),this.lb.link(this.pc,"LEFT");var o=!0,a=!1,s=void 0;try{for(var u,l=this.web[Symbol.iterator]();!(o=(u=l.next()).done);o=!0){var c=u.value;c.link([this.db],"RIGHT"),c.link([this.lb],"LEFT")}}catch(t){a=!0,s=t}finally{try{o||null==l.return||l.return()}finally{if(a)throw s}}this.db.link(this.web,"LEFT")}},{key:"reset",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,i=this.edges()[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.reset()}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}var o=!0,a=!1,s=void 0;try{for(var u,l=this.nodes[Symbol.iterator]();!(o=(u=l.next()).done);o=!0){u.value.reset()}}catch(t){a=!0,s=t}finally{try{o||null==l.return||l.return()}finally{if(a)throw s}}}},{key:"edges",value:regeneratorRuntime.mark(function t(){var e,n,r,i,o,a,s,u,l,c,f,h;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=!0,n=!1,r=void 0,t.prev=3,i=this.nodes[Symbol.iterator]();case 5:if(e=(o=i.next()).done){t.next=36;break}a=o.value,s=!0,u=!1,l=void 0,t.prev=10,c=a.edges.both[Symbol.iterator]();case 12:if(s=(f=c.next()).done){t.next=19;break}return h=f.value,t.next=16,h;case 16:s=!0,t.next=12;break;case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(10),u=!0,l=t.t0;case 25:t.prev=25,t.prev=26,s||null==c.return||c.return();case 28:if(t.prev=28,!u){t.next=31;break}throw l;case 31:return t.finish(28);case 32:return t.finish(25);case 33:e=!0,t.next=5;break;case 36:t.next=42;break;case 38:t.prev=38,t.t1=t.catch(3),n=!0,r=t.t1;case 42:t.prev=42,t.prev=43,e||null==i.return||i.return();case 45:if(t.prev=45,!n){t.next=48;break}throw r;case 48:return t.finish(45);case 49:return t.finish(42);case 50:case"end":return t.stop()}},t,this,[[3,38,42,50],[10,21,25,33],[26,,28,32],[43,,45,49]])})},{key:"tasks",value:regeneratorRuntime.mark(function t(){var e,n,r,i,o,a,s,u,l,c,f,h,p,y,b,v,d,w,k,g,m,x,O,S;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=!0,n=!1,r=void 0,t.prev=3,i=this.edges()[Symbol.iterator]();case 5:if(e=(o=i.next()).done){t.next=36;break}a=o.value,s=!0,u=!1,l=void 0,t.prev=10,c=a.tasks.both[Symbol.iterator]();case 12:if(s=(f=c.next()).done){t.next=19;break}return h=f.value,t.next=16,h;case 16:s=!0,t.next=12;break;case 19:t.next=25;break;case 21:t.prev=21,t.t0=t.catch(10),u=!0,l=t.t0;case 25:t.prev=25,t.prev=26,s||null==c.return||c.return();case 28:if(t.prev=28,!u){t.next=31;break}throw l;case 31:return t.finish(28);case 32:return t.finish(25);case 33:e=!0,t.next=5;break;case 36:t.next=42;break;case 38:t.prev=38,t.t1=t.catch(3),n=!0,r=t.t1;case 42:t.prev=42,t.prev=43,e||null==i.return||i.return();case 45:if(t.prev=45,!n){t.next=48;break}throw r;case 48:return t.finish(45);case 49:return t.finish(42);case 50:p=!0,y=!1,b=void 0,t.prev=53,v=this.nodes[Symbol.iterator]();case 55:if(p=(d=v.next()).done){t.next=86;break}w=d.value,k=!0,g=!1,m=void 0,t.prev=60,x=w.tasks.both[Symbol.iterator]();case 62:if(k=(O=x.next()).done){t.next=69;break}return S=O.value,t.next=66,S;case 66:k=!0,t.next=62;break;case 69:t.next=75;break;case 71:t.prev=71,t.t2=t.catch(60),g=!0,m=t.t2;case 75:t.prev=75,t.prev=76,k||null==x.return||x.return();case 78:if(t.prev=78,!g){t.next=81;break}throw m;case 81:return t.finish(78);case 82:return t.finish(75);case 83:p=!0,t.next=55;break;case 86:t.next=92;break;case 88:t.prev=88,t.t3=t.catch(53),y=!0,b=t.t3;case 92:t.prev=92,t.prev=93,p||null==v.return||v.return();case 95:if(t.prev=95,!y){t.next=98;break}throw b;case 98:return t.finish(95);case 99:return t.finish(92);case 100:case"end":return t.stop()}},t,this,[[3,38,42,50],[10,21,25,33],[26,,28,32],[43,,45,49],[53,88,92,100],[60,71,75,83],[76,,78,82],[93,,95,99]])})},{key:"createTask",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,i=this.pc[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.createTask()}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}}},{key:"draw",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,i=this.edges()[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.draw()}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}var o=!0,a=!1,s=void 0;try{for(var u,l=this.nodes[Symbol.iterator]();!(o=(u=l.next()).done);o=!0){u.value.draw()}}catch(t){a=!0,s=t}finally{try{o||null==l.return||l.return()}finally{if(a)throw s}}var c=!0,f=!1,h=void 0;try{for(var p,y=this.tasks()[Symbol.iterator]();!(c=(p=y.next()).done);c=!0){p.value.draw()}}catch(t){f=!0,h=t}finally{try{c||null==y.return||y.return()}finally{if(f)throw h}}}},{key:"next",value:function(){var t=!0,e=!1,n=void 0;try{for(var r,i=this.nodes[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.next()}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}}}])&&V(e.prototype,n),r&&V(e,r),t}();function q(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var D=function(){function t(e,n,r,i,o,a,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.p5=e,this.label=s,this.slider=this.p5.createSlider(n,r,i),this.slider.position(o,a)}var e,n,r;return e=t,(n=[{key:"draw",value:function(){var t="function"==typeof this.label?this.label(this.value):this.label;this.p5.text(t,this.slider.x+this.slider.width,this.slider.y+5)}},{key:"value",get:function(){return this.slider.value()}}])&&q(e.prototype,n),r&&q(e,r),t}();var z=function t(e,n,r,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.btn=e.createButton(n),this.btn.position(r,i),this.btn.mousePressed(o)};function U(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var W=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.p5=e,this.network=n,new z(e,"Reset",10,10,function(){return n.reset()}),new z(e,"Add Req",10,40,function(){return n.createTask()}),this.requestSlider=new D(e,0,10,3,200,10,function(t){return"リクエスト数：".concat(t,"tps")}),this.lbSlider=new D(e,0,10,3,200,40,function(t){return"LB性能:".concat(t,"tps")}),this.webSlider=new D(e,0,10,1,200,70,function(t){return"WEB/AP性能:".concat(t,"tps")}),this.dbSlider=new D(e,0,10,3,200,100,function(t){return"DB性能:".concat(t,"tps")})}var e,n,r;return e=t,(n=[{key:"draw",value:function(){this.requestSlider.draw(),this.lbSlider.draw(),this.webSlider.draw(),this.dbSlider.draw()}},{key:"next",value:function(){this.p5.random()<this.requestSlider.value/150&&this.p5.random(this.network.pc).createTask(),this.network.lb.cpu=.4*this.lbSlider.value,this.network.db.cpu=.2*this.dbSlider.value;var t=!0,e=!1,n=void 0;try{for(var r,i=this.network.web[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){r.value.cpu=.4*this.webSlider.value}}catch(t){e=!0,n=t}finally{try{t||null==i.return||i.return()}finally{if(e)throw n}}}}])&&U(e.prototype,n),r&&U(e,r),t}();new p5(function(t){var e,n;t.setup=function(){t.createCanvas(1280,1024),e=new M(t),n=new W(t,e)},t.draw=function(){t.background(255),n.next(),n.draw(),e.next(),e.draw()}})}]);