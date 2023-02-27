"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var ball = new Image();
var grid = new Image();
var firstplayer = new Image();
var secondplayer = new Image();
var bg = new Image();


ball.src="img/ball.png";
firstplayer.src="img/firstplayer.png";
secondplayer.src="img/secondplayer.png";
grid.src="img/grid.png";
bg.src="img/bg.jpg";

var fp_xPos = cvs.width/4 - firstplayer.width; //позиция первого игрока по X
var fp_yPos = cvs.height - firstplayer.height - 20;  //позиция первого игрока по Y
var sp_xPos = cvs.width - cvs.width/4; //позиция второго игрока по X
var sp_yPos = cvs.height - secondplayer.height - 20; //позиция второго игрока по Y
var B_xPos = cvs.width/2 - ball.width/2; // позиция мяча по X
var B_yPos = cvs.height - grid.height - ball.height*1.5 - 20; // позиция мяча по Y
var W_player = 100;
var _player = 100;

var RAF = 
// находим, какой метод доступен
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
// ни один не доступен
// будем работать просто по таймеру
function(callback) { 
  window.setTimeout(callback, 1000 / 60); 
}

function draw () {
    ctx.drawImage(bg, 0, 0,);
    ctx.drawImage(firstplayer, fp_xPos, fp_yPos);
    ctx.drawImage(ball, B_xPos, B_yPos );
    ctx.drawImage(grid, cvs.width/2 - grid.width/2, cvs.height - grid.height - 20);
    ctx.drawImage(secondplayer, sp_xPos, sp_yPos)

}

bg.onload = draw;

// Создаем левого игрока
var L_player = {
    width: W_player,
    height: H_player,
    speedX: 0,
    speedY: 0,
    score: 0,
}   

document.onkeydown = function(e) {
    // a-влево
    if(e.key === 'a') {
      L_player.speedX = -2;  
    }
    // d-вправо
    if(e.key === 'd') {
      L_player.speedX = 2;
    }
    // w-прыжок
  if (L_player.posY === H-H_player-H_BALL/2){
    if(e.key === 'w') {
      L_player.speedY = -6;
    }
  }
    // стрелка вверх-прыжок
  if (R_player.posY === H-H_player-H_BALL/2){
    if(e.keyCode === 38) {
      R_player.speedY = -6;
    }
  }
    // стрелка влево-влево
    if(e.keyCode === 37) {
      R_player.speedX = -2;
    }
    // стрелка в право-вправо
    if(e.keyCode === 39) {
      R_player.speedX = 2;
    } 
  }
