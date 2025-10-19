import { AxisConfig, ChartsYAxisProps } from "../models/axis.js";
export declare const useUtilityClasses: (ownerState: AxisConfig<any, any, ChartsYAxisProps>) => Record<"root" | "line" | "label" | "tickContainer" | "tick" | "tickLabel", string>;
export declare const TICK_LABEL_GAP = 2;
export declare const AXIS_LABEL_TICK_LABEL_GAP = 2;
export declare const defaultProps: {
  disableLine: boolean;
  disableTicks: boolean;
  tickSize: number;
};