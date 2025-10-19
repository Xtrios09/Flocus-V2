import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getRadarAxisUtilityClass(slot) {
  return generateUtilityClass('MuiRadarAxis', slot);
}
export const chartsAxisClasses = generateUtilityClasses('MuiRadarAxis', ['root', 'line', 'label']);
export const useUtilityClasses = classes => {
  const slots = {
    root: ['root'],
    line: ['line'],
    label: ['label']
  };
  return composeClasses(slots, getRadarAxisUtilityClass, classes);
};