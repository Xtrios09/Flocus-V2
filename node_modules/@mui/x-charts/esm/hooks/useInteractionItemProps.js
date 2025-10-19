'use client';

import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { useChartContext } from "../context/ChartProvider/index.js";
function onPointerDown(event) {
  if ('hasPointerCapture' in event.currentTarget && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
}
export const useInteractionItemProps = (data, skip) => {
  const {
    instance
  } = useChartContext();
  const interactionActive = React.useRef(false);
  const onPointerEnter = useEventCallback(() => {
    interactionActive.current = true;
    instance.setItemInteraction(data);
    instance.setHighlight(data);
  });
  const onPointerLeave = useEventCallback(() => {
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
export const useInteractionAllItemProps = (data, skip) => {
  const {
    instance
  } = useChartContext();
  const results = React.useMemo(() => {
    return data.map(item => {
      return skip ? {} : getInteractionItemProps(instance, item);
    });
  }, [data, instance, skip]);
  return results;
};
export function getInteractionItemProps(instance, item) {
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