class ObstacleInEachWood {
  constructor(ctx, x, y, wood) {
    this.ctx = ctx;
    this.blueObsXpos = x;
    this.blueObsYpos = y;
    this.blueObsWidth = blueObsWidth;
    this.blueObsHeight = blueObsHeight;
    this.background = wood;
    this.frames = 0;

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
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }
}
