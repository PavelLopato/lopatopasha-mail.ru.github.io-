"use script";

let requestAnimationFrame = window.requestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

//область канвас    
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext ("2d");

// размер экрана, на котором происходит игра
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//динамически вычесляем размер экрана
function size (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var bird1 = new Image();
var bird2 = new Image();
var bird3 = new Image();
var bird4 = new Image();
var bird5 = new Image();
var bird1a = new Image();
var bird2a = new Image();
var bird3a = new Image();
var bird4a = new Image();
var bird5a = new Image();
var bird6 = new Image();
var bird7 = new Image();
var bird8 = new Image();
var bird9 = new Image();
var bird10 = new Image();
var bird6a = new Image();
var bird7a = new Image();
var bird8a = new Image();
var bird9a = new Image();
var bird10a = new Image();
var bird11 = new Image();

var pipeBottom = new Image();
var pipeUp = new Image();
var fg = new Image();
var bg = new Image();

bird1.src="img/birds/bird1.png";
bird2.src="img/birds/bird2.png";
bird3.src="img/birds/bird3.png";
bird4.src="img/birds/bird4.png";
bird5.src="img/birds/bird5.png";
bird1a.src="img/birds/bird1a.png";
bird2a.src="img/birds/bird2a.png";
bird3a.src="img/birds/bird3a.png";
bird4a.src="img/birds/bird4a.png";
bird5a.src="img/birds/bird5a.png";
bird6.src="img/birds/bird6.png";
bird7.src="img/birds/bird7.png";
bird8.src="img/birds/bird8.png";
bird9.src="img/birds/bird9.png";
bird10.src="img/birds/bird10.png";
bird6a.src="img/birds/bird6a.png";
bird7a.src="img/birds/bird7a.png";
bird8a.src="img/birds/bird8a.png";
bird9a.src="img/birds/bird9a.png";
bird10a.src="img/birds/bird10a.png";
bird11.src="img/birds/bird11.png";

pipeBottom.src="img/pipeBottom.png";
pipeUp.src="img/pipeUp.png";
fg.src="img/fg.png";
bg.src="img/bg.png";

//массив птиц
massiveImage = [bird1, bird1a, bird2, bird2a, bird3, bird3a, bird4, bird4a, bird5, bird5a, bird6, bird6a,  bird7, bird7a, bird8, bird8a, bird9, bird9a, bird10, bird10a, bird11];
massiveIndex = 0;

//звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var gameover_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
gameover_audio.src = "audio/gameover.mp3";

var gap=90;//расстояние между верхним и нижним барьером

 
// птица подлетает
function moveUP(){
    yPos -=25;
    fly.play ();
}

//Создание блоков
var pipe = [];
pipe [0] = {
    x: canvas.width,
    y: 0
};

var score = 0; // счет
var stop = 0; // переменная необходимая для остановки игры

//позиция птички
var xPos = 20;
var yPos = canvas.height/4;
var grav = 1;
var distance = Math.round(canvas.width*0.75);

// перезапуск игры
function restart () {
    document.getElementById('game_over').style.display = "none";
    document.getElementById('restart').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('nameWinner').style.display = "none";
    yPos = canvas.height/4;
    pipe = [];
    pipe [0] = {
        x: canvas.width,
        y: 0
    };    
    stop = 0;
    score = 0;
    draw();
}

// отрисовка игры
function draw() {
    //При нажатии на пробел птичка подлетает 
    document.addEventListener ("click", moveUP, false);
    document.addEventListener ("touchstart", moveUP, false);
    document.onkeydown = function(e) {
        // вверх
        if(e.key === ' ') {
            moveUP();
        }
    } 

    size();
  
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    if (massiveIndex<21){
        ctx.drawImage(massiveImage[massiveIndex], xPos, yPos);   
        massiveIndex++;        
    }
    else {
        massiveIndex = massiveIndex - 21;
        ctx.drawImage(massiveImage[0], xPos, yPos);       
        massiveIndex++;   
    }
    
    for (var i=0; i<pipe.length; i++) {
        

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y, canvas.width/13, canvas.height - gap - canvas.height/4);
       
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+canvas.height - gap - canvas.height/4 + gap, canvas.width/13, canvas.height - gap);
        pipe[i].x--; 

      if (canvas.width > 600){ 

        if(pipe[i].x == distance) {
            pipe.push ({ 
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
      } 
      else { if(pipe[i].x == canvas.width/2) {
        pipe.push ({ 
            x: canvas.width,
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });}

      }
         // Отслеживание прикосновений
        if(xPos + massiveImage[i].width >= pipe[i].x
            && xPos <= pipe[i].x + canvas.width/13
            && (yPos <= pipe[i].y + canvas.height - gap - canvas.height/4
            || yPos + massiveImage[i].height >= pipe[i].y + canvas.height - gap - canvas.height/4 + gap) || yPos + massiveImage[i].height >= canvas.height - canvas.height/4
            || yPos <= 0) {
            vibro (100);
            gameOVER ();       
           
        }
        
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
        
    }

    ctx.drawImage(fg, 0, canvas.height - canvas.height/4, canvas.width, canvas.height/4);

    yPos += grav;

    ctx.filestyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText ("Счет:" + score, 10, canvas.height-20);

  if (stop == 0) {
    requestAnimationFrame (draw);
  }
}
// вибрация в игре при ее галичии в браузере
function vibro(time) {
	// есть поддержка Vibration API?
	if (navigator.vibrate) {
		window.navigator.vibrate(time);
	}
}
// окно предупреждение о потере данных
window.onbeforeunload = function(e) {
    var dialogText = 'Dialog text here';
    e.returnValue = dialogText;
    return dialogText;
  };

// начало игры
function start () {
    pipe = [];
    pipe [0] = {
        x: canvas.width,
        y: 0
    };  
    document.getElementById("start").style.display = "none"; 
    document.getElementById('fonbird1').style.display = "none";
    document.getElementById('fonbird2').style.display = "none";
    document.getElementById('fonbird3').style.display = "none";
    document.getElementById('fonbird4').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    document.getElementById('refreshRecords').style.display = "none";
    draw();
}

// конец игры
function gameOVER () {   
    gameover_audio.play ();
    stop++;
    document.getElementById('canvas').style.display = "none";
    document.getElementById('game_over').style.display = "block";
    document.getElementById('restart').style.display = "block";
    if (score >= 1) {
        document.getElementById('nameWinner').style.display = "block";
    }
}

const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let records; // элемент массива - {name:'Pavel',score:'10'};
let updatePassword;
const stringName='Lapata_FlappyBird';

// показывает все сообщения из records на страницу
function showRecords() {
    let str='';
    for ( let m=0; m<records.sort(function(a, b){
        return b.score-a.score
      }).length; m++ ) {
        const record=records[m];
        str+="<b>"+escapeHTML(record.name)+":</b> "
            +escapeHTML(record.score)+"<br />";
    }
    document.getElementById('TOR').innerHTML=str;
}

function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}

// получает сообщения с сервера и потом показывает
function refreshRecords() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
            error : errorHandler
        }
    );
}

