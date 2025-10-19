'use client';

import { useFocusedItem } from "./useFocusedItem.js";
/**
 * A hook to check if an item has the focus.
 *
 * If you need to process multiple points, use the `useIsItemFocusedGetter` hook instead.
 *
 * @param {FocusedItemData} item is the item to check
 * @returns {boolean} the focus state
 */
export function useIsItemFocused(item) {
  const focusedItem = useFocusedItem();
  return focusedItem !== null && focusedItem.seriesType === item.seriesType && focusedItem.seriesId === item.seriesId && focusedItem.dataIndex === item.dataIndex;
}