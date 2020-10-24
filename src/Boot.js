import Phaser from "phaser";

class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "Boot"
    });
  }

  preload() {
    this.load.tilemapTiledJSON("SpringLevel", "../assets/BaseMap.json");
    this.load.image("springTiles", "../assets/tiles.png");

    this.load.spritesheet("Tommy", "../assets/boy.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("Factory", "../assets/factory.png", {
      frameWidth: 300,
      frameHeight: 300
    });

    this.load.image("springBackground", "../assets/background.png");

    this.load.image("belt", "../assets/belt.png");
    this.load.image("qubit", "../assets/block_mountain.png");
  }

  create() {
    this.scene.start("Play");
  }
}

export default Boot;
