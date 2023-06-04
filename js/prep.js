class GamePreperation {
  constructor(ctx, wood, mario, kong, obstacle, ladder) {
    this.ctx = ctx;
    this.wood = wood;
    this.mario = mario;
    this.kong = kong;
    this.obstacle = obstacle;
    this.ladder = ladder;

    this.buttonX = (canvas.width - buttonWidth) / 2;
    this.buttonY = (canvas.height - buttonHeight) / 2;

    this.thresholdTopX = this.buttonX;
    this.thresholdTopY = this.buttonY;

    this.thresholdBottomX = this.buttonX + buttonWidth;
    this.thresholdBottomY = this.buttonY + buttonHeight;

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
    this.ctx.fillStyle = "#ffa54f";
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
    if (level2) {
      this.obstacle.drawGroupObs();
    }
    // this.kong.drawKong();
    this.drawStartButton();
  }

  drawStartButton() {
    this.ctx.fillStyle = "#ffa54f";
    this.ctx.fillRect(this.buttonX, this.buttonY, this.width, this.height);
    this.ctx.fillStyle = "#ffa54f";
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillText("Start", this.buttonX + 40, this.buttonY + 28);
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

  timeBoard() {
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillStyle = "black";
  }
}
