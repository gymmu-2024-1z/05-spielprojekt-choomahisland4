import Phaser from "phaser"
/**
 * Spiellogik für das Level02.
 */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" })
  }

  preload() {
    // Lade das Spritesheet für den Spieler.
    this.load.spritesheet("player", "./assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    })

    // Lade das Tileset für die Karten und die Objekte.
    this.load.image("tileset", "./assets/tileset.png")

    // Lade einen Atlas von einem Tileset. Damit können einzelne Kacheln aus
    // einem Tileset definiert werden.
    this.load.atlas(
      "pickups",
      "./assets/tileset.png",
      "./assets/atlas/atlas-pickups.json",
    )
    this.load.atlas(
      "doors",
      "./assets/tileset.png",
      "./assets/atlas/atlas-doors.json",
    )

    // Wir möchten auf das Drücken der Leertaste reagieren können, daher müssen
    // wir das hier registrieren.
    this.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    )
  }

  update() {
    if (this.SPACE.isDown) {
      this.scene.start("level-01")
    }
  }

  create() {
    this.createAnimations()

    this.add.text(320, 240, "GAME OVER.").setOrigin(0.5, 4)
  }

  createAnimations() {
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_right",
      frames: this.anims.generateFrameNumbers("player", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: "player_left",
      frames: this.anims.generateFrameNumbers("player", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: "player_up",
      frames: this.anims.generateFrameNumbers("player", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: "player_down",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
