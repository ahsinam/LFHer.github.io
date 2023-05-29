class SpecialObstacle {
  constructor(ctx, x, y, width, height, wood, ladder) {
    this.ctx = ctx;
    this.specialObsXpos = x;
    this.specialObsYpos = y;
    this.specialObsWidth = width;
    this.specialObsHeight = height;
    this.wood = wood;
    this.ladder = ladder;

    this.specialObsImage = new Image();
    this.specialObsImage.src = "../Images/obstacle/specialObstacle.png";
  }

  drawSpecialObstacle() {
    this.ctx.drawImage(
      this.specialObsImage,
      this.specialObsXpos,
      this.specialObsYpos,
      this.specialObsWidth,
      this.specialObsHeight
    );
  }
}
