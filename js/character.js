class Mario {
  constructor(
    ctx,
    x,
    y,
    width,
    height,
    ladder,
    wood,
    individualObstacle,
    hammer,
    specialObstacle,
    eachWoodObstalce
  ) {
    this.ctx = ctx;
    this.originalPosition = [x, y];
    this.marioXpos = x;
    this.marioYpos = y;
    this.marioHeight = height;
    this.marioWidth = width;
    this.frames = 0;
    this.velocityX = 10;
    this.ladder = ladder;
    this.background = wood;
    this.individualObstacle = individualObstacle;
    this.hammer = hammer;
    this.specialObstacle = specialObstacle;
    this.eachWoodObstalce = eachWoodObstalce;

    this.powerUpMode = false;
    this.powerUpTimer = null;

    this.marioImage = new Image();
    this.marioImage.src = "../Images/mario/marioNormal.png";

    this.marioRunningLeft = new Image();
    this.marioRunningLeft.src = "../Images/mario/spriteRunningLeft.png";

    this.marioMovingRight = new Image();
    this.marioMovingRight.src = "../Images/mario/spriteRunningRight.png";

    this.marioClimbing = new Image();
    this.marioClimbing.src = "../Images/mario/spriteClimbingLadder.png";

    this.marioHammer = new Image();
    this.marioHammer.src = "../Images/mario/marioWithHammer.png";

    this.currentMario = this.marioImage;

    this.marioMovementAudio = new Audio("../sound/marioMovement.mp3");
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
    if (this.powerUpMode) {
      this.currentMario = this.marioHammer;
    }

    this.ctx.drawImage(
      this.currentMario,
      this.powerUpMode ? 60 * this.frames : 44 * this.frames,
      0,
      this.powerUpMode ? 60 : 44,
      this.powerUpMode ? 70 : 50,
      this.marioXpos,
      this.marioYpos,
      this.marioWidth,
      this.marioHeight
    );
    this.marioObstacleCollision();
    this.marioSpecialObjCollision();
    this.marioBlueObsCollision();
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
    this.marioHammerCollision();

    if (moveRight && this.isOnWood()) {
      this.marioXpos += this.velocityX;
    }
    if (moveLeft && this.isOnWood()) {
      this.marioXpos -= this.velocityX;
    }

    if (climbLadder && this.isOnLadder()) {
      this.marioYpos -= this.velocityX * 2;
    }
    if (marioDown && this.isOnLadder()) {
      this.marioYpos += this.velocityX * 2;
    }

    if (marioJump && this.isOnWood()) {
      this.marioYpos -= 80;
      this.marioJump = true;
    }

    if (this.marioYpos < 100) {
      level1 = false;
      level2 = true;

      localStorage.setItem("level1", level1);
      localStorage.setItem("level2", level2);
    }

    this.drawMario();
    // this.marioMovementAudio.play();
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
      const marioRect = {
        x: this.marioXpos,
        y: this.marioYpos,
        width: this.marioWidth,
        height: this.marioHeight,
      };

      const objectRect = {
        x: block.indObsXpos,
        y: block.indObsYpos,
        width: block.indObsWidth,
        height: block.indObsHeight,
      };

      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        !this.powerUpMode
      ) {
        gameEnd = true;
      }

      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        this.powerUpMode
      ) {
        const indexOfObstacle = this.individualObstacle.indexOf(block);
        if (indexOfObstacle !== -1) {
          this.individualObstacle.splice(indexOfObstacle, 1);
          score++;
        }
      }
    }
  }

  marioSpecialObjCollision() {
    for (const block of this.specialObstacle) {
      const marioRect = {
        x: this.marioXpos,
        y: this.marioYpos,
        width: this.marioWidth,
        height: this.marioHeight,
      };

      const objectRect = {
        x: block.specialObsXpos,
        y: block.specialObsYpos,
        width: block.specialObsWidth,
        height: block.specialObsHeight,
      };

      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        !this.powerUpMode
      ) {
        gameEnd = true;
      }

      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        this.powerUpMode
      ) {
        const indexOfObstacle = this.specialObstacle.indexOf(block);
        if (indexOfObstacle !== -1) {
          this.specialObstacle.splice(indexOfObstacle, 1);
          score += 1;
        }
      }
    }
  }

  resetMario() {
    this.marioXpos = this.originalPosition[0];
    this.marioYpos = this.originalPosition[1];
    this.marioHeight = this.marioHeight;
    this.marioWidth = this.marioWidth;
    this.frames = 0;
    this.velocityX = 5;
    this.ladder = this.ladder;
    this.background = this.background;
    this.individualObstacle = this.individualObstacle;

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

  marioHammerCollision() {
    if (
      this.hammer.hammerXpos <= this.marioXpos + this.marioWidth &&
      this.marioXpos <= this.hammer.hammerXpos + this.hammer.hammerWidth &&
      this.hammer.hammerYpos <= this.marioYpos + this.marioHeight &&
      this.marioYpos <= this.hammer.hammerYpos + this.hammer.hammerHeight
    ) {
      if (this.powerUpMode) clearTimeout(this.powerUpTimer);
      this.powerUpMode = true;
      this.powerUpTimer = setTimeout(() => {
        this.powerUpMode = false;
      }, 10000);
      this.hammer.hammerXpos = -100;
    }
  }

  marioBlueObsCollision() {
    for (const block of this.eachWoodObstalce) {
      const marioRect = {
        x: this.marioXpos,
        y: this.marioYpos,
        width: this.marioWidth,
        height: this.marioHeight,
      };

      const objectRect = {
        x: block.blueObsXpos,
        y: block.blueObsYpos,
        width: block.blueObsWidth,
        height: block.blueObsHeight,
      };

      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        !this.powerUpMode
      ) {
        console.log("collisioon");
      }
      if (
        marioRect.x < objectRect.x + objectRect.width &&
        marioRect.x + marioRect.width > objectRect.x &&
        marioRect.y < objectRect.y + objectRect.height &&
        marioRect.y + marioRect.height > objectRect.y &&
        this.powerUpMode
      ) {
        const indexOfObstacle = this.eachWoodObstalce.indexOf(block);
        if (indexOfObstacle !== -1) {
          this.eachWoodObstalce.splice(indexOfObstacle, 1);
          score++;
        }
      }
    }
  }
}
