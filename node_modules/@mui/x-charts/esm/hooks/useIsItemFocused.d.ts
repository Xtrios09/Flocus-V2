import { FocusedItemData } from "./useFocusedItem.js";
type UseItemFocusedParams = FocusedItemData;
/**
 * A hook to check if an item has the focus.
 *
 * If you need to process multiple points, use the `useIsItemFocusedGetter` hook instead.
 *
 * @param {FocusedItemData} item is the item to check
 * @returns {boolean} the focus state
 */
export declare function useIsItemFocused(item: UseItemFocusedParams): boolean;
export {};