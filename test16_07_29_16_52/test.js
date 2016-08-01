window.onload = function() {
	document.forms[0].onsubmit = validForm;
	document.getElementById("sunroof").onclick = doorSet;
}

//检查是否是有效表单
function validForm() {
	var allGood = true;
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		if(!validTag(allTags[i])) {
			allGood = false;
		}
	}
	// alert(allGood);
	// alert(document.getElementById("passwd1").className);
	return allGood; 
	//返回true或者false  (如果不满足提交条件就return false  那么表单就不会提交到action目标)

	//检查是否是有效标签  返回true/false
	function validTag(thisTag) {
		var outClass = "";
		var allClasses = thisTag.className.split(" ");

		for(var j = 0; j < allClasses.length; j++) {
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}

		thisTag.className = outClass;

		if(outClass.indexOf("invalid") > -1) {
			invalidLabel(thisTag.parentNode);
			thisTag.focus();
			if(thisTag.nodeName == "INPUT") {
				thisTag.select();
			}
			return false;//如果标签类名包含“invalid”  就是无效标签
		}
		return true;  //否则就是有效标签


		//返回的是类名
		function validBasedOnClass(thisClass) {
			var classBack = "";

			switch(thisClass) {
				case "":
				/* ""这样的空类名  完全可以忽略  所以不需要进行什么操作*/
				case "invalid":
				/*如果一个完整类名中包含了invalid 那么重新检测时  应该先忽略它(不进行啥操作)  后面再判断该标签
				 是否应该添加"invalid"这个类名
				*/
					break;
				case "reqd":
					if(allGood && thisTag.value == "") {
						classBack = "invalid ";
						//注意这里invalid 后面是有一个空格的！！！这里浪费了我很久时间  调试了很长时间
					}
					classBack += thisClass;
					break;
				case "radio":
					if(allGood && !radioPicked(thisTag.name)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				case "isNum":
				case "isZip":
				case "email":
//从radio到email这四个类名都是无影响类名  原封不动的添加回去就行
					classBack += thisClass;
					break;
				default:
					if(allGood && !crossCheck(thisTag, thisClass)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;

//根据一个字段对另一个字段进行检查 (两个字段中必填一个)
			function crossCheck(inTag, otherFieldID) {
				if(!document.getElementById(otherFieldID)) {
					return false;
				}
				return (inTag.value != "" || document.getElementById(otherFieldID).value != "");
			}
//判断至少有一个单选按钮被选(处理单选按钮)
			function radioPicked(radioName) {
				var radioSet = document.forms[0][radioName];

				if(radioSet) {
					for(k = 0; k < radioSet.length; k ++) {
						if(radioSet[k].checked) {
							return true;
						}
					}
				}

				return false;
			}
		}
	}

	function invalidLabel(parentTag) {
		if(parentTag.nodeName == "LABEL") {
			parentTag.className += " invalid";
		}
	}
}

//用一个字段控制另一个字段(通过当前字段值自动设置后面的某个字段的值)
function doorSet() {
	if(this.checked) {
		document.getElementById("twoDoor").checked = true;
	}
	else {
		document.getElementById("twoDoor").checked = false;
	}
}