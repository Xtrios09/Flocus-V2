import * as React from 'react';
import { SeriesItemIdentifierWithData } from "../models/index.js";
import { UseChartHighlightSignature } from "../internals/plugins/featurePlugins/useChartHighlight/index.js";
import { UseChartInteractionSignature } from "../internals/plugins/featurePlugins/useChartInteraction/index.js";
import { ChartSeriesType, type ChartItemIdentifierWithData } from "../models/seriesType/config.js";
import { ChartInstance } from "../internals/plugins/models/index.js";
export declare const useInteractionItemProps: (data: SeriesItemIdentifierWithData, skip?: boolean) => {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
};
export declare const useInteractionAllItemProps: (data: SeriesItemIdentifierWithData[], skip?: boolean) => {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
}[];
export declare function getInteractionItemProps(instance: ChartInstance<[UseChartInteractionSignature, UseChartHighlightSignature]>, item: ChartItemIdentifierWithData<ChartSeriesType>): {
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
};