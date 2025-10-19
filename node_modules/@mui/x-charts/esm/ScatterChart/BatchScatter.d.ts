import * as React from 'react';
import { DefaultizedScatterSeriesType } from "../models/seriesType/scatter.js";
import { D3Scale } from "../models/axis.js";
import { ScatterClasses } from "./scatterClasses.js";
import { ColorGetter } from "../internals/plugins/models/seriesConfig/index.js";
export interface BatchScatterProps {
  series: DefaultizedScatterSeriesType;
  xScale: D3Scale;
  yScale: D3Scale;
  color: string;
  colorGetter?: ColorGetter<'scatter'>;
  classes?: Partial<ScatterClasses>;
}
export interface BatchScatterPathsProps {
  series: DefaultizedScatterSeriesType;
  xScale: D3Scale;
  yScale: D3Scale;
  color: string;
  colorGetter?: ColorGetter<'scatter'>;
  markerSize: number;
}
/**
 * @internal
 * A batch version of the Scatter component that uses SVG paths to render points.
 * This component is optimized for performance and is suitable for rendering large datasets, but has limitations. Some of the limitations include:
 * - Limited CSS styling;
 * - Overriding the `marker` slot is not supported;
 * - Highlight style must not contain opacity.
 *
 * You can read about all the limitations [here](https://mui.com/x/react-charts/scatter/#performance).
 */
export declare function BatchScatter(props: BatchScatterProps): React.JSX.Element;