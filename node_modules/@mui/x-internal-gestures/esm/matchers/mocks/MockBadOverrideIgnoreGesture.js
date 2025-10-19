import _extends from "@babel/runtime/helpers/esm/extends";
import { Gesture } from "../../core/index.js";
export class MockBadOverrideIgnoreGesture extends Gesture {
  state = {};
  resetState() {}
  clone(overrides) {
    return new MockBadOverrideIgnoreGesture(_extends({
      name: this.name,
      preventDefault: true
    }, overrides));
  }
}