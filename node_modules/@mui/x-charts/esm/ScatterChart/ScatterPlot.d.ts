import * as React from 'react';
import { ScatterProps, ScatterSlotProps, ScatterSlots } from "./Scatter.js";
export interface ScatterPlotSlots extends ScatterSlots {
  scatter?: React.JSXElementConstructor<ScatterProps>;
}
export interface ScatterPlotSlotProps extends ScatterSlotProps {
  scatter?: Partial<ScatterProps>;
}
export type RendererType = 'svg-single' | 'svg-batch';
export interface ScatterPlotProps extends Pick<ScatterProps, 'onItemClick'> {
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: ScatterPlotSlots;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: ScatterPlotSlotProps;
  /**
   * The type of renderer to use for the scatter plot.
   * - `svg-single`: Renders every scatter item in a `<circle />` element.
   * - `svg-batch`: Batch renders scatter items in `<path />` elements for better performance with large datasets, at the cost of some limitations.
   *                Read more: https://mui.com/x/react-charts/scatter/#performance
   *
   * @default 'svg-single'
   */
  renderer?: RendererType;
}
/**
 * Demos:
 *
 * - [Scatter](https://mui.com/x/react-charts/scatter/)
 * - [Scatter demonstration](https://mui.com/x/react-charts/scatter-demo/)
 *
 * API:
 *
 * - [ScatterPlot API](https://mui.com/x/api/charts/scatter-plot/)
 */
declare function ScatterPlot(props: ScatterPlotProps): React.JSX.Element | null;
declare namespace ScatterPlot {
  var propTypes: any;
}
export { ScatterPlot };