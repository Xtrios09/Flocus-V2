"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInteractionItemProps = getInteractionItemProps;
exports.useInteractionItemProps = exports.useInteractionAllItemProps = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _ChartProvider = require("../context/ChartProvider");
function onPointerDown(event) {
  if ('hasPointerCapture' in event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}
const useInteractionItemProps = (data, skip) => {
  const {
    instance
  } = (0, _ChartProvider.useChartContext)();
  const interactionActive = React.useRef(false);
  const onPointerEnter = (0, _useEventCallback.default)(() => {
    interactionActive.current = true;
    instance.setItemInteraction(data);
    instance.setHighlight(data);
  });
  const onPointerLeave = (0, _useEventCallback.default)(() => {
    interactionActive.current = false;
    instance.removeItemInteraction(data);
    instance.clearHighlight();
  });
  React.useEffect(() => {
    return () => {
      /* Clean up state if this item is unmounted while active. */
      if (interactionActive.current) {
        onPointerLeave();
      }
    };
  }, [onPointerLeave]);
  if (skip) {
    return {};
  }
  return {
    onPointerEnter,
    onPointerLeave,
    onPointerDown
  };
};
exports.useInteractionItemProps = useInteractionItemProps;
const useInteractionAllItemProps = (data, skip) => {
  const {
    instance
  } = (0, _ChartProvider.useChartContext)();
  const results = React.useMemo(() => {
    return data.map(item => {
      return skip ? {} : getInteractionItemProps(instance, item);
    });
  }, [data, instance, skip]);
  return results;
};
exports.useInteractionAllItemProps = useInteractionAllItemProps;
function getInteractionItemProps(instance, item) {
  function onPointerEnter() {
    if (!item) {
      return;
    }
    instance.setItemInteraction(item);
    instance.setHighlight(item);
  }
  function onPointerLeave() {
    if (!item) {
      return;
    }
    instance.removeItemInteraction(item);
    instance.clearHighlight();
  }
  return {
    onPointerEnter,
    onPointerLeave,
    onPointerDown
  };
}