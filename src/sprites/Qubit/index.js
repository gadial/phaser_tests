export default class Qubit {
  constructor(config) {
    this.scene = config.scene;
    this.sprite = this.scene.physics.add.sprite(config.x, config.y, "qubit");
    this.sprite.context = this;

    // physics
    this.sprite.body.allowGravity = false;
  }

  destroy() {
    this.sprite.destroy();
  }
}
