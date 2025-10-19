'use client';

import { useFocusedItem } from "./useFocusedItem.js";

/**
 * A hook to check focus state of multiple items.
 * If you're interested by a single one, consider using `useIsItemFocused`.
 *
 * @returns {(item: FocusedItemData) => boolean} callback to get the state of the item.
 */
export function useIsItemFocusedGetter() {
  const focusedItem = useFocusedItem();
  return item => focusedItem !== null && focusedItem.seriesType === item.seriesType && focusedItem.seriesId === item.seriesId && focusedItem.dataIndex === item.dataIndex;
}