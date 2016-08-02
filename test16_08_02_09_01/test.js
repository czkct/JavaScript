addOnload(initOne);
addOnload(initTwo);
addOnload(initThree);

/*
过程分析：
addOnload(initOne) -> 执行else部分 -> window.onload = initOne;
addOnload(initTwo) -> oldOnload = initOne; -> 执行if部分 -> window.onload = {initOne(); initTwo();} 
addOnload(initThree) -> oldOnload() = {initOne(); initTwo();} -> 执行if部分 -> window.onload = {initOne(); initTwo(); initThree();} 

*/


function addOnload(newFunction) {
	var oldOnload = window.onload;

	if(typeof oldOnload == "function") {
		window.onload = function() {
			oldOnload();
			newFunction();
		}
	}
	else {
		window.onload = newFunction;
	}
}

/*
window.onload = function() {
	initOne();
	initTwo();
	initThree();
}/*
这一段注释了的代码可以将上面全部的代码替换掉，效果一样，
但是  要确保每一个函数都返回。
例如，如果函数包含对本身的setTimeout()调用， 它将不会返回， 因此不会到达被调用的其余部分。
即假设initTwo()包含对本身的调用setTimeout()时， 那么这部分注释的代码中的initThree()则无法被调用！！
上面没有注释掉的那种写法一样要保证调用的每个函数都返回！！
*/

function initOne() {
	document.getElementById("pageBody").style.backgroundColor = "#00F";
}

function initTwo() {
	document.getElementById("pageBody").style.color = "#F00";
}

function initThree() {
	var allTags = document.getElementById("pageBody").getElementsByTagName("*");

	for(var i = 0; i < allTags.length; i++) {
		if(allTags[i].nodeName == "H1") {
			allTags[i].style.border = "5px green solid";
			allTags[i].style.padding = "25px";
			allTags[i].style.backgroundColor = "#FFF";
		}
	}
}


/*
这里我发现一个问题：
window.onload = function() {
	fun1();
	fun2();
	...
	funN();
}
onload事件中要调用多个函数时， 其中如果有一个函数语句书写错误， 整个onload事件都不会执行
而如果其中某个函数调用了(但是并不存在这个函数)或者压根就没有调用这个函数， 这个onload的事件还是会执行的！！
*/