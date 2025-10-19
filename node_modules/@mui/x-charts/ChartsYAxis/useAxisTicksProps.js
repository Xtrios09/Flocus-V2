"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAxisTicksProps = useAxisTicksProps;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _useSlotProps = _interopRequireDefault(require("@mui/utils/useSlotProps"));
var _styles = require("@mui/material/styles");
var _RtlProvider = require("@mui/system/RtlProvider");
var _ChartsText = require("../ChartsText");
var _useAxis = require("../hooks/useAxis");
var _defaultTextPlacement = require("../ChartsText/defaultTextPlacement");
var _invertTextAnchor = require("../internals/invertTextAnchor");
var _utilities = require("./utilities");
const _excluded = ["scale", "tickNumber", "reverse"];
function useAxisTicksProps(inProps) {
  const {
    yAxis,
    yAxisIds
  } = (0, _useAxis.useYAxes)();
  const _yAxis = yAxis[inProps.axisId ?? yAxisIds[0]],
    {
      scale: yScale,
      tickNumber
    } = _yAxis,
    settings = (0, _objectWithoutPropertiesLoose2.default)(_yAxis, _excluded);

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({}, settings, inProps),
    name: 'MuiChartsYAxis'
  });
  const defaultizedProps = (0, _extends2.default)({}, _utilities.defaultProps, themedProps);
  const {
    position,
    tickLabelStyle,
    slots,
    slotProps
  } = defaultizedProps;
  const theme = (0, _styles.useTheme)();
  const isRtl = (0, _RtlProvider.useRtl)();
  const classes = (0, _utilities.useUtilityClasses)(defaultizedProps);
  const positionSign = position === 'right' ? 1 : -1;
  const tickFontSize = typeof tickLabelStyle?.fontSize === 'number' ? tickLabelStyle.fontSize : 12;
  const Tick = slots?.axisTick ?? 'line';
  const TickLabel = slots?.axisTickLabel ?? _ChartsText.ChartsText;
  const defaultTextAnchor = (0, _defaultTextPlacement.getDefaultTextAnchor)((position === 'right' ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
  const defaultDominantBaseline = (0, _defaultTextPlacement.getDefaultBaseline)((position === 'right' ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
  const axisTickLabelProps = (0, _useSlotProps.default)({
    elementType: TickLabel,
    externalSlotProps: slotProps?.axisTickLabel,
    additionalProps: {
      style: (0, _extends2.default)({}, theme.typography.caption, {
        fontSize: tickFontSize,
        textAnchor: isRtl ? (0, _invertTextAnchor.invertTextAnchor)(defaultTextAnchor) : defaultTextAnchor,
        dominantBaseline: defaultDominantBaseline
      }, tickLabelStyle)
    },
    className: classes.tickLabel,
    ownerState: {}
  });
  return {
    yScale,
    defaultizedProps,
    tickNumber,
    positionSign,
    classes,
    Tick,
    TickLabel,
    axisTickLabelProps
  };
}