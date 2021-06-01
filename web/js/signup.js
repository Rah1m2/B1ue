window.onload = function () {
	var Switch = false;
	var switchEmail = false;
	var warning = [false, false, false, false, false];
	var surname = document.querySelector("#surname");
	var name = document.querySelector("#name");
	var email = document.querySelector("#email");
	var changeEmail = document.querySelector(".change-email");
	var gmail = document.querySelector(".gmail");
	var page = changeEmail.querySelector("p");
	var password = document.querySelector("#password");
	var confirmPassword = document.querySelector("#confirmPassword");
	var li = document.querySelectorAll("li");
	var showPass = document.querySelector(".box3");
	var checkBox = document.querySelector(".check-box");
	var line = document.querySelector("#line");
	var pagePass = document.querySelector("#page");
	var button = document.querySelector(".button");
	var span = document.querySelectorAll("span");
	var svg = document.querySelectorAll("svg");
	// document.onclick = function () {
	li[0].onclick = function () {
		surname.focus();
	};
	li[1].onclick = function () {
		name.focus();
	};
	li[2].onclick = function () {
		email.focus();
	};
	li[3].onclick = function () {
		password.focus();
	};
	li[4].onclick = function () {
		confirmPassword.focus();
	};
	surname.onfocus = function () {
		li[0].style.top = "135px";
		li[0].style.fontSize = "11px";
		if (warning[0]) {
			//出错时
			li[0].style.color = "rgb(220, 69, 58)";
			surname.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			//正确
			li[0].style.color = "rgb(0, 104, 231)";
			surname.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	surname.onblur = function () {
		if (surname.value.length == 0 && !warning[0]) {   //没错误 没内容
			li[0].style.top = "159px";
			li[0].style.fontSize = "15px";
			li[0].style.color = "rgb(95, 99, 103)";
			surname.style.borderColor = "#ccc";
		} else if (surname.value.length != 0 && warning[0]) {   //有错误 有内容
			surname.style.borderColor = "rgb(220,69,58)";
			li[0].style.color = "rgb(220, 69, 58)";
		} else if (surname.value.length == 0 && warning[0]) {   //有错误 没内容
			li[0].style.top = "159px";
			li[0].style.fontSize = "15px";
			li[0].style.color = "rgb(95, 99, 103)";
			surname.style.borderColor = "rgb(220, 69, 58)";
		} else if (surname.value.length != 0 && !warning[0]) {   //没错误 有内容
			li[0].style.color = "rgb(95, 99, 103)";
			surname.style.borderColor = "#ccc";
		}
	};
	name.onfocus = function () {
		li[1].style.top = "135px";
		li[1].style.fontSize = "11px";
		li[1].style.color = "rgb(0, 104, 231)";
		if (warning[1]) {
			//出错时
			li[1].style.color = "rgb(220, 69, 58)";
			name.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			//正确
			li[1].style.color = "rgb(0, 104, 231)";
			name.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	name.onblur = function () {
		if (name.value.length == 0 && !warning[1]) {
			//没错误 没内容
			li[1].style.top = "159px";
			li[1].style.fontSize = "15px";
			li[1].style.color = "rgb(95, 99, 103)";
			name.style.borderColor = "#ccc";
		} else if (name.value.length != 0 && warning[1]) {
			//有错误 有内容
			name.style.borderColor = "rgb(220, 69, 58)";
			li[1].style.color = "rgb(220, 69, 58)";
		} else if (name.value.length == 0 && warning[1]) {
			//有错误 没内容
			li[1].style.top = "159px";
			li[1].style.fontSize = "15px";
			li[1].style.color = "rgb(95, 99, 103)";
			name.style.borderColor = "rgb(220, 69, 58)";
		} else if (name.value.length != 0 && !warning[1]) {
			//没错误 有内容
			li[1].style.color = "rgb(95, 99, 103)";
			name.style.borderColor = "#ccc";
		}
	};
	email.onfocus = function () {
		li[2].style.top = "209px";
		li[2].style.fontSize = "11px";
		if (warning[2]) {   //出错时
			li[2].style.color = "rgb(220,69,58)";
			email.style.outlineColor = "rgb(220,69,58)";   //点击边框为红色
		} else {
			//正确
			li[2].style.color = "rgb(0, 104, 231)";
			email.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	email.onblur = function () {
		if (email.value.length == 0) {   //没有内容让字进入
			li[2].style.top = "233px";
			li[2].style.fontSize = "15px";
			li[2].style.color = "rgb(95, 99, 103)";
			if (warning[2]) email.style.borderColor = "rgb(220,69,58)";
			else email.style.borderColor = "#ccc";
		} else if (email.value.length < 6 || email.value.length > 30) {   //不满足条件改为红色
			warning[2] = true;   //标记出错
			svg[1].style.display = "inline";
			li[2].style.color = "rgb(220, 69, 58)";
			email.style.borderColor = "rgb(220,69,58)";
			span[1].innerHTML = "很抱歉，用户名的字符数需介于 6 到 25 之间";
			span[1].style.color = "rgb(220,69,58)";
		} else {   //满足条件恢复原样
			warning[2] = false;
			svg[1].style.display = "none";
			email.style.borderColor = "#ccc";
			li[2].style.color = "rgb(95, 99, 103)";
			span[1].innerHTML = "您可以使用字母、数字和英文句点";
			span[1].style.color = "rgb(84, 86, 92)";
		}
	};
	password.onfocus = function () {
		li[3].style.top = "334px";
		li[3].style.fontSize = "11px";
		if (warning[3]) {   //出错时
			li[3].style.color = "rgb(220, 69, 58)";
			password.style.outlineColor = "rgb(220, 69, 58)";   //点击边框为红色
		} else {
			li[3].style.color = "rgb(0, 104, 231)";
			password.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	password.onblur = function () {
		if (password.value.length == 0 && !warning[3]) {   //没错误 没内容
			li[3].style.top = "357px";
			li[3].style.fontSize = "15px";
			li[3].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
		} else if (password.value.length != 0 && warning[3]) {   //有错误 有内容
			password.style.borderColor = "rgb(220,69,58)";
			li[3].style.color = "rgb(220, 69, 58)";
		} else if (password.value.length == 0 && warning[3]) {   //有错误 没内容
			li[3].style.top = "357px";
			li[3].style.fontSize = "15px";
			li[3].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "rgb(220,69,58)";
		} else if (password.value.length != 0 && !warning[3]) {   //没错误 有内容
			li[3].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
		}
	};
	confirmPassword.onfocus = function () {
		li[4].style.top = "334px";
		li[4].style.fontSize = "11px";
		if (warning[4]) {   //出错时
			li[4].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			li[4].style.color = "rgb(0, 104, 231)";
			confirmPassword.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	confirmPassword.onblur = function () {
		if (confirmPassword.value.length == 0 && !warning[4]) {
			//没错误 没内容
			li[4].style.top = "357px";
			li[4].style.fontSize = "15px";
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "#ccc";
		} else if (confirmPassword.value.length != 0 && warning[4]) {
			//有错误 有内容
			confirmPassword.style.borderColor = "rgb(220,69,58)";
			li[4].style.color = "rgb(220, 69, 58)";
		} else if (confirmPassword.value.length == 0 && warning[4]) {
			//有错误 没内容
			li[4].style.top = "347px";
			li[4].style.fontSize = "15px";
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "rgb(220,69,58)";
		} else if (confirmPassword.value.length != 0 && !warning[4]) {
			//没错误 有内容
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "#ccc";
		}
	};
	showPass.onclick = check;
	pagePass.onclick = check;
	function check() {
		if ((Switch = !Switch)) {   //显示密码
			checkBox.style.borderColor = "rgb(28, 115, 232)";
			checkBox.style.backgroundColor = "rgb(28, 115, 232)";
			line.style.display = "block";   //显示打勾
			password.type = "text";
			confirmPassword.type = "text";
		} else {   //隐藏密码
			line.style.display = "none";   //隐藏打勾
			checkBox.style.borderColor = "rgb(95, 99, 103)";   //恢复边框色
			checkBox.style.backgroundColor = "#fff";   //恢复背景色
			password.type = "password";
			confirmPassword.type = "password";
		}
	}
	changeEmail.onclick = function() {
		if (switchEmail = !switchEmail) {
			page.innerHTML = "改为创建一个 Gmail 地址";
			span[1].innerHTML = "您需要证实此电子邮件地址属于您";
			li[2].innerHTML = "您的电子邮件地址";
			gmail.style.visibility = "hidden";
			email.focus();
		} else {
			page.innerHTML = "改用我的当前电子邮件地址";
			span[1].innerHTML = "您可以使用字母、数字和英文句点";
			li[2].innerHTML = "用户名";
			gmail.style.visibility = "visible";
			email.focus();
		}
	}
	button.onclick = function() {
		if (surname.value.length == 0 && name.value.length == 0) {
			span[0].style.visibility = "visible";
			warning[1] = warning[0] = true;
			surname.style.borderColor = "rgb(220, 69, 58)";
			name.style.borderColor = "rgb(220, 69, 58)";
			svg[0].style.display = "inline";
			span[0].style.color= "rgb(220, 69, 58)";
			svg[0].style.visibility = "visible";
			span[0].innerHTML = "请输入名字和姓氏";
		} else if(surname.value.length == 0) {
			warning[1] = false;
			warning[0] = true;
			span[0].style.visibility = "visible";
			svg[0].style.display = "inline";
			surname.style.borderColor = "rgb(220,69,58)";
			span[0].style.color = "rgb(220, 69, 58)";
			li[1].style.color = "rgb(95, 99, 103)";
			name.style.borderColor = "#ccc";
			svg[0].style.visibility = "visible";
			span[0].innerHTML = "请输入姓氏";
		} else if(name.value.length == 0) {
			warning[1] = true;
			warning[0] = false;
			span[0].style.visibility = "visible";
			svg[0].style.display = "inline";
			li[0].style.color = "rgb(95, 99, 103)";
			span[0].style.color = "rgb(220, 69, 58)";
			surname.style.borderColor = "#ccc";
			svg[0].style.visibility = "visible";
			name.style.borderColor = "rgb(220,69,58)";
			span[0].innerHTML = "请输入名字";
		} else {
			warning[1] = warning[0] = false;
			name.style.borderColor = "#ccc";
			surname.style.borderColor = "#ccc";
			svg[0].style.display = "none";
			span[0].style.visibility = "hidden";
			li[0].style.color = "rgb(95, 99, 103)";
			li[1].style.color = "rgb(95, 99, 103)";
			svg[0].style.visibility = "hidden";
		}
		if (email.value.length == 0) {
			warning[2] = true;
			span[1].innerHTML = "请选择 Gmail 地址";
			span[1].style.color = "rgb(220,69,58)";
			email.style.borderColor = "rgb(220,69,58)";
			svg[1].style.display = "inline";
		}
		if (password.value.length == 0) {
			warning[3] = true;
			span[2].innerHTML = "输入密码";
			span[2].style.color = "rgb(220,69,58)";
			svg[2].style.display = "inline";
			password.style.borderColor = "rgb(220,69,58)";
			return false;
		} else if (password.value.length < 8) {
			warning[3] = true;
			span[2].innerHTML = "密码长度不得少于 8 个字符";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220,69,58)";
			li[3].style.color = "rgb(220, 69, 58)";
			password.style.borderColor = "rgb(220,69,58)";
			return false;
		} else {
			warning[3] = false;
			li[3].style.color = "rgb(95, 99, 103)";
			svg[2].style.display = "none";
			password.style.borderColor = "#ccc";
		}
		if (confirmPassword.value.length == 0) {
			warning[4] = true;
			span[2].innerHTML = "确认密码";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.borderColor = "rgb(220,69,58)";
			return false;
		} else if (password.value !== confirmPassword.value) {
			warning[4] = true;
			span[2].innerHTML = "这两个密码不一致，请重试";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220, 69, 58)";
			li[4].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.borderColor = "rgb(220,69,58)";
			return false;
		} else {
			warning[4] = false;
			span[2].innerHTML = "使用 8 个或更多字符（字母、数字和符号的组合）";
			span[2].style.color = "rgb(84, 86, 92)";
			svg[2].style.display = "none";
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "#ccc";
			return true;
		}
	}
};
