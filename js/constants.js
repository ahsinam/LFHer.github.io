const canvas = document.querySelector("canvas");
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
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
const marioStartingYpos = 890;
const marioWidth = 80;
const marioHeight = 80;

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
const indObsWidth = 50;
const indObsHeight = 55;

const fireXpos = 90;
const fireYpos = 840;
const fireWidth = 100;
const fireHeight = 160;

var highScore = +localStorage.getItem("highScoreWood") || 0;
