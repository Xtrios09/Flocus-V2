"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusedMark = FocusedMark;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _useFocusedItem = require("../hooks/useFocusedItem");
var _hooks = require("../hooks");
var _jsxRuntime = require("react/jsx-runtime");
const RADIUS = 6;
function FocusedMark() {
  const theme = (0, _styles.useTheme)();
  const focusedItem = (0, _useFocusedItem.useFocusedItem)();
  const lineSeries = (0, _hooks.useLineSeriesContext)();
  const {
    xAxis,
    xAxisIds
  } = (0, _hooks.useXAxes)();
  const {
    yAxis,
    yAxisIds
  } = (0, _hooks.useYAxes)();
  if (focusedItem === null || focusedItem.seriesType !== 'line' || !lineSeries) {
    return null;
  }
  const series = lineSeries?.series[focusedItem.seriesId];
  const xAxisId = series.xAxisId ?? xAxisIds[0];
  const yAxisId = series.yAxisId ?? yAxisIds[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
    fill: "none",
    stroke: (theme.vars ?? theme).palette.text.primary,
    strokeWidth: 2,
    x: xAxis[xAxisId].scale(xAxis[xAxisId].data[focusedItem.dataIndex]) - RADIUS,
    y: yAxis[yAxisId].scale(series.stackedData[focusedItem.dataIndex][1]) - RADIUS,
    width: 2 * RADIUS,
    height: 2 * RADIUS,
    rx: 3,
    ry: 3
  });
}