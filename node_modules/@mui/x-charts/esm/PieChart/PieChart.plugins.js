import { useChartInteraction } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { useChartHighlight } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { useChartKeyboardNavigation } from "../internals/plugins/featurePlugins/useChartKeyboardNavigation/index.js";
export const PIE_CHART_PLUGINS = [useChartInteraction, useChartHighlight, useChartKeyboardNavigation];