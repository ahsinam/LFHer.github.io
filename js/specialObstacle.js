class SpecialObstacle {
  constructor(ctx, x, y, width, height, wood, ladder) {
    this.ctx = ctx;
    this.specialObsXpos = x;
    this.specialObsYpos = y;
    this.specialObsWidth = width;
    this.specialObsHeight = height;
    this.wood = wood;
    this.ladder = ladder;
    this.falling = false;
    this.currWoodIndex = 0;

    this.frames = 0;
    this.signal = 0;
    this.TIMER = null;
    this.wayPointIndex = 0;

    this.specialObsImage = new Image();
    this.specialObsImage.src = "../Images/obstacle/specialObstacle.png";

    setInterval(() => this.changeFrame(), 1000);
  }

  drawSpecialObstacle() {
    this.ctx.drawImage(
      this.specialObsImage,
      84 * this.frames,
      0,
      84,
      60,
      this.specialObsXpos,
      this.specialObsYpos,
      this.specialObsWidth,
      this.specialObsHeight
    );
  }

  moveSpecialObstacle() {
    this.drawSpecialObstacle();

    if (this.falling) {
      this.specialObsYpos += 1;
      const wood = this.wood[this.currWoodIndex + 1];

      if (
        this.specialObsYpos + this.specialObsHeight >= wood.woodYpos &&
        this.specialObsYpos + this.specialObsHeight <= wood.woodYpos + 2
      ) {
        this.falling = false;
        this.specialObsYpos = wood.woodYpos - this.specialObsHeight;
        this.wayPointIndex += 2;
        this.currWoodIndex += 1;
      }

      return;
    }

    const wayPoint = wayPoints[this.wayPointIndex];
    if (!wayPoint) {
      this.clearObstacle();
      return;
    }
    let yDistance = wayPoint.y - this.specialObsYpos;
    let xDistance = wayPoint.x - this.specialObsXpos;
    //Check for collision with ladder
    if (this.collisionWithLadder()) {
      // this.specialObsYpos += 120;
      // this.wayPointIndex += 2;
      this.falling = true;
    } else {
      let angle = Math.atan2(yDistance, xDistance);
      this.specialObsXpos += Math.cos(angle);
      this.specialObsYpos += Math.sin(angle);
    }

    if (
      Math.round(this.specialObsXpos) == Math.round(wayPoint.x) &&
      Math.round(this.specialObsYpos) == Math.round(wayPoint.y) &&
      this.wayPointIndex < wayPoints.length - 1
    ) {
      this.wayPointIndex++;
      if (!(this.wayPointIndex % 2)) {
        this.currWoodIndex += 1;
      }
    }
  }

  clearObstacle() {
    // this.ctx.clearRect(
    //   this.specialObsXpos,
    //   this.specialObsYpos,
    //   this.specialObsWidth,
    //   this.specialObsHeight
    // );
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }

  collisionWithLadder() {
    const obsMidX = this.specialObsXpos + this.specialObsWidth / 2;
    const obsLadYThres = this.specialObsYpos + this.specialObsHeight + 20;

    for (const block of this.ladder) {
      if (block.ladderYpos < this.specialObsYpos) {
        continue;
      }
      if (obsLadYThres < block.ladderYpos) {
        continue;
      }

      if (block.ladderYpos + block.ladderHeight - 20 < this.specialObsYpos) {
        continue;
      }

      const ladXWidth = block.ladderXpos + block.ladderWidth / 2;

      if (obsMidX < ladXWidth - 1 || obsMidX > ladXWidth + 1) {
        continue;
      }

      const random = generateRandomNumber();

      if (!random) continue;

      return true;
    }
  }
}
