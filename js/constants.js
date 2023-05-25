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
const WOOD_HEIGHT = 28;
const WOOD_GAP = 150;
const WOOD_WIDTH = CANVAS_WIDTH - WOOD_GAP;

//Ladder
const LADDER_WIDTH = 40;

var highScore = +localStorage.getItem("highScoreWood") || 0;
