window.addEventListener("load", nameFieldInit, false);
//为"load(页面载入)"事件添加一个nameFieldInit(监听器), 并指定事件为冒泡(false)形式

function nameFieldInit() {
	var userName = "";   //设置用户名为空
	if(document.cookie != "") { // 如果cookie不为空
		userName = document.cookie.split("=")[1];   //用户名等于用等号划分后得到的数组中的第二个元素
	}

	document.getElementById("nameField").value = userName;  //设置用户名
	//这一句代码, 在页面加载后  判断完cookie  就运行， userName的值要么为"", 要么为cookie中的userName的值
	document.getElementById("nameField").onblur = setCookie; //当id为nameField的元素失去焦点时， 为它设置Cookie
	document.getElementById("cookieForm").onsubmit = setCookie;//表单提交时设置Cookie
	//添加onsubmit是为了适应所有浏览器  IE不会触发onblur
}

function setCookie() {
	var expireDate = new Date(); //获取当前时期  赋值给expireDate
	expireDate.setMonth(expireDate.getMonth()+6);//取出expireDate月份加上6再重新设置为expireDate的月份
	//换句话说，将cookie的过期日期设置为创建cookie6个月之后

	var userName = document.getElementById("nameField").value;
	document.cookie = "userName="+userName + ";expires=" + expireDate.toGMTString();

	document.getElementById("nameField").blur();
	return false;
}