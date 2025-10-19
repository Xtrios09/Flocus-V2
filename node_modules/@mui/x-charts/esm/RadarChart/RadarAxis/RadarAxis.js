import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { useRadarAxis } from "./useRadarAxis.js";
import { getLabelAttributes } from "./RadarAxis.utils.js";
import { useUtilityClasses } from "./radarAxisClasses.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function RadarAxis(props) {
  const {
    labelOrientation = 'horizontal',
    textAnchor,
    dominantBaseline
  } = props;
  const classes = useUtilityClasses(props.classes);
  const theme = useTheme();
  const data = useRadarAxis(props);
  if (data === null) {
    return null;
  }
  const {
    center,
    angle,
    labels
  } = data;
  return /*#__PURE__*/_jsxs("g", {
    className: classes.root,
    children: [/*#__PURE__*/_jsx("path", {
      d: `M ${center.x} ${center.y} L ${labels[labels.length - 1].x} ${labels[labels.length - 1].y}`,
      stroke: (theme.vars ?? theme).palette.text.primary,
      strokeOpacity: 0.3,
      className: classes.line
    }), labels.map(({
      x,
      y,
      formattedValue
    }) => /*#__PURE__*/_jsx("text", _extends({
      fontSize: 12,
      fill: (theme.vars ?? theme).palette.text.primary,
      stroke: "none",
      className: classes.label
    }, getLabelAttributes({
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
  angle: PropTypes.number,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The number of divisions with label.
   * @default 1
   */
  divisions: PropTypes.number,
  /**
   * The labels dominant baseline or a function returning the dominant baseline for a given axis angle (in degree).
   */
  dominantBaseline: PropTypes.oneOfType([PropTypes.oneOf(['alphabetic', 'auto', 'central', 'hanging', 'ideographic', 'inherit', 'mathematical', 'middle', 'no-change', 'reset-size', 'text-after-edge', 'text-before-edge', 'use-script']), PropTypes.func]),
  /**
   * Defines how label align with the axis.
   * - 'horizontal': labels stay horizontal and their placement change with the axis angle.
   * - 'rotated': labels are rotated 90deg relatively to their axis.
   * @default 'horizontal'
   */
  labelOrientation: PropTypes.oneOf(['horizontal', 'rotated']),
  /**
   * The metric to get.
   * If `undefined`, the hook returns `null`
   */
  metric: PropTypes.string,
  /**
   * The labels text anchor or a function returning the text anchor for a given axis angle (in degree).
   */
  textAnchor: PropTypes.oneOfType([PropTypes.oneOf(['end', 'inherit', 'middle', 'start']), PropTypes.func])
} : void 0;
export { RadarAxis };