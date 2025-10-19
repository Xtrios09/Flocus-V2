'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRtl } from '@mui/system/RtlProvider';
import { useIsHydrated } from "../hooks/useIsHydrated.js";
import { useTicks } from "../hooks/useTicks.js";
import { useMounted } from "../hooks/useMounted.js";
import { useDrawingArea } from "../hooks/useDrawingArea.js";
import { useChartContext } from "../context/ChartProvider/useChartContext.js";
import { shortenLabels } from "./shortenLabels.js";
import { getVisibleLabels } from "./getVisibleLabels.js";
import { AXIS_LABEL_TICK_LABEL_GAP, TICK_LABEL_GAP } from "./utilities.js";
import { useAxisTicksProps } from "./useAxisTicksProps.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  } = useAxisTicksProps(inProps);
  const isRtl = useRtl();
  const isMounted = useMounted();
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
  const drawingArea = useDrawingArea();
  const {
    instance
  } = useChartContext();
  const isHydrated = useIsHydrated();
  const tickSize = disableTicks ? 4 : tickSizeProp;
  const xTicks = useTicks({
    scale: xScale,
    tickNumber,
    valueFormatter,
    tickInterval,
    tickPlacement,
    tickLabelPlacement,
    direction: 'x'
  });
  const visibleLabels = getVisibleLabels(xTicks, {
    tickLabelStyle: axisTickLabelProps.style,
    tickLabelInterval,
    tickLabelMinGap,
    reverse,
    isMounted,
    isXInside: instance.isXInside
  });

  /* If there's an axis title, the tick labels have less space to render  */
  const tickLabelsMaxHeight = Math.max(0, axisHeight - (axisLabelHeight > 0 ? axisLabelHeight + AXIS_LABEL_TICK_LABEL_GAP : 0) - tickSize - TICK_LABEL_GAP);
  const tickLabels = isHydrated ? shortenLabels(visibleLabels, drawingArea, tickLabelsMaxHeight, isRtl, axisTickLabelProps.style) : new Map(Array.from(visibleLabels).map(item => [item, item.formattedValue]));
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: xTicks.map((item, index) => {
      const {
        offset: tickOffset,
        labelOffset
      } = item;
      const xTickLabel = labelOffset ?? 0;
      const yTickLabel = positionSign * (tickSize + TICK_LABEL_GAP);
      const showTick = instance.isXInside(tickOffset);
      const tickLabel = tickLabels.get(item);
      const showTickLabel = visibleLabels.has(item);
      return /*#__PURE__*/_jsxs("g", {
        transform: `translate(${tickOffset}, 0)`,
        className: classes.tickContainer,
        children: [!disableTicks && showTick && /*#__PURE__*/_jsx(Tick, _extends({
          y2: positionSign * tickSize,
          className: classes.tick
        }, slotProps?.axisTick)), tickLabel !== undefined && showTickLabel && /*#__PURE__*/_jsx(TickLabel, _extends({
          x: xTickLabel,
          y: yTickLabel
        }, axisTickLabelProps, {
          text: tickLabel
        }))]
      }, index);
    })
  });
}
export { ChartsSingleXAxisTicks };