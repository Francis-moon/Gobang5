//improved by Francis
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

var oneStep=function(i,j,me){
    context.beginPath();
    context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0)
    if(me){
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }
    else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}

var me = true;
var chessBoard = [];
for(var i=0; i<15; i++){
    chessBoard[i]=[];
    for(var j=0; j<15; j++) {
        chessBoard[i][j]=0
    }
}

var over=false; 
chess.onclick = function(e) {
    if(over){
        return;
    }
    //电脑走棋
    if(!me){
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if(chessBoard[i][j]==0){
      oneStep(i,j,me);
      //if(me){
          chessBoard[i][j]=1;  //我落子
      //}
      //else{
      //    chessBoard[i][j]=2;
      //}
      //me =!me;
      //定义赢法
      for(var k=0; k<count; k++) {
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
          me =!me;
          computerAI();
      }
    }
}

//赢法的数组
var wins = [];
for(var i=0;i<15;i++) {
    wins[i]=[];
    for(j=0;j<15;j++){
        wins[i][j]=[];
    }
}

var count=0;
//所有横着5连的赢法；
for(var i=0;i<15;i++){
    for(j=0;j<11;j++){
        //wins[0][0][0] = true;
        //wins[0][1][0] = true;
        //wins[0][2][0] = true;
        //wins[0][3][0] = true;
        //wins[0][4][0] = true;

        //wins[0][1][1] = true;
        //wins[0][2][1] = true;
        //wins[0][3][1] = true;
        //wins[0][4][1] = true;
        //wins[0][5][1] = true;
        for(var k=0; k<5; k++){
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//所有竖着5连的赢法；
for(var i=0;i<15;i++){
    for(j=0;j<11;j++){
        //wins[0][0][0] = true;
        //wins[1][0][0] = true;
        //wins[2][0][0] = true;
        //wins[3][0][0] = true;
        //wins[4][0][0] = true;

        //wins[1][0][1] = true;
        //wins[2][0][1] = true;
        //wins[3][0][1] = true;
        //wins[4][0][1] = true;
        //wins[5][0][1] = true;
        for(var k=0; k<5; k++){
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
//所有45度斜着5连的赢法；
for(var i=0;i<11;i++){
    for(j=0;j<11;j++){
        //wins[0][0][0] = true;
        //wins[1][1][0] = true;
        //wins[2][2][0] = true;
        //wins[3][3][0] = true;
        //wins[4][4][0] = true;

        //wins[0][1][1] = true;
        //wins[1][2][1] = true;
        //wins[2][3][1] = true;
        //wins[3][4][1] = true;
        //wins[4][5][1] = true;
        for(var k=0; k<5; k++){
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
} 
//所有135度斜着5连的赢法；
for(var i=0;i<11;i++){
    for(j=14;j>3;j--){
        //wins[0][14][0] = true;
        //wins[1[13][0] = true;
        //wins[2][12][0] = true;
        //wins[3][11][0] = true;
        //wins[4][10][0] = true;

        //wins[0][13][1] = true;
        //wins[1][12][1] = true;
        //wins[2][11][1] = true;
        //wins[3][10][1] = true;
        //wins[4][9][1] = true;
        for(var k=0; k<5; k++){
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
} 

console.log(count); //查看总共的赢法数量

//赢法的统计数组
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
    var u = 0; v = 0; //保存最高分数的点
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
    //计算机落子
    oneStep(u, v, false)
    chessBoard[u][v] = 2;  //计算机落子
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
        me = !me;
    }
}
