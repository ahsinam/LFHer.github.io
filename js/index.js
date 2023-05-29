class HerGame {
  constructor(x, y) {
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.backgroundBlocks = [];
    this.ladderBlocks = [];
    this.indObsBlocks = [];
    this.objectTimer = null;
    this.signal = 0;
    this.background = new WoodenBlock(
      0,
      CANVAS_HEIGHT - WOOD_HEIGHT,
      CANVAS_WIDTH,
      WOOD_HEIGHT,
      "ground"
    );

    this.topLadder = new Ladder(topLadderXpos, topLadderYpos, topLadderHeight);

    this.preparation = new GamePreperation(this.ctx, this.background);
    this.kong = new DonkeyKong(
      this.ctx,
      kongXpos,
      kongYpos,
      kongWidth,
      kongHeight
    );
    this.fire = new Fire(this.ctx, fireXpos, fireYpos, fireWidth, fireHeight);

    this.groupObstacle = new GroupObstacle(
      this.ctx,
      groupObsXpos,
      groupObsYpos,
      groupObsWidth,
      groupObsHeight
    );
    this.indObstacle = [
      new IndividualObstacle(
        this.ctx,
        indObsXpos,
        indObsYpos,
        indObsWidth,
        indObsHeight,
        this.ladderBlocks,
        this.backgroundBlocks
      ),
    ];

    this.mario = new Mario(
      this.ctx,
      marioStartingXpos,
      marioStartingYpos,
      marioWidth,
      marioHeight,
      this.ladderBlocks,
      this.backgroundBlocks,
      this.indObstacle
    );

    this.initWoodenBlocks();
    this.initLadderBlocks();
    // this.initIndividualObstacle();

    addEventListener("keydown", (e) => {
      if (e.key == "d") {
        moveRight = true;
        this.mario.moveMario();
      }
      if (e.key == "a") {
        moveLeft = true;
        this.mario.moveMario();
      }
      if (e.key == "w") {
        climbLadder = true;
        this.mario.moveMario();
      }
      if (e.key == "s") {
        marioJump = true;
        this.mario.moveMario();
      }
      if (e.key == "x") {
        marioDown = true;
        this.mario.moveMario();
      }
    });

    addEventListener("keyup", (e) => {
      if (e.key == "d") {
        moveRight = false;
      }
      if (e.key == "a") {
        moveLeft = false;
      }
      if (e.key == "w") {
        climbLadder = false;
      }
      if (e.key == "s") {
        this.ctx.clearRect(
          this.mario.marioXpos,
          this.mario.marioYpos,
          this.mario.marioWidth,
          this.mario.marioHeight
        );
        marioJump = false;
        this.mario.marioYpos += 80;
      }
      if (e.key == "x") {
        marioDown = false;
      }
    });
  }

  initWoodenBlocks() {
    const woodenBlockCount = 6;
    const startY = 200;
    const endY = 970;
    const gap = (endY - startY) / (woodenBlockCount - 1);

    for (let i = 0; i < woodenBlockCount; i++) {
      const y = startY + i * gap;
      const x = i % 2 === 0 ? 0 : WOOD_GAP;
      const direction = i % 2 === 0 ? "left" : "right";
      const woodenBlock = new WoodenBlock(
        x,
        y,
        WOOD_WIDTH,
        WOOD_HEIGHT,
        direction
      );

      this.backgroundBlocks.push(woodenBlock);
    }
  }

  //ladder Block
  initLadderBlocks() {
    const ladderBlockData = [];
    for (let i = 0; i < this.backgroundBlocks.length - 1; i++) {
      const currentWoodenBlock = this.backgroundBlocks[i];
      const nextWoodenBlock = this.backgroundBlocks[i + 1];

      //Calculate the y position range for the two ladders
      const positions = calculateLadderPos(currentWoodenBlock, nextWoodenBlock);
      const ladderStartY1 = positions.ladderStartY;
      const ladderEndY1 = positions.ladderEndY;
      const ladderStartY2 = positions.ladderStartY;
      const ladderEndY2 = positions.ladderEndY;

      ladderBlockData.push(
        {
          x: calculateRandomXpos().xPos1,
          y: ladderStartY1,
          height: ladderEndY1 - ladderStartY1 + 20,
        },
        {
          x: calculateRandomXpos().xPos2,
          y: ladderStartY2,
          height: ladderEndY2 - ladderStartY2 + 20,
        }
      );
    }
    for (const data of ladderBlockData) {
      const ladderBlock = new Ladder(data.x, data.y, data.height);
      this.ladderBlocks.push(ladderBlock);
    }
    this.ladderBlocks.push(this.topLadder);
  }

  init = () => {
    window.requestAnimationFrame(this.init);

    if (gameStart == false) {
      this.preparation.beforeStart();
    }

    if (gameStart == true) {
      if (gameEnd == false) {
        if (this.objectTimer) {
          clearInterval(this.objectTimer);
        }
        for (let obstacle of this.indObstacle) {
          obstacle.updateIndObstacle();
        }
        this.objectTimer = setInterval(() => {
          this.signal += 1;
          if (!(this.signal % 1000)) {
            this.fire.updateFire();
            this.signal = 0;
            this.indObstacle.push(
              new IndividualObstacle(
                this.ctx,
                indObsXpos,
                indObsYpos,
                indObsWidth,
                indObsHeight,
                this.ladderBlocks,
                this.backgroundBlocks
              )
            );
          }
          for (let block of this.indObstacle) {
            if (Math.ceil(block.indObsYpos) >= 910 && block.indObsXpos <= 150) {
              block.clearObstacle();
              this.indObstacle.shift();
            }
          }
          class Mario {
            constructor(
              ctx,
              x,
              y,
              width,
              height,
              ladder,
              wood,
              individualObstacle
            ) {
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
              this.marioRunningLeft.src =
                "../Images/mario/spriteRunningLeft.png";

              this.marioMovingRight = new Image();
              this.marioMovingRight.src =
                "../Images/mario/spriteRunningRight.png";

              this.marioClimbing = new Image();
              this.marioClimbing.src =
                "../Images/mario/spriteClimbingLadder.png";

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

              if (marioJump && this.isOnWood()) {
                this.marioYpos -= 80;
                this.marioJump = false;
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
                  marioRect.y + marioRect.height > objectRect.y
                ) {
                  gameEnd = true;
                }
              }
            }
          }
        }, 3);
        //Draw Background
        for (const block of this.backgroundBlocks) {
          block.drawWoodenBlock();
        }
        //Draw Ladder
        for (const individualBlock of this.ladderBlocks) {
          individualBlock.drawLadder();
        }
        //Draw character and obstacle
        this.mario.drawMario();
        this.kong.drawKong();
        this.groupObstacle.drawGroupObs();
        this.fire.drawFire();
      }
      if (gameEnd == true) {
        console.log("game end");
      }
    }
  };
}

const herGame = new HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);
herGame.init();
