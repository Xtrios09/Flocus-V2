"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertScale = invertScale;
var _scaleGuards = require("./scaleGuards");
function invertScale(scale, data, value) {
  if ((0, _scaleGuards.isOrdinalScale)(scale)) {
    const dataIndex = scale.bandwidth() === 0 ? Math.floor((value - Math.min(...scale.range()) + scale.step() / 2) / scale.step()) : Math.floor((value - Math.min(...scale.range())) / scale.step());
    return data[dataIndex];
  }
  return scale.invert(value);
}