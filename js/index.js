class HerGame {
  constructor(x, y) {
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.backgroundBlocks = [];
    this.ladderBlocks = [];
    this.indObsBlocks = [];
    this.objectTimer = null;
    this.fireObsTimer = null;
    this.signal = 0;
    this.fireSignal = 0;
    this.background = new WoodenBlock(
      0,
      CANVAS_HEIGHT - WOOD_HEIGHT,
      CANVAS_WIDTH,
      WOOD_HEIGHT,
      "ground"
    );

    this.topLadder = new Ladder(topLadderXpos, topLadderYpos, topLadderHeight);

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
    this.fireObstacle = [
      new FireObstacle(
        this.ctx,
        fireObsXpos,
        fireObsYpos,
        fireObsWidth,
        fireObsHeight
      ),
    ];
    this.specialObs = [];

    this.specialObstacle = new SpecialObstacle(
      this.ctx,
      indObsXpos,
      indObsYpos,
      indObsWidth,
      indObsHeight,
      this.ladderBlocks,
      this.backgroundBlocks
    );

    this.powerUpHammer = new HammerPowerUp(
      this.ctx,
      hammerXpos,
      hammerYpos,
      hammerWidth,
      hammerHeight
    );

    this.mario = new Mario(
      this.ctx,
      marioStartingXpos,
      marioStartingYpos,
      marioWidth,
      marioHeight,
      this.ladderBlocks,
      this.backgroundBlocks,
      this.indObstacle,
      this.powerUpHammer,
      this.specialObs
    );

    this.preparation = new GamePreperation(
      this.ctx,
      this.backgroundBlocks,
      this.mario,
      this.kong,
      this.groupObstacle,
      this.ladderBlocks
    );

    this.restart = new RestartGame(
      this.ctx,
      this.mario,
      this.background,
      this.fire,
      this.indObstacle,
      this.groupObstacle,
      this.kong,
      this.ladderBlocks,
      this
    );

    this.initWoodenBlocks();
    this.initLadderBlocks();

    addEventListener("keydown", (e) => {
      if (e.key == "d") {
        if (gameStart && !gameEnd) {
          moveRight = true;
          this.mario.moveMario();
        }
      }
      if (e.key == "a") {
        if (gameStart && !gameEnd) {
          moveLeft = true;
          this.mario.moveMario();
        }
      }
      if (e.key == "w") {
        if (gameStart && !gameEnd) {
          climbLadder = true;
          this.mario.moveMario();
        }
      }
      if (e.key == "s") {
        if (gameStart && !gameEnd) {
          marioJump = true;
          this.mario.moveMario();
        }
      }
      if (e.key == "x") {
        if (gameStart && !gameEnd) {
          marioDown = true;
          this.mario.moveMario();
        }
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

  reset() {
    if (this.fireObsTimer) clearInterval(this.fireObsTimer);
    if (this.objectTimer) clearInterval(this.objectTimer);
    this.signal = 0;
    this.fireSignal = 0;
  }

  init = () => {
    window.requestAnimationFrame(this.init);

    if (gameStart == false) {
      this.preparation.beforeStart();
    }

    if (gameStart == true) {
      if (gameEnd == false) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.objectTimer) {
          clearInterval(this.objectTimer);
        }
        for (let obstacle of this.indObstacle) {
          obstacle.updateIndObstacle();
        }
        // this.objectTimer = setInterval(() => {
        //   this.signal += 1;
        //   if (!(this.signal % 1000)) {
        //     this.fire.updateFire();
        //     this.signal = 0;
        //     this.indObstacle.push(
        //       new IndividualObstacle(
        //         this.ctx,
        //         indObsXpos,
        //         indObsYpos,
        //         indObsWidth,
        //         indObsHeight,
        //         this.ladderBlocks,
        //         this.backgroundBlocks
        //       )
        //     );
        //   }
        //   for (let block of this.indObstacle) {
        //     if (Math.ceil(block.indObsYpos) >= 910 && block.indObsXpos <= 150) {
        //       block.clearObstacle();
        //       this.indObstacle.shift();
        //     }
        //   }
        // }, 3);
        for (let spclObs of this.specialObs) {
          spclObs.moveSpecialObstacle();
        }
        this.objectTimer = setInterval(() => {
          this.signal += 1;
          if (!(this.signal % 1000)) {
            this.fire.updateFire();
            this.signal = 0;
            const random = Math.round(Math.random());
            if (random) {
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
            } else {
              this.specialObs.push(
                new SpecialObstacle(
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
          }
          for (let block of this.indObstacle) {
            if (Math.ceil(block.indObsYpos) >= 910 && block.indObsXpos <= 150) {
              block.clearObstacle();
              this.indObstacle.shift();
            }
          }
        }, 3);

        if (this.fireObsTimer) {
          clearInterval(this.fireObsTimer);
        }
        // Fire Obstacle
        for (const fireObs of this.fireObstacle) {
          fireObs.moveFireObstacle();
        }

        this.fireObsTimer = setInterval(() => {
          this.fireSignal += 1;
          if (!(this.fireSignal % 1000)) {
            this.fireSignal = 0;
            this.fireObstacle.push(
              new FireObstacle(
                (this.ctx,
                fireObsXpos,
                fireObsYpos,
                fireObsWidth,
                fireObsHeight)
              )
            );
          }
        }, 300);
        //Draw Background
        for (const block of this.backgroundBlocks) {
          block.drawWoodenBlock();
        }
        //Draw Ladder
        for (const individualBlock of this.ladderBlocks) {
          individualBlock.drawLadder();
        }

        //PowerUP Hammer
        this.powerUpHammer.drawHammer();

        //Draw character and obstacle
        this.mario.drawMario();
        this.kong.drawKong();
        this.groupObstacle.drawGroupObs();
        this.fire.drawFire();
      }
      if (gameEnd == true) {
        // this.preparation.endOfGame();
        if (this.objectTimer) {
          clearInterval(this.objectTimer);
        }
        if (this.fireObsTimer) {
          clearInterval(this.fireObsTimer);
        }

        this.restart.drawButton();
      }
    }
  };
}

const herGame = new HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);
herGame.init();
