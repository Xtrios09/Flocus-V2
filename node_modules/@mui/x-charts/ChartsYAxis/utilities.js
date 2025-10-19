"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUtilityClasses = exports.defaultProps = exports.TICK_LABEL_GAP = exports.AXIS_LABEL_TICK_LABEL_GAP = void 0;
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _axisClasses = require("../ChartsAxis/axisClasses");
const useUtilityClasses = ownerState => {
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
  return (0, _composeClasses.default)(slots, _axisClasses.getAxisUtilityClass, classes);
};

/* Gap between a tick and its label. */
exports.useUtilityClasses = useUtilityClasses;
const TICK_LABEL_GAP = exports.TICK_LABEL_GAP = 2;
/* Gap between the axis label and tick labels. */
const AXIS_LABEL_TICK_LABEL_GAP = exports.AXIS_LABEL_TICK_LABEL_GAP = 2;
const defaultProps = exports.defaultProps = {
  disableLine: false,
  disableTicks: false,
  tickSize: 6
};