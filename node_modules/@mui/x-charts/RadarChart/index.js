"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Unstable_RadarChart: true,
  Unstable_RadarDataProvider: true,
  RadarChart: true,
  RadarDataProvider: true
};
Object.defineProperty(exports, "RadarChart", {
  enumerable: true,
  get: function () {
    return _RadarChart.RadarChart;
  }
});
Object.defineProperty(exports, "RadarDataProvider", {
  enumerable: true,
  get: function () {
    return _RadarDataProvider.RadarDataProvider;
  }
});
exports.Unstable_RadarDataProvider = exports.Unstable_RadarChart = void 0;
var _RadarChart = require("./RadarChart");
var _RadarDataProvider = require("./RadarDataProvider");
var _RadarGrid = require("./RadarGrid");
Object.keys(_RadarGrid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarGrid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarGrid[key];
    }
  });
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
var _RadarAxisHighlight = require("./RadarAxisHighlight");
Object.keys(_RadarAxisHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarAxisHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarAxisHighlight[key];
    }
  });
});
var _RadarMetricLabels = require("./RadarMetricLabels");
Object.keys(_RadarMetricLabels).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarMetricLabels[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarMetricLabels[key];
    }
  });
});
var _RadarSeriesPlot = require("./RadarSeriesPlot");
Object.keys(_RadarSeriesPlot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarSeriesPlot[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarSeriesPlot[key];
    }
  });
});
var _RadarChart2 = require("./RadarChart.plugins");
Object.keys(_RadarChart2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _RadarChart2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RadarChart2[key];
    }
  });
});
/**
 * @deprecated radar chart is now stable, import `RadarChart` instead
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const Unstable_RadarChart = exports.Unstable_RadarChart = _RadarChart.RadarChart;
/**
 * @deprecated radar data provider is now stable, import `RadarDataProvider` instead
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const Unstable_RadarDataProvider = exports.Unstable_RadarDataProvider = _RadarDataProvider.RadarDataProvider;