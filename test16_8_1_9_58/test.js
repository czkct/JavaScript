window.onload = function() {
	document.forms[0].onsubmit = validForm;
}

function validForm() {
	var allGood  =true;
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		if(!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return allGood;  //返回true或false  让onsubmit知道是否要提交

	function validTag(thisTag) {
		var outClass = "";
		var allClasses = thisTag.className.split(" ");  //将一个标签class中的所有类放进allClasses集合中

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
			return false;
		}
		return true;

		function validBasedOnClass(thisClass) {
			var classBack = "";

			switch(thisClass) {
				case "":
				case "invalid":
					break;
				case "email":
					if(allGood && !validEmail(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					// alert(!validEmail(thisTag.value));
					break;
				default:
					classBack += thisClass;
			}
			return classBack;
		}

		function validEmail(email) {
			var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			return re.test(email);
		}

		function invalidLabel(parentTag) {
			if(parentTag.nodeName == "LABEL") {
				parentTag.className += " invalid";
			}
		}
	}
}