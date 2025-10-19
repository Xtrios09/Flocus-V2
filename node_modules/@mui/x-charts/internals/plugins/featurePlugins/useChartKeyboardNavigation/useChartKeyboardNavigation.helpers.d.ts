import { ChartSeriesType, ChartsSeriesConfig } from "../../../../models/seriesType/config.js";
import { SeriesId } from "../../../../models/seriesType/common.js";
import { ProcessedSeries } from "../../corePlugins/useChartSeries/index.js";
/**
 * Returns the next series type and id that contains some data.
 * Returns `null` if no other series have data.
 */
export declare function getNextSeriesWithData(series: ProcessedSeries<keyof ChartsSeriesConfig>, type?: ChartSeriesType, seriesId?: SeriesId): {
  type: Exclude<ChartSeriesType, 'sankey'>;
  seriesId: SeriesId;
} | null;
/**
 * Returns the previous series type and id that contains some data.
 * Returns `null` if no other series have data.
 */
export declare function getPreviousSeriesWithData(series: ProcessedSeries<keyof ChartsSeriesConfig>, type?: ChartSeriesType, seriesId?: SeriesId): {
  type: Exclude<ChartSeriesType, 'sankey'>;
  seriesId: SeriesId;
} | null;
export declare function seriesHasData(series: ProcessedSeries<keyof ChartsSeriesConfig>, type: ChartSeriesType, seriesId: SeriesId): boolean | undefined;