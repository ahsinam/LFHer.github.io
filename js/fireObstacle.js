class FireObstacle {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.fireObsXpos = x;
    this.fireObsYpos = y;
    this.fireObsWidth = width;
    this.fireObsHeight = height;

    this.frames = 0;
    this.fireObsImage = new Image();
    this.fireObsImage.src = "../Images/obstacle/fireObs.png";
  }

  drawFireObstacle() {
    this.ctx.clearRect(
      this.fireObsXpos,
      this.fireObsYpos,
      this.fireObsWidth,
      this.fireObsHeight
    );
    this.ctx.drawImage(
      this.fireObsImage,
      48.5 * this.frames,
      0,
      48.5,
      50,
      this.fireObsXpos,
      this.fireObsYpos,
      this.fireObsWidth,
      this.fireObsHeight
    );
  }

  moveFireObstacle() {
    this.drawFireObstacle();
    this.frames++;
    if (this.frames > 3) this.frames = 0;
    this.fireObsXpos++;
  }

  
}
