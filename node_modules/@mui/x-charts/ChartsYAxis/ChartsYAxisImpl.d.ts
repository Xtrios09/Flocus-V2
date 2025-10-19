import * as React from 'react';
import { AxisScaleConfig, ChartsYAxisProps, ComputedAxis } from "../models/axis.js";
interface ChartsYAxisImplProps extends Omit<ChartsYAxisProps, 'axis'> {
  axis: ComputedAxis<keyof AxisScaleConfig, any, ChartsYAxisProps>;
}
/**
 * @ignore - internal component. Use `ChartsYAxis` instead.
 */
export declare function ChartsYAxisImpl({
  axis,
  ...inProps
}: ChartsYAxisImplProps): React.JSX.Element | null;
export {};