class HerGame {
  constructor(x, y) {
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.backgroundBlocks = [];
    this.background = new WoodenBlock(
      0,
      CANVAS_HEIGHT - WOOD_HEIGHT,
      CANVAS_WIDTH,
      WOOD_HEIGHT,
      "ground"
    );
    this.preparation = new GamePreperation(this.ctx, this.background1);

    this.initWoodenBlocks();
  }

  initWoodenBlocks() {
    const woodenBlockData = [
      { x: 0, y: 200, direction: "left" },
      { x: WOOD_GAP, y: 320, direction: "right" },
      { x: 0, y: 440, direction: "left" },
      { x: WOOD_GAP, y: 560, direction: "right" },
      { x: 0, y: 670, direction: "left" },
      { x: 0, y: CANVAS_HEIGHT - WOOD_HEIGHT, direction: "ground" },
    ];

    for (const data of woodenBlockData) {
      const woodenBlock = new WoodenBlock(
        data.x,
        data.y,
        WOOD_WIDTH,
        WOOD_HEIGHT,
        data.direction
      );
      this.backgroundBlocks.push(woodenBlock);
    }
  }

  init = () => {
    window.requestAnimationFrame(this.init);
    if (gameStart == false) {
      this.preparation.beforeStart();
    }

    if (gameStart == true) {
      if (gameEnd == false) {
        for (const block of this.backgroundBlocks) {
          block.drawWoodenBlock();
        }
        this.background.drawWoodenBlock();
      }
      if (gameEnd == true) {
        console.log("game end");
      }
    }
  };
}

const herGame = new HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);
herGame.init();
