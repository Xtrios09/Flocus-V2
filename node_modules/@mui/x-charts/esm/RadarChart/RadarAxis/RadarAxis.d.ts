import * as React from 'react';
import { UseRadarAxisParams } from "./useRadarAxis.js";
import { RadarAxisClasses } from "./radarAxisClasses.js";
export interface RadarAxisProps extends UseRadarAxisParams {
  /**
   * Defines how label align with the axis.
   * - 'horizontal': labels stay horizontal and their placement change with the axis angle.
   * - 'rotated': labels are rotated 90deg relatively to their axis.
   * @default 'horizontal'
   */
  labelOrientation?: 'horizontal' | 'rotated';
  /**
   * The labels text anchor or a function returning the text anchor for a given axis angle (in degree).
   */
  textAnchor?: React.SVGProps<SVGTextElement>['textAnchor'] | ((angle: number) => React.SVGProps<SVGTextElement>['textAnchor']);
  /**
   * The labels dominant baseline or a function returning the dominant baseline for a given axis angle (in degree).
   */
  dominantBaseline?: React.SVGProps<SVGTextElement>['dominantBaseline'] | ((angle: number) => React.SVGProps<SVGTextElement>['dominantBaseline']);
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<RadarAxisClasses>;
}
declare function RadarAxis(props: RadarAxisProps): React.JSX.Element | null;
declare namespace RadarAxis {
  var propTypes: any;
}
export { RadarAxis };