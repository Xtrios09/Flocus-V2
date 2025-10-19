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
function ChartsGroupedYAxisTicks(inProps) {
  const {
    yScale,
    defaultizedProps,
    tickNumber,
    positionSign,
    classes,
    Tick,
    TickLabel,
    axisTickLabelProps
  } = useAxisTicksProps(inProps);
  if (!isOrdinalScale(yScale)) {
    throw new Error('MUI X Charts: ChartsGroupedYAxis only supports the `band` and `point` scale types.');
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
  const yTicks = useTicksGrouped({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: 'y',
    groups
  });
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: yTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset
      } = item;
      const yTickLabel = labelOffset ?? 0;
      const showTick = instance.isYInside(tickOffset);
      const tickLabel = item.formattedValue;
      const ignoreTick = item.ignoreTick ?? false;
      const groupIndex = item.groupIndex ?? 0;
      const groupConfig = getGroupingConfig(groups, groupIndex, tickSize);
      const tickXSize = positionSign * groupConfig.tickSize;
      const labelPositionX = positionSign * (groupConfig.tickSize + TICK_LABEL_GAP);
      return /*#__PURE__*/_jsxs("g", {
        transform: `translate(0, ${tickOffset})`,
        className: classes.tickContainer,
        "data-group-index": groupIndex,
        children: [!disableTicks && !ignoreTick && showTick && /*#__PURE__*/_jsx(Tick, _extends({
          x2: tickXSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && /*#__PURE__*/_jsx(TickLabel, _extends({
          x: labelPositionX,
          y: yTickLabel
        }, axisTickLabelProps, {
          style: _extends({}, axisTickLabelProps.style, groupConfig.tickLabelStyle),
          text: tickLabel
        }))]
      }, index);
    })
  });
}
export { ChartsGroupedYAxisTicks };