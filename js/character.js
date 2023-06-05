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
    eachWoodObstalce,
    fireObstacle
  ) {
    this.ctx = ctx;
    this.originalPosition = [x, y];
    this.marioXpos = x;
    this.marioYpos = y;
    this.marioHeight = height;
    this.marioWidth = width;

    this.ladder = ladder;
    this.background = wood;
    this.individualObstacle = individualObstacle;
    this.hammer = hammer;
    this.specialObstacle = specialObstacle;
    this.eachWoodObstalce = eachWoodObstalce;
    this.fireObstacle = fireObstacle;

    this.frames = 0;
    this.velocityX = 15;
    this.direction = null;
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

  getCurrentWood() {
    for (let i = 0; i < this.background.length; i++) {
      const wood = this.background[i];

      if (this.marioYpos <= wood.woodYpos + wood.woodHeight) return [wood, i];
    }
    return null;
  }

  isClimbing() {
    return this.currentMario.src == this.marioClimbing.src;
  }
  getDirection() {
    return this.direction;
  }

  drawMario() {
    if (moveLeft) {
      this.direction = "left";
      this.currentMario = this.marioRunningLeft;
    }
    if (climbLadder) {
      this.direction = "updown";
      this.currentMario = this.marioClimbing;
    }
    if (moveRight) {
      this.direction = "right";
      this.currentMario = this.marioMovingRight;
    }
    if (this.powerUpMode) {
      this.currentMario = this.marioHammer;
    }

    this.ctx.drawImage(
      this.currentMario,
      this.powerUpMode ? 60 * this.frames : 42 * this.frames,
      0,
      this.powerUpMode ? 60 : 42,
      this.powerUpMode ? 70 : 50,
      this.marioXpos,
      this.marioYpos,
      this.marioWidth,
      this.marioHeight
    );
    // this.marioObstacleCollision();
    // this.marioSpecialObjCollision();
    // this.marioBlueObsCollision();
    // this.marioFireObsCollision();
  }

  moveMario() {
    this.ctx.clearRect(
      this.marioXpos,
      this.marioYpos,
      this.marioWidth,
      this.marioHeight
    );
    if (!gameStart) return;

    this.frames++;
    if (this.frames > 3) this.frames = 0;

    if (moveRight && this.isOnWood()) {
      this.marioXpos += this.velocityX;
      this.marioXpos = Math.min(CANVAS_WIDTH - this.marioWidth, this.marioXpos);
    }
    if (moveLeft && this.isOnWood()) {
      this.marioXpos -= this.velocityX;
      this.marioXpos = Math.max(10, this.marioXpos);
    }

    if (climbLadder && this.isOnLadder()) {
      this.marioYpos -= this.velocityX;
    }
    if (marioDown && this.isOnLadder()) {
      this.marioYpos += this.velocityX;
    }

    if (marioJump && !this.isClimbing()) {
      this.marioYpos -= 80;
      console.log({ direction: this.getDirection() });
      if (this.getDirection() == "left") {
        this.marioXpos -= 100;
        this.marioXpos = Math.max(0, this.marioXpos);
      } else if (this.getDirection() == "right") {
        this.marioXpos += 100;
        this.marioXpos = Math.min(CANVAS_WIDTH - marioWidth, this.marioXpos);
      }
      // this.marioXpos += 100;
      this.marioJump = true;
    }

    if (this.marioYpos < 100) {
      level1 = false;
      level2 = true;

      localStorage.setItem("level1", level1);
      localStorage.setItem("level2", level2);
    }

    if (level2 && !level1) {
      this.marioObstacleCollision();
      this.marioSpecialObjCollision();
      this.marioFireObsCollision();
      this.marioHammerCollision();
    }
    this.marioBlueObsCollision();

    const [currWood, currWoodIndex] = this.getCurrentWood();

    // console.log(currWood);

    if (level2) {
      if (
        this.marioXpos > currWood.woodXpos + currWood.woodWidth ||
        this.marioXpos < currWood.woodXpos - this.marioWidth
      ) {
        this.marioYpos =
          this.background[currWoodIndex + 1].woodYpos - this.marioHeight;
      }
    }
    // if (
    //   this.marioXpos > currWood.woodXpos + currWood.woodWidth ||
    //   this.marioXpos < currWood.woodXpos - this.marioWidth
    // ) {
    //   this.marioYpos =
    //     this.background[currWoodIndex + 1].woodYpos - this.marioHeight;
    // }
    this.drawMario();
    // this.marioMovementAudio.play();
  }

  isOnWood() {
    const [w, i] = this.getCurrentWood();

    if (
      Math.ceil(this.marioXpos) >= w.woodXpos - this.marioWidth - 5 &&
      Math.ceil(this.marioXpos) <= w.woodXpos + w.woodWidth &&
      Math.ceil(this.marioYpos) + this.marioHeight - 5 - (5 - i) * 2.5 <=
        w.woodYpos
    )
      return true;

    return false;
  }

  isOnLadder() {
    for (const block of this.ladder) {
      if (
        this.marioXpos + this.marioWidth >= block.ladderXpos &&
        this.marioXpos <= block.ladderXpos + LADDER_WIDTH &&
        this.marioYpos + this.marioHeight <=
          block.ladderYpos + block.ladderHeight + 1 &&
        this.marioYpos + this.marioHeight >= block.ladderYpos
      ) {
        return true;
      }
    }
    return false;

    // if (!level1 && level2) {
    //   for (const block of this.lvl1ladder) {
    //     if (
    //       this.marioXpos + this.marioWidth >= block.ladderXpos &&
    //       this.marioXpos <= block.ladderXpos + LADDER_WIDTH &&
    //       this.marioYpos + this.marioHeight <=
    //         block.ladderYpos + block.ladderHeight + 1 &&
    //       this.marioYpos + this.marioHeight >= block.ladderYpos
    //     ) {
    //       return true;
    //     }
    //   }
    // }
    // return false;
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
        gameEnd = true;
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

  marioFireObsCollision() {
    for (const block of this.fireObstacle) {
      if (
        this.marioXpos < block.fireObsXpos + block.fireObsWidth &&
        this.marioXpos + this.marioWidth > block.fireObsXpos &&
        this.marioYpos < block.fireObsYpos + block.fireObsHeight &&
        this.marioYpos + this.marioHeight > block.fireObsYpos &&
        !this.powerUpMode
      ) {
        console.log("collision with fire");
      }
      if (
        this.marioXpos < block.fireObsXpos + block.fireObsWidth &&
        this.marioXpos + this.marioWidth > block.fireObsXpos &&
        this.marioYpos < block.fireObsYpos + block.fireObsHeight &&
        this.marioYpos + this.marioHeight > block.fireObsYpos &&
        this.powerUpMode
      ) {
        const indexOfFireObs = this.fireObstacle.indexOf(block);
        if (indexOfFireObs !== 1) {
          this.fireObstacle.splice(indexOfFireObs, 1);
          score++;
        }
      }
    }
  }
}
