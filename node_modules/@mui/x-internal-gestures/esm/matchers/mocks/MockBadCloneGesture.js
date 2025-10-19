import { Gesture } from "../../core/index.js";
export class MockBadCloneGesture extends Gesture {
  state = {};
  resetState() {}
  clone() {
    return this;
  }
}