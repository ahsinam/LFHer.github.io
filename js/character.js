class Mario {
  constructor(ctx, x, y, width, height, ladder, wood) {
    this.ctx = ctx;
    this.marioXpos = x;
    this.marioYpos = y;
    this.marioHeight = height;
    this.marioWidth = width;
    this.frames = 0;
    this.velocityX = 0.01;
    this.ladder = ladder;
    this.background = wood;

    this.marioImage = new Image();
    this.marioImage.src = "../Images/mario/marioNormal.png";

    this.marioRunningLeft = new Image();
    this.marioRunningLeft.src = "../Images/mario/spriteRunningLeft.png";

    this.marioMovingRight = new Image();
    this.marioMovingRight.src = "../Images/mario/spriteRunningRight.png";

    this.marioClimbing = new Image();
    this.marioClimbing.src = "../Images/mario/spriteClimbingLadder.png";

    this.currentMario = this.marioImage;
  }

  drawMario() {
    if (moveLeft) {
      this.currentMario = this.marioRunningLeft;
    }
    if (climbLadder) {
      this.currentMario = this.marioClimbing;
    }
    if (moveRight) {
      this.currentMario = this.marioMovingRight;
    }
    this.ctx.drawImage(
      this.currentMario,
      44 * this.frames,
      0,
      44,
      50,
      this.marioXpos,
      this.marioYpos,
      this.marioWidth,
      this.marioHeight
    );
  }

  moveMario() {
    this.ctx.clearRect(
      this.marioXpos,
      this.marioYpos,
      this.marioWidth,
      this.marioHeight
    );
    this.frames++;

    if (this.frames > 3) this.frames = 0;

    if (moveRight && this.isOnWood(this.marioXpos, this.marioYpos)) {
      this.marioXpos += this.velocityX;
    }
    if (moveLeft && this.isOnWood()) {
      this.marioXpos -= this.velocityX;
    }
    if (climbLadder && this.isOnLadder()) {
      this.marioYpos -= this.velocityX;
    }
    if (marioDown && this.isOnLadder()) {
      this.marioYpos += this.velocityX; // Set the flag to prevent moving up
    }

    this.drawMario();
  }

  isOnWood() {
    for (const block of this.background) {
      if (
        Math.ceil(this.marioYpos) + marioHeight <=
          block.woodYpos + WOOD_HEIGHT &&
        Math.ceil(this.marioYpos) + this.marioHeight >= block.woodYpos - 10
      ) {
        return true;
      }
    }
    return false;
  }

  isOnLadder() {
    for (const block of this.ladder) {
      if (
        block.ladderYpos + block.ladderHeight <=
          Math.ceil(this.marioYpos) + this.marioHeight + 5 &&
        Math.ceil(this.marioYpos) + this.marioHeight >= block.ladderYpos &&
        Math.ceil(this.marioXpos) + this.marioHeight / 2 >= block.ladderXpos &&
        Math.ceil(this.marioXpos) <= block.ladderXpos + block.ladderWidth
      ) {
        return true;
      }
    }
    return false;
  }
}
