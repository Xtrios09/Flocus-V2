import _extends from "@babel/runtime/helpers/esm/extends";
import { Gesture } from "../../core/index.js";
export class MockBadUpdateOptionsGesture extends Gesture {
  state = {};
  resetState() {}
  clone(overrides) {
    return new MockBadUpdateOptionsGesture(_extends({
      name: this.name
    }, overrides));
  }

  // We remove the updateOptions implementation
  updateOptions() {}
}