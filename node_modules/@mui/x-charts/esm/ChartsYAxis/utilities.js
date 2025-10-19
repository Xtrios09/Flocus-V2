import composeClasses from '@mui/utils/composeClasses';
import { getAxisUtilityClass } from "../ChartsAxis/axisClasses.js";
export const useUtilityClasses = ownerState => {
  const {
    classes,
    position,
    id
  } = ownerState;
  const slots = {
    root: ['root', 'directionY', position, `id-${id}`],
    line: ['line'],
    tickContainer: ['tickContainer'],
    tick: ['tick'],
    tickLabel: ['tickLabel'],
    label: ['label']
  };
  return composeClasses(slots, getAxisUtilityClass, classes);
};

/* Gap between a tick and its label. */
export const TICK_LABEL_GAP = 2;
/* Gap between the axis label and tick labels. */
export const AXIS_LABEL_TICK_LABEL_GAP = 2;
export const defaultProps = {
  disableLine: false,
  disableTicks: false,
  tickSize: 6
};