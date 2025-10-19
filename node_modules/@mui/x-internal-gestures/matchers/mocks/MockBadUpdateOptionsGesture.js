"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockBadUpdateOptionsGesture = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _core = require("../../core");
class MockBadUpdateOptionsGesture extends _core.Gesture {
  state = {};
  resetState() {}
  clone(overrides) {
    return new MockBadUpdateOptionsGesture((0, _extends2.default)({
      name: this.name
    }, overrides));
  }

  // We remove the updateOptions implementation
  updateOptions() {}
}
exports.MockBadUpdateOptionsGesture = MockBadUpdateOptionsGesture;