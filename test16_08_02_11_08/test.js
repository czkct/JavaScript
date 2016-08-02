window.onbeforeunload = function() {
	return "If you close this window, your flight choices will be lost!";
}

// 我在chrome下面用这个例子  完美支持
// 在firefox下面用这个例子   没有反应  -》因为firefox压根就不用函数返回的信息-》Firefox 不支持文字提醒信息