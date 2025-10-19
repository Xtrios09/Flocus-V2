import type { ChartSeries, ChartSeriesType } from "../../../../models/seriesType/config.js";
import type { AllSeriesType } from "../../../../models/seriesType/index.js";
export type GetSeriesWithDefaultValues<T extends ChartSeriesType> = (series: AllSeriesType<T>, seriesIndex: number, colors: readonly string[]) => ChartSeries<T>;