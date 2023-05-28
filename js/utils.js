const calculateLadderPos = (currentWoodenBlock, nextWoodenBlock) => {
  const ladderStartY = currentWoodenBlock.woodYpos + WOOD_HEIGHT;
  const ladderEndY = nextWoodenBlock.woodYpos;

  return { ladderStartY, ladderEndY };
};

const calculateRandomXpos = () => {
  const xPos1 =
    ladderMinXpos +
    Math.floor(
      Math.random() * (ladderMaxYpos - ladderMinXpos - ladderMinDistance)
    );

  const xPos2 =
    xPos1 +
    ladderMinDistance +
    Math.floor(Math.random() * (ladderMaxYpos - xPos1 - ladderMinDistance));

  return { xPos1, xPos2 };
};
