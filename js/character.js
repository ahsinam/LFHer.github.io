class Mario {
  constructor(ctx, x, y, width, height, ladder, wood, individualObstacle) {
    this.ctx = ctx;
    this.marioXpos = x;
    this.marioYpos = y;
    this.marioHeight = height;
    this.marioWidth = width;
    this.frames = 0;
    this.velocityX = 1;
    this.ladder = ladder;
    this.background = wood;
    this.individualObstacle = individualObstacle;

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
    this.marioObstacleCollision();
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

    if (moveRight && this.isOnWood()) {
      this.marioXpos += this.velocityX;
    }
    if (moveLeft && this.isOnWood()) {
      this.marioXpos -= this.velocityX;
    }

    if (climbLadder && this.isOnLadder()) {
      this.marioYpos -= this.velocityX * 10;
    }
    if (marioDown && this.isOnLadder()) {
      this.marioYpos += this.velocityX * 10;
    }

    this.drawMario();
  }

  isOnWood() {
    for (const block of this.background) {
      if (
        Math.ceil(this.marioXpos) >= block.woodXpos &&
        this.marioXpos <= block.woodXpos + block.woodWidth &&
        Math.ceil(this.marioYpos) + this.marioHeight <= block.woodYpos
      ) {
        return true;
      }
    }
    return false;
  }

  isOnLadder() {
    for (const block of this.ladder) {
      if (
        this.marioXpos + this.marioWidth >= block.ladderXpos &&
        this.marioXpos <= block.ladderXpos + LADDER_WIDTH &&
        this.marioYpos + this.marioHeight <=
          block.ladderYpos + block.ladderHeight + 1 &&
        this.marioYpos + this.marioHeight >= block.ladderYpos - 30
      ) {
        return true;
      }
    }
    return false;
  }

  marioObstacleCollision() {
    for (const block of this.individualObstacle) {
      const marioFoot = this.marioYpos + this.marioHeight;
      const objectFoot = block.indObsYpos + block.indObsHeight;

      if (
        marioFoot <= objectFoot + 3 &&
        marioFoot >= block.indObsYpos &&
        this.marioXpos < block.indObsXpos &&
        this.marioXpos + this.marioWidth >= block.indObsXpos
      ) {
        alert("collided");
      }
    }
  }

  
}
