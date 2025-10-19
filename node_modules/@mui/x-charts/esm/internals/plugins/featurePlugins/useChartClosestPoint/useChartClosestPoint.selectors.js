import { createSelector } from "../../utils/selectors.js";
const selectVoronoi = state => state.voronoi;
export const selectorChartsIsVoronoiEnabled = createSelector([selectVoronoi], voronoi => voronoi?.isVoronoiEnabled);