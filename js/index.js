level1 = true;
level0 = false;
// level1 = false;
// level0 = true;

localStorage.setItem("level1", level1);
localStorage.setItem("level0", level0);

class HerGame {
  constructor(x, y) {
    const startY = 200;
    const endY = 970;
    this.gap = (endY - startY) / 5;

    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.backgroundBlocks = [
      ...new Array(6).fill(0).map((_, i) => {
        return new WoodenBlock(
          i % 2 === 0 ? 0 : WOOD_GAP,
          startY + i * this.gap,
          WOOD_WIDTH,
          WOOD_HEIGHT,
          i % 2 === 0 ? "left" : "right"
        );
      }),
    ];
    this.ladderBlocks = [];
    this.indObsBlocks = [];
    this.specialObs = [];
    this.eachWoodObstacle = [];
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
        fireObsHeight,
        this.ladderBlocks,
        this.backgroundBlocks
      ),
    ];

    this.specialObstacle = new SpecialObstacle(
      this.ctx,
      indObsXpos,
      indObsYpos,
      indObsWidth,
      indObsHeight,
      this.backgroundBlocks,
      this.ladderBlocks
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
      this.specialObs,
      this.eachWoodObstacle,
      this.fireObstacle,
      [],
      [],
      this
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
      this.ladderBlocks
    );

    this.princess = new Princess(
      this.ctx,
      princessXpos,
      princessYpos,
      princessWidth,
      princessHeight
    );

    this.initLadderBlocks();
    this.initBlueObstacle();

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
          console.log({ climbLadder });
          if (!this.mario.isClimbing()) {
            marioJump = true;
            this.mario.moveMario();
          }
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
        if (gameStart) {
          this.ctx.clearRect(
            this.mario.marioXpos,
            this.mario.marioYpos,
            this.mario.marioWidth,
            this.mario.marioHeight
          );
          marioJump = false;
          if (!this.mario.isClimbing()) {
            this.mario.marioYpos += 80;
          }
        }
      }
      if (e.key == "x") {
        marioDown = false;
      }
    });
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

  initBlueObstacle() {
    for (let i = 0; i < this.backgroundBlocks.length - 1; i++) {
      const currentBlock = this.backgroundBlocks[i];
      const xpos = generateRandomXpos(currentBlock.woodXpos);
      const ypos = currentBlock.woodYpos - blueObsHeight;

      const blueObstacleData = new ObstacleInEachWood(
        this.ctx,
        xpos,
        ypos,
        this.backgroundBlocks
      );
      this.eachWoodObstacle.push(blueObstacleData);
    }
  }

  reset() {
    if (this.fireObsTimer) clearInterval(this.fireObsTimer);
    if (this.objectTimer) clearInterval(this.objectTimer);
    this.ladderBlocks = [];
    this.indObsBlocks = [];
    this.specialObs = [];
    this.objectTimer = null;
    this.fireObsTimer = null;
    this.signal = 0;
    this.fireSignal = 0;
    this.Level0BackgroundBlocks = [];
    this.level0LadderBlocks = [];
    this.lvl2WoodObstacle = [];

    this.initLadderBlocks();

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
        fireObsHeight,
        this.ladderBlocks,
        this.backgroundBlocks
      ),
    ];

    this.specialObstacle = new SpecialObstacle(
      this.ctx,
      indObsXpos,
      indObsYpos,
      indObsWidth,
      indObsHeight,
      this.backgroundBlocks,
      this.ladderBlocks
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
      this.specialObs,
      this.eachWoodObstacle,
      this.level1LadderBlocks,
      this.fireObstacle,
      this
    );

    this.restart = new RestartGame(
      this.ctx,
      this.mario,
      this.background,
      this.fire,
      this.indObstacle,
      this.groupObstacle,
      this.kong,
      this.ladderBlocks
    );
  }
  init = () => {
    window.requestAnimationFrame(this.init);
    if (gameStart == false) {
      this.preparation.beforeStart();
    }
    if (gameStart == true) {
      if (gameEnd == false) {
        if (level1 & !level0) {
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.preparation.scoreBoard();
          if (this.objectTimer) {
            clearInterval(this.objectTimer);
          }
          for (let obstacle of this.indObstacle) {
            obstacle.updateIndObstacle();
          }

          for (let blueObs of this.eachWoodObstacle) {
            blueObs.moveWoodObstacle();
          }
          this.objectTimer = setInterval(() => {
            this.signal += 1;
            if (!(this.signal % 1000)) {
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
                    this.backgroundBlocks,
                    this.ladderBlocks
                  )
                );
              }
            }

            for (let block of this.indObstacle) {
              if (
                Math.ceil(block.indObsYpos) >= 910 &&
                block.indObsXpos <= 150
              ) {
                block.clearObstacle();
                this.indObstacle.shift();
              }
            }
            for (let block of this.specialObs) {
              if (
                Math.ceil(block.specialObsYpos) >= 910 &&
                block.specialObsXpos <= 150
              ) {
                block.clearObstacle();
                this.specialObs.shift();
              }
            }
          }, 3);

          if (this.fireObsTimer) {
            clearInterval(this.fireObsTimer);
          }
          // Fire Obstacle
          console.log(this.fireObstacle);
          for (const fireObs of this.fireObstacle) {
            fireObs.moveFireObstacle();
          }

          this.fireObsTimer = setInterval(() => {
            this.fireSignal += 1;
            if (!(this.fireSignal % 1000)) {
              this.fireSignal = 0;
              this.fireObstacle.push(
                new FireObstacle(
                  this.ctx,
                  fireObsXpos,
                  fireObsYpos,
                  fireObsWidth,
                  fireObsHeight,
                  this.ladderBlocks,
                  this.backgroundBlocks
                )
              );
            }
          }, 1);

          //Draw Background
          for (const block of this.backgroundBlocks) {
            block.drawWoodenBlock();
          }
          //Draw Ladder
          for (const individualBlock of this.ladderBlocks) {
            individualBlock.drawLadder();
          }

          for (let spclObs of this.specialObs) {
            spclObs.moveSpecialObstacle();
          }

          //PowerUP Hammer
          this.powerUpHammer.drawHammer();

          //Draw character and obstacle
          this.mario.drawMario();
          this.kong.drawKong();
          this.groupObstacle.drawGroupObs();
          this.fire.drawFire();
        } else {
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);
          this.ladderBlocks = [];
          this.backgroundBlocks = [];
          this.preparation.scoreBoard();

          for (const block of this.Level0BackgroundBlocks) {
            block.drawWoodenBlock();
          }
          for (const data of this.level0LadderBlocks) {
            data.drawLadder();
          }
          for (let lvl2BlueObs of this.lvl2WoodObstacle) {
            lvl2BlueObs.moveWoodObstacle();
          }
          this.mario.drawMario();
          this.burner.drawBurner();
        }

        this.mario.marioObstacleCollision();
        this.mario.marioSpecialObjCollision();
        this.mario.marioBlueObsCollision();
        this.mario.marioFireObsCollision();
      }
      if (gameEnd == true) {
        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScoreWood", score);
        }
        this.preparation.endOfGame();
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

const level1HerGame = new Level1HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);
const herGame = new HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);

if (!level1 && level0) {
  console.log("level 0 initiated");
  level1HerGame.init();
} else if (level1 && !level0) {
  console.log("1 initiated");
  herGame.init();
}
