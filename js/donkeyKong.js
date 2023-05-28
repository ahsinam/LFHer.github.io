class DonkeyKong {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.kongXpos = x;
    this.kongYpos = y;
    this.kongWidth = width;
    this.kongHeight = height;

    this.kongImage = new Image();
    this.kongImage.src = "../Images/kong/kongMovementLeft.png";
    this.frames = 0;
  }

  drawKong() {
    this.ctx.drawImage(
      this.kongImage,
      // 100 * this.frames,
      // 0,
      // 90,
      // 100,
      this.kongXpos,
      this.kongYpos,
      this.kongWidth,
      this.kongHeight
    );
  }

  moveKong() {
    this.ctx.clearRect(
      this.kongXpos,
      this.kongYpos,
      this.kongWidth,
      this.kongHeight
    );
    this.frames++;
    if (this.frames > 2) this.frames = 0;
    this.drawKong();
  }
}
