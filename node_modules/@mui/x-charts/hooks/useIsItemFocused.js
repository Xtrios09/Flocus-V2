"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsItemFocused = useIsItemFocused;
var _useFocusedItem = require("./useFocusedItem");
/**
 * A hook to check if an item has the focus.
 *
 * If you need to process multiple points, use the `useIsItemFocusedGetter` hook instead.
 *
 * @param {FocusedItemData} item is the item to check
 * @returns {boolean} the focus state
 */
function useIsItemFocused(item) {
  const focusedItem = (0, _useFocusedItem.useFocusedItem)();
  return focusedItem !== null && focusedItem.seriesType === item.seriesType && focusedItem.seriesId === item.seriesId && focusedItem.dataIndex === item.dataIndex;
}