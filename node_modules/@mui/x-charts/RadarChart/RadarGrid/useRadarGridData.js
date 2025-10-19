"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRadarGridData = useRadarGridData;
var _useScale = require("../../hooks/useScale");
var _hooks = require("../../hooks");
var _useChartPolarAxis = require("../../internals/plugins/featurePlugins/useChartPolarAxis");
var _useChartContext = require("../../context/ChartProvider/useChartContext");
var _useSelector = require("../../internals/store/useSelector");
function useRadarGridData() {
  const {
    instance,
    store
  } = (0, _useChartContext.useChartContext)();
  const rotationScale = (0, _useScale.useRotationScale)();
  const {
    radiusAxis
  } = (0, _hooks.useRadiusAxes)();
  const {
    cx,
    cy
  } = (0, _useSelector.useSelector)(store, _useChartPolarAxis.selectorChartPolarCenter);
  if (!rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const metrics = rotationScale.domain();
  const angles = metrics.map(key => rotationScale(key));
  return {
    center: {
      x: cx,
      y: cy
    },
    corners: metrics.map((metric, dataIndex) => {
      const radiusScale = radiusAxis[metric].scale;
      const r = radiusScale.range()[1];
      const angle = angles[dataIndex];
      const [x, y] = instance.polar2svg(r, angle);
      return {
        x,
        y
      };
    }),
    radius: radiusAxis[metrics[0]].scale.range()[1]
  };
}