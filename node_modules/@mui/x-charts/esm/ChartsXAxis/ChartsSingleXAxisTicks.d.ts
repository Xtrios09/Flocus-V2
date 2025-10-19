import * as React from 'react';
import { ChartsXAxisProps } from "../models/axis.js";
interface ChartsSingleXAxisProps extends ChartsXAxisProps {
  axisLabelHeight: number;
}
/**
 * @ignore - internal component.
 */
declare function ChartsSingleXAxisTicks(inProps: ChartsSingleXAxisProps): React.JSX.Element;
export { ChartsSingleXAxisTicks };