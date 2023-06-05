class Princess {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.princessXpos = x;
    this.princessYpo = y;
    this.princessWidth = width;
    this.princessHeight = height;

    this.princessImage = new Image();
    this.princessImage.src = "Images/princess/princess.png";
  }

  drawPrincess() {
    this.ctx.drawImage(
      this.princessImage,
      this.princessXpos,
      this.princessYpo,
      this.princessWidth,
      this.princessHeight
    );
  }
}
