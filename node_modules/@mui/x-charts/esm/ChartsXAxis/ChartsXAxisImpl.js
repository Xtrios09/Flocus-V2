'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["axis"],
  _excluded2 = ["scale", "tickNumber", "reverse"];
import * as React from 'react';
import useSlotProps from '@mui/utils/useSlotProps';
import { styled, useTheme, useThemeProps } from '@mui/material/styles';
import { ChartsSingleXAxisTicks } from "./ChartsSingleXAxisTicks.js";
import { ChartsGroupedXAxisTicks } from "./ChartsGroupedXAxisTicks.js";
import { ChartsText } from "../ChartsText/index.js";
import { isOrdinalScale } from "../internals/scaleGuards.js";
import { isInfinity } from "../internals/isInfinity.js";
import { defaultProps, useUtilityClasses } from "./utilities.js";
import { useDrawingArea } from "../hooks/index.js";
import { getStringSize } from "../internals/domUtils.js";
import { AxisRoot } from "../internals/components/AxisSharedComponents.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const XAxisRoot = styled(AxisRoot, {
  name: 'MuiChartsXAxis',
  slot: 'Root'
})({});
/**
 * @ignore - internal component. Use `ChartsXAxis` instead.
 */
export function ChartsXAxisImpl(_ref) {
  let {
      axis
    } = _ref,
    inProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const {
      scale: xScale
    } = axis,
    settings = _objectWithoutPropertiesLoose(axis, _excluded2);

  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const themedProps = useThemeProps({
    props: _extends({}, settings, inProps),
    name: 'MuiChartsXAxis'
  });
  const defaultizedProps = _extends({}, defaultProps, themedProps);
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
  const theme = useTheme();
  const classes = useUtilityClasses(defaultizedProps);
  const {
    left,
    top,
    width,
    height
  } = useDrawingArea();
  const positionSign = position === 'bottom' ? 1 : -1;
  const Line = slots?.axisLine ?? 'line';
  const Label = slots?.axisLabel ?? ChartsText;
  const axisLabelProps = useSlotProps({
    elementType: Label,
    externalSlotProps: slotProps?.axisLabel,
    additionalProps: {
      style: _extends({}, theme.typography.body1, {
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
  const labelHeight = label ? getStringSize(label, axisLabelProps.style).height : 0;
  const domain = xScale.domain();
  const isScaleOrdinal = isOrdinalScale(xScale);
  const skipTickRendering = isScaleOrdinal ? domain.length === 0 : domain.some(isInfinity);
  let children = null;
  if (!skipTickRendering) {
    children = 'groups' in axis && Array.isArray(axis.groups) ? /*#__PURE__*/_jsx(ChartsGroupedXAxisTicks, _extends({}, inProps)) : /*#__PURE__*/_jsx(ChartsSingleXAxisTicks, _extends({}, inProps, {
      axisLabelHeight: labelHeight
    }));
  }
  const labelRefPoint = {
    x: left + width / 2,
    y: positionSign * axisHeight
  };
  return /*#__PURE__*/_jsxs(XAxisRoot, {
    transform: `translate(0, ${position === 'bottom' ? top + height + offset : top - offset})`,
    className: classes.root,
    sx: sx,
    children: [!disableLine && /*#__PURE__*/_jsx(Line, _extends({
      x1: left,
      x2: left + width,
      className: classes.line
    }, slotProps?.axisLine)), children, label && /*#__PURE__*/_jsx("g", {
      className: classes.label,
      children: /*#__PURE__*/_jsx(Label, _extends({}, labelRefPoint, axisLabelProps, {
        text: label
      }))
    })]
  });
}