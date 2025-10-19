'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRtl } from '@mui/system/RtlProvider';
import { useIsHydrated } from "../hooks/useIsHydrated.js";
import { useTicks } from "../hooks/useTicks.js";
import { useDrawingArea } from "../hooks/useDrawingArea.js";
import { useChartContext } from "../context/ChartProvider/index.js";
import { shortenLabels } from "./shortenLabels.js";
import { AXIS_LABEL_TICK_LABEL_GAP, TICK_LABEL_GAP } from "./utilities.js";
import { useAxisTicksProps } from "./useAxisTicksProps.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  } = useAxisTicksProps(inProps);
  const isRtl = useRtl();
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
  const drawingArea = useDrawingArea();
  const {
    instance
  } = useChartContext();
  const isHydrated = useIsHydrated();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const yTicks = useTicks({
    scale: yScale,
    tickNumber,
    valueFormatter,
    tickPlacement,
    tickLabelPlacement,
    tickInterval,
    direction: 'y'
  });

  /* If there's an axis title, the tick labels have less space to render  */
  const tickLabelsMaxWidth = Math.max(0, axisWidth - (axisLabelHeight > 0 ? axisLabelHeight + AXIS_LABEL_TICK_LABEL_GAP : 0) - tickSize - TICK_LABEL_GAP);
  const tickLabels = isHydrated ? shortenLabels(yTicks, drawingArea, tickLabelsMaxWidth, isRtl, axisTickLabelProps.style) : new Map(Array.from(yTicks).map(item => [item, item.formattedValue]));
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: yTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset,
        value
      } = item;
      const xTickLabel = positionSign * (tickSize + TICK_LABEL_GAP);
      const yTickLabel = labelOffset;
      const skipLabel = typeof tickLabelInterval === 'function' && !tickLabelInterval?.(value, index);
      const showLabel = instance.isYInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      if (!showLabel) {
        return null;
      }
      return /*#__PURE__*/_jsxs("g", {
        transform: `translate(0, ${tickOffset})`,
        className: classes.tickContainer,
        children: [!disableTicks && /*#__PURE__*/_jsx(Tick, _extends({
          x2: positionSign * tickSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && !skipLabel && /*#__PURE__*/_jsx(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel,
          text: tickLabel
        }, axisTickLabelProps))]
      }, index);
    })
  });
}
export { ChartsSingleYAxisTicks };