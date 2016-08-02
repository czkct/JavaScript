if(typeof document.oncontextmenu == "object") {  //这个说明不是Firefox
	if(document.all) {  //IE
		document.onmousedown = captureMousedown;
	}
	else {  // Safari/Chrome
		document.oncontextmenu = captureMousedown;
	}
}
else { // 这个说明是Firefox
	window.oncontextmenu = captureMousedown;
}

//上面是对浏览器进行一个判断  ，  并且对每种浏览器 相应的事件进行一个对应的设置


function captureMousedown(evt) {
	if(evt) {  //  存在evt变量说明是非IE浏览器  他们可以通过检查evt.which来判断用户单击的是哪个按钮
		var mouseClick = evt.which;
	}
	else {  //不存在evt的话，这个就说明是IE浏览器了， 用户操作会在window.event.button中找到。
		var mouseClick = window.event.button;
	}

	if(mouseClick == 1 || mouseClick == 3) {
		alert("Menu Disabled");
		return false;
	}
}