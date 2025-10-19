"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsXAxisImpl = ChartsXAxisImpl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _useSlotProps = _interopRequireDefault(require("@mui/utils/useSlotProps"));
var _styles = require("@mui/material/styles");
var _ChartsSingleXAxisTicks = require("./ChartsSingleXAxisTicks");
var _ChartsGroupedXAxisTicks = require("./ChartsGroupedXAxisTicks");
var _ChartsText = require("../ChartsText");
var _scaleGuards = require("../internals/scaleGuards");
var _isInfinity = require("../internals/isInfinity");
var _utilities = require("./utilities");
var _hooks = require("../hooks");
var _domUtils = require("../internals/domUtils");
var _AxisSharedComponents = require("../internals/components/AxisSharedComponents");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["axis"],
  _excluded2 = ["scale", "tickNumber", "reverse"];
const XAxisRoot = (0, _styles.styled)(_AxisSharedComponents.AxisRoot, {
  name: 'MuiChartsXAxis',
  slot: 'Root'
})({});
/**
 * @ignore - internal component. Use `ChartsXAxis` instead.
 */
function ChartsXAxisImpl(_ref) {
  let {
      axis
    } = _ref,
    inProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const {
      scale: xScale
    } = axis,
    settings = (0, _objectWithoutPropertiesLoose2.default)(axis, _excluded2);

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({}, settings, inProps),
    name: 'MuiChartsXAxis'
  });
  const defaultizedProps = (0, _extends2.default)({}, _utilities.defaultProps, themedProps);
  const {
    position,
    labelStyle,
    offset,
    slots,
    slotProps,
    sx,
    disableLine,
    label,
    height: axisHeight
  } = defaultizedProps;
  const theme = (0, _styles.useTheme)();
  const classes = (0, _utilities.useUtilityClasses)(defaultizedProps);
  const {
    left,
    top,
    width,
    height
  } = (0, _hooks.useDrawingArea)();
  const positionSign = position === 'bottom' ? 1 : -1;
  const Line = slots?.axisLine ?? 'line';
  const Label = slots?.axisLabel ?? _ChartsText.ChartsText;
  const axisLabelProps = (0, _useSlotProps.default)({
    elementType: Label,
    externalSlotProps: slotProps?.axisLabel,
    additionalProps: {
      style: (0, _extends2.default)({}, theme.typography.body1, {
        lineHeight: 1,
        fontSize: 14,
        textAnchor: 'middle',
        dominantBaseline: position === 'bottom' ? 'text-after-edge' : 'text-before-edge'
      }, labelStyle)
    },
    ownerState: {}
  });
  if (position === 'none') {
    return null;
  }
  const labelHeight = label ? (0, _domUtils.getStringSize)(label, axisLabelProps.style).height : 0;
  const domain = xScale.domain();
  const isScaleOrdinal = (0, _scaleGuards.isOrdinalScale)(xScale);
  const skipTickRendering = isScaleOrdinal ? domain.length === 0 : domain.some(_isInfinity.isInfinity);
  let children = null;
  if (!skipTickRendering) {
    children = 'groups' in axis && Array.isArray(axis.groups) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsGroupedXAxisTicks.ChartsGroupedXAxisTicks, (0, _extends2.default)({}, inProps)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsSingleXAxisTicks.ChartsSingleXAxisTicks, (0, _extends2.default)({}, inProps, {
      axisLabelHeight: labelHeight
    }));
  }
  const labelRefPoint = {
    x: left + width / 2,
    y: positionSign * axisHeight
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(XAxisRoot, {
    transform: `translate(0, ${position === 'bottom' ? top + height + offset : top - offset})`,
    className: classes.root,
    sx: sx,
    children: [!disableLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2.default)({
      x1: left,
      x2: left + width,
      className: classes.line
    }, slotProps?.axisLine)), children, label && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: classes.label,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, (0, _extends2.default)({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}