import { UseChartZAxisSignature } from "../internals/plugins/featurePlugins/useChartZAxis/index.js";
import { UseChartCartesianAxisSignature } from "../internals/plugins/featurePlugins/useChartCartesianAxis/index.js";
import { UseChartInteractionSignature } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { UseChartHighlightSignature } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { ConvertSignaturesIntoPlugins } from "../internals/plugins/models/helpers.js";
import { UseChartClosestPointSignature } from "../internals/plugins/featurePlugins/useChartClosestPoint/index.js";
import { UseChartKeyboardNavigationSignature } from "../internals/plugins/featurePlugins/useChartKeyboardNavigation/index.js";
export type ScatterChartPluginSignatures = [UseChartZAxisSignature, UseChartCartesianAxisSignature<'scatter'>, UseChartInteractionSignature, UseChartHighlightSignature, UseChartClosestPointSignature, UseChartKeyboardNavigationSignature];
export declare const SCATTER_CHART_PLUGINS: ConvertSignaturesIntoPlugins<ScatterChartPluginSignatures>;