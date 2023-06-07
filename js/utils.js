const calculateLadderPos = (currentWoodenBlock, nextWoodenBlock) => {
  const ladderStartY = currentWoodenBlock.woodYpos + WOOD_HEIGHT / 2;
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
    ladderMinXpos +
    Math.floor(Math.random() * (ladderMaxYpos - xPos1 - ladderMinDistance));
  console.log(xPos1, xPos2);
  return { xPos1, xPos2 };
};

const generateRandomNumber = () => {
  const randomNumber = Math.round(Math.random());

  return randomNumber;
};

const generateRandomXpos = (minXvalue) => {
  const maxXvalue = minXvalue + WOOD_WIDTH;
  const xValue = Math.round(
    Math.random() * (maxXvalue - minXvalue) + minXvalue
  );

  return xValue;
};

const generateObstacleXpos = (minXvalue, maxXvalue) => {
  const xValue = Math.round(
    Math.random() * (maxXvalue - minXvalue) + minXvalue
  );

  return xValue;
};
