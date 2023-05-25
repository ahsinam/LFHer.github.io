class GamePreperation {
  constructor(ctx, wood) {
    (this.ctx = ctx), (this.wood = wood);
  }
  beforeStart() {
    this.wood.drawWoodenBlock();
    //Draw Mario
    //Draw Her
    this.ctx.font = "bold 24px Verdana";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("High score", 240, 70);
    this.ctx.fillText(`${highScore}`, 400, 70);
    this.ctx.fillText("Press right arrowKey to start the game", 60, 190);
  }
}
