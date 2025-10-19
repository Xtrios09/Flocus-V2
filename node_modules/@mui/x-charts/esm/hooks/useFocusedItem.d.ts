import { ChartSeriesType } from "../models/seriesType/config.js";
import { SeriesId } from "../models/seriesType/common.js";
export type FocusedItemData = {
  seriesType: ChartSeriesType;
  seriesId: SeriesId;
  dataIndex: number;
};
/**
 * Get the focused item from keyboard navigation.
 */
export declare function useFocusedItem(): {
  seriesType: keyof import("../internals/index.js").ChartsSeriesConfig;
  seriesId: SeriesId;
  dataIndex: number;
} | null;