'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { isOrdinalScale } from "../internals/scaleGuards.js";
import { useChartContext } from "../context/ChartProvider/useChartContext.js";
import { TICK_LABEL_GAP } from "./utilities.js";
import { useTicksGrouped } from "../hooks/useTicksGrouped.js";
import { useAxisTicksProps } from "./useAxisTicksProps.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DEFAULT_GROUPING_CONFIG = {
  tickSize: 6
};
const getGroupingConfig = (groups, groupIndex, tickSize) => {
  const config = groups[groupIndex] ?? {};
  const defaultTickSize = tickSize ?? DEFAULT_GROUPING_CONFIG.tickSize;
  const calculatedTickSize = defaultTickSize * groupIndex * 2 + defaultTickSize;
  return _extends({}, DEFAULT_GROUPING_CONFIG, config, {
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
  } = useAxisTicksProps(inProps);
  if (!isOrdinalScale(xScale)) {
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
  } = useChartContext();
  const xTicks = useTicksGrouped({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: 'x',
    groups
  });
  return /*#__PURE__*/_jsx(React.Fragment, {
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
      const labelPositionY = positionSign * (groupConfig.tickSize + TICK_LABEL_GAP);
      return /*#__PURE__*/_jsxs("g", {
        transform: `translate(${tickOffset}, 0)`,
        className: classes.tickContainer,
        "data-group-index": groupIndex,
        children: [!disableTicks && !ignoreTick && showTick && /*#__PURE__*/_jsx(Tick, _extends({
          y2: tickYSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && /*#__PURE__*/_jsx(TickLabel, _extends({
          x: xTickLabel,
          y: labelPositionY
        }, axisTickLabelProps, {
          style: _extends({}, axisTickLabelProps.style, groupConfig.tickLabelStyle),
          text: tickLabel
        }))]
      }, index);
    })
  });
}
export { ChartsGroupedXAxisTicks };