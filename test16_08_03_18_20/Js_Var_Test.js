/*
//示例1：全局变量 、 局部变量

function test() {
	a = 30; //没有写var   默认全局
	var b = 20;  //写了var  默认函数内的局部变量
}

test();
alert(" a = " + a);  //很明显  a为全局变量
alert(" b = " + b);  //b为局部变量   ， 故在函数test外调用时， 未定义(直观显示是没反反应)

*/

/*
//示例2：变量未定义时直接调用(这是错误的！！)

function test() {
	alert("a = " + a);  //变量未定义时直接调用是不行的(直观显示就是什么都不出现)
}
test();

*/

/*
//示例3：承示例2，变量定义的位置

function test() {
	alert("a = " + a);  //输出的结果是 undefined
	var a = "Hey , Cool !";
}
test();
*/		test();
		function test() {
			var i = 1;
			if( i > 0) {
				var thisKey = 3;
			}
			else {
				var thisKey = 4;
			}
			alert(thisKey);
			//虽然thisKey 是在if/else块中声明和定义的，
			//但是因为JS没有块级作用域，所以alert()可以直接访问，
			//只要他们都在函数内就没有问题
		}