let data = {
    "title": [
        {
            "name": "name",
            "value": "姓名",
            "sort": false
        },
        {
            "name": "yuwen",
            "value": "语文",
            "sort": true
        },
        {
            "name": "shuxue",
            "value": "数学",
            "sort": true
        },
        {
            "name": "yingyu",
            "value": "英语",
            "sort": true
        },
        {
            "name": "zongfen",
            "value": "总分",
            "sort": true
        }
    ],
    "students": [
        {
            "name": "小明",
            "yuwen": 80,
            "shuxue": 90,
            "yingyu": 70,
            "zongfen": 240
        },
        {
            "name": "小红",
            "yuwen": 100,
            "shuxue": 60,
            "yingyu": 90,
            "zongfen": 250
        },
        {
            "name": "小王",
            "yuwen": 60,
            "shuxue": 100,
            "yingyu": 70,
            "zongfen": 230
        }
    ]
}
createTable(data);
function createTable(data) {
    //拿到所有的title对象
    let titlesObj = data.title;
    let titles = [];
    titlesObj.forEach(function (elem) {
        titles.push(elem);
    })
    //拿到学生数组;
    let students = data.students;
    init();
    createHead(titles);
    createBody(students);
    createSort();
}
function init() {
    let cTable = document.createElement("div");
    cTable.id = "cTable";
    document.body.appendChild(cTable);
}
function createHead(arr) {
    let cTable = document.getElementById("cTable");
    let headUl = document.createElement("ul");
    headUl.className = "head-ul";
    cTable.appendChild(headUl);
    for (let i in arr) {
        let cLi = createElement(headUl, arr[i].value);
        cLi.setAttribute("table-name", arr[i].name);
        if (arr[i].sort)
            createCaret(cLi);
    }
}
function createBody(arr) {
    let cTable = document.getElementById("cTable");
    let bodyUl = document.getElementsByClassName("body-ul");
    if (bodyUl.length) {
        for (let i = bodyUl.length - 1; i >= 0; i--) {
            cTable.removeChild(bodyUl[i]);
        }
    }
    //遍历某个学生
    arr.forEach(function (elem) {
        let cTable = document.getElementById("cTable");
        let bodyUl = document.createElement("ul");
        bodyUl.className = "body-ul";
        cTable.appendChild(bodyUl);
        for (let k in elem) {
            let li = createElement(bodyUl, elem[k]);
            li.setAttribute("table-name", k);
        }
    })
}
function createElement(ul, liText) {
    let li = document.createElement("li");
    let liInnerText = document.createTextNode(liText)
    ul.appendChild(li);
    li.appendChild(liInnerText);
    return li;
}
function createCaret(li) {
    let upCaret = document.createElement("span");
    let downCaret = document.createElement("span");
    upCaret.className = "up-caret caret";
    downCaret.className = "down-caret caret";
    li.appendChild(upCaret);
    li.appendChild(downCaret);
}
function createSort() {
    let carets = document.getElementsByClassName("caret");
    let sortLis = [];
    for (let i = 0; i < carets.length; i++) {
        let li = carets[i].parentNode;
        sortLis.push(li);
    }
    sortLis = unique(sortLis);
    sortLis.forEach(function (elem) {
        let bodyUls = makeArray(document.getElementsByClassName("body-ul"));
        sortHandle(elem, bodyUls);
    })
}
function unique(array) {
    array.sort();
    let re = [array[0]];
    for (let i = 1; i < array.length; i++) {
        if (array[i] !== re[re.length - 1]) {
            re.push(array[i]);
        }
    }
    return re;
}
function sortHandle(elem, uls) {
    elem.addEventListener("click", function () {
        //拿到点之前的排序状态,如果有则清除,如果无则建立
        let activeCaret = document.getElementsByClassName("caret active")[0];
        let sort = "";
        if (activeCaret) {
            if(activeCaret.parentNode === this){
                sort = (this.getAttribute("table-sort") === "down-caret") ? "up-caret" : "down-caret";
            }
            //先清除原有排序
            removeClass(activeCaret, "active");
        }
        if(!sort)
            sort = "up-caret";
        //获取排序头部
        let title = this.getAttribute("table-name");
        this.setAttribute("table-sort", sort);
        sortTable(data, title, sort);
        let childCaret = this.getElementsByClassName(sort)[0];
        addClass(childCaret, "active");
    }, false)
}
/**
 * 表格排序方法
 * @param  {Object} data 要排序的对象
 * @param  {String} str  要排序的属性的名字
 * @param  {String} type 如果是down则是降序排列,如果是up则是升序排列
 */
function sortTable(data, str, type) {
    let result = data.students;
    result.sort(function (a, b) {
        if (type === "up-caret")
            return b[str] - a[str];
        else
            return a[str] - b[str];
    })
    createBody(result);
}
//伪数组强转数组
function makeArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

//动态添加类
function addClass(obj, cls) {
    let obj_class = obj.className,//获取 class 内容.
    blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
    added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
    obj.className = added;//替换原来的 class.
}

function removeClass(obj, cls) {
    let obj_class = ' ' + obj.className + ' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
    obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
    removed = obj_class.replace(' ' + cls + ' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
    obj.className = removed;//替换原来的 class.
}

function hasClass(obj, cls) {
    let obj_class = obj.className,//获取 class 内容.
    obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
    x = 0;
    for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
            return true;
        }
    }
    return false;
}