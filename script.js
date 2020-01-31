//improved by Francis
var oset = document.getElementById("setting");
var scolor = oset.getElementsByTagName("div");
function single() {
    scolor[0].className = "";
}
function double(){
    alert("准备双人对弈 - 开始")
    chess.onclick = doublePersons;
}

function first() {
    alert("准备执黑vs电脑 - 开始")
    chess.onclick = singleFirst;
}
function last() {
    alert("准备执白vs电脑 - 开始")
    chess.onclick = singleLast;
}


var chess = document.getElementById("chess");
var context = chess.getContext("2d");
context.strokeStyle="#BFBFBF";

var logo = new Image();
logo.src="ebo.ico";
logo.onload=function(){
    context.drawImage(logo,193,193,64,64);
    drawChessBoard();
}

var drawChessBoard =function(){
  for(var i=0;i<15;i++){
      context.moveTo(15 + i*30, 15);
      context.lineTo(15 + i*30, 435);
      context.moveTo(15 , 15+ i*30);
      context.lineTo(435,15 + i*30);
      context.stroke();
  }
}

var oneStep=function(i,j,black){  //落子函数-实际是在i,j处画出一枚棋子
    context.beginPath();
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0)
    if(black){  //画一枚黑棋
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    else{    //白棋
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}

var black = true;
var chessBoard = [];
for(var i=0; i<15; i++){  //初始化二维数组chessBoard
    chessBoard[i]=[];
    for(var j=0; j<15; j++) {
        chessBoard[i][j]=0
    }
}

var over=false; 
var singleFirst = function firstVScomputer(e)  {   //执黑面对电脑，落子在e点
    if(over){
        return;
    }
    //电脑走棋
    if(!black){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j]==0){   //等于0表示该点可以落子
      oneStep(i,j,black);
      chessBoard[i][j]=1;     //我落子
      for(var k=0; k<count; k++) {      //判断黑棋是否赢了
          if(wins[i][j][k]) {
              myWin[k]++;
              uWin[k] = 6; //异常情况
              if(myWin[k] == 5) {
                window.alert("恭喜，你赢了");
                over = true;
              }
          }
      }
      if(!over){
          black =!black;
          computerAI();
      }
    }
}

var singleLast = function lastVScomputer(e)  {   //执白面对电脑，落子在e点
    if(over) {
        return;
    }
    if(black) {
        computerAI();
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j]==0){   //等于0表示该点可以落子
      oneStep(i,j,black);
      chessBoard[i][j]=1;     //我落子
      for(var k=0; k<count; k++) {      //判断黑棋是否赢了
          if(wins[i][j][k]) {
              myWin[k]++;
              uWin[k] = 6; //异常情况
              if(myWin[k] == 5) {
                window.alert("恭喜，你赢了");
                over = true;
              }
          }
      }
      if(!over){
          black =!black;
      }
    }
}

var doublePersons = function pVSp(e)  {   //双人对弈，落子在e点
    if(over) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j]==0){   //等于0表示该点可以落子
      oneStep(i,j,black);
      if(black) {
          chessBoard[i][j]=1;  //记录黑棋落子
          for(var k=0; k<count; k++) {      //判断黑棋是否赢了
            if(wins[i][j][k]) {
                myWin[k]++;
                uWin[k] = 6; //异常情况
                if(myWin[k] == 5) {
                  window.alert("恭喜，黑棋赢了");
                  over = true;
                }
            }
          }
        }
        else {
          chessBoard[i][j]=2;   //记录白棋落子
          for(var k=0; k<count; k++) {      //判断白棋是否赢了
            if(wins[i][j][k]) {
                uWin[k]++;
                myWin[k] = 6; //异常情况
                if(uWin[k] == 5) {
                  window.alert("恭喜，白棋赢了");
                  over = true;
                }
            }
          }
        }
        if(!over) {
            black = !black;
        }
    }
}

//赢法的数组
var wins = [];
for(var i=0; i<15; i++) {
    wins[i]=[];
    for(j=0; j<15; j++){
        wins[i][j]=[];
    }
}

var count=0;
//所有横着5连的赢法；
for(var i=0; i<15; i++){
    for(j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//所有竖着5连的赢法；
for(var i=0; i<15; i++){
    for(j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//所有45度斜着5连的赢法；
for(var i=0; i<11; i++){
    for(j=0; j<11; j++){
        for(var k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
} 
//所有135度斜着5连的赢法；
for(var i=0; i<11; i++){
    for(j=14; j>3; j--){
        for(var k=0; k<5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
} 

console.log("总共的赢法数量是",count); //查看总共的赢法数量

//赢法的统计数组，到5的时候就赢了
var myWin=[];
var uWin=[];

for(var i=0; i<count; i++){
    myWin[i] = 0;
    uWin[i] = 0;
}

var computerAI = function() {
    var myScore = [];
    var uScore = [];
    var max = 0;
    var u = 0; v = 0; //u,v是最高分数max的点
    for(var i=0; i<15; i++){
        myScore[i] = [];
        uScore[i] = [];
        for(var j=0; j<15; j++){
            myScore[i][j] = 0;
            uScore[i][j] = 0;
        }
    }
    for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
            if(chessBoard[i][j] == 0) {
                for(var k=0; k<count; k++) {    //遍历所有的赢法，权值累加
                    if(wins[i][j][k]){   //这个点有价值
                        if(myWin[k] == 1){
                           myScore[i][j] += 200;
                        }
                        else if(myWin[k] == 2){
                           myScore[i][j] += 400;
                        }
                        else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                         }
                        else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }
                        if(uWin[k] == 1){
                            uScore[i][j] += 220;
                        }
                        else if(uWin[k] == 2){
                            uScore[i][j] += 420;
                        }
                        else if(uWin[k] == 3){
                             uScore[i][j] += 2100;
                        }
                        else if(uWin[k] == 4){
                             uScore[i][j] += 20000;
                        }
                    }
                }
                //u,v是综合myScore和uScore的值
                if(myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }
                else if(myScore == max) {
                    if(uScore[i][j] > uScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(uScore[i][j] > max) {
                    max = uScore[i][j];
                    u = i;
                    v = j;
                }
                else if(uScore == max) {
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    console.log('max is', max); //查看权重
    //计算机落子
    oneStep(u, v, black);  //false代表白棋
    chessBoard[u][v] = 2;  //记录为白棋
    for(var k=0; k<count; k++) {
        if(wins[u][v][k]) {
            uWin[k]++;
            myWin[k] = 6; //异常情况
            if(uWin[k] == 5) {
              window.alert("很抱歉，你输了");
              over = true;
            }
        }
    }
    if(!over) {
        black = !black;
    }
}
