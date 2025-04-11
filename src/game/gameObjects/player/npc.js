import Phaser from "phaser"

export default class NPC extends Phaser.Physics.Arcade.Sprite {
  hp = 10
  maxHp = 100
  #speed = 60 // langsamer als der Spieler
  stepsLeft = 60
  move = "left"

  constructor(scene, x, y, player) {
    super(scene, x, y, "npc")
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = false
    this.setOrigin(0.5, 0.5)
    this.setSize(24, 24, false)
    this.setOffset(4, 8)

    this.player = player
  }

  /**
   * Setze die Geschwindigkeit des Spielers. Kann nicht grösser als 960 sein, da
   * der Spieler sonst durch die Spielobjekte geht. Kann auch nicht kleiner als
   * 0 sein.
   *
   * @param {integer} value Die Geschwindigkeit der Spielers.
   */
  set speed(value) {
    this.#speed = Math.min(value, 700)
    this.#speed = Math.max(0, this.#speed)
  }

  /** Geschwindigkeit des Spielers. */
  get speed() {
    return this.#speed
  }

  update() {
    const { body } = this
    body.setVelocity(0)

    const dx = this.player.x - this.x
    const dy = this.player.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    h
    // NPC folgt immer dem Spieler,ist aber langsamer
    if (distance > 1) {
      body.setVelocityX((dx / distance) * this.speed)
      body.setVelocityY((dy / distance) * this.speed)

      // Animation wird gewählt, je nachdem wie der Spieler läuft
      if (Math.abs(dx) > Math.abs(dy)) {
        this.anims.play(dx > 0 ? "player_right" : "player_left", true)
      } else {
        this.anims.play(dy > 0 ? "player_down" : "player_up", true)
      }
    } else {
      this.anims.play("player_idle", true)
    }
  }

  heal(value = 0) {
    this.hp += value
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp
    }
  }
}
