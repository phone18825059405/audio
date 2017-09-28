webpackJsonp([0],{

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) {
  "use strict";
  function e(a, b, c) {
    return setTimeout(j(a, c), b);
  }function f(a, b, c) {
    return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
  }function g(a, b, c) {
    var e;if (a) if (a.forEach) a.forEach(b, c);else if (a.length !== d) for (e = 0; e < a.length;) {
      b.call(c, a[e], e, a), e++;
    } else for (e in a) {
      a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
  }function h(b, c, d) {
    var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n";return function () {
      var c = new Error("get-stack-trace"),
          d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
          f = a.console && (a.console.warn || a.console.log);return f && f.call(a.console, e, d), b.apply(this, arguments);
    };
  }function i(a, b, c) {
    var d,
        e = b.prototype;d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c);
  }function j(a, b) {
    return function () {
      return a.apply(b, arguments);
    };
  }function k(a, b) {
    return (typeof a === "undefined" ? "undefined" : _typeof(a)) == oa ? a.apply(b ? b[0] || d : d, b) : a;
  }function l(a, b) {
    return a === d ? b : a;
  }function m(a, b, c) {
    g(q(b), function (b) {
      a.addEventListener(b, c, !1);
    });
  }function n(a, b, c) {
    g(q(b), function (b) {
      a.removeEventListener(b, c, !1);
    });
  }function o(a, b) {
    for (; a;) {
      if (a == b) return !0;a = a.parentNode;
    }return !1;
  }function p(a, b) {
    return a.indexOf(b) > -1;
  }function q(a) {
    return a.trim().split(/\s+/g);
  }function r(a, b, c) {
    if (a.indexOf && !c) return a.indexOf(b);for (var d = 0; d < a.length;) {
      if (c && a[d][c] == b || !c && a[d] === b) return d;d++;
    }return -1;
  }function s(a) {
    return Array.prototype.slice.call(a, 0);
  }function t(a, b, c) {
    for (var d = [], e = [], f = 0; f < a.length;) {
      var g = b ? a[f][b] : a[f];r(e, g) < 0 && d.push(a[f]), e[f] = g, f++;
    }return c && (d = b ? d.sort(function (a, c) {
      return a[b] > c[b];
    }) : d.sort()), d;
  }function u(a, b) {
    for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) {
      if (c = ma[g], e = c ? c + f : b, e in a) return e;g++;
    }return d;
  }function v() {
    return ua++;
  }function w(b) {
    var c = b.ownerDocument || b;return c.defaultView || c.parentWindow || a;
  }function x(a, b) {
    var c = this;this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
      k(a.options.enable, [a]) && c.handler(b);
    }, this.init();
  }function y(a) {
    var b,
        c = a.options.inputClass;return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z);
  }function z(a, b, c) {
    var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & Ea && d - e === 0,
        g = b & (Ga | Ha) && d - e === 0;c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c;
  }function A(a, b) {
    var c = a.session,
        d = b.pointers,
        e = d.length;c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1);var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = b.center = E(d);b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY);var j = F(b.deltaTime, b.deltaX, b.deltaY);b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b);var k = a.element;o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k;
  }function B(a, b) {
    var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y);
  }function C(a, b) {
    var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;if (b.eventType != Ha && (i > Da || h.velocity === d)) {
      var j = b.deltaX - h.deltaX,
          k = b.deltaY - h.deltaY,
          l = F(i, j, k);e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b;
    } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g;
  }function D(a) {
    for (var b = [], c = 0; c < a.pointers.length;) {
      b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++;
    }return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY };
  }function E(a) {
    var b = a.length;if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) };for (var c = 0, d = 0, e = 0; b > e;) {
      c += a[e].clientX, d += a[e].clientY, e++;
    }return { x: pa(c / b), y: pa(d / b) };
  }function F(a, b, c) {
    return { x: b / a || 0, y: c / a || 0 };
  }function G(a, b) {
    return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma;
  }function H(a, b, c) {
    c || (c = Qa);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return Math.sqrt(d * d + e * e);
  }function I(a, b, c) {
    c || (c = Qa);var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];return 180 * Math.atan2(e, d) / Math.PI;
  }function J(a, b) {
    return I(b[1], b[0], Ra) + I(a[1], a[0], Ra);
  }function K(a, b) {
    return H(b[0], b[1], Ra) / H(a[0], a[1], Ra);
  }function L() {
    this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments);
  }function M() {
    this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
  }function N() {
    this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments);
  }function O(a, b) {
    var c = s(a.touches),
        d = s(a.changedTouches);return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d];
  }function P() {
    this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments);
  }function Q(a, b) {
    var c = s(a.touches),
        d = this.targetIds;if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];var e,
        f,
        g = s(a.changedTouches),
        h = [],
        i = this.target;if (f = c.filter(function (a) {
      return o(a.target, i);
    }), b === Ea) for (e = 0; e < f.length;) {
      d[f[e].identifier] = !0, e++;
    }for (e = 0; e < g.length;) {
      d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++;
    }return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0;
  }function R() {
    x.apply(this, arguments);var a = j(this.handler, this);this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [];
  }function S(a, b) {
    a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b);
  }function T(a) {
    var b = a.changedPointers[0];if (b.identifier === this.primaryTouch) {
      var c = { x: b.clientX, y: b.clientY };this.lastTouches.push(c);var d = this.lastTouches,
          e = function e() {
        var a = d.indexOf(c);a > -1 && d.splice(a, 1);
      };setTimeout(e, cb);
    }
  }function U(a) {
    for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) {
      var e = this.lastTouches[d],
          f = Math.abs(b - e.x),
          g = Math.abs(c - e.y);if (db >= f && db >= g) return !0;
    }return !1;
  }function V(a, b) {
    this.manager = a, this.set(b);
  }function W(a) {
    if (p(a, jb)) return jb;var b = p(a, kb),
        c = p(a, lb);return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb;
  }function X() {
    if (!fb) return !1;var b = {},
        c = a.CSS && a.CSS.supports;return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) {
      b[d] = c ? a.CSS.supports("touch-action", d) : !0;
    }), b;
  }function Y(a) {
    this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [];
  }function Z(a) {
    return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "";
  }function $(a) {
    return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "";
  }function _(a, b) {
    var c = b.manager;return c ? c.get(a) : a;
  }function aa() {
    Y.apply(this, arguments);
  }function ba() {
    aa.apply(this, arguments), this.pX = null, this.pY = null;
  }function ca() {
    aa.apply(this, arguments);
  }function da() {
    Y.apply(this, arguments), this._timer = null, this._input = null;
  }function ea() {
    aa.apply(this, arguments);
  }function fa() {
    aa.apply(this, arguments);
  }function ga() {
    Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
  }function ha(a, b) {
    return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b);
  }function ia(a, b) {
    this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) {
      var b = this.add(new a[0](a[1]));a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
    }, this);
  }function ja(a, b) {
    var c = a.element;if (c.style) {
      var d;g(a.options.cssProps, function (e, f) {
        d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "";
      }), b || (a.oldCssProps = {});
    }
  }function ka(a, c) {
    var d = b.createEvent("Event");d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d);
  }var la,
      ma = ["", "webkit", "Moz", "MS", "ms", "o"],
      na = b.createElement("div"),
      oa = "function",
      pa = Math.round,
      qa = Math.abs,
      ra = Date.now;la = "function" != typeof Object.assign ? function (a) {
    if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object");for (var b = Object(a), c = 1; c < arguments.length; c++) {
      var e = arguments[c];if (e !== d && null !== e) for (var f in e) {
        e.hasOwnProperty(f) && (b[f] = e[f]);
      }
    }return b;
  } : Object.assign;var sa = h(function (a, b, c) {
    for (var e = Object.keys(b), f = 0; f < e.length;) {
      (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
    }return a;
  }, "extend", "Use `assign`."),
      ta = h(function (a, b) {
    return sa(a, b, !0);
  }, "merge", "Use `assign`."),
      ua = 1,
      va = /mobile|tablet|ip(ad|hone|od)|android/i,
      wa = "ontouchstart" in a,
      xa = u(a, "PointerEvent") !== d,
      ya = wa && va.test(navigator.userAgent),
      za = "touch",
      Aa = "pen",
      Ba = "mouse",
      Ca = "kinect",
      Da = 25,
      Ea = 1,
      Fa = 2,
      Ga = 4,
      Ha = 8,
      Ia = 1,
      Ja = 2,
      Ka = 4,
      La = 8,
      Ma = 16,
      Na = Ja | Ka,
      Oa = La | Ma,
      Pa = Na | Oa,
      Qa = ["x", "y"],
      Ra = ["clientX", "clientY"];x.prototype = { handler: function handler() {}, init: function init() {
      this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler);
    }, destroy: function destroy() {
      this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler);
    } };var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga },
      Ta = "mousedown",
      Ua = "mousemove mouseup";i(L, x, { handler: function handler(a) {
      var b = Sa[a.type];b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a }));
    } });var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha },
      Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca },
      Xa = "pointerdown",
      Ya = "pointermove pointerup pointercancel";a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function handler(a) {
      var b = this.store,
          c = !1,
          d = a.type.toLowerCase().replace("ms", ""),
          e = Va[d],
          f = Wa[a.pointerType] || a.pointerType,
          g = f == za,
          h = r(b, a.pointerId, "pointerId");e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1));
    } });var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
      $a = "touchstart",
      _a = "touchstart touchmove touchend touchcancel";i(N, x, { handler: function handler(a) {
      var b = Za[a.type];if (b === Ea && (this.started = !0), this.started) {
        var c = O.call(this, a, b);b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
      }
    } });var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha },
      bb = "touchstart touchmove touchend touchcancel";i(P, x, { handler: function handler(a) {
      var b = ab[a.type],
          c = Q.call(this, a, b);c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a });
    } });var cb = 2500,
      db = 25;i(R, x, { handler: function handler(a, b, c) {
      var d = c.pointerType == za,
          e = c.pointerType == Ba;if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) {
        if (d) S.call(this, b, c);else if (e && U.call(this, c)) return;this.callback(a, b, c);
      }
    }, destroy: function destroy() {
      this.touch.destroy(), this.mouse.destroy();
    } });var eb = u(na.style, "touchAction"),
      fb = eb !== d,
      gb = "compute",
      hb = "auto",
      ib = "manipulation",
      jb = "none",
      kb = "pan-x",
      lb = "pan-y",
      mb = X();V.prototype = { set: function set(a) {
      a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim();
    }, update: function update() {
      this.set(this.manager.options.touchAction);
    }, compute: function compute() {
      var a = [];return g(this.manager.recognizers, function (b) {
        k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
      }), W(a.join(" "));
    }, preventDefaults: function preventDefaults(a) {
      var b = a.srcEvent,
          c = a.offsetDirection;if (this.manager.session.prevented) return void b.preventDefault();var d = this.actions,
          e = p(d, jb) && !mb[jb],
          f = p(d, lb) && !mb[lb],
          g = p(d, kb) && !mb[kb];if (e) {
        var h = 1 === a.pointers.length,
            i = a.distance < 2,
            j = a.deltaTime < 250;if (h && i && j) return;
      }return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0;
    }, preventSrc: function preventSrc(a) {
      this.manager.session.prevented = !0, a.preventDefault();
    } };var nb = 1,
      ob = 2,
      pb = 4,
      qb = 8,
      rb = qb,
      sb = 16,
      tb = 32;Y.prototype = { defaults: {}, set: function set(a) {
      return la(this.options, a), this.manager && this.manager.touchAction.update(), this;
    }, recognizeWith: function recognizeWith(a) {
      if (f(a, "recognizeWith", this)) return this;var b = this.simultaneous;return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this;
    }, dropRecognizeWith: function dropRecognizeWith(a) {
      return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this);
    }, requireFailure: function requireFailure(a) {
      if (f(a, "requireFailure", this)) return this;var b = this.requireFail;return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this;
    }, dropRequireFailure: function dropRequireFailure(a) {
      if (f(a, "dropRequireFailure", this)) return this;a = _(a, this);var b = r(this.requireFail, a);return b > -1 && this.requireFail.splice(b, 1), this;
    }, hasRequireFailures: function hasRequireFailures() {
      return this.requireFail.length > 0;
    }, canRecognizeWith: function canRecognizeWith(a) {
      return !!this.simultaneous[a.id];
    }, emit: function emit(a) {
      function b(b) {
        c.manager.emit(b, a);
      }var c = this,
          d = this.state;qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d));
    }, tryEmit: function tryEmit(a) {
      return this.canEmit() ? this.emit(a) : void (this.state = tb);
    }, canEmit: function canEmit() {
      for (var a = 0; a < this.requireFail.length;) {
        if (!(this.requireFail[a].state & (tb | nb))) return !1;a++;
      }return !0;
    }, recognize: function recognize(a) {
      var b = la({}, a);return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb));
    }, process: function process(a) {}, getTouchAction: function getTouchAction() {}, reset: function reset() {} }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function attrTest(a) {
      var b = this.options.pointers;return 0 === b || a.pointers.length === b;
    }, process: function process(a) {
      var b = this.state,
          c = a.eventType,
          d = b & (ob | pb),
          e = this.attrTest(a);return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb;
    } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function getTouchAction() {
      var a = this.options.direction,
          b = [];return a & Na && b.push(lb), a & Oa && b.push(kb), b;
    }, directionTest: function directionTest(a) {
      var b = this.options,
          c = !0,
          d = a.distance,
          e = a.direction,
          f = a.deltaX,
          g = a.deltaY;return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction;
    }, attrTest: function attrTest(a) {
      return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a));
    }, emit: function emit(a) {
      this.pX = a.deltaX, this.pY = a.deltaY;var b = $(a.direction);b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a);
    } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
      return [jb];
    }, attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob);
    }, emit: function emit(a) {
      if (1 !== a.scale) {
        var b = a.scale < 1 ? "in" : "out";a.additionalEvent = this.options.event + b;
      }this._super.emit.call(this, a);
    } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function getTouchAction() {
      return [hb];
    }, process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime > b.time;if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset();else if (a.eventType & Ea) this.reset(), this._timer = e(function () {
        this.state = rb, this.tryEmit();
      }, b.time, this);else if (a.eventType & Ga) return rb;return tb;
    }, reset: function reset() {
      clearTimeout(this._timer);
    }, emit: function emit(a) {
      this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input)));
    } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function getTouchAction() {
      return [jb];
    }, attrTest: function attrTest(a) {
      return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob);
    } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function getTouchAction() {
      return ba.prototype.getTouchAction.call(this);
    }, attrTest: function attrTest(a) {
      var b,
          c = this.options.direction;return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga;
    }, emit: function emit(a) {
      var b = $(a.offsetDirection);b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a);
    } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function getTouchAction() {
      return [ib];
    }, process: function process(a) {
      var b = this.options,
          c = a.pointers.length === b.pointers,
          d = a.distance < b.threshold,
          f = a.deltaTime < b.time;if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout();if (d && f && c) {
        if (a.eventType != Ga) return this.failTimeout();var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
            h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold;this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;var i = this.count % b.taps;if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () {
          this.state = rb, this.tryEmit();
        }, b.interval, this), ob) : rb;
      }return tb;
    }, failTimeout: function failTimeout() {
      return this._timer = e(function () {
        this.state = tb;
      }, this.options.interval, this), tb;
    }, reset: function reset() {
      clearTimeout(this._timer);
    }, emit: function emit() {
      this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
    } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } };var ub = 1,
      vb = 2;ia.prototype = { set: function set(a) {
      return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this;
    }, stop: function stop(a) {
      this.session.stopped = a ? vb : ub;
    }, recognize: function recognize(a) {
      var b = this.session;if (!b.stopped) {
        this.touchAction.preventDefaults(a);var c,
            d = this.recognizers,
            e = b.curRecognizer;(!e || e && e.state & rb) && (e = b.curRecognizer = null);for (var f = 0; f < d.length;) {
          c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++;
        }
      }
    }, get: function get(a) {
      if (a instanceof Y) return a;for (var b = this.recognizers, c = 0; c < b.length; c++) {
        if (b[c].options.event == a) return b[c];
      }return null;
    }, add: function add(a) {
      if (f(a, "add", this)) return this;var b = this.get(a.options.event);return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a;
    }, remove: function remove(a) {
      if (f(a, "remove", this)) return this;if (a = this.get(a)) {
        var b = this.recognizers,
            c = r(b, a);-1 !== c && (b.splice(c, 1), this.touchAction.update());
      }return this;
    }, on: function on(a, b) {
      if (a !== d && b !== d) {
        var c = this.handlers;return g(q(a), function (a) {
          c[a] = c[a] || [], c[a].push(b);
        }), this;
      }
    }, off: function off(a, b) {
      if (a !== d) {
        var c = this.handlers;return g(q(a), function (a) {
          b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a];
        }), this;
      }
    }, emit: function emit(a, b) {
      this.options.domEvents && ka(a, b);var c = this.handlers[a] && this.handlers[a].slice();if (c && c.length) {
        b.type = a, b.preventDefault = function () {
          b.srcEvent.preventDefault();
        };for (var d = 0; d < c.length;) {
          c[d](b), d++;
        }
      }
    }, destroy: function destroy() {
      this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
    } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u });var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {};wb.Hammer = ha,  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return ha;
  }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha;
}(window, document, "Hammer");
//# sourceMappingURL=hammer.min.js.map

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(95),
  /* template */
  __webpack_require__(96),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "c:\\audio\\components\\audioPlayer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] audioPlayer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-21226245", Component.options)
  } else {
    hotAPI.reload("data-v-21226245", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hammer = __webpack_require__(56);

var _hammer2 = _interopRequireDefault(_hammer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            musicList: {
                /*currentPage:0,
                items:[]*/
            },
            mvList: {
                /*currentPage:0,
                items:[]*/
            },

            songList: [], //简易列表
            fullScreenState: false, //全屏列表--单歌
            songListState: false,
            moreListState: false,

            playerInfo: {
                playing: false,
                curIndex: null,
                curSongID: '',
                curSongUrl: '',
                downLoadUrl: '',
                curSongName: '音乐播放器',
                curSinger: '来一首吧',
                curImg: '',
                duration: '00:00',
                curTime: 0 },

            curSongLyc: {}, //当前个特区歌词
            lycColumns: null,
            lycScrollDir: null, //歌词滚动
            isEmptyLyc: true,

            iconPlay: 'play_arrow',
            playMode: 0, //当前播放模式
            tips: { //播放模式提示
                state: false,
                value: ''
            },
            volume: 50
        };
    },

    computed: {
        songListLen: function songListLen() {
            return this.songList.length;
        }
    },
    methods: {
        resetProps: function resetProps() {
            this.musicList.items = [];
            this.musicList.currentPage = 0;

            this.mvList.items = [];
            this.mvList.currentPage = 0;

            this.$parent.$data.curTab = 'tab_music';
            this.$parent.$data.curTabState = {};
        },
        hideVideoPlayer: function hideVideoPlayer() {
            this.mvViewState = false;
            this.$refs.videoPlayer.src = '';
            document.getElementsByTagName('html')[0].className = '';
        },
        showTarget: function showTarget(params) {
            this[params.paramA] = true;
            document.getElementsByTagName('html')[0].className = 'overHide';
        },
        hideTarget: function hideTarget(params) {
            this[params.paramA] = false;
            document.getElementsByTagName('html')[0].className = '';
        },
        hideSongList: function hideSongList(event) {
            if (event.target.id == 'queue') {
                this.songListState = false;
            }
            document.getElementsByTagName('html')[0].className = '';
        },
        updateInfo: function updateInfo(index) {
            //更改歌曲更新歌名歌手
            var _index;

            if (index) {
                _index = index;
            } else {
                _index = event.currentTarget.getAttribute('index') * 1;
            }
            var curSongData = this.musicList.items[_index];
            console.log(curSongData);
            this.playerInfo.curIndex = _index;

            this.playerInfo.curSongID = curSongData.MUSICRID.split('_')[1];
            this.playerInfo.curSongUrl = this.$refs.audioPlayer.src = 'http://antiserver.kuwo.cn/anti.s?format=aac|mp3&rid=MUSIC_' + curSongData.MUSICRID.split('_')[1] + '&type=convert_url&response=res';
            this.playerInfo.downLoadUrl = 'http://antiserver.kuwo.cn/anti.s?format=mp3&rid=MUSIC_' + curSongData.MUSICRID.split('_')[1] + '&type=convert_url&response=res';
            this.playerInfo.curSongName = curSongData.SONGNAME;
            this.playerInfo.curSinger = curSongData.ARTIST;
        },
        commPlaySong: function commPlaySong(event) {
            //点击歌曲列表添加到简易操作列表
            this.updateInfo();
            this.insistPlay();
            this.songListState = false;
        },
        playTarget: function playTarget(event) {
            //点击简易操作列表，播放所选歌曲
            console.log('eeeeee');
            this.updateInfo(event.currentTarget.getAttribute('index') * 1);
            this.insistPlay();
        },
        togglePlay: function togglePlay() {
            if (this.songList.length > 0 && this.playerInfo.curSongUrl !== '') {
                this.playerInfo.playing = !this.playerInfo.playing;
                if (this.playerInfo.playing == true) {
                    this.$refs.audioPlayer.play();
                    this.iconPlay = 'pause';
                    this.$refs.iconPlay_full.innerHTML = '&#xe61c;';
                } else {
                    this.$refs.audioPlayer.pause();
                    this.iconPlay = 'play_arrow';
                    this.$refs.iconPlay_full.innerHTML = '&#xe61e;';
                }
            }
        },
        insistPlay: function insistPlay() {
            //绝对播放
            var that = this;
            if (this.songList.length > 0 && this.playerInfo.curSongUrl !== '') {
                this.playerInfo.playing = true;
                this.$refs.audioPlayer.play();
                this.iconPlay = 'pause';
                this.$refs.iconPlay_full.innerHTML = '&#xe61c;';

                this.loadLyic();
            }
        },
        loadLyic: function loadLyic() {
            //加载歌词

            this.curSongLyc = {};
            this.isEmptyLyc = true;
            this.playerInfo.curLycScrollTop = 0;
            this.$refs.lyc.style.transform = 'none';
            /*if(that.$refs.lyc.querySelector('.on')){
                that.$refs.lyc.querySelector('.on').className = '';
            }*/

            var that = this;
            var temp = {};

            this.$http.get('http://mobile.kuwo.cn/mpage/html5/songinfoandlrc?mid=' + this.playerInfo.curSongID).then(function (response) {
                console.log(response);
                response.bodyText.promise.then(function (res) {
                    var res = res.replace(/'/g, '"').replace(/lrclist/, '"lrclist"');
                    res = JSON.parse(res);
                    console.log(res);
                    that.playerInfo.duration = res.songinfo.duration * 1;
                    that.playerInfo.curImg = res.songinfo.artpic;

                    if (res.lrclist.length) {
                        that.curSongLyc = res.lrclist;
                        that.isEmptyLyc = false;
                    } else {
                        that.curSongLyc = [{ 'timeId': 0, text: '此歌曲暂无歌词' }];
                        that.isEmptyLyc = true;
                    }
                });
            });
        },
        insistPause: function insistPause() {
            //绝对暂停
            if (this.songList.length > 0 && this.playerInfo.curSongUrl !== '') {
                this.playerInfo.playing = false;
                this.$refs.audioPlayer.pause();
                this.iconPlay = 'play_arrow';
                this.$refs.iconPlay_full.innerHTML = '&#xe61e;';
            }
        },
        prevSong: function prevSong() {
            if (!this.songList.length) return;
            if (this.songList.length == 1) {} else {
                this.playerInfo.curIndex--; //console.log(this.playerInfo.curIndex);console.log(this.musicList.items[this.playerInfo.curIndexh])
                this.playerInfo.curIndex = this.playerInfo.curIndex < 0 ? this.songList.length - 1 : this.playerInfo.curIndex;

                this.updateInfo(this.playerInfo.curIndex);

                this.insistPlay();
            }
        },
        nextSong: function nextSong() {
            if (!this.songList.length) return;
            if (this.songList.length == 1) {} else {
                this.playerInfo.curIndex++; //console.log(this.playerInfo.curIndex);console.log(this.musicList.items[this.playerInfo.curIndexh])

                this.playerInfo.curIndex = this.playerInfo.curIndex > this.songList.length - 1 ? 0 : this.playerInfo.curIndex;

                this.updateInfo(this.playerInfo.curIndex);

                this.insistPlay();
            }
        },
        changeMode: function changeMode() {
            //修改播放模式
            var that = this;
            this.playMode++;
            this.playMode = this.playMode > 2 ? 0 : this.playMode;
            var modeEle_full = this.$refs.mode_full;
            var modeEle_simple = this.$refs.mode_simple;
            switch (this.playMode) {
                case 0:
                    modeEle_simple.innerHTML = modeEle_full.innerHTML = '&#xe60d;';
                    /*this.modeEle.innerHTML = '&#xe60d;';
                    showMsg('顺序播放')*/
                    that.tips.value = "顺序播放";
                    that.tips.state = true;
                    clearTimeout(timeoutTips);
                    timeoutTips = setTimeout(function () {
                        that.tips.state = false;
                    }, 3000);
                    break;

                case 1:
                    modeEle_simple.innerHTML = modeEle_full.innerHTML = '&#xe612;';
                    /*this.modeEle.innerHTML = '&#xe612;';
                    showMsg('随机播放')*/
                    that.tips.value = "随机播放";
                    that.tips.state = true;
                    clearTimeout(timeoutTips);
                    timeoutTips = setTimeout(function () {
                        that.tips.state = false;
                    }, 3000);
                    break;

                case 2:
                    modeEle_simple.innerHTML = modeEle_full.innerHTML = '&#xe618;';
                    /*this.modeEle.innerHTML = '&#xe618;';
                    showMsg('单曲循环')*/
                    that.tips.value = "单曲循环";
                    that.tips.state = true;
                    clearTimeout(timeoutTips);
                    timeoutTips = setTimeout(function () {
                        that.tips.state = false;
                    }, 3000);
                    break;
            }
        },
        updateLyric: function updateLyric(playerObj) {
            if (this.isEmptyLyc) return;
            var that = this;
            var targetIndex;
            //var _time;
            var index = 0;

            this.curSongLyc.forEach(function (item, index) {

                if (playerObj.currentTime >= item.timeId) {
                    //console.log(i +' ||| ' +that.curSongLyc[i])
                    targetIndex = index;
                    //_time = item.timeId;
                }
                ++index;
            });

            if (targetIndex) {
                //console.log(targetIndex)
                if (that.$refs.lyc.querySelector('.on')) {
                    that.$refs.lyc.querySelector('.on').className = '';
                }

                that.$refs.lyc.children[targetIndex].className = 'on';
                if (targetIndex >= (that.lycColumns - 1) / 2) {
                    that.$refs.lyc.style.transform = 'translate3d(0,' + (that.$refs.lyc.children[targetIndex].offsetTop - that.lycScrollDir) * -1 + 'px,0)';
                } else {
                    that.$refs.lyc.style.transform = 'translate3d(0,0,0)';
                }
            }
        },
        resize: function resize() {
            this._fontSize = window.innerWidth / 7.5;
            document.getElementsByTagName('html')[0].style.fontSize = this._fontSize + 'px';
            var columns = Math.floor((window.innerHeight / this._fontSize - 4.72) / 0.72);
            this.lycColumns = columns % 2 === 0 ? columns - 1 : columns;
            this.lycScrollDir = this.lycColumns * 0.72 * this._fontSize / 2 - 0.72 * this._fontSize / 2;
        }
    },
    filters: {
        toTime: function toTime(value) {
            //时间格式化，秒数转成minute:second格式
            var currentTime = parseInt(value);

            var minute = parseInt(currentTime / 60);
            minute = minute > 9 ? minute : '0' + minute;
            var second = currentTime % 60;
            second = second > 9 ? second : '0' + second;

            return minute + ':' + second;
        },
        cl_nbsp: function cl_nbsp(value) {
            return value.replace(/&nbsp|&apos/g, ' ');
        }
    },
    mounted: function mounted() {
        console.log(this);
        var that = this;
        window.timeoutTips = '';

        this.resize();

        var scrollY = Math.ceil(document.getElementsByTagName('html')[0].style.fontSize.slice(0, -2) * 1 * 1.82);
        console.log(scrollY);
        /*window.addEventListener('scroll',function(){
             //选项卡fixed
            if(document.body.scrollTop >= scrollY){
                tabs.classList.add('fixedTop')
            }else{
                tabs.classList.remove('fixedTop')
            }
             //滚动加载
            that.scrollLoad();
            
        })*/
        window.addEventListener('orientationchange', function () {
            that.resize();
        });

        var that = this;
        var audioEle = this.$refs.audioPlayer; //音频节点
        var scrollBar = this.$refs.progress; //滚动条
        var scrollPoint = this.$refs.progressPoint; //滚动小圆点
        var bar_t = this.$refs.progressTl; //上层滚动样式条
        var bar_b = this.$refs.progressBl; //下层滚动样式条
        var curTime = this.$refs.curTime;
        var curDist = 0;

        //               
        var pg_volume = this.$refs.pg_volume;
        var pg_volume_t = this.$refs.pg_volume_t;
        var pg_volume_b = this.$refs.pg_volume_b;
        var pg_volume_p = this.$refs.pg_volume_p;
        console.log(audioEle);
        console.log(pg_volume_t);

        //初始化音量值;
        var curDist_volume = window.innerWidth * 0.85;
        pg_volume_p.style.left = pg_volume_t.style.width = audioEle.volume * 100 + '%';
        console.log(curDist_volume);

        //更新歌词和播放时间等
        audioEle.addEventListener("timeupdate", function () {

            var len = audioEle.buffered.length;
            if (len > 0 && len != undefined) {
                bar_b.style.width = audioEle.buffered.end(len - 1) / audioEle.duration * 100 + '%';
            }

            scrollPoint.style.left = bar_t.style.width = parseInt(audioEle.currentTime) * (scrollBar.offsetWidth / audioEle.duration) + 'px';
            //scrollPoint.style.left = bar_t.style.width = (audioEle.played.end(0) / audioEle.duration)*100 + '%';

            var second = '00',
                minute = '00';
            var currentTime = parseInt(audioEle.currentTime);

            var minute = parseInt(currentTime / 60);
            minute = minute > 9 ? minute : '0' + minute;
            var second = currentTime % 60;
            second = second > 9 ? second : '0' + second;

            curTime.innerText = minute + ':' + second;

            that.updateLyric(audioEle);
        }, false);

        audioEle.addEventListener('ended', function () {
            console.log('end');
            switch (that.playMode) {
                case 0:
                    that.nextSong();
                    break;
                case 1:
                    that.playerInfo.curIndex = parseInt(Math.random() * that.songList.length);
                    that.updateInfo(that.playerInfo.curIndex);
                    that.insistPlay();
                    break;

                case 2:
                    that.updateInfo(that.playerInfo.curIndex);
                    that.insistPlay();
                    break;
            }
        });

        audioEle.addEventListener('play', function () {
            that.$refs.audioPlayer.play();
            that.iconPlay = 'pause';
            that.$refs.iconPlay_full.innerHTML = '&#xe61c;';
        });
        audioEle.addEventListener('pause', function () {
            that.$refs.audioPlayer.pause();
            that.iconPlay = 'play_arrow';
            that.$refs.iconPlay_full.innerHTML = '&#xe61e;';
        });
        //播放进度条滑动事件
        var progressSlider = new _hammer2.default(this.$refs.progress);
        progressSlider.on('panmove', function (e) {
            if (that.playerInfo.curSongUrl == '') return;
            if (e.deltaX + curDist > scrollBar.offsetWidth) {
                scrollPoint.style.left = '99%';
                return;
            }
            if (e.deltaX + curDist < 0) {
                scrollPoint.style.left = 0;
                return;
            }
            scrollPoint.style.left = bar_t.style.width = (e.deltaX + curDist) / scrollBar.offsetWidth * 100 + '%';

            //that.audioEle.currentTime = ((currentX + moveX) / that.scrollBar.offsetWidth) * that.audioEle.duration;
            //scrollPoint.style.left = bar_t.style.width = ((e.center.x - e.distance) / scrollBar.offsetWidth)*100 + '%';
        });
        progressSlider.on('panend', function (e) {

            if (that.playerInfo.curSongUrl == '') return;

            if (e.deltaX + curDist > scrollBar.offsetWidth) {
                scrollPoint.style.left = '99%';
            }

            audioEle.currentTime = (e.deltaX + curDist) / scrollBar.offsetWidth * audioEle.duration;

            curDist += e.deltaX;
        });
        progressSlider.on('tap', function (e) {

            if (that.playerInfo.curSongUrl == '') return;

            curDist = e.center.x - scrollBar.offsetLeft;

            var targetDist = (e.center.x - scrollBar.offsetLeft) / scrollBar.offsetWidth;
            scrollPoint.style.left = bar_t.style.width = targetDist * 100 + '%';

            audioEle.currentTime = targetDist * audioEle.duration;
        });

        //音量进度条滑动事件
        var volumeProgress = new _hammer2.default(pg_volume);
        volumeProgress.on('tap', function (e) {
            console.log(e);
            if (e.center.x - pg_volume.offsetLeft > pg_volume.offsetWidth) {
                pg_volume_p.style.left = pg_volume_t.style.width = value * 100 + '%';
                audioEle.volume = 1;
            } else if (e.center.x - pg_volume.offsetLeft < 0) {
                pg_volume_p.style.left = pg_volume_t.style.width = 0;
                audioEle.volume = 0;
            } else {
                var value = (e.center.x - pg_volume.offsetLeft) / pg_volume.offsetWidth;
                audioEle.volume = value;
                pg_volume_p.style.left = pg_volume_t.style.width = value * 100 + '%';
            }
            curDist_volume = e.center.x - pg_volume.offsetLeft;
        });
        volumeProgress.on('panmove', function (e) {
            if (e.deltaX + curDist_volume > pg_volume.offsetWidth) {
                pg_volume_p.style.left = pg_volume_t.style.width = '100%';
                audioEle.volume = 1;
                return;
            }
            if (e.deltaX + curDist_volume < 0) {
                scrollPoint.style.left = 0;
                pg_volume_p.style.left = pg_volume_t.style.width = '0';
                audioEle.volume = 0;
                return;
            }

            var value = (e.deltaX + curDist_volume) / pg_volume.offsetWidth;
            audioEle.volume = value;
            pg_volume_p.style.left = pg_volume_t.style.width = value * 100 + '%';
        });
        volumeProgress.on('panend', function (e) {
            curDist_volume += e.deltaX;
        });
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('transition', {
    attrs: {
      "name": "bottomIn"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.songList.length),
      expression: "songList.length"
    }],
    staticClass: "baseBar clearfix"
  }, [_c('div', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.showTarget,
        paramA: 'fullScreenState'
      }),
      expression: "{ methods : showTarget,paramA:'fullScreenState' }"
    }],
    staticClass: "info"
  }, [_c('img', {
    attrs: {
      "src": _vm.playerInfo.curImg ? _vm.playerInfo.curImg.match(/http/) ? _vm.playerInfo.curImg : 'http://img1.kwcdn.kuwo.cn/star/albumcover/' + _vm.playerInfo.curImg : 'http://image.kuwo.cn/mpage/html5/2015/tuijian/defpic_240.png',
      "alt": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "text"
  }, [_c('p', {
    staticClass: "songName",
    domProps: {
      "innerHTML": _vm._s(_vm.playerInfo.curSongName)
    }
  }), _vm._v(" "), _c('p', {
    staticClass: "singer",
    domProps: {
      "innerHTML": _vm._s(_vm.playerInfo.curSinger)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "operation"
  }, [_c('span', {
    on: {
      "click": _vm.togglePlay
    }
  }, [_c('ui-icon-button', {
    attrs: {
      "color": "white",
      "icon": _vm.iconPlay,
      "type": "secondary"
    }
  })], 1), _vm._v(" "), _c('span', {
    on: {
      "click": _vm.nextSong
    }
  }, [_c('ui-icon-button', {
    attrs: {
      "color": "white",
      "icon": "skip_next",
      "type": "secondary"
    }
  })], 1), _vm._v(" "), _c('span', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.showTarget,
        paramA: 'songListState'
      }),
      expression: "{ methods : showTarget,paramA:'songListState' }"
    }]
  }, [_c('ui-icon-button', {
    attrs: {
      "color": "white",
      "icon": "queue_music",
      "type": "secondary"
    }
  })], 1)])])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.songListState),
      expression: "songListState"
    }],
    attrs: {
      "id": "queue"
    },
    on: {
      "click": _vm.hideSongList
    }
  }, [_c('div', [_c('dl', [_c('dt', {
    staticClass: "amount"
  }, [_c('span', [_vm._v("播放队列(" + _vm._s(_vm.songListLen) + ")")]), _vm._v(" "), _c('i', {
    ref: "mode_simple",
    staticClass: "iconfont order",
    on: {
      "click": _vm.changeMode
    }
  }, [_vm._v("")]), _vm._v(" "), _c('span', {
    staticClass: "clearAll"
  }, [_vm._v("清空")])]), _vm._v(" "), (_vm.songList.length > 0) ? _c('div', {
    staticClass: "dl-wrapper"
  }, _vm._l((_vm.songList), function(item) {
    return _c('dd', {
      class: ['list', _vm.playerInfo.curIndex == item.index ? 'currentsong' : ''],
      attrs: {
        "index": item.index
      },
      on: {
        "click": _vm.playTarget
      }
    }, [_c('span', {
      staticClass: "name",
      domProps: {
        "innerHTML": _vm._s(item.songName)
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "singer",
      domProps: {
        "innerHTML": _vm._s(' - ' + item.singer)
      }
    }), _vm._v(" "), _c('div', {
      class: _vm.playerInfo.curIndex == item.index ? _vm.playerInfo.playing == true ? 'Icon_playing' : 'Icon_pause' : ''
    }, [_c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span')]), _c('i', {
      staticClass: " iconfont",
      attrs: {
        "id": "del"
      }
    }, [_vm._v("")])])
  })) : _vm._e()]), _vm._v(" "), _c('span', {
    directives: [{
      name: "tap",
      rawName: "v-tap.stop",
      value: ({
        methods: _vm.hideTarget,
        paramA: 'songListState'
      }),
      expression: "{ methods : hideTarget,paramA:'songListState' }",
      modifiers: {
        "stop": true
      }
    }],
    attrs: {
      "id": "shut"
    }
  }, [_vm._v("关闭")])])])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "bottomIn"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.fullScreenState),
      expression: "fullScreenState"
    }],
    staticClass: "fullScreen"
  }, [_c('div', {
    staticStyle: {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "right": "0",
      "bottom": "0",
      "height": "100%",
      "width": "100%",
      "background-image": "url(http://img8.zol.com.cn/bbs/upload/10656/10655778.jpg)",
      "background-size": "cover",
      "z-index": "-1",
      "opacity": ".4"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "top"
  }, [_c('div', {
    staticClass: "info"
  }, [_c('span', {
    staticClass: "songName",
    domProps: {
      "innerHTML": _vm._s(_vm.playerInfo.curSongName)
    }
  }), _c('br'), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.playerInfo.curSinger)
    }
  })]), _vm._v(" "), _c('span', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.hideTarget,
        paramA: 'fullScreenState'
      }),
      expression: "{ methods : hideTarget,paramA:'fullScreenState' }"
    }],
    staticClass: "back"
  })]), _vm._v(" "), _c('div', {
    staticClass: "middle"
  }, [(_vm.curSongLyc) ? _c('div', {
    style: ({
      height: _vm.lycColumns * 0.72 + 'rem'
    }),
    attrs: {
      "id": "lyrics"
    }
  }, [_c('ul', {
    ref: "lyc"
  }, _vm._l((_vm.curSongLyc), function(item, index) {
    return _c('li', {
      attrs: {
        "data-column": index,
        "data-time": item.timeId
      }
    }, [_vm._v(_vm._s(item.text))])
  }))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "bottom"
  }, [_c('div', {
    staticClass: "line-1"
  }, [_c('span', {
    staticStyle: {
      "display": "block",
      "text-align": "center",
      "color": "#fff",
      "line-height": "2rem",
      "visibility": "hidden"
    }
  }, [_vm._v("正在缓冲……")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont setting",
    attrs: {
      "id": "show_setting"
    }
  }, [_vm._v("")])]), _vm._v(" "), _c('div', {
    staticClass: "line-2"
  }, [_c('span', {
    ref: "curTime",
    staticClass: "timer"
  }, [_vm._v("00:00")]), _vm._v(" "), _c('div', {
    ref: "progress",
    attrs: {
      "id": "progress"
    }
  }, [_c('span', {
    ref: "progressTl",
    staticClass: "bar-t",
    staticStyle: {
      "width": "0"
    }
  }), _vm._v(" "), _c('span', {
    ref: "progressBl",
    staticClass: "bar-b"
  }), _vm._v(" "), _c('span', {
    ref: "progressPoint",
    staticClass: "point",
    staticStyle: {
      "left": "0"
    }
  })]), _vm._v(" "), _c('span', {
    ref: "duration",
    staticClass: "timer"
  }, [_vm._v(_vm._s(_vm._f("toTime")(_vm.playerInfo.duration)))])]), _vm._v(" "), _c('div', {
    staticClass: "line-3"
  }, [_c('i', {
    ref: "mode_full",
    staticClass: "iconfont order",
    attrs: {
      "id": "mode"
    },
    on: {
      "click": _vm.changeMode
    }
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont pre",
    attrs: {
      "id": "prev"
    },
    on: {
      "click": _vm.prevSong
    }
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    ref: "iconPlay_full",
    staticClass: "iconfont control",
    attrs: {
      "id": "play"
    },
    on: {
      "click": _vm.togglePlay
    }
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont next",
    attrs: {
      "id": "next"
    },
    on: {
      "click": _vm.nextSong
    }
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.showTarget,
        paramA: 'songListState'
      }),
      expression: "{ methods : showTarget,paramA:'songListState' }"
    }],
    staticClass: "iconfont",
    attrs: {
      "id": "list"
    }
  }, [_vm._v("")])]), _vm._v(" "), _c('div', {
    staticClass: "line-4"
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('a', {
    staticStyle: {
      "display": "block"
    },
    attrs: {
      "href": _vm.playerInfo.downLoadUrl
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")])]), _vm._v(" "), _c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('i', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.showTarget,
        paramA: 'moreListState'
      }),
      expression: "{ methods : showTarget,paramA:'moreListState' }"
    }],
    staticClass: "iconfont",
    attrs: {
      "id": "showMore"
    }
  }, [_vm._v("")])])]), _vm._v(" "), _c('audio', {
    ref: "audioPlayer",
    attrs: {
      "id": "player",
      "src": ""
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.moreListState),
      expression: "moreListState"
    }],
    attrs: {
      "id": "more"
    }
  }, [_c('div', {
    staticClass: "list_icon"
  }, [_c('ul', [_c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("添加到")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("喜欢")])]), _vm._v(" "), _c('li', [_c('a', {
    staticStyle: {
      "display": "block",
      "color": "#fff"
    },
    attrs: {
      "href": _vm.playerInfo.downLoadUrl
    }
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("下载")])])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("歌手海报")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("选择音质")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("相似推荐")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("分享")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("设置彩铃")])])])]), _vm._v(" "), _c('div', {
    staticClass: "volume"
  }, [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _vm._v(" "), _c('div', {
    ref: "pg_volume",
    staticClass: "progress"
  }, [_c('span', {
    ref: "pg_volume_t",
    staticClass: "bar-t",
    staticStyle: {
      "width": "50%"
    }
  }), _vm._v(" "), _c('span', {
    ref: "pg_volume_b",
    staticClass: "bar-b"
  }), _vm._v(" "), _c('span', {
    ref: "pg_volume_p",
    staticClass: "point",
    staticStyle: {
      "left": "50%"
    }
  })])]), _vm._v(" "), _c('span', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.hideTarget,
        paramA: 'moreListState'
      }),
      expression: "{ methods : hideTarget,paramA:'moreListState' }"
    }],
    staticClass: "shut"
  }, [_vm._v("取消")])])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "id": "setting"
    }
  }, [_c('div', {
    staticClass: "list_icon"
  }, [_c('ul', [_c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("搜索歌词")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("字体调整")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("歌词调整")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("搜索图片")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("关闭写真")])]), _vm._v(" "), _c('li', [_c('i', {
    staticClass: "iconfont"
  }, [_vm._v("")]), _c('span', [_vm._v("设为皮肤")])])])]), _vm._v(" "), _c('span', {
    staticClass: "shut"
  }, [_vm._v("取消")])]), _vm._v(" "), _c('div', {
    staticClass: "mask",
    staticStyle: {
      "display": "none"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "msg",
    staticStyle: {
      "position": "fixed",
      "z-index": "999",
      "top": "50%",
      "left": "50%",
      "width": "8rem",
      "margin-left": "-4rem",
      "margin-top": "-1.7rem",
      "text-align": "center",
      "background": "rgba(0,0,0,.9)",
      "color": "#fff",
      "padding": "1rem",
      "display": "none",
      "opacity": "0",
      "border-radius": "0.4rem",
      "font-size": "1.4rem",
      "transition": "opacity 300ms ease"
    }
  }, [_vm._v("循环模式")])], 1)]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.tips.state),
      expression: "tips.state"
    }],
    staticClass: "tips"
  }, [_c('span', [_vm._v(_vm._s(_vm.tips.value))])])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.mvViewState),
      expression: "mvViewState"
    }],
    staticStyle: {
      "position": "fixed",
      "left": "0",
      "top": "0",
      "height": "100%",
      "width": "100%",
      "background": "#fff",
      "z-index": "999",
      "overflow-y": "scroll"
    }
  }, [_c('header', [_c('div', {
    staticClass: "playTit nofixed"
  }, [_c('a', {
    directives: [{
      name: "tap",
      rawName: "v-tap",
      value: ({
        methods: _vm.hideVideoPlayer
      }),
      expression: "{ methods : hideVideoPlayer }"
    }],
    staticClass: "back",
    attrs: {
      "href": "javascript:"
    }
  }, [_c('img', {
    attrs: {
      "src": "http://image.kuwo.cn/mpage/html5/2015/tuijian/back.png",
      "width": "100%"
    }
  })]), _vm._v(" "), _c('span', {
    ref: "mvTitle",
    staticClass: "backTex",
    attrs: {
      "id": "mvplaytitleid"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "seachBtn",
    attrs: {
      "href": "javascript:"
    }
  }, [_c('img', {
    attrs: {
      "src": "http://image.kuwo.cn/mpage/html5/2015/tuijian/seach.png",
      "width": "100%"
    }
  })])])]), _vm._v(" "), _c('video', {
    ref: "videoPlayer",
    staticStyle: {
      "width": "100%",
      "display": "block"
    },
    attrs: {
      "controls": "",
      "autoplay": "true",
      "src": ""
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "newMc",
    staticStyle: {
      "display": "block"
    },
    attrs: {
      "id": "mvplaysgid"
    }
  }, [_c('h3', [_vm._v("相关MV推荐")]), _vm._v(" "), _c('div', {
    staticClass: "newList2"
  }, _vm._l((_vm.mvRecommend), function(item) {
    return _c('div', {
      directives: [{
        name: "tap",
        rawName: "v-tap",
        value: ({
          methods: _vm.showVideoPlayer
        }),
        expression: "{ methods : showVideoPlayer }"
      }],
      staticClass: "newBs4",
      staticStyle: {
        "clear": "both"
      },
      attrs: {
        "mid": item.id,
        "title": item.name + '-' + item.artist
      }
    }, [_c('img', {
      staticClass: "mvbk",
      attrs: {
        "src": 'http://img1.kwcdn.kuwo.cn/wmvpic/' + item.mvpic
      }
    }), _vm._v(" "), _c('a', {
      staticClass: "playMv2",
      attrs: {
        "href": "javascript:"
      }
    }, [_c('img', {
      attrs: {
        "src": "http://image.kuwo.cn/mpage/html5/2015/tuijian/playHover.png"
      }
    })]), _vm._v(" "), _c('p', {
      staticClass: "newBtex"
    }, [_vm._v(_vm._s(item.name) + " - " + _vm._s(item.artist))])])
  })), _vm._v(" "), _c('p', {
    staticClass: "h50"
  })])])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-21226245", module.exports)
  }
}

/***/ })

});