window.onload = function() {
	select();  
	//select()函数的作用
	//①所有的INPUT标签  只要单击就可以内容全选   
	//②所有的H2标签  只要单击就可以把内容放到id为emailAddr的input标签中   
	document.forms[0].onsubmit = validForm;
}

function select() {
	var tags = document.getElementsByTagName("*");

	for(var x = 0; x < tags.length; x++) {
		if(tags[x].nodeName == "INPUT") {
			tags[x].onclick = op;
		}
		else if(tags[x].nodeName == "H2") {
			tags[x].onclick = op1;
		}
	}
	function op() {//①所有的INPUT标签  只要单击就可以内容全选   
		this.select();
	}

	function op1() {//②所有的H2标签  只要单击就可以把内容放到id为emailAddr的input标签中
		document.getElementById("emailAddr").value = this.innerText;
	}
	//参考链接：http://blog.csdn.net/czkct/article/details/52084614
}

function validForm() {
	var allGood  =true;
	var allTags = document.forms[0].getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		if(!validTag(allTags[i])) {
			allGood = false;
		}
	}
	return false;  //这里是为了显示图像不跳转  所以false

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
				case "imgURL":
					if(allGood && !setImgURL(thisTag.value)) {
						classBack = "invalid ";
					}
					classBack += thisClass;
					break;
				default:
					classBack += thisClass;
			}
			return classBack;
		}

		function setImgURL(newURL) {
			var re = /^(file|http):\/\/\S+\/\S+\.(gif|jpg|png)$/i;

			if(re.test(newURL)) {
				document.getElementById("chgImg").src = newURL;
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

//多使用alert进行调试！！！


//测试链接：file:///F:/MY_CODE/SublimeWorkspaces/images/button2_click.gif