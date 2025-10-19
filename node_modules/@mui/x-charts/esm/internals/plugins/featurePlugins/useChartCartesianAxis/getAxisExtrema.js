import { isCartesianSeriesType } from "../../../isCartesian.js";
const axisExtremumCallback = (chartType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters) => {
  const getter = axisDirection === 'x' ? seriesConfig[chartType].xExtremumGetter : seriesConfig[chartType].yExtremumGetter;
  const series = formattedSeries[chartType]?.series ?? {};
  return getter?.({
    series,
    axis,
    axisIndex,
    isDefaultAxis: axisIndex === 0,
    getFilters
  }) ?? [Infinity, -Infinity];
};
export function getAxisExtrema(axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters) {
  const cartesianChartTypes = Object.keys(seriesConfig).filter(isCartesianSeriesType);
  let extrema = [Infinity, -Infinity];
  for (const chartType of cartesianChartTypes) {
    const [min, max] = axisExtremumCallback(chartType, axis, axisDirection, seriesConfig, axisIndex, formattedSeries, getFilters);
    extrema = [Math.min(extrema[0], min), Math.max(extrema[1], max)];
  }
  if (Number.isNaN(extrema[0]) || Number.isNaN(extrema[1])) {
    return [Infinity, -Infinity];
  }
  return extrema;
}