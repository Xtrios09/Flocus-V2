export function checkHasInteractionPlugin(instance) {
  return instance.setPointerCoordinate !== undefined;
}