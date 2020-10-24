import Phaser from "phaser";

import Belt from "./sprites/Belt";
import Qubit from "./sprites/Qubit";

class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "Play"
    });
  }

  create() {
    var belt_data = [
      { x: 0, y: 0, direction: "UP" },
      { x: 0, y: 1, direction: "UP" },
      { x: 0, y: 2, direction: "UP" },
      { x: 0, y: 3, direction: "UP" },
      { x: 0, y: 4, direction: "UP" },
      { x: 0, y: 5, direction: "UP" }
    ];

    this.belts = this.physics.add.group();
    for (var i = 0; i < belt_data.length; ++i) {
      var belt = new Belt({
        scene: this,
        x: (4 + belt_data[i].x) * 64,
        y: (2 + belt_data[i].y) * 64,
        direction: belt_data[i].direction
      });
      // this.belts.add(belt.sprite);
    }

    this.qubit = new Qubit({
      scene: this,
      x: 2 * 32,
      y: 14 * 32
    });

    this.qubit.sprite.body.velocity.x = 50;
    // var collider = this.physics.add.collider(
    //   this.qubit.sprite,
    //   this.belts,
    //   overlap_handler
    // );
    // collider.overlapOnly = true;
  }

  update(time, delta) {
    this.physics.overlap(this.qubit, this.belts, overlap_handler);
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
  console.log("in Overlap handler:");
  console.log(qubit);
  console.log(belt);
}

export default Play;
