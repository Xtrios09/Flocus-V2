'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["axis"],
  _excluded2 = ["scale", "tickNumber", "reverse"];
import * as React from 'react';
import useSlotProps from '@mui/utils/useSlotProps';
import { useThemeProps, useTheme, styled } from '@mui/material/styles';
import { ChartsSingleYAxisTicks } from "./ChartsSingleYAxisTicks.js";
import { ChartsGroupedYAxisTicks } from "./ChartsGroupedYAxisTicks.js";
import { ChartsText } from "../ChartsText/index.js";
import { defaultProps, useUtilityClasses } from "./utilities.js";
import { isInfinity } from "../internals/isInfinity.js";
import { useDrawingArea } from "../hooks/useDrawingArea.js";
import { useIsHydrated } from "../hooks/useIsHydrated.js";
import { isOrdinalScale } from "../internals/scaleGuards.js";
import { getStringSize } from "../internals/domUtils.js";
import { AxisRoot } from "../internals/components/AxisSharedComponents.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const YAxisRoot = styled(AxisRoot, {
  name: 'MuiChartsYAxis',
  slot: 'Root'
})({});
/**
 * @ignore - internal component. Use `ChartsYAxis` instead.
 */
export function ChartsYAxisImpl(_ref) {
  let {
      axis
    } = _ref,
    inProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const {
      scale: yScale
    } = axis,
    settings = _objectWithoutPropertiesLoose(axis, _excluded2);
  const isHydrated = useIsHydrated();

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: 'MuiChartsYAxis'
  });
  const defaultizedProps = _extends({}, defaultProps, themedProps);
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
  const theme = useTheme();
  const classes = useUtilityClasses(defaultizedProps);
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const positionSign = position === 'right' ? 1 : -1;
  const Line = slots?.axisLine ?? 'line';
  const Label = slots?.axisLabel ?? ChartsText;
  const lineProps = useSlotProps({
    elementType: Line,
    externalSlotProps: slotProps?.axisLine,
    additionalProps: {
      strokeLinecap: 'square'
    },
    ownerState: {}
  });
  const axisLabelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps?.axisLabel,
    additionalProps: {
      style: _extends({}, theme.typography.body1, {
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
  const axisLabelHeight = label == null ? 0 : getStringSize(label, axisLabelProps.style).height;
  const domain = yScale.domain();
  const isScaleOrdinal = isOrdinalScale(yScale);
  const skipTickRendering = isScaleOrdinal ? domain.length === 0 : domain.some(isInfinity);
  let children = null;
  if (!skipTickRendering) {
    children = 'groups' in axis && Array.isArray(axis.groups) ? /*#__PURE__*/_jsx(ChartsGroupedYAxisTicks, _extends({}, inProps)) : /*#__PURE__*/_jsx(ChartsSingleYAxisTicks, _extends({}, inProps, {
      axisLabelHeight: axisLabelHeight
    }));
  }
  return /*#__PURE__*/_jsxs(YAxisRoot, {
    transform: `translate(${position === 'right' ? left + width + offset : left - offset}, 0)`,
    className: classes.root,
    sx: sx,
    children: [!disableLine && /*#__PURE__*/_jsx(Line, _extends({
      y1: top,
      y2: top + height,
      className: classes.line
    }, lineProps)), children, label && isHydrated && /*#__PURE__*/_jsx("g", {
      className: classes.label,
      children: /*#__PURE__*/_jsx(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}