import { Component, Property } from "@wonderlandengine/api";

/**
 * EyeSense by Shaepic
 * This script detects the user's presence in a portal using Wonderland
 * collision components, it then scales the 'clearVisor' apropriatley.
 */
export class EyeSense extends Component {
  static TypeName = "EyeSense";
  /* Properties that are configurable in the editor */
  static Properties = {
    eyeBox: Property.object(),
  };

  start() {
    this.boxScale = new Float32Array(3);
    if (this.eyeBox) {
      this.eyeBox.getScalingLocal(this.boxScale);
      this.eyeBox.setScalingLocal([0, 0, 0]);
    } else {
      this.object.getScalingLocal(this.boxScale);
      this.object.setScalingLocal([0, 0, 0]);
      this.eyeBox = this.object;
    }
    this.hide = false;
    this.col = this.object.getComponent("collision");
  }

  update(dt) {
    const overLapse = this.col.queryOverlaps();
    if (overLapse.length > 0) {
      if (!this.hide) {
        this.hide = true;
        this.eyeBox.setScalingLocal(this.boxScale);
      }
    } else if (this.hide) {
      this.hide = false;
      this.eyeBox.setScalingLocal([0, 0, 0]);
    }
  }
}
