import Phaser from "phaser";

export default class DebuggerHelper {
  constructor(scene, sprite = null, map = null) {
    this.scene = scene;
    this.sprite = sprite;
    this.map = map;

    this.addDebugging();
  }

  addDebugging() {
    if (this.map !== null) {
      this.showMapDebugging();
    }

    if (this.sprite !== null) {
      this.text = this.scene.add
        .text(5, 5, "", {
          font: "11px Courier",
          fill: "#00ff00"
        })
        .setScrollFactor(0);
      const emitter = this.scene.sys.events;
      emitter.on("update", this.updateDebugText, this);
    }
  }

  showMapDebugging() {
    var debugGraphics = this.scene.add.graphics();
    this.map.renderDebug(debugGraphics, {
      tileColor: null, // Non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
    });
  }

  updateDebugText() {
    this.text.setText([
      "x: " + this.sprite.body.x,
      "y: " + this.sprite.body.y,
      "velocity x: " + this.sprite.body.velocity.x,
      "velocity y: " + this.sprite.body.velocity.y,
      "state: " + this.sprite.context.behaviors.state
    ]);
  }

  cleanUp() {
    const emitter = this.scene.sys.events;
    emitter.off("update", this.updateDebugText, this);
  }
}
