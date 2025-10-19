import { FocusedItemData } from "./useFocusedItem.js";
/**
 * A hook to check focus state of multiple items.
 * If you're interested by a single one, consider using `useIsItemFocused`.
 *
 * @returns {(item: FocusedItemData) => boolean} callback to get the state of the item.
 */
export declare function useIsItemFocusedGetter(): (item: FocusedItemData) => boolean;