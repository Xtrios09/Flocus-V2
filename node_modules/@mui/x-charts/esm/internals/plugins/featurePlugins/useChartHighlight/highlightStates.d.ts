import { HighlightItemData } from "./useChartHighlight.types.js";
import { HighlightScope } from "./highlightConfig.types.js";
import { SeriesId } from "../../../../models/seriesType/common.js";
export declare function isSeriesHighlighted(scope: Partial<HighlightScope> | null, item: HighlightItemData | null, seriesId: SeriesId): boolean;
export declare function isSeriesFaded(scope: Partial<HighlightScope> | null, item: HighlightItemData | null, seriesId: SeriesId): boolean;
/**
 * Returns the data index of the highlighted item for a specific series.
 * If the item is not highlighted, it returns `null`.
 */
export declare function getSeriesHighlightedItem(scope: Partial<HighlightScope> | null, item: HighlightItemData | null, seriesId: SeriesId): number | null | undefined;
/**
 * Returns the data index of the "unfaded item" for a specific series.
 * An "unfaded item" is the only item of a faded series that shouldn't be faded.
 * If the series is not faded or if there is no highlighted item, it returns `null`.
 */
export declare function getSeriesUnfadedItem(scope: Partial<HighlightScope> | null, item: HighlightItemData | null, seriesId: SeriesId): number | null | undefined;