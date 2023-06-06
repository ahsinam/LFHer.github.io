class CharacterObstacle {
  constructor(ctx, x, y, width, height, wood) {
    this.ctx = ctx;
    this.characterObsXpos = x;
    this.characterObsYpos = y;
    this.characterObsWidth = width;
    this.characterObsHeight = height;
    this.wood = wood;

    this.frames = 0;
    this.dx = 4;

    this.characterObsRightImage = new Image();
    this.characterObsRightImage.src = "../Images/characterObs/movingRight.png";

    this.characterObsLeftImage = new Image();
    this.characterObsLeftImage.src = "../Images/characterObs/movingLeft.png";

    this.currentImage = this.characterObsLeftImage;

    setInterval(() => this.changeFrame(), 1000);
  }

  drawCharacterObs() {
    this.ctx.drawImage(
      this.currentImage,
      165.5 * this.frames,
      0,
      165.5,
      81,
      this.characterObsXpos,
      this.characterObsYpos,
      this.characterObsWidth,
      this.characterObsHeight
    );
  }

  moveCharacterObs() {
    this.drawCharacterObs();
    const indexOfSecondLastWood = this.wood.length - 2;
    let block = this.wood[indexOfSecondLastWood];

    if (this.characterObsXpos + this.dx <= block.woodXpos) {
      this.currentImage = this.characterObsRightImage;
      this.dx = 1;
    }
    if (
      this.characterObsXpos + this.characterObsWidth + this.dx >=
      block.woodXpos + block.woodWidth
    ) {
      this.currentImage = this.characterObsLeftImage;
      this.dx = -1;
    }
    this.characterObsXpos += this.dx;
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }
}
