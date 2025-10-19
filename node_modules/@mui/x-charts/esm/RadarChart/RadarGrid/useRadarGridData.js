import { useRotationScale } from "../../hooks/useScale.js";
import { useRadiusAxes } from "../../hooks/index.js";
import { selectorChartPolarCenter } from "../../internals/plugins/featurePlugins/useChartPolarAxis/index.js";
import { useChartContext } from "../../context/ChartProvider/useChartContext.js";
import { useSelector } from "../../internals/store/useSelector.js";
export function useRadarGridData() {
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
  if (!rotationScale || rotationScale.domain().length === 0) {
    return null;
  }
  const metrics = rotationScale.domain();
  const angles = metrics.map(key => rotationScale(key));
  return {
    center: {
      x: cx,
      y: cy
    },
    corners: metrics.map((metric, dataIndex) => {
      const radiusScale = radiusAxis[metric].scale;
      const r = radiusScale.range()[1];
      const angle = angles[dataIndex];
      const [x, y] = instance.polar2svg(r, angle);
      return {
        x,
        y
      };
    }),
    radius: radiusAxis[metrics[0]].scale.range()[1]
  };
}