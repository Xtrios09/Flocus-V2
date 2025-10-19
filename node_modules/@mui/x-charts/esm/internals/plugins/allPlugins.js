// This file should be removed after creating all plugins in favor of a file per chart type.

import { useChartCartesianAxis } from "./featurePlugins/useChartCartesianAxis/index.js";
import { useChartHighlight } from "./featurePlugins/useChartHighlight/index.js";
import { useChartInteraction } from "./featurePlugins/useChartInteraction/index.js";
import { useChartKeyboardNavigation } from "./featurePlugins/useChartKeyboardNavigation/index.js";
import { useChartClosestPoint } from "./featurePlugins/useChartClosestPoint/index.js";
import { useChartZAxis } from "./featurePlugins/useChartZAxis/index.js";
export const DEFAULT_PLUGINS = [useChartZAxis, useChartCartesianAxis, useChartInteraction, useChartHighlight, useChartClosestPoint, useChartKeyboardNavigation];