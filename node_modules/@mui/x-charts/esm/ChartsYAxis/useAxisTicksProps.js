'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["scale", "tickNumber", "reverse"];
import useSlotProps from '@mui/utils/useSlotProps';
import { useThemeProps, useTheme } from '@mui/material/styles';
import { useRtl } from '@mui/system/RtlProvider';
import { ChartsText } from "../ChartsText/index.js";
import { useYAxes } from "../hooks/useAxis.js";
import { getDefaultBaseline, getDefaultTextAnchor } from "../ChartsText/defaultTextPlacement.js";
import { invertTextAnchor } from "../internals/invertTextAnchor.js";
import { defaultProps, useUtilityClasses } from "./utilities.js";
export function useAxisTicksProps(inProps) {
  const {
    yAxis,
    yAxisIds
  } = useYAxes();
  const _yAxis = yAxis[inProps.axisId ?? yAxisIds[0]],
    {
      scale: yScale,
      tickNumber
    } = _yAxis,
    settings = _objectWithoutPropertiesLoose(_yAxis, _excluded);

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: 'MuiChartsYAxis'
  });
  const defaultizedProps = _extends({}, defaultProps, themedProps);
  const {
    position,
    tickLabelStyle,
    slots,
    slotProps
  } = defaultizedProps;
  const theme = useTheme();
  const isRtl = useRtl();
  const classes = useUtilityClasses(defaultizedProps);
  const positionSign = position === 'right' ? 1 : -1;
  const tickFontSize = typeof tickLabelStyle?.fontSize === 'number' ? tickLabelStyle.fontSize : 12;
  const Tick = slots?.axisTick ?? 'line';
  const TickLabel = slots?.axisTickLabel ?? ChartsText;
  const defaultTextAnchor = getDefaultTextAnchor((position === 'right' ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
  const defaultDominantBaseline = getDefaultBaseline((position === 'right' ? -90 : 90) - (tickLabelStyle?.angle ?? 0));
  const axisTickLabelProps = useSlotProps({
    elementType: TickLabel,
    externalSlotProps: slotProps?.axisTickLabel,
    additionalProps: {
      style: _extends({}, theme.typography.caption, {
        fontSize: tickFontSize,
        textAnchor: isRtl ? invertTextAnchor(defaultTextAnchor) : defaultTextAnchor,
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