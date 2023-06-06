const canvas = document.querySelector("canvas");
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//Game situation
let gameStart = false;
let gameEnd = false;

//Mario Movement
let moveRight = false;
let moveLeft = false;
let climbLadder = false;
let marioJump = false;
let marioDown = false;

//Wooden Block
const WOOD_HEIGHT = 30;
const WOOD_GAP = 150;
const WOOD_WIDTH = CANVAS_WIDTH - WOOD_GAP;

//Ladder
const LADDER_WIDTH = 40;
const ADD_HEIGHT = 20;
let ladderHeight = 130;

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
const marioStartingYpos = 900;
const marioWidth = 60;
const marioHeight = 70;

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
const fireXpos = 50;
const fireYpos = 850;
const fireWidth = 120;
const fireHeight = 166;

//Obstacle that comes out of the fire
const fireObsXpos = 350;
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

//Burner
const burenerXpos = 400;
const burnerYpos = 300;
const BURNER_WIDTH = 150;
const BURNER_HEIGHT = 150;

//Princess
const princessXpos = 450;
const princessYpos = 0;
const princessWidth = 40;
const princessHeight = 100;

//CharacterObs
const characterObsXpos = 600;
const characterObsYpos = 760;
const characterObsWidth = 100;
const characterObsHeight = 60;

//Timer
let timeRemaining = 60;

var level1 = +localStorage.getItem("level1") || true;
var level0 = +localStorage.getItem("level0") || false;
// var level1 = +localStorage.getItem("level1") || false;
// var level0 = +localStorage.getItem("level0") || true;

//Score
let score = 0;

var highScore = +localStorage.getItem("highScoreWood") || 0;
