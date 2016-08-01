window.onload = function() {
	document.forms[0].onsubmit = validForm;
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

	//检查是否是有效标签
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


		//检查类名是否有效
		function validBasedOnClass(thisClass) {
			var classBack = "";

			switch(thisClass) {
				case "":
				case "invalid":
					break;
				case "reqd":
					if(allGood && thisTag.value == "") {
						classBack = "invalid ";
						//注意这里invalid 后面是有一个空格的！！！这里浪费了我很久时间  调试了很长时间
					}
					classBack += thisClass;
					break;
				default:
					if(allGood && !crossCheck(thisTag, thisClass)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
			}
			return classBack;

			//根据一个字段对另一个字段进行检查
			function crossCheck(inTag, otherFieldID) {
				if(!document.getElementById(otherFieldID)) {
					return false;
				}
				return (inTag.value == document.getElementById(otherFieldID).value);
			}
		}
	}

	function invalidLabel(parentTag) {
		if(parentTag.nodeName == "LABEL") {
			parentTag.className += " invalid";
		}
	}
}

/*
丨经验总结丨：
1.Js中函数嵌套，函数嵌套定义只能出现在函数，不能出现在选择语句或循环语句中；
2.嵌套定义的函数只能在嵌套的函数中使用；貌似位置无所谓  哪怕是写在return语句后面
3.看第50行，可以知道  多层嵌套的函数，子函数中可以直接使用祖父函数中的变量的值

*/