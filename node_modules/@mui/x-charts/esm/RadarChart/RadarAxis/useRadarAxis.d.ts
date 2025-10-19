export interface UseRadarAxisParams {
  /**
   * The metric to get.
   * If `undefined`, the hook returns `null`
   */
  metric?: string;
  /**
   * The absolute rotation angle of the metrics (in degree)
   * If not defined the metric angle will be used.
   */
  angle?: number;
  /**
   * The number of divisions with label.
   * @default 1
   */
  divisions?: number;
}
/**
 * Returns an array with on item par metrics with the different point to label.
 */
export declare function useRadarAxis(params: UseRadarAxisParams): {
  metric: string;
  angle: number;
  center: {
    x: number;
    y: number;
  };
  labels: {
    x: number;
    y: number;
    value: number | Date;
    formattedValue: string;
  }[];
} | null;