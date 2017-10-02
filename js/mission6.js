/**
 * 生成一个弹出窗口
 * @param {String} width  弹出层宽度
 * @param {String} height 弹出层高度
 * @param {String} background 弹出层背景
 * @param {String} border 弹出层边框
 * @param {Boolean} mask  是否有遮罩
 * @author hu
 */
function showPopWindow(width, height, background, border, mask){
	if(mask){
		var oMask = document.createElement("div");
		oMask.style.position = "fixed";
		oMask.style.left = 0;
		oMask.style.top = 0;
		oMask.style.width = "100%";
		oMask.style.height = "100%";
		oMask.style.backgroundColor = "rgba(0,0,0,0.5)";
		document.body.appendChild(oMask);
	}
	
	var loginDiv = document.createElement("div");
	loginDiv.innerHTML = '<form action="">' +
						 '<lable>用户名 :</lable>' +
						 '<input type="text" />' +
						 '<br />' + 
						 '<lable>密码 :</lable>' +
						 '<input type="password" />' +
						 '<br />' +
						 '<input type="submit" />' +
						 '</form>';
	loginDiv.setAttribute("style", "width :" + width + ";height : " + height + ";background : " + background);
	loginDiv.style.position = "fixed"
	loginDiv.style.border = border;
	document.body.appendChild(loginDiv);
	//(浏览器可视区的高度 - 自身高度) / 2
	loginDiv.style.top = (viewHeight() - loginDiv.offsetHeight ) / 2  + "px";
	loginDiv.style.left = (viewWidth() - loginDiv.offsetWidth ) / 2  + "px";
}

/**
 * 该方法用来拿到当前浏览器的宽度
 */
function viewWidth(){
	return window.innerWidth || document.documentElement.clientWidth;
}

/**
 * 该方法用来拿到当前浏览器的高度
 */
function viewHeight(){
	return window.innerHeight || document.documentElement.clientHeight;
}