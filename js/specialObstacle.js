class SpecialObstacle {
  constructor(ctx, x, y, width, height, wood, ladder) {
    this.ctx = ctx;
    this.specialObsXpos = x;
    this.specialObsYpos = y;
    this.specialObsWidth = width;
    this.specialObsHeight = height;
    this.wood = wood;
    this.ladder = ladder;

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

    // const wayPoint = wayPoints[this.wayPointIndex];
    // let yDistance = wayPoint.y - this.specialObsYpos;
    // let xDistance = wayPoint.x - this.specialObsXpos;
    // let angle = Math.atan2(yDistance, xDistance);
    // this.specialObsXpos += Math.cos(angle);
    // this.specialObsYpos += Math.sin(angle);

    // if (
    //   Math.round(this.specialObsXpos) == Math.round(wayPoint.x) &&
    //   Math.round(this.specialObsYpos) == Math.round(wayPoint.y) &&
    //   this.wayPointIndex < wayPoints.length - 1
    // ) {
    //   this.wayPointIndex++;
    // }

    const wayPoint = wayPoints[this.wayPointIndex];
    let yDistance = wayPoint.y - this.specialObsYpos;
    let xDistance = wayPoint.x - this.specialObsXpos;
    //Check for collision with ladder
    if (this.collisionWithLadder()) {
      console.log(this.collisionWithLadder());
      const random = generateRandomNumber();
      if (random) {
        //Falls through the ladder
        this.specialObsYpos += 120;
        this.wayPointIndex += 2;
      } else {
        //Move towards next waypoint
        let angle = Math.atan2(yDistance, xDistance);
        this.specialObsXpos += Math.cos(angle);
        this.specialObsYpos += Math.sin(angle);
      }
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
    }
  }

  changeFrame() {
    this.frames++;
    if (this.frames > 3) this.frames = 0;
  }

  collisionWithLadder() {
    const ladderTopY = this.ladder.ladderYpos;
    const specialObsBottomY = this.specialObsYpos + this.specialObsHeight;
    const distance = Math.abs(ladderTopY - specialObsBottomY);

    const alongXaxis =
      this.specialObsXpos >= this.ladder.ladderXpos &&
      this.specialObsXpos <= this.ladder.ladderXpos + this.ladder.ladderWidth;

    const collisionResult = distance <= this.wood.woodWidth && alongXaxis;

    return collisionResult;
  }
}
