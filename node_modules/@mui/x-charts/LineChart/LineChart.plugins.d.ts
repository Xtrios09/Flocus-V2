import { UseChartZAxisSignature } from "../internals/plugins/featurePlugins/useChartZAxis/index.js";
import { UseChartCartesianAxisSignature } from "../internals/plugins/featurePlugins/useChartCartesianAxis/index.js";
import { UseChartInteractionSignature } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { UseChartHighlightSignature } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { UseChartKeyboardNavigationSignature } from "../internals/plugins/featurePlugins/useChartKeyboardNavigation/index.js";
import { ConvertSignaturesIntoPlugins } from "../internals/plugins/models/helpers.js";
export type LineChartPluginSignatures = [UseChartZAxisSignature, UseChartCartesianAxisSignature<'line'>, UseChartInteractionSignature, UseChartHighlightSignature, UseChartKeyboardNavigationSignature];
export declare const LINE_CHART_PLUGINS: ConvertSignaturesIntoPlugins<LineChartPluginSignatures>;