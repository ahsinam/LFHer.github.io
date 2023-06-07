class HammerPowerUp {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.hammerXpos = x;
    this.hammerYpos = y;
    this.hammerWidth = width;
    this.hammerHeight = height;

    this.hammerImage = new Image();
    this.hammerImage.src = "Images/instruments/hammer.png";
  }

  drawHammer() {
    this.ctx.drawImage(
      this.hammerImage,
      this.hammerXpos,
      this.hammerYpos,
      this.hammerWidth,
      this.hammerHeight
    );
  }
}
