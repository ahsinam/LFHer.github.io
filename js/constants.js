const canvas = document.querySelector("canvas");
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//Game situation
let gameStart = true;
// let gameStart = false;
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
const marioStartingYpos = 670;
const marioWidth = 80;
const marioHeight = 100;

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

//ObstacleBox Top
const boxXpos = 15;
const boxYpos = 160;
const boxHeight = 50;
const boxWIdth = 50;

var highScore = +localStorage.getItem("highScoreWood") || 0;
