window.onload = function() {
	document.getElementById("testText").onclick = insert;
	document.forms[0].onsubmit = validForm;
}

function insert() {
	document.getElementById("heihei").value = this.innerText;
}

function validForm() {
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		validTag(allTags[i]);
	}
	return false;  //只是对字符串进行操作  不应该提交  提交就看不到了

	function validTag(thisTag) {
		var allClasses = thisTag.className.split(" ");

		for(var j = 0; j < allClasses.length; j++) {
			if(allClasses[j] == "nameList") {
				thisTag.value = setNameList(thisTag.value);
			}
		}


		function setNameList(inNameList) {
			var newNames = new Array;    //新建一个数组
			var newNameField = "";   //空白

			var re = /\s*\n\s*/;  //   空白字符(任意个数)  +   换行符  + 空白字符(任意个数)
			var nameList = inNameList.split(re); //用上面这个正则表达式进行划分 放到nameList集合中

			re = /^(\S)(\S+)\s(\S)(\S+)$/; //^代表开头  $代表结尾  表达式写出了严格开始和结束

			for(var k = 0; k < nameList.length; k++) {
				if(nameList[k]) {
					re.exec(nameList[k]);
					//使用exec方法在字符串nameList[k]上执行正则表达式re，从而将字符串分隔为4个部分，并且
					//自动地设置JavaScript内置的RegExp对象，这4个部分分别存储在
					//RegExp.$1、RegExp.$2、RegExp.$3和RegExp.$4中
					//前提是上面re中有四对圆括号分组
					newNames[k] = RegExp.$1.toUpperCase() + RegExp.$2.toLowerCase() + " " +
					RegExp.$3.toUpperCase() + RegExp.$4.toLowerCase();
				}
			}

			for(k = 0; k < newNames.length; k++) {
				newNameField += newNames[k] + "\n";
			}

			return newNameField;
		}
	}
}