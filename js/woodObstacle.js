class ObstacleInEachWood {
  constructor(ctx, x, y, wood) {
    this.ctx = ctx;
    this.blueObsXpos = x;
    this.blueObsYpos = y;
    this.blueObsWidth = blueObsWidth;
    this.blueObsHeight = blueObsHeight;
    this.background = wood;
    this.frames = 0;
    this.dx = 1;

    this.blueObsImage = new Image();
    this.blueObsImage.src = "../Images/obstacle/obstacleBlue.png";

    setInterval(() => this.changeFrame(), 1000);
  }

  drawWoodObstacle() {
    this.ctx.drawImage(
      this.blueObsImage,
      83 * this.frames,
      0,
      83,
      70,
      this.blueObsXpos,
      this.blueObsYpos,
      this.blueObsWidth,
      this.blueObsHeight
    );
  }

  moveWoodObstacle() {
    this.drawWoodObstacle();
    if (this.blueObsXpos + this.dx > 760) {
      this.dx = -1;
    }
    if (this.blueObsXpos + this.dx < 140) {
      this.dx = 1;
    }
    this.blueObsXpos += this.dx;
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }
}