// сообщения получены - показываем
function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        records=[];
        if ( callresult.result!="" ) { // строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            records=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор?
            if ( !Array.isArray(records) )
                records=[];
        }
        showRecords();
    }
}

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendRecords() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady,
            error : errorHandler
        }
    );
}

// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        records=[];
        if ( callresult.result!="" ) { // строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            records=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор?
            if ( !Array.isArray(records) )
                records=[];
        }

        const senderName=document.getElementById('IName').value;
        const record=score;
        records.push( { name:senderName, score:record } );
        if ( records.length>10 )
            records=records.slice(records.length-10);

        showRecords();

        $.ajax( {
                url : ajaxHandlerScript,
                type : 'POST', dataType:'json',
                data : { f : 'UPDATE', n : stringName,
                    v : JSON.stringify(records), p : updatePassword },
                cache : false,
                success : updateReady,
                error : errorHandler
            }
        );
    }
}

// сообщения вместе с новым сохранены на сервере
function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

refreshRecords();

function recordsView () {
    document.getElementById('TOR').style.display = "block";
    document.getElementById("start").style.display = "none"; 
    document.getElementById('fonbird1').style.display = "none";
    document.getElementById('fonbird2').style.display = "none";
    document.getElementById('fonbird3').style.display = "none";
    document.getElementById('fonbird4').style.display = "none";
    document.getElementById('refreshRecords').style.display = "none";
    document.getElementById('close').style.display = "block";
    showRecords();
}

function addRecords () {
    sendRecords();
    document.getElementById('nameWinner').style.display = "none";
}

function closeRecords () {
    document.getElementById("start").style.display = "block"; 
    document.getElementById('fonbird1').style.display = "block";
    document.getElementById('fonbird2').style.display = "block";
    document.getElementById('fonbird3').style.display = "block";
    document.getElementById('fonbird4').style.display = "block";
    document.getElementById('TOR').style.display = "none";
    document.getElementById('refreshRecords').style.display = "block";
    document.getElementById('close').style.display = "none";  
}
