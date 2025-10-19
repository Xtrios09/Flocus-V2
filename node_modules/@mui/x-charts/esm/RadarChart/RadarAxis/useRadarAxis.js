import { warnOnce } from '@mui/x-internals/warning';
import { useRadiusAxes } from "../../hooks/useAxis.js";
import { useRotationScale } from "../../hooks/useScale.js";
import { useChartContext } from "../../context/ChartProvider/useChartContext.js";
import { selectorChartPolarCenter } from "../../internals/plugins/featurePlugins/useChartPolarAxis/index.js";
import { isOrdinalScale } from "../../internals/scaleGuards.js";
import { degToRad } from "../../internals/degToRad.js";
import { clampAngle } from "../../internals/clampAngle.js";
import { useSelector } from "../../internals/store/useSelector.js";
import { rad2deg } from "../../internals/angleConversion.js";
/**
 * Returns an array with on item par metrics with the different point to label.
 */
export function useRadarAxis(params) {
  const {
    metric,
    angle,
    divisions = 1
  } = params;
  const {
    instance,
    store
  } = useChartContext();
  const rotationScale = useRotationScale();
  const {
    radiusAxis
  } = useRadiusAxes();
  const {
    cx,
    cy
  } = useSelector(store, selectorChartPolarCenter);
  if (metric === undefined || !rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const existingMetrics = rotationScale.domain();
  if (!existingMetrics.includes(metric)) {
    warnOnce([`MUI X Charts: You radar axis try displaying values for the metric "${metric}" which does nto exist.`, `either add this metric to your radar, or pick one from the existing metrics: ${existingMetrics.join(', ')}`]);
  }
  const anglesWithDefault = angle !== undefined ? degToRad(angle) : rotationScale(metric) ?? 0;
  const radiusRatio = Array.from({
    length: divisions
  }, (_, index) => (index + 1) / divisions);
  const radiusScale = radiusAxis[metric].scale;
  const R = radiusScale.range()[1];
  if (isOrdinalScale(radiusScale)) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MUI X Charts: Radar chart does not support ordinal axes');
    }
    return null;
  }
  return {
    metric,
    angle: clampAngle(rad2deg(anglesWithDefault)),
    center: {
      x: cx,
      y: cy
    },
    labels: radiusRatio.map(ratio => {
      const radius = ratio * R;
      const [x, y] = instance.polar2svg(radius, anglesWithDefault);
      const value = radiusScale.invert(radius);
      const defaultTickLabel = value.toString();
      return {
        x,
        y,
        value,
        formattedValue: radiusAxis[metric].valueFormatter?.(radiusScale.invert(radius), {
          location: 'tick',
          scale: radiusScale,
          defaultTickLabel,
          tickNumber: divisions
        }) ?? defaultTickLabel
      };
    })
  };
}