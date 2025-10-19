import { useChartZAxis } from "../internals/plugins/featurePlugins/useChartZAxis/index.js";
import { useChartCartesianAxis } from "../internals/plugins/featurePlugins/useChartCartesianAxis/index.js";
import { useChartInteraction } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { useChartHighlight } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { useChartClosestPoint } from "../internals/plugins/featurePlugins/useChartClosestPoint/index.js";
import { useChartKeyboardNavigation } from "../internals/plugins/featurePlugins/useChartKeyboardNavigation/index.js";
export const SCATTER_CHART_PLUGINS = [useChartZAxis, useChartCartesianAxis, useChartInteraction, useChartHighlight, useChartClosestPoint, useChartKeyboardNavigation];