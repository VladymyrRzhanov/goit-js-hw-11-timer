parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"OpL8":[function(require,module,exports) {
"use strict";function s(s){return'<div class="timer" id="'.concat(s,'">\n    <div class="field">\n        <span class="value" data-value="days">11</span>\n        <span class="label">Days</span>\n    </div>\n\n    <div class="field">\n        <span class="value" data-value="hours">11</span>\n        <span class="label">Hours</span>\n    </div>\n\n    <div class="field">\n        <span class="value" data-value="mins">11</span>\n        <span class="label">Minutes</span>\n    </div>\n\n    <div class="field">\n        <span class="value" data-value="secs">11</span>\n        <span class="label">Seconds</span>\n    </div>\n</div>')}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=t(require("./countdown"));function t(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}var r=function(){function t(e){var n=e.targetDate,o=e.selector;a(this,t),this.selector=o,this.creatCountdown(this.selector),this.targetDate=n.getTime(),this.start()}return o(t,[{key:"creatCountdown",value:function(t){var a=t.slice(1,[t.length]);document.body.insertAdjacentHTML("afterbegin",(0,e.default)(a))}},{key:"start",value:function(){var e=this,t=Date.now(),a=this.targetDate-t;this.callTimer(a),setInterval(function(){var n=Date.now(),o=a-(n-t);e.callTimer(o)},1e3)}},{key:"callTimer",value:function(e){var t=this.getTimeComponents(e);u(this.chooseSelectors(this.selector),t)}},{key:"getTimeComponents",value:function(e){return{days:this.pad(Math.floor(e/864e5)),hours:this.pad(Math.floor(e%864e5/36e5)),mins:this.pad(Math.floor(e%36e5/6e4)),secs:this.pad(Math.floor(e%6e4/1e3))}}},{key:"pad",value:function(e){return String(e).padStart(2,"0")}},{key:"chooseSelectors",value:function(e){return{daysValue:document.querySelector("".concat(e,' [data-value="days"]')),hoursValue:document.querySelector("".concat(e,' [data-value="hours"]')),minsValue:document.querySelector("".concat(e,' [data-value="mins"]')),secsValue:document.querySelector("".concat(e,' [data-value="secs"]'))}}}]),t}();function u(e,t){var a=e.daysValue,n=e.hoursValue,o=e.minsValue,r=e.secsValue,u=t.days,s=t.hours,c=t.mins,i=t.secs;a.textContent=u,n.textContent=s,o.textContent=c,r.textContent=i}var s=new r({selector:"#timer-1",targetDate:new Date("Sep 17, 2021")});
},{"./countdown":"OpL8"}]},{},["Focm"], null)
//# sourceMappingURL=/goit-js-hw-11-timer/src.3e5f0a12.js.map