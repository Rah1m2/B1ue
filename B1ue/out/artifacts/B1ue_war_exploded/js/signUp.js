window.onload = function () {
	var Switch = false,
		switchAccount = false;
	var warning = [false, false, false, false, false];
	var surname = document.querySelector("#surname");
	var name = document.querySelector("#name");
	var account = document.querySelector("#account");
	var changeAccount = document.querySelector(".change-account");
	var page = changeAccount.querySelector("p");
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
	li[0].onclick = function () {
		surname.focus();
	};
	li[1].onclick = function () {
		name.focus();
	};
	li[2].onclick = function () {
		account.focus();
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
		if (surname.value.length === 0) {
			// 没内容
			li[0].style.top = "159px";
			li[0].style.fontSize = "15px";
			li[0].style.color = "rgb(95, 99, 103)";
			if (warning[0]) surname.style.borderColor = "rgb(220, 69, 58)";
			//没错误
			else surname.style.borderColor = "#ccc"; //有错误
		} else if (warning[0]) {
			//有错误 有内容
			surname.style.borderColor = "rgb(220, 69, 58)";
			li[0].style.color = "rgb(220, 69, 58)";
		} else {
			//没错误 有内容
			surname.style.borderColor = "#ccc";
			li[0].style.color = "rgb(95, 99, 103)";
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
		if (name.value.length === 0 && !warning[1]) {
			//没内容
			li[1].style.top = "159px";
			li[1].style.fontSize = "15px";
			li[1].style.color = "rgb(95, 99, 103)";
			if (warning[1]) name.style.borderColor = "rgb(220, 69, 58)";
			//没错误
			else name.style.borderColor = "#ccc"; //有错误
		} else if (warning[1]) {
			//有错误 有内容
			name.style.borderColor = "rgb(220, 69, 58)";
			li[1].style.color = "rgb(220, 69, 58)";
		} else {
			//没错误 有内容
			li[1].style.color = "rgb(95, 99, 103)";
			name.style.borderColor = "#ccc";
		}
	};
	account.onfocus = function () {
		li[2].style.top = "209px";
		li[2].style.fontSize = "11px";
		if (warning[2]) {
			//出错时
			li[2].style.color = "rgb(220,69,58)";
			account.style.outlineColor = "rgb(220,69,58)"; //点击边框为红色
		} else {
			//正确
			li[2].style.color = "rgb(0, 104, 231)";
			account.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	account.onblur = function () {
		var emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-zA-Z]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?)$/;
		var phoneRegex = /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/;
		if (account.value.length === 0) {
			//没有内容让字进入
			li[2].style.top = "233px";
			li[2].style.fontSize = "15px";
			li[2].style.color = "rgb(95, 99, 103)";
			if (warning[2]) account.style.borderColor = "rgb(220, 69, 58)";
			else account.style.borderColor = "#ccc";
		} else if (account.maxLength === 11 && !phoneRegex.test(account.value)) {
			warning[2] = true; //标记出错
			svg[1].style.display = "inline";
			li[2].style.color = "rgb(220, 69, 58)";
			account.style.borderColor = "rgb(220, 69, 58)";
			span[1].style.color = "rgb(220, 69, 58)";
			span[1].innerHTML = "请输入有效的手机号";
		} else if (account.maxLength === 35 && !emailRegex.test(account.value)) {
			warning[2] = true; //标记出错
			svg[1].style.display = "inline";
			li[2].style.color = "rgb(220, 69, 58)";
			account.style.borderColor = "rgb(220, 69, 58)";
			span[1].style.color = "rgb(220, 69, 58)";
			span[1].innerHTML = "请勿忘记加入“@”和域名";
		} else {
			//邮箱格式满足要求
			var data = "action=verification&account=" + account.value;
			var result = sendRequestByPost(data); //去链接ajax
			alert(result);
			if (result) {
				//邮箱可以被注册
				warning[2] = false;
				svg[1].style.display = "none";
				account.style.borderColor = "#ccc";
				li[2].style.color = "rgb(95, 99, 103)";
				span[1].innerHTML = "您可以使用字母、数字和英文句点";
				span[1].style.color = "rgb(84, 86, 92)";
			} else {
				//邮箱已存在
				warning[2] = true;
				svg[1].style.display = "inline";
				li[2].style.color = "rgb(220, 69, 58)";
				account.style.borderColor = "rgb(220, 69, 58)";
				span[1].style.color = "rgb(220, 69, 58)";
				span[1].innerHTML = "该邮件地址已有人使用";
			}
		}
	};
	password.onfocus = function () {
		li[3].style.top = "334px";
		li[3].style.fontSize = "11px";
		if (warning[3]) {
			//出错时
			li[3].style.color = "rgb(220, 69, 58)";
			password.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			li[3].style.color = "rgb(0, 104, 231)";
			password.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	password.onblur = function () {
		if (password.value.length === 0) {
			//没错误 没内容
			li[3].style.top = "357px";
			li[3].style.fontSize = "15px";
			li[3].style.color = "rgb(95, 99, 103)";
			if (warning[3]) password.style.borderColor = "rgb(220, 69, 58)";
			//没错误
			else password.style.borderColor = "#ccc"; //有错误
		} else if (warning[3]) {
			//有错误 有内容
			password.style.borderColor = "rgb(220, 69, 58)";
			li[3].style.color = "rgb(220, 69, 58)";
		} else {
			//没错误 有内容
			li[3].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
		}
	};
	confirmPassword.onfocus = function () {
		li[4].style.top = "334px";
		li[4].style.fontSize = "11px";
		if (warning[4]) {
			//出错时
			li[4].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			li[4].style.color = "rgb(0, 104, 231)";
			confirmPassword.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	confirmPassword.onblur = function () {
		if (confirmPassword.value.length === 0) {
			//没内容
			li[4].style.top = "357px";
			li[4].style.fontSize = "15px";
			li[4].style.color = "rgb(95, 99, 103)";
			if (warning[4]) confirmPassword.style.borderColor = "rgb(220, 69, 58)";
			//有错误
			else confirmPassword.style.borderColor = "#ccc"; //没错误
		} else if (warning[4]) {
			//有错误 有内容
			confirmPassword.style.borderColor = "rgb(220, 69, 58)";
			li[4].style.color = "rgb(220, 69, 58)";
		} else {
			//没错误 有内容
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "#ccc";
		}
	};
	showPass.onclick = check;
	pagePass.onclick = check;
	function check() {
		if ((Switch = !Switch)) {
			//显示密码
			checkBox.style.borderColor = "rgb(28, 115, 232)";
			checkBox.style.backgroundColor = "rgb(28, 115, 232)";
			line.style.display = "block"; //显示打勾
			password.type = "text";
			confirmPassword.type = "text";
		} else {
			//隐藏密码
			line.style.display = "none"; //隐藏打勾
			checkBox.style.borderColor = "rgb(95, 99, 103)"; //恢复边框色
			checkBox.style.backgroundColor = "#fff"; //恢复背景色
			password.type = "password";
			confirmPassword.type = "password";
		}
	}
	changeAccount.addEventListener("mousedown", function () {
		account.value = "";
		if ((switchAccount = !switchAccount)) {
			page.innerHTML = "改用我的当前电子邮件地址";
			
			changeAccount.style.width = "200px";
			account.maxLength = "11";
			span[1].innerHTML = "您可以使用您的当前手机号";
			li[2].innerHTML = "手机号";
		} else {
			page.innerHTML = "改为使用我的手机号";
			account.maxLength = "35";
			changeAccount.style.width = "155px";
			span[1].innerHTML = "您可以使用字母、数字和英文句点";
			li[2].innerHTML = "电子邮件地址";
		}
	});
	confirmPassword.onkeydown = function () {
        if (window.event.keyCode === 13) button.onclick();
    };
	button.onclick = function () {
		if (surname.value.length === 0 && name.value.length === 0) {
			span[0].style.visibility = "visible";
			warning[1] = warning[0] = true;
			surname.style.borderColor = "rgb(220, 69, 58)";
			name.style.borderColor = "rgb(220, 69, 58)";
			svg[0].style.display = "inline";
			span[0].style.color = "rgb(220, 69, 58)";
			svg[0].style.visibility = "visible";
			span[0].innerHTML = "请输入名字和姓氏";
		} else if (surname.value.length === 0) {
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
		} else if (name.value.length === 0) {
			warning[1] = true;
			warning[0] = false;
			span[0].style.visibility = "visible";
			svg[0].style.display = "inline";
			li[0].style.color = "rgb(95, 99, 103)";
			span[0].style.color = "rgb(220, 69, 58)";
			surname.style.borderColor = "#ccc";
			svg[0].style.visibility = "visible";
			name.style.borderColor = "rgb(220, 69, 58)";
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
		if (account.value.length === 0) {
			warning[2] = true;
			span[1].innerHTML = "请输入您的账号";
			span[1].style.color = "rgb(220, 69, 58)";
			account.style.borderColor = "rgb(220, 69, 58)";
			svg[1].style.display = "inline";
		}
		if (password.value.length === 0) {
			warning[3] = true;
			span[2].innerHTML = "输入密码";
			span[2].style.color = "rgb(220,69,58)";
			svg[2].style.display = "inline";
			password.style.borderColor = "rgb(220,69,58)";
			return;
		} else if (password.value.length < 8) {
			warning[3] = true;
			span[2].innerHTML = "密码长度不得少于 8 个字符";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220,69,58)";
			li[3].style.color = "rgb(220, 69, 58)";
			password.style.borderColor = "rgb(220,69,58)";
			return;
		} else {
			warning[3] = false;
			li[3].style.color = "rgb(95, 99, 103)";
			svg[2].style.display = "none";
			password.style.borderColor = "#ccc";
		}
		if (confirmPassword.value.length === 0) {
			warning[4] = true;
			span[2].innerHTML = "确认密码";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.borderColor = "rgb(220,69,58)";
		} else if (password.value !== confirmPassword.value) {
			warning[4] = true;
			span[2].innerHTML = "这两个密码不一致，请重试";
			svg[2].style.display = "inline";
			span[2].style.color = "rgb(220, 69, 58)";
			li[4].style.color = "rgb(220, 69, 58)";
			confirmPassword.style.borderColor = "rgb(220,69,58)";
		} else {
			warning[4] = false;
			span[2].innerHTML = "使用 8 个或更多字符（字母、数字和符号的组合）";
			span[2].style.color = "rgb(84, 86, 92)";
			svg[2].style.display = "none";
			li[4].style.color = "rgb(95, 99, 103)";
			confirmPassword.style.borderColor = "#ccc";
		}
		for (var i = 0; i < warning.length; i++) {
			if (warning[i] === true) return;
		}
		var data = "action=register&name=" + encodeURIComponent(encodeURIComponent(surname.value)) + encodeURIComponent(encodeURIComponent(name.value)) + "&account=" + account.value + "&password=" + password.value;
		result = sendRequestByPost(data);
		if (result) {
			alert("注册成功");
			window.location.replace("signIn.html");
		} else {
			alert("注册失败");
		}
	};
};

/**
 * ajax 连接数据库校验邮箱和创建账号
 *
 * @param data 内部带有需要传给 loginServer 的数据
 * @return result 正确:true 错误:false
 */
function sendRequestByPost(data) {
	console.log("建立请求");
	//定义异步请求对象
	var xmlReq;
	var flag;
	//检测浏览器是否直接支持ajax
    	if (window.XMLHttpRequest) {
		//直接支持ajax
		xmlReq = new XMLHttpRequest();
	} else {
		//不直接支持ajax
		xmlReq = new ActiveObject("Microsoft.XMLHTTP");
	}
	//设置回调函数
	xmlReq.onreadystatechange = function () {
		if (xmlReq.readyState === 4 && xmlReq.status === 200) {
			//获取服务器的响应值
			var result = xmlReq.responseText;
			//后续操作
			alert("get esp:"+result);
			if (result === "success")
                flag = true;
			else
				flag = false;
		}
	};
	var url = "customerServer";
	xmlReq.open("POST", url, false); //创建同步Post请求
	xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlReq.send(data); //发送请求
	alert("已向后台请求");
	return flag;
}
