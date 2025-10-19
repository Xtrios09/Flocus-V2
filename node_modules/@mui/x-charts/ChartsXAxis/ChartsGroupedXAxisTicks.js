"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsGroupedXAxisTicks = ChartsGroupedXAxisTicks;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _scaleGuards = require("../internals/scaleGuards");
var _useChartContext = require("../context/ChartProvider/useChartContext");
var _utilities = require("./utilities");
var _useTicksGrouped = require("../hooks/useTicksGrouped");
var _useAxisTicksProps = require("./useAxisTicksProps");
var _jsxRuntime = require("react/jsx-runtime");
const DEFAULT_GROUPING_CONFIG = {
  tickSize: 6
};
const getGroupingConfig = (groups, groupIndex, tickSize) => {
  const config = groups[groupIndex] ?? {};
  const defaultTickSize = tickSize ?? DEFAULT_GROUPING_CONFIG.tickSize;
  const calculatedTickSize = defaultTickSize * groupIndex * 2 + defaultTickSize;
  return (0, _extends2.default)({}, DEFAULT_GROUPING_CONFIG, config, {
    tickSize: config.tickSize ?? calculatedTickSize
  });
};
/**
 * @ignore - internal component.
 */
function ChartsGroupedXAxisTicks(inProps) {
  const {
    xScale,
    defaultizedProps,
    tickNumber,
    positionSign,
    classes,
    Tick,
    TickLabel,
    axisTickLabelProps
  } = (0, _useAxisTicksProps.useAxisTicksProps)(inProps);
  if (!(0, _scaleGuards.isOrdinalScale)(xScale)) {
    throw new Error('MUI X Charts: ChartsGroupedXAxis only supports the `band` and `point` scale types.');
  }
  const {
    disableTicks,
    tickSize,
    valueFormatter,
    slotProps,
    tickInterval,
    tickPlacement,
    tickLabelPlacement
  } = defaultizedProps;
  const groups = defaultizedProps.groups;
  const {
    instance
  } = (0, _useChartContext.useChartContext)();
  const xTicks = (0, _useTicksGrouped.useTicksGrouped)({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: 'x',
    groups
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: xTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset
      } = item;
      const xTickLabel = labelOffset ?? 0;
      const showTick = instance.isXInside(tickOffset);
      const tickLabel = item.formattedValue;
      const ignoreTick = item.ignoreTick ?? false;
      const groupIndex = item.groupIndex ?? 0;
      const groupConfig = getGroupingConfig(groups, groupIndex, tickSize);
      const tickYSize = positionSign * groupConfig.tickSize;
      const labelPositionY = positionSign * (groupConfig.tickSize + _utilities.TICK_LABEL_GAP);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
        transform: `translate(${tickOffset}, 0)`,
        className: classes.tickContainer,
        "data-group-index": groupIndex,
        children: [!disableTicks && !ignoreTick && showTick && /*#__PURE__*/(0, _jsxRuntime.jsx)(Tick, (0, _extends2.default)({
          y2: tickYSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && /*#__PURE__*/(0, _jsxRuntime.jsx)(TickLabel, (0, _extends2.default)({
          x: xTickLabel,
          y: labelPositionY
        }, axisTickLabelProps, {
          style: (0, _extends2.default)({}, axisTickLabelProps.style, groupConfig.tickLabelStyle),
          text: tickLabel
        }))]
      }, index);
    })
  });
}