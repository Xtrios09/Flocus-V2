'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["ownerState"];
import * as React from 'react';
import PropTypes from 'prop-types';
import useSlotProps from '@mui/utils/useSlotProps';
import { getInteractionItemProps } from "../hooks/useInteractionItemProps.js";
import { useStore } from "../internals/store/useStore.js";
import { useSelector } from "../internals/store/useSelector.js";
import { useItemHighlightedGetter } from "../hooks/useItemHighlightedGetter.js";
import { selectorChartsIsVoronoiEnabled } from "../internals/plugins/featurePlugins/useChartClosestPoint/index.js";
import { ScatterMarker } from "./ScatterMarker.js";
import { useUtilityClasses } from "./scatterClasses.js";
import { useScatterPlotData } from "./useScatterPlotData.js";
import { useChartContext } from "../context/ChartProvider/index.js";
import { useIsItemFocusedGetter } from "../hooks/useIsItemFocusedGetter.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Demos:
 *
 * - [Scatter](https://mui.com/x/react-charts/scatter/)
 * - [Scatter demonstration](https://mui.com/x/react-charts/scatter-demo/)
 *
 * API:
 *
 * - [Scatter API](https://mui.com/x/api/charts/scatter/)
 */
function Scatter(props) {
  const {
    series,
    xScale,
    yScale,
    color,
    colorGetter,
    onItemClick,
    classes: inClasses,
    slots,
    slotProps
  } = props;
  const {
    instance
  } = useChartContext();
  const store = useStore();
  const isVoronoiEnabled = useSelector(store, selectorChartsIsVoronoiEnabled);
  const skipInteractionHandlers = isVoronoiEnabled || series.disableHover;
  const {
    isFaded,
    isHighlighted
  } = useItemHighlightedGetter();
  const isFocused = useIsItemFocusedGetter();
  const scatterPlotData = useScatterPlotData(series, xScale, yScale, instance.isPointInside);
  const Marker = slots?.marker ?? ScatterMarker;
  const _useSlotProps = useSlotProps({
      elementType: Marker,
      externalSlotProps: slotProps?.marker,
      additionalProps: {
        seriesId: series.id,
        size: series.markerSize
      },
      ownerState: {}
    }),
    markerProps = _objectWithoutPropertiesLoose(_useSlotProps, _excluded);
  const classes = useUtilityClasses(inClasses);
  return /*#__PURE__*/_jsx("g", {
    "data-series": series.id,
    className: classes.root,
    children: scatterPlotData.map(dataPoint => {
      const isItemHighlighted = isHighlighted(dataPoint);
      const isItemFaded = !isItemHighlighted && isFaded(dataPoint);
      const isItemFocused = isFocused({
        seriesType: 'scatter',
        seriesId: series.id,
        dataIndex: dataPoint.dataIndex
      });
      return /*#__PURE__*/_jsx(Marker, _extends({
        dataIndex: dataPoint.dataIndex,
        color: colorGetter ? colorGetter(dataPoint.dataIndex) : color,
        isHighlighted: isItemHighlighted,
        isFaded: isItemFaded,
        x: dataPoint.x,
        y: dataPoint.y,
        onClick: onItemClick && (event => onItemClick(event, {
          type: 'scatter',
          seriesId: series.id,
          dataIndex: dataPoint.dataIndex
        })),
        "data-highlighted": isItemHighlighted || undefined,
        "data-faded": isItemFaded || undefined,
        "data-focused": isItemFocused || undefined
      }, skipInteractionHandlers ? undefined : getInteractionItemProps(instance, dataPoint), markerProps), dataPoint.id ?? dataPoint.dataIndex);
    })
  });
}
process.env.NODE_ENV !== "production" ? Scatter.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  classes: PropTypes.object,
  color: PropTypes.string.isRequired,
  colorGetter: PropTypes.func,
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event Mouse event recorded on the `<svg/>` element.
   * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
   */
  onItemClick: PropTypes.func,
  series: PropTypes.object.isRequired,
  slotProps: PropTypes.object,
  slots: PropTypes.object,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
} : void 0;
export { Scatter };