"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PIE_CHART_PLUGINS = void 0;
var _useChartInteraction = require("../internals/plugins/featurePlugins/useChartInteraction");
var _useChartHighlight = require("../internals/plugins/featurePlugins/useChartHighlight");
var _useChartKeyboardNavigation = require("../internals/plugins/featurePlugins/useChartKeyboardNavigation");
const PIE_CHART_PLUGINS = exports.PIE_CHART_PLUGINS = [_useChartInteraction.useChartInteraction, _useChartHighlight.useChartHighlight, _useChartKeyboardNavigation.useChartKeyboardNavigation];