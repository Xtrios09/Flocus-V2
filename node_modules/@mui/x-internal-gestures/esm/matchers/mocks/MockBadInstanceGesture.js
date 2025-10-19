import _extends from "@babel/runtime/helpers/esm/extends";
import { Gesture } from "../../core/index.js";
export class MockBadInstanceGesture extends Gesture {
  state = {};
  resetState() {}
  clone(overrides) {
    return _extends({
      name: this.name
    }, overrides);
  }
}