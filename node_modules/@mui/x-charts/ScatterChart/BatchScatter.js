"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BatchScatter = BatchScatter;
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _scatterClasses = require("./scatterClasses");
var _ChartProvider = require("../context/ChartProvider");
var _useScale = require("../hooks/useScale");
var _useSelector = require("../internals/store/useSelector");
var _useChartHighlight = require("../internals/plugins/featurePlugins/useChartHighlight");
var _jsxRuntime = require("react/jsx-runtime");
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
  } = (0, _ChartProvider.useChartContext)();
  const getXPosition = (0, _useScale.getValueToPositionMapper)(xScale);
  const getYPosition = (0, _useScale.getValueToPositionMapper)(yScale);
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
      children.push(/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        fill: fill,
        d: d
      }, i));
      i += 1;
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: children
  });
}
const MemoBatchScatterPaths = /*#__PURE__*/React.memo(BatchScatterPaths);
if (process.env.NODE_ENV !== "production") MemoBatchScatterPaths.displayName = "MemoBatchScatterPaths";
const Group = (0, _styles.styled)('g')({
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
function BatchScatter(props) {
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
  } = (0, _ChartProvider.useChartContext)();
  const isSeriesHighlighted = (0, _useSelector.useSelector)(store, _useChartHighlight.selectorChartIsSeriesHighlighted, [series.id]);
  const isSeriesFaded = (0, _useSelector.useSelector)(store, _useChartHighlight.selectorChartIsSeriesFaded, [series.id]);
  const seriesHighlightedItem = (0, _useSelector.useSelector)(store, _useChartHighlight.selectorChartSeriesHighlightedItem, [series.id]);
  const seriesUnfadedItem = (0, _useSelector.useSelector)(store, _useChartHighlight.selectorChartSeriesUnfadedItem, [series.id]);
  const highlightedModifier = 1.2;
  const markerSize = series.markerSize * (isSeriesHighlighted ? highlightedModifier : 1);
  const classes = (0, _scatterClasses.useUtilityClasses)(inClasses);
  const siblings = [];
  if (seriesHighlightedItem != null) {
    const datum = series.data[seriesHighlightedItem];
    const getXPosition = (0, _useScale.getValueToPositionMapper)(xScale);
    const getYPosition = (0, _useScale.getValueToPositionMapper)(yScale);
    siblings.push(/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      fill: colorGetter ? colorGetter(seriesHighlightedItem) : color,
      "data-highlighted": true,
      d: createPath(getXPosition(datum.x), getYPosition(datum.y), markerSize * highlightedModifier)
    }, `highlighted-${series.id}`));
  }
  if (seriesUnfadedItem != null) {
    const datum = series.data[seriesUnfadedItem];
    const getXPosition = (0, _useScale.getValueToPositionMapper)(xScale);
    const getYPosition = (0, _useScale.getValueToPositionMapper)(yScale);
    siblings.push(/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      fill: colorGetter ? colorGetter(seriesUnfadedItem) : color,
      d: createPath(getXPosition(datum.x), getYPosition(datum.y), markerSize)
    }, `unfaded-${series.id}`));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Group, {
      className: classes.root,
      "data-series": series.id,
      "data-faded": isSeriesFaded || undefined,
      "data-highlighted": isSeriesHighlighted || undefined,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MemoBatchScatterPaths, {
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