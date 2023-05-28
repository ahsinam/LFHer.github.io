class Fire {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.fireXpos = x;
    this.fireYpos = y;
    this.fireWidth = width;
    this.fireHeight = height;

    this.frames = 0;
    this.fireImage = new Image();
    this.fireImage.src = "../Images/fire/fireSprite1.png";
  }

  drawFire() {
    this.ctx.drawImage(
      this.fireImage,
      49.6 * this.frames,
      0,
      49.6,
      92,
      this.fireXpos,
      this.fireYpos,
      this.fireWidth,
      this.fireHeight
    );
  }

  updateFire() {
    this.ctx.clearRect(
      this.fireXpos,
      this.fireYpos,
      this.fireWidth,
      this.fireHeight
    );
    this.frames++;
    if (this.frames > 4) this.frames = 0;
    this.drawFire();
  }

  generateFireObstacle (){
    
  }
}
