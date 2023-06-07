class GamePreperation {
  constructor(ctx, wood, mario, kong, obstacle, ladder) {
    this.ctx = ctx;
    this.wood = wood;
    this.mario = mario;
    this.kong = kong;
    this.obstacle = obstacle;
    this.ladder = ladder;

    this.width = 200;
    this.height = 40;

    this.buttonX = (canvas.width - this.width) / 2;
    this.buttonY = (canvas.height - this.height) / 2;

    this.thresholdTopX = this.buttonX;
    this.thresholdTopY = this.buttonY;

    this.thresholdBottomX = this.buttonX + this.width;
    this.thresholdBottomY = this.buttonY + this.height;

    addEventListener("click", (e) => {
      if (
        this.thresholdTopX <= e.offsetX &&
        this.thresholdTopY <= e.offsetY &&
        this.thresholdBottomX >= e.offsetX &&
        this.thresholdBottomY >= e.offsetY
      ) {
        if (!gameStart) {
          gameStart = true;
        }
      }
    });
  }

  beforeStart() {
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillStyle = "green";
    this.ctx.fillText("High score", 100, 70);
    this.ctx.fillText(`${highScore}`, 250, 70);
    this.ctx.fillText("Press A to move left", 500, 50);
    this.ctx.fillText("Press d to move right", 500, 75);
    this.ctx.fillText("Press W to move Up", 500, 100);
    this.ctx.fillText("Press X to move down", 500, 125);
    this.ctx.fillText("Press s to move jump", 500, 150);

    for (const block of this.wood) {
      block.drawWoodenBlock();
    }
    //Draw Ladder
    for (const individualBlock of this.ladder) {
      individualBlock.drawLadder();
    }
    this.mario.drawMario();

    this.obstacle.drawGroupObs();

    this.drawStartButton();
  }

  drawStartButton() {
    this.ctx.fillStyle = "green";
    this.ctx.rect(this.buttonX, this.buttonY, this.width, this.height);
    this.ctx.fill();
    this.ctx.fillStyle = "#ffa54f";
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillText("Start Game", this.buttonX + 40, this.buttonY + 28);
  }

  endOfGame() {
    this.ctx.font = "bold 40px Verdana";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME END!", 400, 190);
  }

  scoreBoard() {
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Score: ", 10, 40);
    this.ctx.fillText(score, 120, 40);
  }

  drawTimer() {
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Time Remaining : ", 550, 40);
    this.ctx.fillText(timeRemaining + " seconds", 800, 40);
  }
}
