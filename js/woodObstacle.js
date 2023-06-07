class ObstacleInEachWood {
  constructor(ctx, x, y, wood) {
    this.ctx = ctx;
    this.blueObsXpos = x;
    this.blueObsYpos = y;
    this.wood = wood;
    this.blueObsWidth = blueObsWidth;
    this.blueObsHeight = blueObsHeight;
    this.frames = 0;
    this.dx = 1;

    this.blueObsImage = new Image();
    this.blueObsImage.src = "Images/obstacle/obstacleBlue.png";

    setInterval(() => this.changeFrame(), 1000);
  }

  drawWoodObstacle() {
    this.ctx.drawImage(
      this.blueObsImage,
      62.75 * this.frames,
      0,
      62.75,
      68,
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

  moveLvl1Obstacle() {
    this.drawWoodObstacle();
    for (let i = 0; i < this.wood.length - 1; i++) {
      let block = this.wood[i];
      if (
        this.blueObsXpos >= block.woodXpos &&
        this.blueObsXpos + this.blueObsWidth + this.dx <=
          block.woodXpos + block.woodWidth &&
        this.blueObsYpos + this.blueObsHeight == block.woodYpos
      ) {
        if (this.blueObsXpos + this.dx <= block.woodXpos) {
          this.dx = 1;
        }
        if (
          this.blueObsXpos + this.blueObsWidth + this.dx >=
          block.woodXpos + block.woodWidth
        ) {
          this.dx = -1;
        }
        this.blueObsXpos += this.dx;
      }
    }
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }
}
