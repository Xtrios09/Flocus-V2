"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCATTER_CHART_PLUGINS = void 0;
var _useChartZAxis = require("../internals/plugins/featurePlugins/useChartZAxis");
var _useChartCartesianAxis = require("../internals/plugins/featurePlugins/useChartCartesianAxis");
var _useChartInteraction = require("../internals/plugins/featurePlugins/useChartInteraction");
var _useChartHighlight = require("../internals/plugins/featurePlugins/useChartHighlight");
var _useChartClosestPoint = require("../internals/plugins/featurePlugins/useChartClosestPoint");
var _useChartKeyboardNavigation = require("../internals/plugins/featurePlugins/useChartKeyboardNavigation");
const SCATTER_CHART_PLUGINS = exports.SCATTER_CHART_PLUGINS = [_useChartZAxis.useChartZAxis, _useChartCartesianAxis.useChartCartesianAxis, _useChartInteraction.useChartInteraction, _useChartHighlight.useChartHighlight, _useChartClosestPoint.useChartClosestPoint, _useChartKeyboardNavigation.useChartKeyboardNavigation];