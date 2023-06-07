class WoodenBlock {
  constructor(x, y, width, height, side = null) {
    this.ctx = canvas.getContext("2d");
    this.woodXpos = x;
    this.woodYpos = y;
    this.woodWidth = width;
    this.woodHeight = height;
    this.side = side;
    this.normalWoodImage = new Image();
    this.normalWoodImage.src = "Images/wood/wood1.png";
  }

  drawWoodenBlock() {
    this.ctx.drawImage(
      this.normalWoodImage,
      this.woodXpos,
      this.woodYpos,
      this.woodWidth,
      this.woodHeight
    );
  }
}
