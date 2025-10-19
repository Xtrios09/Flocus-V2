"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  useChartClosestPoint: true
};
Object.defineProperty(exports, "useChartClosestPoint", {
  enumerable: true,
  get: function () {
    return _useChartClosestPoint.useChartClosestPoint;
  }
});
var _useChartClosestPoint = require("./useChartClosestPoint");
var _useChartClosestPoint2 = require("./useChartClosestPoint.selectors");
Object.keys(_useChartClosestPoint2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useChartClosestPoint2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useChartClosestPoint2[key];
    }
  });
});