class Burner {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.burnerXpos = x;
    this.burnerYpos = y;
    this.burnerWidth = width;
    this.burnerHeight = height;
    this.frames = 0;

    this.burnerImage = new Image();
    this.burnerImage.src = "Images/fire/fireImage.png";

    setInterval(() => this.changeFrame(), 1000);
  }

  drawBurner() {
    this.ctx.drawImage(
      this.burnerImage,
      100 * this.frames,
      0,
      100,
      139,
      this.burnerXpos,
      this.burnerYpos,
      this.burnerWidth,
      this.burnerHeight
    );
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 5) this.frames = 0;
  }
}
