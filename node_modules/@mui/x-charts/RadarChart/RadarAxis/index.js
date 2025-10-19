"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  chartsAxisClasses: true
};
Object.defineProperty(exports, "chartsAxisClasses", {
  enumerable: true,
  get: function () {
    return _radarAxisClasses.chartsAxisClasses;
  }
});
var _RadarAxis = require("./RadarAxis");
Object.keys(_RadarAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarAxis[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarAxis[key];
    }
  });
});
var _useRadarAxis = require("./useRadarAxis");
Object.keys(_useRadarAxis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useRadarAxis[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useRadarAxis[key];
    }
  });
});
var _radarAxisClasses = require("./radarAxisClasses");