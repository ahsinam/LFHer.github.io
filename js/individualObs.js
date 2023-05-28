class IndividualObstacle {
  constructor(ctx, x, y, width, height, ladder, background) {
    this.ctx = ctx;
    this.indObsXpos = x;
    this.indObsYpos = y;
    this.indObsWidth = width;
    this.indObsHeight = height;
    this.ladder = ladder;
    this.background = background;
    this.wayPointIndex = 0;

    this.indObsImage = new Image();
    this.indObsImage.src = "../Images/obstacle/obstacleBottle.png";
  }

  drawIndObstacle() {
    this.ctx.clearRect(
      this.indObsXpos,
      this.indObsYpos,
      this.indObsWidth,
      this.indObsHeight
    );
    this.ctx.drawImage(
      this.indObsImage,
      this.indObsXpos,
      this.indObsYpos,
      this.indObsWidth,
      this.indObsHeight
    );
  }

  updateIndObstacle() {
    this.drawIndObstacle();

    const wayPoint = wayPoints[this.wayPointIndex];
    let yDistance = wayPoint.y - this.indObsYpos;
    let xDistance = wayPoint.x - this.indObsXpos;
    let angle = Math.atan2(yDistance, xDistance);
    this.indObsXpos += Math.cos(angle);
    this.indObsYpos += Math.sin(angle);

    if (
      Math.round(this.indObsXpos) == Math.round(wayPoint.x) &&
      Math.round(this.indObsYpos) == Math.round(wayPoint.y) &&
      this.wayPointIndex < wayPoints.length - 1
    ) {
      this.wayPointIndex++;
    }
  }

  clearObstacle() {
    this.ctx.clearRect(
      this.indObsXpos,
      this.indObsYpos,
      this.indObsWidth,
      this.indObsHeight
    );
  }

  //End
}
