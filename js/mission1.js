/*
* @Author: hupiao
* @Date:   2017-07-23 20:23:12
* @Last Modified by:   hupiao
* @Last Modified time: 2017-07-24 01:16:27
*/

'use strict';
var btn = document.getElementById("nameValidate");
btn.addEventListener("click", function(){
    var name = document.getElementById("name");
    var result = validateForm(name.value);
    addHelpBlock(result)
}, false)
function validateForm(val){
    var valLength = 0;
    var chineseReg = /[\u4E00-\u9FA5\uF900-\uFA2D]/g
    var elseReg = /\w/g
    valLength = (val.match(chineseReg) && val.match(chineseReg).length) * 2 + (val.match(elseReg) && val.match(elseReg).length);
    if(valLength >= 4 && valLength <= 16){
        return "success"
    }else if (valLength === 0){
        return "nullError"
    }else {
        return "lengthError"
    }
}
function addHelpBlock(messageType){
    var message = {
        success : "名称格式正确",
        lengthError : "名称长度不正确,需在4~16个字符之间",
        nullError : "名称不能为空"
    }
    var HelpBolck = document.getElementById("nameHelpBlock");
    HelpBolck.innerText = message[messageType]
}