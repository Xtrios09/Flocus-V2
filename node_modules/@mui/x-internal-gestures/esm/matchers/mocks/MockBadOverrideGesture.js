import { Gesture } from "../../core/index.js";
export class MockBadOverrideGesture extends Gesture {
  state = {};
  resetState() {}
  clone() {
    return new MockBadOverrideGesture({
      name: this.name
    });
  }
}