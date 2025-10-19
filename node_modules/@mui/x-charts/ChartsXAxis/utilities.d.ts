import { AxisConfig, ChartsXAxisProps } from "../models/axis.js";
export declare const useUtilityClasses: (ownerState: Pick<AxisConfig<any, any, ChartsXAxisProps>, "id" | "position" | "classes">) => Record<"root" | "line" | "label" | "tickContainer" | "tick" | "tickLabel", string>;
export declare const TICK_LABEL_GAP = 3;
export declare const AXIS_LABEL_TICK_LABEL_GAP = 4;
export declare const defaultProps: {
  readonly disableLine: false;
  readonly disableTicks: false;
  readonly tickSize: 6;
  readonly tickLabelMinGap: 4;
};