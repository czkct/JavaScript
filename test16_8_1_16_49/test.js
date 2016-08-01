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

			re = /(\S+)\s(\S+)/;  //  非空白字符(至少一个) + 空白字符 + 非空白字符(至少一个)
			re1 = /(\S+)\s(\S+)\s(\S+)/;
			//通过测试 上面两行中的圆括号不能少  否则下方的$1  $2  $3都会失效

			for(var k = 0; k < nameList.length-1; k++) {
				newNames[k] = nameList[k].replace(re, "$2, $1");
				//对nameList集合中的每一个匹配的字符串进行操作  操作后  放入newNames集合中
			}
			newNames[k] = nameList[k].replace(re1, "$3     $1  $2");

			for(k = 0; k < newNames.length; k++) {
				newNameField += newNames[k] + "\n";
			}

			return newNameField;
		}
	}
}