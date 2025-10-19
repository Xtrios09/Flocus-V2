"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectorChartsIsVoronoiEnabled = void 0;
var _selectors = require("../../utils/selectors");
const selectVoronoi = state => state.voronoi;
const selectorChartsIsVoronoiEnabled = exports.selectorChartsIsVoronoiEnabled = (0, _selectors.createSelector)([selectVoronoi], voronoi => voronoi?.isVoronoiEnabled);