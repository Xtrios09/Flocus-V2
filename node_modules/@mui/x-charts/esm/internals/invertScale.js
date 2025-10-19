import { isOrdinalScale } from "./scaleGuards.js";
export function invertScale(scale, data, value) {
  if (isOrdinalScale(scale)) {
    const dataIndex = scale.bandwidth() === 0 ? Math.floor((value - Math.min(...scale.range()) + scale.step() / 2) / scale.step()) : Math.floor((value - Math.min(...scale.range())) / scale.step());
    return data[dataIndex];
  }
  return scale.invert(value);
}