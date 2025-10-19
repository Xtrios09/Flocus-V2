import * as React from 'react';
import { AxisScaleConfig, ChartsXAxisProps, ComputedAxis } from "../models/axis.js";
interface ChartsXAxisImplProps extends Omit<ChartsXAxisProps, 'axis'> {
  axis: ComputedAxis<keyof AxisScaleConfig, any, ChartsXAxisProps>;
}
/**
 * @ignore - internal component. Use `ChartsXAxis` instead.
 */
export declare function ChartsXAxisImpl({
  axis,
  ...inProps
}: ChartsXAxisImplProps): React.JSX.Element | null;
export {};