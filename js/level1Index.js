class Level1HerGame {
  constructor(x, y) {
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;

    this.ladderBlocks = [];
    this.indObsBlocks = [];
    this.specialObs = [];
    this.eachWoodObstacle = [];
    this.objectTimer = null;

    this.lvl0BackgroundBlocks = [];
    this.lvl0LadderBlocks = [];
    this.lvl0WoodObstacle = [];

    this.init1stLevelWoodenBlocks();
    this.init1stLevelLadderBlocks();
    this.init1stLevelBlueObstacle();

    this.kong = new DonkeyKong(
      this.ctx,
      kongXpos,
      kongYpos,
      kongWidth,
      kongHeight
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
      this.lvl0LadderBlocks,
      this.lvl0BackgroundBlocks,
      [],
      "",
      [],
      this.lvl0WoodObstacle,
      [],
      this
    );

    this.preparation = new GamePreperation(
      this.ctx,
      this.lvl0BackgroundBlocks,
      this.mario,
      this.kong,
      null,
      this.lvl0LadderBlocks
    );

    this.restart = new RestartGame(
      this.ctx,
      this.mario,
      this.lvl0BackgroundBlocks,
      null,
      null,
      null,
      this.kong,
      this.lvl0LadderBlocks
    );

    this.burner = new Burner(
      this.ctx,
      burenerXpos,
      burnerYpos,
      BURNER_WIDTH,
      BURNER_HEIGHT
    );

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
    //Constructor ends here
  }

  init1stLevelWoodenBlocks() {
    for (const data of lvl0WoodenBlocks) {
      const level1Block = new WoodenBlock(
        data.x,
        data.y,
        data.width,
        WOOD_HEIGHT
      );
      this.lvl0BackgroundBlocks.push(level1Block);
    }
  }

  init1stLevelLadderBlocks() {
    for (const data of lvl0LadderBlockData) {
      const level1Ladder = new Ladder(data.x, data.y, 200);
      this.lvl0LadderBlocks.push(level1Ladder);
    }
  }

  init1stLevelBlueObstacle() {
    for (let i = 0; i < this.lvl0BackgroundBlocks.length - 1; i++) {
      const recentblock = this.lvl0BackgroundBlocks[i];

      const xpos = generateObstacleXpos(
        recentblock.woodXpos,
        recentblock.woodXpos + recentblock.woodWidth - blueObsWidth
      );
      const ypos = recentblock.woodYpos - blueObsHeight;

      const lvl0BlueObstacle = new ObstacleInEachWood(
        this.ctx,
        xpos,
        ypos,
        this.lvl0BackgroundBlocks
      );

      this.lvl0WoodObstacle.push(lvl0BlueObstacle);
    }
  }

  init = () => {
    window.requestAnimationFrame(this.init);
    if (gameStart == false) {
      this.preparation.beforeStart();
    }
    if (gameStart) {
      if (!gameEnd) {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.preparation.scoreBoard();
        for (const block of this.lvl0BackgroundBlocks) {
          block.drawWoodenBlock();
        }
        for (const data of this.lvl0LadderBlocks) {
          data.drawLadder();
        }
        for (let lvl2BlueObs of this.lvl0WoodObstacle) {
          lvl2BlueObs.movelvl0Obstacle();
        }
        this.mario.drawMario();
        this.burner.drawBurner();
      }
    }
  };
}
