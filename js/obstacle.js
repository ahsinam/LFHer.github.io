class GroupObstacle {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.groupObsXpos = x;
    this.groupObsYpos = y;
    this.groupObsWidth = width;
    this.groupObsHeight = height;

    this.groupObsImage = new Image();
    this.groupObsImage.src = "Images/obstacle/obstacleBox.png";
  }

  drawGroupObs() {
    this.ctx.drawImage(
      this.groupObsImage,
      this.groupObsXpos,
      this.groupObsYpos,
      this.groupObsWidth,
      this.groupObsHeight
    );
  }
}
