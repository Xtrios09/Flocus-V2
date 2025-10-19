"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useChartKeyboardNavigation: true
};
Object.defineProperty(exports, "useChartKeyboardNavigation", {
  enumerable: true,
  get: function () {
    return _useChartKeyboardNavigation.useChartKeyboardNavigation;
  }
});
var _useChartKeyboardNavigation = require("./useChartKeyboardNavigation");
var _useChartKeyboardNavigation2 = require("./useChartKeyboardNavigation.selectors");
Object.keys(_useChartKeyboardNavigation2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useChartKeyboardNavigation2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useChartKeyboardNavigation2[key];
    }
  });
});