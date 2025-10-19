export interface RadarAxisClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the line element. */
  line: string;
  /** Styles applied to every label element. */
  label: string;
}
export type RadarAxisClassKey = keyof RadarAxisClasses;
export declare function getRadarAxisUtilityClass(slot: string): string;
export declare const chartsAxisClasses: RadarAxisClasses;
export declare const useUtilityClasses: (classes?: Partial<RadarAxisClasses>) => Record<"root" | "line" | "label", string>;