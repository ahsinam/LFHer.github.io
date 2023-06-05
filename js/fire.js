class Fire {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.fireXpos = x;
    this.fireYpos = y;
    this.fireWidth = width;
    this.fireHeight = height;

    this.frames = 0;
    this.fireImage = new Image();
    this.fireImage.src = "../Images/fire/fireImage.png";

    setInterval(() => this.changeFrame(), 1000);
  }

  drawFire() {
    this.ctx.drawImage(
      this.fireImage,
      100 * this.frames,
      0,
      100,
      139,
      this.fireXpos,
      this.fireYpos,
      this.fireWidth,
      this.fireHeight
    );
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 4) this.frames = 0;
  }
}
