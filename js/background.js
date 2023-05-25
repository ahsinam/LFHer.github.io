class WoodenBlock {
  constructor(x, y, width, height, side) {
    this.ctx = canvas.getContext("2d");
    this.woodXpos = x;
    this.woodYpos = y;
    this.woodWidth = width;
    this.woodHeight = height;
    this.side = side;
    this.normalWoodImage = new Image();
    this.normalWoodImage.src = "../Images/wood/wood1.png";
    this.rotateWoodImage = new Image();
    this.rotateWoodImage.src = "../Images/wood/woodRotate.png";
    this.currentWood = this.normalWoodImage;
  }

  drawWoodenBlock() {
    this.side == "left"
      ? (this.currentWood = this.rotateWoodImage)
      : (this.currentWood = this.normalWoodImage);

    this.side == "left"
      ? this.ctx.rotate((0.6 * Math.PI) / 180)
      : "right"
      ? this.ctx.rotate((-0.3 * Math.PI) / 180)
      : "";

    this.ctx.drawImage(
      this.currentWood,
      this.woodXpos,
      this.woodYpos,
      this.woodWidth,
      this.woodHeight
    );
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
