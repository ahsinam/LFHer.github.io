const canvas = document.querySelector("canvas");
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//Game situation
let gameStart = false;
let gameEnd = false;

//Wooden Block
const WOOD_HEIGHT = 30;
const WOOD_GAP = 150;
const WOOD_WIDTH = CANVAS_WIDTH - WOOD_GAP;

//Ladder
const LADDER_WIDTH = 40;
const ADD_HEIGHT = 20;
let ladderHeight = 120;

//ladder position
const ladderMinXpos = 170;
const ladderMaxYpos = 650;
const ladderMinDistance = 200;

//ground ladder
const secondLastYpos = 500;
const lastYpos = 670;

//Top ladder
const topLadderXpos = 450;
const topLadderYpos = 20;
const topLadderHeight = 200;

//Mario starting Position
const marioStartingXpos = 170;
const marioStartingYpos = 910;
const marioWidth = 60;
const marioHeight = 60;

//Mario Movement
let moveRight = false;
let moveLeft = false;
let climbLadder = false;
let marioJump = false;
let marioDown = false;

//Kong
let kongXpos = 40;
let kongYpos = 130;
let kongWidth = 100;
let kongHeight = 90;

//Group Obstalce
const groupObsXpos = 10;
const groupObsYpos = 160;
const groupObsWidth = 60;
const groupObsHeight = 50;

//Individual Obstacle
const indObsXpos = 140;
const indObsYpos = 145;
const indObsWidth = 30;
const indObsHeight = 40;

//Burning fire
const fireXpos = 90;
const fireYpos = 840;
const fireWidth = 100;
const fireHeight = 160;

//Obstacle that comes out of the fire
const fireObsXpos = 140;
const fireObsYpos = 935;
const fireObsWidth = 48.5;
const fireObsHeight = 50;

//Restart Button
const buttonWidth = 100;
const buttonHeight = 90;

//Hammer
const hammerXpos = 200;
const hammerYpos = 620;
const hammerWidth = 40;
const hammerHeight = 40;

//Blue Obstacle
const blueObsWidth = 60;
const blueObsHeight = 40;

var level1 = +localStorage.getItem("level1") || true;
var level2 = +localStorage.getItem("level2") || false;

//Score
let score = 0;

var highScore = +localStorage.getItem("highScoreWood") || 0;
