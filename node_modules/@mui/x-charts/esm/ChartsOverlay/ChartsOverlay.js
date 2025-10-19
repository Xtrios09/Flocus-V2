'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { ChartsLoadingOverlay } from "./ChartsLoadingOverlay.js";
import { useSeries } from "../hooks/useSeries.js";
import { ChartsNoDataOverlay } from "./ChartsNoDataOverlay.js";
import { jsx as _jsx } from "react/jsx-runtime";
export function useNoData() {
  const seriesPerType = useSeries();
  return Object.values(seriesPerType).every(seriesOfGivenType => {
    if (!seriesOfGivenType) {
      return true;
    }
    const {
      series,
      seriesOrder
    } = seriesOfGivenType;
    return seriesOrder.every(seriesId => {
      const seriesItem = series[seriesId];

      // These prevent a type error when building the package.
      // @ts-ignore, sankey type is not declared in the base package
      if (seriesItem.type === 'sankey') {
        // @ts-ignore, sankey type is not declared in the base package
        return seriesItem.data.links.length === 0;
      }
      return seriesItem.data.length === 0;
    });
  });
}
export function ChartsOverlay(props) {
  const noData = useNoData();
  if (props.loading) {
    const LoadingOverlay = props.slots?.loadingOverlay ?? ChartsLoadingOverlay;
    return /*#__PURE__*/_jsx(LoadingOverlay, _extends({}, props.slotProps?.loadingOverlay));
  }
  if (noData) {
    const NoDataOverlay = props.slots?.noDataOverlay ?? ChartsNoDataOverlay;
    return /*#__PURE__*/_jsx(NoDataOverlay, _extends({}, props.slotProps?.noDataOverlay));
  }
  return null;
}