class Ladder {
  constructor(x, y, height) {
    this.ctx = canvas.getContext("2d");
    this.ladderXpos = x;
    this.ladderYpos = y;
    this.ladderHeight = height;
    this.ladderWidth = LADDER_WIDTH;

    this.ladderImage = new Image();
    this.ladderImage.src = "/Images/ladder.png";
  }

  drawladder() {
    //  this.ctx.drawImage()
  }
}
