"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsSingleXAxisTicks = ChartsSingleXAxisTicks;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _RtlProvider = require("@mui/system/RtlProvider");
var _useIsHydrated = require("../hooks/useIsHydrated");
var _useTicks = require("../hooks/useTicks");
var _useMounted = require("../hooks/useMounted");
var _useDrawingArea = require("../hooks/useDrawingArea");
var _useChartContext = require("../context/ChartProvider/useChartContext");
var _shortenLabels = require("./shortenLabels");
var _getVisibleLabels = require("./getVisibleLabels");
var _utilities = require("./utilities");
var _useAxisTicksProps = require("./useAxisTicksProps");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * @ignore - internal component.
 */
function ChartsSingleXAxisTicks(inProps) {
  const {
    axisLabelHeight
  } = inProps;
  const {
    xScale,
    defaultizedProps,
    tickNumber,
    positionSign,
    classes,
    Tick,
    TickLabel,
    axisTickLabelProps,
    reverse
  } = (0, _useAxisTicksProps.useAxisTicksProps)(inProps);
  const isRtl = (0, _RtlProvider.useRtl)();
  const isMounted = (0, _useMounted.useMounted)();
  const {
    disableTicks,
    tickSize: tickSizeProp,
    valueFormatter,
    slotProps,
    tickInterval,
    tickLabelInterval,
    tickPlacement,
    tickLabelPlacement,
    tickLabelMinGap,
    height: axisHeight
  } = defaultizedProps;
  const drawingArea = (0, _useDrawingArea.useDrawingArea)();
  const {
    instance
  } = (0, _useChartContext.useChartContext)();
  const isHydrated = (0, _useIsHydrated.useIsHydrated)();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const xTicks = (0, _useTicks.useTicks)({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: 'x'
  });
  const visibleLabels = (0, _getVisibleLabels.getVisibleLabels)(xTicks, {
    tickLabelStyle: axisTickLabelProps.style,
    tickLabelInterval,
    tickLabelMinGap,
    reverse,
    isMounted,
    isXInside: instance.isXInside
  });

  /* If there's an axis title, the tick labels have less space to render  */
  const tickLabelsMaxHeight = Math.max(0, axisHeight - (axisLabelHeight > 0 ? axisLabelHeight + _utilities.AXIS_LABEL_TICK_LABEL_GAP : 0) - tickSize - _utilities.TICK_LABEL_GAP);
  const tickLabels = isHydrated ? (0, _shortenLabels.shortenLabels)(visibleLabels, drawingArea, tickLabelsMaxHeight, isRtl, axisTickLabelProps.style) : new Map(Array.from(visibleLabels).map(item => [item, item.formattedValue]));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: xTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset
      } = item;
      const xTickLabel = labelOffset ?? 0;
      const yTickLabel = positionSign * (tickSize + _utilities.TICK_LABEL_GAP);
      const showTick = instance.isXInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      const showTickLabel = visibleLabels.has(item);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: `translate(${tickOffset}, 0)`,
        className: classes.tickContainer,
        children: [!disableTicks && showTick && /*#__PURE__*/(0, _jsxRuntime.jsx)(Tick, (0, _extends2.default)({
          y2: positionSign * tickSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && showTickLabel && /*#__PURE__*/(0, _jsxRuntime.jsx)(TickLabel, (0, _extends2.default)({
          x: xTickLabel,
          y: yTickLabel
        }, axisTickLabelProps, {
          text: tickLabel
        }))]
      }, index);
    })
  });
}