'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useUtilityClasses } from "./scatterClasses.js";
import { useChartContext } from "../context/ChartProvider/index.js";
import { getValueToPositionMapper } from "../hooks/useScale.js";
import { useSelector } from "../internals/store/useSelector.js";
import { selectorChartIsSeriesFaded, selectorChartIsSeriesHighlighted, selectorChartSeriesUnfadedItem, selectorChartSeriesHighlightedItem } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MAX_POINTS_PER_PATH = 1000;
/* In an SVG arc, if the arc starts and ends at the same point, it is not rendered, so we add a tiny
 * value to one of the coordinates to ensure that the arc is rendered. */
const ALMOST_ZERO = 0.01;
function appendAtKey(map, key, value) {
  let bucket = map.get(key);
  if (!bucket) {
    bucket = [value];
    map.set(key, bucket);
  } else {
    bucket.push(value);
  }
  return bucket;
}
function createPath(x, y, markerSize) {
  return `M${x - markerSize} ${y} a${markerSize} ${markerSize} 0 1 1 0 ${ALMOST_ZERO}`;
}
function useCreatePaths(seriesData, markerSize, xScale, yScale, color, colorGetter) {
  const {
    instance
  } = useChartContext();
  const getXPosition = getValueToPositionMapper(xScale);
  const getYPosition = getValueToPositionMapper(yScale);
  const paths = new Map();
  const temporaryPaths = new Map();
  for (let i = 0; i < seriesData.length; i += 1) {
    const scatterPoint = seriesData[i];
    const x = getXPosition(scatterPoint.x);
    const y = getYPosition(scatterPoint.y);
    if (!instance.isPointInside(x, y)) {
      continue;
    }
    const path = createPath(x, y, markerSize);
    const fill = colorGetter ? colorGetter(i) : color;
    const tempPath = appendAtKey(temporaryPaths, fill, path);
    if (tempPath.length >= MAX_POINTS_PER_PATH) {
      appendAtKey(paths, fill, tempPath.join(''));
      temporaryPaths.delete(fill);
    }
  }
  for (const [fill, tempPath] of temporaryPaths.entries()) {
    if (tempPath.length > 0) {
      appendAtKey(paths, fill, tempPath.join(''));
    }
  }
  return paths;
}
function BatchScatterPaths(props) {
  const {
    series,
    xScale,
    yScale,
    color,
    colorGetter,
    markerSize
  } = props;
  const paths = useCreatePaths(series.data, markerSize, xScale, yScale, color, colorGetter);
  const children = [];
  let i = 0;
  for (const [fill, dArray] of paths.entries()) {
    for (const d of dArray) {
      children.push(/*#__PURE__*/_jsx("path", {
        fill: fill,
        d: d
      }, i));
      i += 1;
    }
  }
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: children
  });
}
const MemoBatchScatterPaths = /*#__PURE__*/React.memo(BatchScatterPaths);
if (process.env.NODE_ENV !== "production") MemoBatchScatterPaths.displayName = "MemoBatchScatterPaths";
const Group = styled('g')({
  '&[data-faded="true"]': {
    opacity: 0.3
  },
  '& path': {
    /* The browser must do hit testing to know which element a pointer is interacting with.
     * With many data points, we create many paths causing significant time to be spent in the hit test phase.
     * To fix this issue, we disable pointer events for the descendant paths.
     *
     * Ideally, users should be able to override this in case they need pointer events to be enabled,
     * but it can affect performance negatively, especially with many data points. */
    pointerEvents: 'none'
  }
});

/**
 * @internal
 * A batch version of the Scatter component that uses SVG paths to render points.
 * This component is optimized for performance and is suitable for rendering large datasets, but has limitations. Some of the limitations include:
 * - Limited CSS styling;
 * - Overriding the `marker` slot is not supported;
 * - Highlight style must not contain opacity.
 *
 * You can read about all the limitations [here](https://mui.com/x/react-charts/scatter/#performance).
 */
export function BatchScatter(props) {
  const {
    series,
    xScale,
    yScale,
    color,
    colorGetter,
    classes: inClasses
  } = props;
  const {
    store
  } = useChartContext();
  const isSeriesHighlighted = useSelector(store, selectorChartIsSeriesHighlighted, [series.id]);
  const isSeriesFaded = useSelector(store, selectorChartIsSeriesFaded, [series.id]);
  const seriesHighlightedItem = useSelector(store, selectorChartSeriesHighlightedItem, [series.id]);
  const seriesUnfadedItem = useSelector(store, selectorChartSeriesUnfadedItem, [series.id]);
  const highlightedModifier = 1.2;
  const markerSize = series.markerSize * (isSeriesHighlighted ? highlightedModifier : 1);
  const classes = useUtilityClasses(inClasses);
  const siblings = [];
  if (seriesHighlightedItem != null) {
    const datum = series.data[seriesHighlightedItem];
    const getXPosition = getValueToPositionMapper(xScale);
    const getYPosition = getValueToPositionMapper(yScale);
    siblings.push(/*#__PURE__*/_jsx("path", {
      fill: colorGetter ? colorGetter(seriesHighlightedItem) : color,
      "data-highlighted": true,
      d: createPath(getXPosition(datum.x), getYPosition(datum.y), markerSize * highlightedModifier)
    }, `highlighted-${series.id}`));
  }
  if (seriesUnfadedItem != null) {
    const datum = series.data[seriesUnfadedItem];
    const getXPosition = getValueToPositionMapper(xScale);
    const getYPosition = getValueToPositionMapper(yScale);
    siblings.push(/*#__PURE__*/_jsx("path", {
      fill: colorGetter ? colorGetter(seriesUnfadedItem) : color,
      d: createPath(getXPosition(datum.x), getYPosition(datum.y), markerSize)
    }, `unfaded-${series.id}`));
  }
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Group, {
      className: classes.root,
      "data-series": series.id,
      "data-faded": isSeriesFaded || undefined,
      "data-highlighted": isSeriesHighlighted || undefined,
      children: /*#__PURE__*/_jsx(MemoBatchScatterPaths, {
        series: series,
        xScale: xScale,
        yScale: yScale,
        color: color,
        colorGetter: colorGetter,
        markerSize: markerSize
      })
    }), siblings]
  });
}