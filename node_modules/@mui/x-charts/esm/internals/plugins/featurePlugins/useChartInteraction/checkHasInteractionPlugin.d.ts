import { ChartAnyPluginSignature, ChartUsedInstance } from "../../models/plugin.js";
import { UseChartInteractionInstance } from "./useChartInteraction.types.js";
export declare function checkHasInteractionPlugin<T extends ChartAnyPluginSignature>(instance: ChartUsedInstance<T>): instance is ChartUsedInstance<T> & UseChartInteractionInstance;