"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chartsAxisClasses = void 0;
exports.getRadarAxisUtilityClass = getRadarAxisUtilityClass;
exports.useUtilityClasses = void 0;
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getRadarAxisUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiRadarAxis', slot);
}
const chartsAxisClasses = exports.chartsAxisClasses = (0, _generateUtilityClasses.default)('MuiRadarAxis', ['root', 'line', 'label']);
const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    line: ['line'],
    label: ['label']
  };
  return (0, _composeClasses.default)(slots, getRadarAxisUtilityClass, classes);
};
exports.useUtilityClasses = useUtilityClasses;