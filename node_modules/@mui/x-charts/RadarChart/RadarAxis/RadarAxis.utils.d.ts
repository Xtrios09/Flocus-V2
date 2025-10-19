import { RadarAxisProps } from "./RadarAxis.js";
interface GetLabelAttributesParams extends Required<Pick<RadarAxisProps, 'labelOrientation'>>, Partial<Pick<RadarAxisProps, 'textAnchor' | 'dominantBaseline'>> {
  x: number;
  y: number;
  angle: number;
}
export declare function getLabelAttributes(params: GetLabelAttributesParams): {
  x: number;
  y: number;
  textAnchor: "inherit" | "end" | "start" | "middle" | undefined;
  dominantBaseline: "inherit" | "auto" | "middle" | "alphabetic" | "hanging" | "ideographic" | "mathematical" | "text-before-edge" | "central" | "text-after-edge" | "use-script" | "no-change" | "reset-size" | undefined;
  transform?: undefined;
} | {
  x: number;
  y: number;
  textAnchor: "inherit" | "end" | "start" | "middle" | undefined;
  dominantBaseline: "inherit" | "auto" | "middle" | "alphabetic" | "hanging" | "ideographic" | "mathematical" | "text-before-edge" | "central" | "text-after-edge" | "use-script" | "no-change" | "reset-size" | undefined;
  transform: string;
};
export {};