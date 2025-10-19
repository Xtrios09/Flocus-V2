import * as React from 'react';
import { ChartsYAxisProps } from "../models/axis.js";
interface ChartsSingleYAxisProps extends ChartsYAxisProps {
  axisLabelHeight: number;
}
/**
 * @ignore - internal component.
 */
declare function ChartsSingleYAxisTicks(inProps: ChartsSingleYAxisProps): React.JSX.Element;
export { ChartsSingleYAxisTicks };