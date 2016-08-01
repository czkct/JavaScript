window.onload = rolloverInit;

function rolloverInit() {
	for(var i = 0; i < document.images.length; i++) {
		if(document.images[i].parentNode.tagName.toLowerCase() == "a") {
			//也可以写成document.images[i].parentNode.tagName == "A"
			setupRollover(document.images[i]);
		}
	}
}

function setupRollover(theImage) {
	var re = /\s*_off\s*/;

	theImage.outImage = new Image();
	theImage.outImage.src = theImage.src;
	theImage.onmouseout = function() {  //onmouseout事件
		this.src = this.outImage.src;
	}

	theImage.overImage = new Image();
	theImage.overImage.src = theImage.src.replace(re, "_on");
	theImage.onmouseover = function() {  //onmouseover事件
		this.src = this.overImage.src;
	}

	theImage.clickImage = new Image();
	theImage.clickImage.src = theImage.src.replace(re, "_click");
	theImage.onclick = function() {  //onclick事件
		this.src = this.clickImage.src;
		return false;//为了让点击事件看起来更清楚  这里我设置点击后不跳转网页
	}

	/*
	str.replace(arg1, arg2), 用arg2替换掉str中与arg1相匹配的内容  这样写就省去了html文件中的id
	*/


	/*下面的代码作用与上面的作用相同，但是如果没有鼠标， 只用键盘TAB键， 那么下面的代码就起作用了！！*/
	theImage.parentNode.childImg = theImage;

	theImage.parentNode.onblur = function() {
		this.childImg.src = this.childImg.outImage.src;
	}

	theImage.parentNode.onfocus = function() {
		this.childImg.src = this.childImg.overImage.src;
	}

	//回车事件(键盘按下)我暂时不知道怎么写
	
}