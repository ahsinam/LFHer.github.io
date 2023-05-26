class HerGame {
  constructor(x, y) {
    this.ctx = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.backgroundBlocks = [];
    this.ladderBlocks = [];
    this.background = new WoodenBlock(
      0,
      CANVAS_HEIGHT - WOOD_HEIGHT,
      CANVAS_WIDTH,
      WOOD_HEIGHT,
      "ground"
    );
    this.ladder = new Ladder(
      CANVAS_WIDTH - 200,
      CANVAS_HEIGHT - WOOD_HEIGHT,
      ladderHeight
    );

    this.preparation = new GamePreperation(this.ctx, this.background);

    this.initWoodenBlocks();
    this.initLadderBlocks();
  }

  //Wooden Block
  initWoodenBlocks() {
    const woodenBlockData = [
      { x: 0, y: 200, direction: "left" },
      { x: WOOD_GAP, y: 320, direction: "right" },
      { x: 0, y: 440, direction: "left" },
      { x: WOOD_GAP, y: 560, direction: "right" },
      { x: 0, y: 670, direction: "left" },
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

  //ladder Block
  initLadderBlocks() {
    const ladderBlockData = [];
    for (let i = 0; i < this.backgroundBlocks.length - 1; i++) {
      const currentWoodenBlock = this.backgroundBlocks[i];
      const nextWoodenBlock = this.backgroundBlocks[i + 1];

      //Calculate the y position range for the two ladders
      const positions = calculateLadderPos(currentWoodenBlock, nextWoodenBlock);
      const ladderStartY1 = positions.ladderStartY;
      const ladderEndY1 = positions.ladderEndY;
      const ladderStartY2 = positions.ladderStartY;
      const ladderEndY2 = positions.ladderEndY;

      // const ladderStartX1 = calculateRandomXpos();
      // const ladderStartX2 = calculateRandomXpos();

      ladderBlockData.push(
        {
          x: calculateRandomXpos().xPos1,
          y: ladderStartY1,
          height: ladderEndY1 - ladderStartY1,
        },
        {
          x: calculateRandomXpos().xPos2,
          y: ladderStartY2,
          height: ladderEndY2 - ladderStartY2,
        }
      );
    }
    for (const data of ladderBlockData) {
      const ladderBlock = new Ladder(data.x, data.y, data.height);
      this.ladderBlocks.push(ladderBlock);
    }
  }

  init = () => {
    window.requestAnimationFrame(this.init);
    if (gameStart == false) {
      this.preparation.beforeStart();
    }

    if (gameStart == true) {
      if (gameEnd == false) {
        //Draw Background
        for (const block of this.backgroundBlocks) {
          block.drawWoodenBlock();
        }
        this.background.drawWoodenBlock();
        //Draw Ladder
        for (const individualBlock of this.ladderBlocks) {
          individualBlock.drawLadder();
        }
      }
      if (gameEnd == true) {
        console.log("game end");
      }
    }
  };
}

const herGame = new HerGame(CANVAS_WIDTH, CANVAS_HEIGHT);
herGame.init();
