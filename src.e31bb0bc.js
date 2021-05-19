// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"countdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCountdown;

function makeCountdown(selector) {
  var htmlTimer = "<div class=\"timer\" id=\"".concat(selector, "\">\n    <div class=\"field\">\n        <span class=\"value\" data-value=\"days\">11</span>\n        <span class=\"label\">Days</span>\n    </div>\n\n    <div class=\"field\">\n        <span class=\"value\" data-value=\"hours\">11</span>\n        <span class=\"label\">Hours</span>\n    </div>\n\n    <div class=\"field\">\n        <span class=\"value\" data-value=\"mins\">11</span>\n        <span class=\"label\">Minutes</span>\n    </div>\n\n    <div class=\"field\">\n        <span class=\"value\" data-value=\"secs\">11</span>\n        <span class=\"label\">Seconds</span>\n    </div>\n</div>"); // console.log(htmlTimer)

  return htmlTimer;
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _countdown = _interopRequireDefault(require("./countdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CountdownTimer = /*#__PURE__*/function () {
  function CountdownTimer(_ref) {
    var targetDate = _ref.targetDate,
        selector = _ref.selector;

    _classCallCheck(this, CountdownTimer);

    this.selector = selector;
    this.creatCountdown(this.selector);
    this.targetDate = targetDate.getTime();
    this.start();
  }

  _createClass(CountdownTimer, [{
    key: "creatCountdown",
    value: function creatCountdown(selector) {
      var newSelector = selector.slice(1, [selector.length]);
      document.body.insertAdjacentHTML('afterbegin', (0, _countdown.default)(newSelector));
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var startTime = Date.now();
      var targetTime = this.targetDate - startTime;
      this.callTimer(targetTime);
      setInterval(function () {
        var currentTime = Date.now();
        var difInTime = currentTime - startTime;
        var deltaTime = targetTime - difInTime;

        _this.callTimer(deltaTime);
      }, 1000);
    }
  }, {
    key: "callTimer",
    value: function callTimer(timerTime) {
      var time = this.getTimeComponents(timerTime);
      var refs = this.chooseSelectors(this.selector);
      timerInterface(refs, time);
    }
  }, {
    key: "getTimeComponents",
    value: function getTimeComponents(time) {
      var days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
      var hours = this.pad(Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)));
      var mins = this.pad(Math.floor(time % (1000 * 60 * 60) / (1000 * 60)));
      var secs = this.pad(Math.floor(time % (1000 * 60) / 1000));
      return {
        days: days,
        hours: hours,
        mins: mins,
        secs: secs
      };
    }
  }, {
    key: "pad",
    value: function pad(value) {
      return String(value).padStart(2, '0');
    }
  }, {
    key: "chooseSelectors",
    value: function chooseSelectors(selector) {
      var refs = {
        daysValue: document.querySelector("".concat(selector, " [data-value=\"days\"]")),
        hoursValue: document.querySelector("".concat(selector, " [data-value=\"hours\"]")),
        minsValue: document.querySelector("".concat(selector, " [data-value=\"mins\"]")),
        secsValue: document.querySelector("".concat(selector, " [data-value=\"secs\"]"))
      };
      return refs;
    }
  }]);

  return CountdownTimer;
}();

;

function timerInterface(_ref2, _ref3) {
  var daysValue = _ref2.daysValue,
      hoursValue = _ref2.hoursValue,
      minsValue = _ref2.minsValue,
      secsValue = _ref2.secsValue;
  var days = _ref3.days,
      hours = _ref3.hours,
      mins = _ref3.mins,
      secs = _ref3.secs;
  daysValue.textContent = days;
  hoursValue.textContent = hours;
  minsValue.textContent = mins;
  secsValue.textContent = secs;
}

;
var newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 17, 2021')
}); // const newTimer2 = new CountdownTimer({
//   selector: '#timer-2',
//   targetDate: new Date('Jun 17, 2021'),
// });
// const newTimer3 = new CountdownTimer({
//   selector: '#timer-3',
//   targetDate: new Date('Jul 17, 2021'),
// });
},{"./countdown":"countdown.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57778" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map