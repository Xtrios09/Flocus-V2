"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRadarAxis = useRadarAxis;
var _warning = require("@mui/x-internals/warning");
var _useAxis = require("../../hooks/useAxis");
var _useScale = require("../../hooks/useScale");
var _useChartContext = require("../../context/ChartProvider/useChartContext");
var _useChartPolarAxis = require("../../internals/plugins/featurePlugins/useChartPolarAxis");
var _scaleGuards = require("../../internals/scaleGuards");
var _degToRad = require("../../internals/degToRad");
var _clampAngle = require("../../internals/clampAngle");
var _useSelector = require("../../internals/store/useSelector");
var _angleConversion = require("../../internals/angleConversion");
/**
 * Returns an array with on item par metrics with the different point to label.
 */
function useRadarAxis(params) {
  const {
    metric,
    angle,
    divisions = 1
  } = params;
  const {
    instance,
    store
  } = (0, _useChartContext.useChartContext)();
  const rotationScale = (0, _useScale.useRotationScale)();
  const {
    radiusAxis
  } = (0, _useAxis.useRadiusAxes)();
  const {
    cx,
    cy
  } = (0, _useSelector.useSelector)(store, _useChartPolarAxis.selectorChartPolarCenter);
  if (metric === undefined || !rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const existingMetrics = rotationScale.domain();
  if (!existingMetrics.includes(metric)) {
    (0, _warning.warnOnce)([`MUI X Charts: You radar axis try displaying values for the metric "${metric}" which does nto exist.`, `either add this metric to your radar, or pick one from the existing metrics: ${existingMetrics.join(', ')}`]);
  }
  const anglesWithDefault = angle !== undefined ? (0, _degToRad.degToRad)(angle) : rotationScale(metric) ?? 0;
  const radiusRatio = Array.from({
    length: divisions
  }, (_, index) => (index + 1) / divisions);
  const radiusScale = radiusAxis[metric].scale;
  const R = radiusScale.range()[1];
  if ((0, _scaleGuards.isOrdinalScale)(radiusScale)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MUI X Charts: Radar chart does not support ordinal axes');
    }
    return null;
  }
  return {
    metric,
    angle: (0, _clampAngle.clampAngle)((0, _angleConversion.rad2deg)(anglesWithDefault)),
    center: {
      x: cx,
      y: cy
    },
    labels: radiusRatio.map(ratio => {
      const radius = ratio * R;
      const [x, y] = instance.polar2svg(radius, anglesWithDefault);
      const value = radiusScale.invert(radius);
      const defaultTickLabel = value.toString();
      return {
        x,
        y,
        value,
        formattedValue: radiusAxis[metric].valueFormatter?.(radiusScale.invert(radius), {
          location: 'tick',
          scale: radiusScale,
          defaultTickLabel,
          tickNumber: divisions
        }) ?? defaultTickLabel
      };
    })
  };
}