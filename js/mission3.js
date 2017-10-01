var studentCheckBtn = document.getElementById("student");
var noneStudentCheckBtn = document.getElementById("none_student");
var noneStuForm = document.getElementById("none-stu-form");
var stuForm = document.getElementById("stu-form");
var citySelect = document.getElementById("citySelect");
var schoolSelect = document.getElementById("schoolSelect");

var city = {
    "北京" : ["北京大学", "清华大学"],
    "上海" : ["复旦大学", "同济大学"],
    "深圳" : ["深圳大学", "中山大学"]
}
pushCity(city);
changeCity("北京");
function pushCity(city){
    for(var c in city){
        var option = document.createElement("option");
        var cityName = document.createTextNode(c);
        option.appendChild(cityName);
        option.setAttribute("value", c);
        citySelect.appendChild(option);
        citySelect.setAttribute("id", "citySelect");
    }
}
studentCheckBtn.addEventListener("change",function(){
    change(this)
},false)
noneStudentCheckBtn.addEventListener("change",function(){
    change(this)
},false)
citySelect.addEventListener("change",function(){
    changeCity(this.value)
})
function changeCity(cityName){
    schoolSelect.innerHTML = "";
    for(let k in city){
        if(k === cityName){
            for(let key in city[k]){
                var option = document.createElement("option");
                var schoolName = document.createTextNode(city[k][key]);
                option.appendChild(schoolName);
                option.setAttribute("value", schoolName);
                schoolSelect.appendChild(option);
                schoolSelect.setAttribute("id", "citySelect");
            }
        }
    }
}
function change(obj){
//选中另外一个按钮
var anotherObj = (obj === studentCheckBtn) ? noneStudentCheckBtn : studentCheckBtn;
if(obj.checked){
    //将另一个按钮变化
    anotherObj.checked = false;
    //生成div
}else{
    anotherObj.checked = true;
}
var selectObj = (obj.checked) ? obj : anotherObj;
showForm(selectObj)
}
function showForm(obj){
    if(obj.id === "student"){
        stuForm.style.display = "block"
        noneStuForm.style.display = "none"
    }
    else{
        noneStuForm.style.display = "block"
        stuForm.style.display = "none"
    }
}