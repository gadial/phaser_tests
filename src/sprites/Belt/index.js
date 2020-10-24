import Phaser from "phaser";
export default class Belt {
  constructor(config) {
    this.scene = config.scene;
    this.sprite = this.scene.physics.add.sprite(config.x, config.y, "belt");
    this.sprite.context = this;
    this.sprite.setInteractive();
    this.set_direction(config.direction);
    this.sprite.on("pointerdown", function (pointer) {
      this.dragged = false;
      console.log("clicked!");
    });

    this.sprite.on("pointerup", function (pointer) {
      if (!this.dragged) {
        this.context.rotate();
      }
    });

    // dragging
    this.scene.input.setDraggable(this.sprite);
    this.scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = Phaser.Math.Snap.To(dragX, 64);
      gameObject.y = Phaser.Math.Snap.To(dragY, 64);
      gameObject.dragged = true;
    });

    // physics
    this.sprite.body.allowGravity = false;
    this.sprite.body.immovable = true;
  }

  set_direction(direction) {
    this.direction = direction;
    switch (direction) {
      case "UP":
        this.sprite.rotation = 0 * Phaser.Math.DEG_TO_RAD;
        break;
      case "DOWN":
        this.sprite.rotation = 180 * Phaser.Math.DEG_TO_RAD;
        break;
      case "LEFT":
        this.sprite.rotation = 270 * Phaser.Math.DEG_TO_RAD;
        break;
      case "RIGHT":
        this.sprite.rotation = 90 * Phaser.Math.DEG_TO_RAD;
        break;
      default:
        this.sprite.rotation = 0 * Phaser.Math.DEG_TO_RAD;
        this.direction = "UP";
        break;
    }
  }

  rotate() {
    switch (this.direction) {
      case "UP":
        this.set_direction("LEFT");
        break;
      case "DOWN":
        this.set_direction("RIGHT");
        break;
      case "LEFT":
        this.set_direction("DOWN");
        break;
      case "RIGHT":
        this.set_direction("UP");
        break;
      default:
        break;
    }
  }

  destroy() {
    this.sprite.destroy();
  }
}
