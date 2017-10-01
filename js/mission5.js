var table = document.getElementById("game-table");
var btn = document.getElementById("change-button");
var input = document.getElementById("change-input");
/**
 * 小方块移动方法
 */ 
function move(deg){
    var square = document.getElementById("square");
    if(deg === undefined){
        var deg = Number(square.style.transform.replace(/[^0-9]+/g, ''));
    };
    var row = Number(square.style.top.replace(/[^0-9]+/g, ''));
    var col = Number(square.style.left.replace(/[^0-9]+/g, ''));
    if(deg === 0 && row === 0 || deg === 180 && row === 400 || deg === 90 && col === 400 || deg === 270 && col === 0){
        alert("已经到边界了");
        return;
    }
    switch(deg){
        case 0:
        square.style.top = row-50 + "px";
        break;
        case 90:
        square.style.left = col+50 + "px";
        break;
        case 180:
        square.style.top = row+50 + "px";
        break;
        case 270:
        square.style.left = col-50 + "px";
        break;
    }
    square.style.transitionDuration = "1s";
}
/**
 * 小方块转向方法
 */
function trun(deg){
    var square = document.getElementById("square");
    square.style.transform = "rotate(" + deg + "deg)";
    square.style.transitionDuration = "1s";
}
/**
 * 点击btn改变控制小方块
 */ 
function changeEvent(){
    var value = input.value;
    switch(value){
        case "GO":
        move();
        break;
        case "TUN TOP":
        trun(0);
        break;
        case "TUN RIG":
        trun(90);
        break;
        case "TUN BOT":
        trun(180);
        break;
        case "TUN LEF":
        trun(270);
        break;
        case "MOV TOP":
        trun(0);
        move();
        break;
        case "MOV RIG":
        trun(90);
        move();
        break;
        case "MOV BOT":
        trun(180);
        move();
        break;
        case "MOV LEF":
        trun(270);
        move();
        break;
        case "TRA TOP":
        move(0);
        break;
        case "TRA RIG":
        move(90);
        break;
        case "TRA BOT":
        move(180);
        break;
        case "TRA LEF":
        move(270);
        break;
    }
}
/**
 * 初始化btn
 */
function initButtonHandle(){
    btn.addEventListener("click", changeEvent);
}
/**
 * 渲染小方块
 */
function initSquare(){
    var square = document.createElement("div");
    square.id = "square";
    table.appendChild(square);
    square.style.top = "200px";
    square.style.left = "200px";
}
/**
 * 渲染table
 */
function initTable(rows,cols){
    for(var i = 0;i < rows;i++){
        var row = document.createElement("div");
        for(var j = 0;j < cols;j++){
            var col = document.createElement("div");
            col.setAttribute("value", i + "," + j);
            row.appendChild(col);
        }
        table.appendChild(row)
    }
}
/**
 * 初始化渲染方法
 */
var initData = [9, 9];
function init(){
    initTable(initData[0], initData[1]);
    initSquare(initData[0], initData[1]);
    initButtonHandle();
}
init();