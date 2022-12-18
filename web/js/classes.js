class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.image,
      (this.framesCurrent * this.image.width) / this.framesMax,
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Luchador extends Sprite {
  constructor({
    position,
    velocity,
    imgSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
    flipH = false,
  }) {
    super({
      position,
      imgSrc,
      scale,
      framesMax,
      offset,
    });

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking;
    this.isJumping = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.sprites = sprites;
    this.dead = false;
    this.flipH = flipH;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imgSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) {
      this.animateFrames();
    }
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    /*la hitbox
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    ); */
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
      this.position.y = 330.4;
      this.isJumping = false;
    } else {
      this.velocity.y += gravity;
    }
    if (this.position.x + this.width + this.velocity.x >= canvas.width) {
      this.velocity.x = 0;
      this.position.x = canvas.width - this.width;
    }
    if (this.position.x + this.width + this.velocity.x <= 0) {
      this.velocity.x = 0;
      this.position.x = 0 - this.width;
    }
  }

  attack() {
    this.switchSprite(this.flipH ? "attack1_flipH" : "attack1");
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 10;
    if (this.health <= 0) {
      this.switchSprite(this.flipH ? "death_flipH" : "death");
    } else {
      this.switchSprite(this.flipH ? "takeHit_flipH" : "takeHit");
    }
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.death.image ||
      this.image === this.sprites.death_flipH.image
    ) {
      if (
        this.framesCurrent === this.sprites.death.framesMax - 1 ||
        this.framesCurrent === this.sprites.death_flipH.framesMax - 1
      ) {
        this.dead = true;
      }
      return;
    }
    if (
      (this.image === this.sprites.attack1.image ||
        this.image === this.sprites.attack1_flipH.image) &&
      (this.framesCurrent < this.sprites.attack1.framesMax - 1 ||
        this.framesCurrent < this.sprites.attack1_flipH.framesMax - 1)
    ) {
      return;
    }
    if (
      (this.image === this.sprites.takeHit.image ||
        this.image === this.sprites.takeHit_flipH.image) &&
      (this.framesCurrent < this.sprites.takeHit.framesMax - 1 ||
        this.framesCurrent < this.sprites.takeHit_flipH.framesMax - 1)
    ) {
      return;
    }
    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.framesMax = this.sprites.attack1.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "idle_flipH":
        if (this.image !== this.sprites.idle_flipH.image) {
          this.image = this.sprites.idle_flipH.image;
          this.framesMax = this.sprites.idle_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "run_flipH":
        if (this.image !== this.sprites.run_flipH.image) {
          this.image = this.sprites.run_flipH.image;
          this.framesMax = this.sprites.run_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "jump_flipH":
        if (this.image !== this.sprites.jump_flipH.image) {
          this.image = this.sprites.jump_flipH.image;
          this.framesMax = this.sprites.jump_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "fall_flipH":
        if (this.image !== this.sprites.fall_flipH.image) {
          this.image = this.sprites.fall_flipH.image;
          this.framesMax = this.sprites.fall_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "attack1_flipH":
        if (this.image !== this.sprites.attack1_flipH.image) {
          this.image = this.sprites.attack1_flipH.image;
          this.framesMax = this.sprites.attack1_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "takeHit_flipH":
        if (this.image !== this.sprites.takeHit_flipH.image) {
          this.image = this.sprites.takeHit_flipH.image;
          this.framesMax = this.sprites.takeHit_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      case "death_flipH":
        if (this.image !== this.sprites.death_flipH.image) {
          this.image = this.sprites.death_flipH.image;
          this.framesMax = this.sprites.death_flipH.framesMax;
          this.framesCurrent = 0;
        }
        break;
      default:
        break;
    }
  }
}
