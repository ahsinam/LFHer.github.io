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

    const wayPoint = wayPoints[this.wayPointIndex];
    let yDistance = wayPoint.y - this.specialObsYpos;
    let xDistance = wayPoint.x - this.specialObsXpos;
    let angle = Math.atan2(yDistance, xDistance);
    this.specialObsXpos += Math.cos(angle);
    this.specialObsYpos += Math.sin(angle);

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
}
