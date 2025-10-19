"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadarAxis = RadarAxis;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = require("@mui/material/styles");
var _useRadarAxis = require("./useRadarAxis");
var _RadarAxis = require("./RadarAxis.utils");
var _radarAxisClasses = require("./radarAxisClasses");
var _jsxRuntime = require("react/jsx-runtime");
function RadarAxis(props) {
  const {
    labelOrientation = 'horizontal',
    textAnchor,
    dominantBaseline
  } = props;
  const classes = (0, _radarAxisClasses.useUtilityClasses)(props.classes);
  const theme = (0, _styles.useTheme)();
  const data = (0, _useRadarAxis.useRadarAxis)(props);
  if (data === null) {
    return null;
  }
  const {
    center,
    angle,
    labels
  } = data;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
    className: classes.root,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
      d: `M ${center.x} ${center.y} L ${labels[labels.length - 1].x} ${labels[labels.length - 1].y}`,
      stroke: (theme.vars ?? theme).palette.text.primary,
      strokeOpacity: 0.3,
      className: classes.line
    }), labels.map(({
      x,
      y,
      formattedValue
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("text", (0, _extends2.default)({
      fontSize: 12,
      fill: (theme.vars ?? theme).palette.text.primary,
      stroke: "none",
      className: classes.label
    }, (0, _RadarAxis.getLabelAttributes)({
      labelOrientation,
      x,
      y,
      angle,
      textAnchor,
      dominantBaseline
    }), {
      children: formattedValue
    }), formattedValue))]
  });
}
process.env.NODE_ENV !== "production" ? RadarAxis.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "pnpm proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The absolute rotation angle of the metrics (in degree)
   * If not defined the metric angle will be used.
   */
  angle: _propTypes.default.number,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The number of divisions with label.
   * @default 1
   */
  divisions: _propTypes.default.number,
  /**
   * The labels dominant baseline or a function returning the dominant baseline for a given axis angle (in degree).
   */
  dominantBaseline: _propTypes.default.oneOfType([_propTypes.default.oneOf(['alphabetic', 'auto', 'central', 'hanging', 'ideographic', 'inherit', 'mathematical', 'middle', 'no-change', 'reset-size', 'text-after-edge', 'text-before-edge', 'use-script']), _propTypes.default.func]),
  /**
   * Defines how label align with the axis.
   * - 'horizontal': labels stay horizontal and their placement change with the axis angle.
   * - 'rotated': labels are rotated 90deg relatively to their axis.
   * @default 'horizontal'
   */
  labelOrientation: _propTypes.default.oneOf(['horizontal', 'rotated']),
  /**
   * The metric to get.
   * If `undefined`, the hook returns `null`
   */
  metric: _propTypes.default.string,
  /**
   * The labels text anchor or a function returning the text anchor for a given axis angle (in degree).
   */
  textAnchor: _propTypes.default.oneOfType([_propTypes.default.oneOf(['end', 'inherit', 'middle', 'start']), _propTypes.default.func])
} : void 0;