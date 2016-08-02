window.onload = initImages;

function initImages() {
	for(var i = 0; i < document.images.length; i++) {
		document.images[i].ondblclick = newWindow;
	}
}

function newWindow() {
	var imgName = this.id + ".jpg";
	var imgWindow = window.open(imgName, "imgWin", "width=640,height=480,scrollbars=no");
}

//此JS功能是双击缩略图查看高清大图！！！