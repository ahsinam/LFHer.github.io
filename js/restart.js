class RestartGame {
  constructor(
    ctx,
    mario,
    background,
    fire,
    individualObstacle,
    groupObstacle,
    kong,
    ladder,
    hergame
  ) {
    this.ctx = ctx;
    this.mario = mario;
    this.backgroundWood = background;
    this.fire = fire;
    this.individualObstacle = individualObstacle;
    this.groupObstacle = groupObstacle;
    this.kong = kong;
    this.ladder = ladder;
    this.width = 210;
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
        if (gameEnd) {
          gameEnd = false;
          gameStart = false;
          this.mario.resetMario();
          herGame.reset();
          this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    });
  }

  drawButton() {
    this.ctx.fillStyle = "yellow";
    this.ctx.rect(this.buttonX, this.buttonY, this.width, this.height);
    this.ctx.fill();
    this.ctx.fillStyle = "green";
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillText("Restart Game", this.buttonX + 20, this.buttonY + 28);
  }
}
