window.onload = function() {
	document.forms[0].onsubmit = validForm;
}

function validForm() {
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		validTag(allTags[i]);
	}
	return false; //不提交   只是检测一下   查看效果

	function  validTag(thisTag) {
		var outClass = ""; //该标签的新class
		var allClasses = thisTag.className.split(" ");  //空格划分标签的class

		 //更新该标签的class
		for(var j = 0; j < allClasses.length; j++) { 
			outClass += validBasedOnClass(allClasses[j]) + " ";
		}
		thisTag.className = outClass;

		//查看class中是否含有invalid类名  若有则设置相应的样式
		if(outClass.indexOf("invalid") > -1) {
			invalidLabel(thisTag.parentNode);
			thisTag.focus();
			if(thisTag.nodeName == "INPUT") {
				thisTag.select();
			}
			return false;
		}
		return true;

		function validBasedOnClass(thisClass) {
			var classBack = "";

			switch(thisClass) {
				case "":
				case "invalid":
					break;
				case "phone":
					if(!validPhone(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				default:
					classBack += thisClass;
			}
			return classBack;
		}

		function validPhone(phoneNum) {
			var re = /^\(?(\d{3})\)?[\.\-\/ ]?(\d{3})[\.\-\/ ]?(\d{4})$/;
			/*
			有一个可选的左圆括号\(?
			有3个数字(\d{3})
			有一个可选的右圆括号\)?
			有一个可选的点号、连字符、正斜杠(/)或空格  [\.\-\/ ]?
			有3个数字(\d{3})
			有一个可选的点号、连字符、正斜杠(/)或空格  [\.\-\/ ]?
			有4个数字(\d{4})
			*/
			var phoneArray = re.exec(phoneNum);
			/*exec()方法在phoneNum上执行re中存储的正则表达式。
			如果没有找到要搜索的模式，phoneArray就被设置为null。
			否则，phoneArray就设置为一个数组，其中包含正则表达式存储的值*/
			if(phoneArray) {
				document.getElementById("phoneField").value = "(" + phoneArray[1] + ") " + phoneArray[2]
				+ "-" + phoneArray[3];
				return true;
			}
			return false;
		}
		function invalidLabel(parentTag) {
			if(parentTag.nodeName == "LABEL") {
				parentTag.className += " invalid";
			}
		}
	}
}