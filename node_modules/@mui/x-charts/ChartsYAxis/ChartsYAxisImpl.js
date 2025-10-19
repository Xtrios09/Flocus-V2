"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsYAxisImpl = ChartsYAxisImpl;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _useSlotProps = _interopRequireDefault(require("@mui/utils/useSlotProps"));
var _styles = require("@mui/material/styles");
var _ChartsSingleYAxisTicks = require("./ChartsSingleYAxisTicks");
var _ChartsGroupedYAxisTicks = require("./ChartsGroupedYAxisTicks");
var _ChartsText = require("../ChartsText");
var _utilities = require("./utilities");
var _isInfinity = require("../internals/isInfinity");
var _useDrawingArea = require("../hooks/useDrawingArea");
var _useIsHydrated = require("../hooks/useIsHydrated");
var _scaleGuards = require("../internals/scaleGuards");
var _domUtils = require("../internals/domUtils");
var _AxisSharedComponents = require("../internals/components/AxisSharedComponents");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["axis"],
  _excluded2 = ["scale", "tickNumber", "reverse"];
const YAxisRoot = (0, _styles.styled)(_AxisSharedComponents.AxisRoot, {
  name: 'MuiChartsYAxis',
  slot: 'Root'
})({});
/**
 * @ignore - internal component. Use `ChartsYAxis` instead.
 */
function ChartsYAxisImpl(_ref) {
  let {
      axis
    } = _ref,
    inProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const {
      scale: yScale
    } = axis,
    settings = (0, _objectWithoutPropertiesLoose2.default)(axis, _excluded2);
  const isHydrated = (0, _useIsHydrated.useIsHydrated)();

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({}, settings, inProps),
    name: 'MuiChartsYAxis'
  });
  const defaultizedProps = (0, _extends2.default)({}, _utilities.defaultProps, themedProps);
  const {
    position,
    disableLine,
    label,
    labelStyle,
    offset,
    width: axisWidth,
    sx,
    slots,
    slotProps
  } = defaultizedProps;
  const theme = (0, _styles.useTheme)();
  const classes = (0, _utilities.useUtilityClasses)(defaultizedProps);
  const {
    left,
    top,
    width,
    height
  } = (0, _useDrawingArea.useDrawingArea)();
  const positionSign = position === 'right' ? 1 : -1;
  const Line = slots?.axisLine ?? 'line';
  const Label = slots?.axisLabel ?? _ChartsText.ChartsText;
  const lineProps = (0, _useSlotProps.default)({
    elementType: Line,
    externalSlotProps: slotProps?.axisLine,
    additionalProps: {
      strokeLinecap: 'square'
    },
    ownerState: {}
  });
  const axisLabelProps = (0, _useSlotProps.default)({
    elementType: Label,
    externalSlotProps: slotProps?.axisLabel,
    additionalProps: {
      style: (0, _extends2.default)({}, theme.typography.body1, {
        lineHeight: 1,
        fontSize: 14,
        angle: positionSign * 90,
        textAnchor: 'middle',
        dominantBaseline: 'text-before-edge'
      }, labelStyle)
    },
    ownerState: {}
  });

  // Skip axis rendering if no data is available
  // - The domain is an empty array for band/point scales.
  // - The domains contains Infinity for continuous scales.
  // - The position is set to 'none'.
  if (position === 'none') {
    return null;
  }
  const labelRefPoint = {
    x: positionSign * axisWidth,
    y: top + height / 2
  };
  const axisLabelHeight = label == null ? 0 : (0, _domUtils.getStringSize)(label, axisLabelProps.style).height;
  const domain = yScale.domain();
  const isScaleOrdinal = (0, _scaleGuards.isOrdinalScale)(yScale);
  const skipTickRendering = isScaleOrdinal ? domain.length === 0 : domain.some(_isInfinity.isInfinity);
  let children = null;
  if (!skipTickRendering) {
    children = 'groups' in axis && Array.isArray(axis.groups) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsGroupedYAxisTicks.ChartsGroupedYAxisTicks, (0, _extends2.default)({}, inProps)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsSingleYAxisTicks.ChartsSingleYAxisTicks, (0, _extends2.default)({}, inProps, {
      axisLabelHeight: axisLabelHeight
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(YAxisRoot, {
    transform: `translate(${position === 'right' ? left + width + offset : left - offset}, 0)`,
    className: classes.root,
    sx: sx,
    children: [!disableLine && /*#__PURE__*/(0, _jsxRuntime.jsx)(Line, (0, _extends2.default)({
      y1: top,
      y2: top + height,
      className: classes.line
    }, lineProps)), children, label && isHydrated && /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: classes.label,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Label, (0, _extends2.default)({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}