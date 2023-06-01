class FireObstacle {
  constructor(ctx, x, y, width, height, ladder, wood) {
    this.ctx = ctx;
    this.fireObsXpos = x;
    this.fireObsYpos = y;
    this.fireObsWidth = width;
    this.fireObsHeight = height;
    this.ladder = ladder;
    this.wood = wood;
    this.wayPointIndex = 12;
    this.dx = 1;

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
    if (this.frames > 3) {
      this.frames = 0;
    }
    // this.fireObsXpos++;
    if (this.collisionWithLadder()) {
      const random = generateRandomNumber();
      if (random) {
        this.fireObsYpos -= 1;
      } else {
        if (this.fireObsXpos + this.dx > 760) {
          this.dx = -1;
        }
        if (this.fireObsXpos + this.dx < 140) {
        }
        this.fireObsXpos += this.dx;
      }
    } else {
      //This should also be changed
      if (this.fireObsXpos + this.dx > 760) {
        this.dx = -1;
      }
      if (this.fireObsXpos + this.dx < 140) {
        this.dx = 1;
      }
      this.fireObsXpos += this.dx;
    }
  }

  collisionWithLadder() {
    for (const block of this.ladder) {
      if (
        this.fireObsXpos + this.fireObsWidth >= block.ladderXpos &&
        this.fireObsXpos <= block.ladderXpos + LADDER_WIDTH &&
        this.fireObsYpos + this.fireObsHeight <=
          block.ladderYpos + block.ladderHeight + 1 &&
        this.fireObsYpos + this.fireObsHeight >= block.ladderYpos - 30
      ) {
        return true;
      }
    }
    return false;
  }
}
