import Phaser from "phaser";

import Belt from "./sprites/Belt";
import Qubit from "./sprites/Qubit";
import DebuggerHelper from "./utils/DebuggerHelper";

class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "Play"
    });
  }

  create() {
    var belt_data = [
      { x: 0, y: 0, direction: "RIGHT" },
      { x: 0, y: 1, direction: "UP" },
      { x: 0, y: 2, direction: "UP" },
      { x: 0, y: 3, direction: "RIGHT" },
      { x: 1, y: 3, direction: "UP" },
      { x: 0, y: 4, direction: "UP" },
      { x: 0, y: 5, direction: "UP" }
    ];

    this.belts = this.physics.add.staticGroup();
    for (var i = 0; i < belt_data.length; ++i) {
      var belt = new Belt({
        scene: this,
        x: (4 + belt_data[i].x) * 64,
        y: (2 + belt_data[i].y) * 64,
        direction: belt_data[i].direction
      });
      this.belts.add(belt.sprite);
    }

    this.qubit = new Qubit({
      scene: this,
      x: 8 * 32,
      y: 12 * 32
    });

    if (this.game.config.physics.arcade.debug) {
      this.debugger = new DebuggerHelper(this, this.qubit.sprite);
    }

    this.physics.add.overlap(this.qubit.sprite, this.belts, overlap_handler);
  }

  update(time, delta) {
    // this.physics.overlap(this.qubit, this.belts, overlap_handler);
  }

  restartScene() {
    this.cleanUp();
    this.scene.restart();
  }

  cleanUp() {
    if (this.game.config.physics.arcade.debug) {
      this.debugger.cleanUp();
      delete this.debugger;
    }
  }
}

function overlap_handler(qubit, belt) {
  var delta_x = qubit.getCenter().x - belt.getCenter().x;
  var delta_y = qubit.getCenter().y - belt.getCenter().y;
  var delta = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
  if (delta < 1) {
    var belt_velocity = 60;
    switch (belt.context.direction) {
      case "UP":
        qubit.body.velocity.set(0, -belt_velocity);
        break;
      case "DOWN":
        qubit.body.velocity.set(0, belt_velocity);
        break;
      case "LEFT":
        qubit.body.velocity.set(-belt_velocity, 0);
        break;
      case "RIGHT":
        qubit.body.velocity.set(belt_velocity, 0);
        break;
      default:
        break;
    }
  }
}

export default Play;
