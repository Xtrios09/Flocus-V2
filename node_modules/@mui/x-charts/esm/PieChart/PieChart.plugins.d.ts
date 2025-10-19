import { UseChartInteractionSignature } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { UseChartHighlightSignature } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { UseChartKeyboardNavigationSignature } from "../internals/plugins/featurePlugins/useChartKeyboardNavigation/index.js";
import { ConvertSignaturesIntoPlugins } from "../internals/plugins/models/helpers.js";
export type PieChartPluginSignatures = [UseChartInteractionSignature, UseChartHighlightSignature, UseChartKeyboardNavigationSignature];
export declare const PIE_CHART_PLUGINS: ConvertSignaturesIntoPlugins<PieChartPluginSignatures>;