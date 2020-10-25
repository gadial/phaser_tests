import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot"
    });
  }

  preload() {
    this.load.image("belt", "../assets/belt.png");
    this.load.image("qubit", "../assets/block_mountain.png");
  }

  create() {
    this.scene.start("Play");
  }
}

export default Boot;
