document.addEventListener("keydown", keyHit, false);
/*
这里， 我们注册keyHit()函数来处理onekeydown事件。
addEventListener()函数有3个参数：事件本身(目标)、触发事件时调用的函数(监听器),
以及用来指定事件被捕获(true)还是冒泡(false)的布尔值。
*/

var thisPic = 0;  //当前图片标号

function keyHit(evt) {
	var myPix = new Array("reading1.gif", "reading2.gif", "reading3.gif");
	var imgCt = myPix.length - 1; //图片的最大标号
	var ltArrow = 37;  //左箭头按键对应的数字
	var rtArrow = 39;  //右箭头按键对应的数字

	if(evt) {
		var thisKey = evt.which;  //非IE浏览器
	}
	else {
		var thisKey = window.event.keyCode; //IE浏览器
	}

	if(thisKey == ltArrow) {
		chgSlid(-1);  //左滑动1次
	}
	else if(thisKey == rtArrow) {
		chgSlid(1);  //右滑动1次
	}

	function chgSlid(direction) {
		thisPic += direction;

		if(thisPic > imgCt) {
			thisPic = 0; 
		}
		
		if(thisPic < 0) {
			thisPic = imgCt;
		}

		document.getElementById("myPicture").src = myPix[thisPic];
	}
}