export function isOrdinalScale(scale) {
  return scale.bandwidth !== undefined;
}
export function isBandScale(scale) {
  return isOrdinalScale(scale) && scale.paddingOuter !== undefined;
}
export function isPointScale(scale) {
  return isOrdinalScale(scale) && !('paddingOuter' in scale);
}