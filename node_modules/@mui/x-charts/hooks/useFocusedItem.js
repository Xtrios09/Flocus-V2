"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFocusedItem = useFocusedItem;
var React = _interopRequireWildcard(require("react"));
var _useStore = require("../internals/store/useStore");
var _useSelector = require("../internals/store/useSelector");
var _useChartKeyboardNavigation = require("../internals/plugins/featurePlugins/useChartKeyboardNavigation");
/**
 * Get the focused item from keyboard navigation.
 */
function useFocusedItem() {
  const store = (0, _useStore.useStore)();
  const focusedSeriesType = (0, _useSelector.useSelector)(store, _useChartKeyboardNavigation.selectorChartsFocusedSeriesType);
  const focusedSeriesId = (0, _useSelector.useSelector)(store, _useChartKeyboardNavigation.selectorChartsFocusedSeriesId);
  const focusedDataIndex = (0, _useSelector.useSelector)(store, _useChartKeyboardNavigation.selectorChartsFocusedDataIndex);
  return React.useMemo(() => focusedSeriesType === undefined || focusedSeriesId === undefined || focusedDataIndex === undefined ? null : {
    seriesType: focusedSeriesType,
    seriesId: focusedSeriesId,
    dataIndex: focusedDataIndex
  }, [focusedSeriesType, focusedSeriesId, focusedDataIndex]);
}