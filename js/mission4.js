var addEvent = function  (element,  event,  listener)  {
    if  (element.addEventListener)  { //标准
        element.addEventListener(event,  listener,  false);
    }  else  if  (element.attachEvent)  { //低版本ie
        element.attachEvent("on"  +  event,  listener);
    }  else  { //都不行的情况
        element["on"  +  event]  =  listener;
    }
};

var table = document.getElementById("game-table");

var towards = ["top", "right", "bottom", "left"];

/**
 * 改变朝向函数
 */
function changeTowardHandle(toward) {
    var square = document.getElementById("square-div");
    var nowToward = square.getAttribute("toward");
    switch (nowToward) {
        case "top":
            nowToward = 0;
            break;
        case "right":
            nowToward = 1;
            break;
        case "bottom":
            nowToward = 2;
            break;
        case "left":
            nowToward = 3;
            break;
    }
    switch (toward) {
        case "tunLef":
            if (nowToward != 3) {
                nowToward += 1;
            } else {
                nowToward = 0;
            }
            break;
        case "tunRig":
            if (nowToward != 0) {
                nowToward -= 1;
            } else {
                nowToward = 3;
            }
            break;
        case "tunBac":
            if (nowToward <= 1) {
                nowToward += 2
            } else {
                nowToward -= 2;
            }
            break;
    }
    var sPosition = square.parentElement.getAttribute("value");
    var pArray = sPosition.split(",");
    initSquare(pArray[0], pArray[1], nowToward);
}
function goHandle() {
    //拿到朝向
    var square = document.getElementById("square-div");
    var divToward = square.getAttribute("toward");
    //拿到坐标
    var sPosition = square.parentElement.getAttribute("value");
    var pArray = sPosition.split(",");
    //判断是否到边界
    if (divToward === "top" && pArray[0] == 0 || divToward === "right" && pArray[1] == initData[1] - 1 || divToward === "bottom" && pArray[0] == initData[0] - 1 || divToward === "left" && pArray[1] == 0) {
        return;
    }
    var newPosition = [];
    switch (divToward) {
        case "top":
            var xPos = pArray[0] - 1
            var yPos = pArray[1];
            var tow = 0;
            break;
        case "right":
            var xPos = pArray[0];
            var yPos = parseInt(pArray[1]) + 1;
            var tow = 1;
            break;
        case "bottom":
            var xPos = parseInt(pArray[0]) + 1;
            var yPos = pArray[1];
            var tow = 2;
            break;
        case "left":
            var xPos = pArray[0];
            var yPos = pArray[1] - 1;
            var tow = 3;
            break;
    }
    newPosition.push(parseInt(xPos), parseInt(yPos));
    initSquare(newPosition[0], newPosition[1], tow);
}
/**
 * 执行按键函数
 */
function buttonClick() {
    switch (this.name) {
        case "go":
            goHandle();
            break;
        default:
            changeTowardHandle(this.name);
            break;
    }
}
/**
 * 绑定按键函数
 */
function initButtonHandle() {
    var btnHandle = document.getElementById("handle-div");
    var btns = btnHandle.children;
    for (var i = 0; i < btns.length; i++) {
        addEvent(btns[i], "click", buttonClick);
    }
}
/**
 * 渲染小方块
 */
function initSquare(rows, cols, toward) {
    var square = document.getElementById("square-div");
    var head = document.getElementById("head-div");
    var body = document.getElementById("body-div");
    //移动或改变方块
    if (square) {
        var tempTd = document.querySelector("td[value='" + rows + "," + cols + "']");
        tempTd.appendChild(square);
        square.setAttribute("toward", towards[toward]);
        square.className = towards[toward];
        head.className = towards[toward];
        body.className = towards[toward];
        return;
    }
    var square = document.createElement("div");
    var head = document.createElement("div");
    var body = document.createElement("div");
    square.id = "square-div";
    //初始化朝向
    var nowTowTemp = 3;
    square.setAttribute("toward", towards[nowTowTemp]);
    square.className = towards[nowTowTemp];
    head.className = towards[nowTowTemp];
    body.className = towards[nowTowTemp];
    head.id = "head-div";
    body.id = "body-div";
    square.appendChild(head);
    square.appendChild(body);
    var midTr = document.getElementsByTagName("tr")[Math.floor(rows / 2)];
    var midTd = midTr.children[Math.floor(cols / 2)];
    midTd.appendChild(square);
}
/**
 * 渲染table
 */
function initTable(rows, cols) {
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var col = document.createElement("td");
            col.setAttribute("value", i + "," + j);
            row.appendChild(col);
        }
        table.appendChild(row)
    }
}

/**
 * 初始化渲染方法
 */
var initData = [9, 9, 3];
function init() {
    initTable(initData[0], initData[1], initData[2]);
    initSquare(initData[0], initData[1], initData[2]);
    initButtonHandle();
}
init();