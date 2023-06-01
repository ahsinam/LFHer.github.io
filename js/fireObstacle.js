class FireObstacle {
  constructor(ctx, x, y, width, height, ladder) {
    this.ctx = ctx;
    this.fireObsXpos = x;
    this.fireObsYpos = y;
    this.fireObsWidth = width;
    this.fireObsHeight = height;
    this.ladder = ladder;
    this.wayPointIndex = 12;

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

    if (this.collisionWithLadder()) {
      const random = generateRandomNumber();

      if (random) {
        if (this.fireObsXpos == 840) {
          this.fireObsXpos--;
        }
        if (this.fireObsXpos == 140) {
          this.fireObsXpos++;
        }
      } else {
        this.fireObsYpos -= 120;
      }
    } else {
          this.fireObsXpos++;
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
