"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsSingleYAxisTicks = ChartsSingleYAxisTicks;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _RtlProvider = require("@mui/system/RtlProvider");
var _useIsHydrated = require("../hooks/useIsHydrated");
var _useTicks = require("../hooks/useTicks");
var _useDrawingArea = require("../hooks/useDrawingArea");
var _ChartProvider = require("../context/ChartProvider");
var _shortenLabels = require("./shortenLabels");
var _utilities = require("./utilities");
var _useAxisTicksProps = require("./useAxisTicksProps");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @ignore - internal component.
 */
function ChartsSingleYAxisTicks(inProps) {
  const {
    axisLabelHeight
  } = inProps;
  const {
    yScale,
    defaultizedProps,
    tickNumber,
    positionSign,
    classes,
    Tick,
    TickLabel,
    axisTickLabelProps
  } = (0, _useAxisTicksProps.useAxisTicksProps)(inProps);
  const isRtl = (0, _RtlProvider.useRtl)();
  const {
    disableTicks,
    tickSize: tickSizeProp,
    valueFormatter,
    slotProps,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    tickLabelInterval,
    width: axisWidth
  } = defaultizedProps;
  const drawingArea = (0, _useDrawingArea.useDrawingArea)();
  const {
    instance
  } = (0, _ChartProvider.useChartContext)();
  const isHydrated = (0, _useIsHydrated.useIsHydrated)();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const yTicks = (0, _useTicks.useTicks)({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    direction: 'y'
  });

  /* If there's an axis title, the tick labels have less space to render  */
  const tickLabelsMaxWidth = Math.max(0, axisWidth - (axisLabelHeight > 0 ? axisLabelHeight + _utilities.AXIS_LABEL_TICK_LABEL_GAP : 0) - tickSize - _utilities.TICK_LABEL_GAP);
  const tickLabels = isHydrated ? (0, _shortenLabels.shortenLabels)(yTicks, drawingArea, tickLabelsMaxWidth, isRtl, axisTickLabelProps.style) : new Map(Array.from(yTicks).map(item => [item, item.formattedValue]));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: yTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset,
        value
      } = item;
      const xTickLabel = positionSign * (tickSize + _utilities.TICK_LABEL_GAP);
      const yTickLabel = labelOffset;
      const skipLabel = typeof tickLabelInterval === 'function' && !tickLabelInterval?.(value, index);
      const showLabel = instance.isYInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      if (!showLabel) {
        return null;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: `translate(0, ${tickOffset})`,
        className: classes.tickContainer,
        children: [!disableTicks && /*#__PURE__*/(0, _jsxRuntime.jsx)(Tick, (0, _extends2.default)({
          x2: positionSign * tickSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && !skipLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)(TickLabel, (0, _extends2.default)({
          x: xTickLabel,
          y: yTickLabel,
          text: tickLabel
        }, axisTickLabelProps))]
      }, index);
    })
  });
}