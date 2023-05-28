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

  // updateIndObstacle() {
  //   for (const block of this.background) {
  //     if (block.side == "left") {
  //       if (this.indObsXpos < block.woodXpos + block.woodWidth) {
  //         this.indObsXpos += 1;
  //       } else {
  //         if (this.indObsYpos <= block.woodYpos + 120) {
  //           this.indObsYpos += 1;
  //         } else {
  //           // Start moving from right to left
  //           this.indObsXpos -= 1;
  //           this.indObsYpos = block.woodYpos + 100;
  //           this.updateIndObstacle();
  //         }
  //       }
  //     }
  //     if (block.side == "right") {
  //       if (this.indObsXpos > block.woodXpos) {
  //         this.indObsXpos -= 1;
  //       } else {
  //         if (this.indObsYpos <= block.woodYpos + 120) {
  //           this.indObsYpos += 1;
  //         } else {
  //           this.indObsXpos -= 1;
  //           this.indObsYpos = block.woodYpos + 100;
  //           this.updateIndObstacle();
  //         }
  //       }
  //     }
  //   }
  // }
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
}
