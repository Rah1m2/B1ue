window.onload = function () {
	var userAccount;
	var grayColor = "#ccc";
	var redColor = "rgb(220, 69, 58)";
	var blueColor = "rgb(95, 99, 103)";
	var deepBlueColor = "rgb(0, 104, 231)";
	var warning = [false, false, false, false];
	var isVerifyKey = false;
	var li = document.querySelectorAll("li");
	var account = document.querySelector(".account");
	var verificationCode = document.querySelector(".verificationCode");
	var password = document.querySelector(".password");
	var confirmPassword = document.querySelector(".confirmPassword");
	var findPassword = document.querySelector("#findPassword");
	var sendVerificationCode = document.querySelector("#sendVerificationCode");
	var changePassword = document.querySelector("#changePassword");
	var box1 = document.querySelectorAll(".box1");
	var span = document.querySelectorAll("span");
	li[0].onclick = function () {
		account.focus();
	};
	li[1].onclick = function () {
        verificationCode.focus();
	};
    li[2].onclick = function () {
        password.focus();
    };
	li[3].onclick = function () {
		confirmPassword.focus();
	};
	account.onfocus = function () {
		li[0].style.top = "183px";
		li[0].style.fontSize = "13px";
		li[0].style.color = deepBlueColor;
		if (warning[0]) {
			//出错时
			li[0].style.color = redColor;
			account.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[0].style.color = deepBlueColor;
			account.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	account.onblur = function () {
		if (account.value.length == 0) {
			//没内容
			li[0].style.top = "214px";
			li[0].style.fontSize = "15px";
			li[0].style.color = blueColor;
			if (warning[0]) account.style.borderColor = redColor;
			else account.style.borderColor = grayColor;
		} else if (warning[0]) {
			//有错误 有内容
			account.style.borderColor = redColor;
			li[0].style.color = redColor;
		} else {
			//没错误 有内容
			li[0].style.color = blueColor;
			account.style.borderColor = grayColor;
		}
	};
	verificationCode.onfocus = function () {
		li[1].style.top = "183px";
		li[1].style.fontSize = "13px";
		li[1].style.color = deepBlueColor;
		if (warning[1]) {
			//出错时
			li[1].style.color = redColor;
			verificationCode.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[1].style.color = deepBlueColor;
			verificationCode.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	verificationCode.onblur = function () {
		if (verificationCode.value.length == 0) {
			//没内容
			li[1].style.top = "213px";
			li[1].style.fontSize = "15px";
			li[1].style.color = blueColor;
			if (warning[1]) verificationCode.style.borderColor = redColor;
			else verificationCode.style.borderColor = grayColor;
		} else if (warning[1]) {
			//有错误 有内容
			verificationCode.style.borderColor = redColor;
			li[1].style.color = redColor;
		} else {
			//没错误 有内容
			li[1].style.color = blueColor;
			verificationCode.style.borderColor = grayColor;
		}
	};
	password.onfocus = function () {
		li[2].style.top = "102px";
		li[2].style.fontSize = "13px";
		li[2].style.color = deepBlueColor;
		if (warning[2]) {
			//出错时
			li[2].style.color = redColor;
			password.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[2].style.color = deepBlueColor;
			password.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	password.onblur = function () {
		if (password.value.length == 0) {
			//没内容
			li[2].style.top = "134px";
			li[2].style.fontSize = "15px";
			li[2].style.color = blueColor;
			if (warning[2]) password.style.borderColor = redColor;
			else password.style.borderColor = grayColor;
		} else if (warning[2]) {
			//有错误 有内容
			password.style.borderColor = redColor;
			li[2].style.color = redColor;
		} else {
			//没错误 有内容
			li[3].style.color = blueColor;
			password.style.borderColor = grayColor;
		}
	};
	confirmPassword.onfocus = function () {
		li[3].style.top = "192px";
		li[3].style.fontSize = "13px";
		li[3].style.color = deepBlueColor;
		if (warning[3]) {
			//出错时
			li[3].style.color = redColor;
			confirmPassword.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[3].style.color = deepBlueColor;
			confirmPassword.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	confirmPassword.onblur = function () {
		if (confirmPassword.value.length == 0) {
			//没内容
			li[3].style.top = "224px";
			li[3].style.fontSize = "15px";
			li[3].style.color = blueColor;
			if (warning[3]) confirmPassword.style.borderColor = redColor;
			else confirmPassword.style.borderColor = grayColor;
		} else if (warning[3]) {
			//有错误 有内容
			confirmPassword.style.borderColor = redColor;
			li[3].style.color = redColor;
		} else {
			//没错误 有内容
			li[3].style.color = blueColor;
			confirmPassword.style.borderColor = grayColor;
		}
	};

	/**
	 * 验证邮箱是否正确
	 */
	findPassword.onclick = function () {
		var emailRegex = /^([0-9a-zA-Z\-_\.]+)@([0-9a-zA-Z]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?)$/;
		if (account.value.length == 0 || !emailRegex.test(account.value)) {
			warning[0] = true;
			span[0].innerHTML = "请输入邮箱地址";
			account.style.borderColor = redColor;
			box1[0].style.display = "block";
			return;
		} else {
			var data = "action=verification&account=" + account.value;
			var url = "customerServer";
			var result = sendRequestByPost(data, url); //去查找账号
			if (!result) {
				//验证查询结果，邮箱如果存在会返回false
				userAccount = account.value; //记录正确的账号
				document.querySelector("p").innerHTML = "已成功发送邮件，请查看邮箱并正确输入验证码";
				data = "action=sendKey&Address=" + userAccount; //发送验证码
				url = "postMailServer";
				result = sendRequestByPost(data, url);
				if (result) {
					alert("Email has been sent successfully.");
					warning[0] = false;
					account.style.borderColor = grayColor;
                    li[0].style.display = "none";
					box1[0].style.display = "none";
					account.style.display = "none";
                    li[1].style.display = "block";
					findPassword.style.display = "none";
					verificationCode.style.display = "block";
					sendVerificationCode.style.display = "block";
				} else {
					alert("Failed to send.");
				}
			} else {
				warning[0] = true;
				box1[0].style.display = "block";
				li[0].style.color = redColor;
				account.style.borderColor = redColor;
				pan[0].innerHTML = "此邮箱不存在";
			}
		}
	};

	/**
	 * 验证验证码是否正确
	 */
	sendVerificationCode.onclick = function () {
		if (verificationCode.value.length == 0) {
			warning[1] = true;
			span[1].innerHTML = "请输入验证码";
			verificationCode.style.borderColor = redColor;
			box1[1].style.display = "block";
			return;
		} else {
			var data = "action=verification&key=" + verificationCode.value;
			var url = "postMailServer";
			var result = sendRequestByPost(data, url); //去链接ajax
			if (!result) {
				document.querySelector("p").style.display = "none";
                box1[1].style.display = "none";
				verificationCode.style.display = "none";
				li[1].style.display = "none";
				sendVerificationCode.style.display = "none";
				password.style.display = "block";
				li[2].style.display = "block";
				confirmPassword.style.display = "block";
				li[3].style.display = "block";
				changePassword.style.display = "block";
			} else {
				warning[1] = true;
				box1[1].style.display = "block";
				verificationCode.style.borderColor = redColor;
				span[1].innerHTML = "验证码错误";
			}
		}
	};

	/**
	 * 修改密码
	 */
	changePassword.onclick = function () {
		if (password.value.length == 0) {
			warning[1] = true;
			span[1].innerHTML = "请输入新密码";
			password.style.borderColor = redColor;
			box1[1].style.display = "block";
			return;
		} else if (password.value.length < 8) {
			warning[1] = true;
			li[1].style.color = redColor;
			span[1].innerHTML = "密码长度不得少于 8 个字符";
			password.style.borderColor = redColor;
			box1[1].style.display = "block";
			return;
		} else {
			warning[1] = false;
			password.style.borderColor = grayColor;
			box1[1].style.display = "none";
			li[1].style.color = blueColor;
		}
		if (confirmPassword.value.length == 0) {
			warning[2] = true;
			span[2].innerHTML = "请确认密码";
			box1[2].style.display = "block";
			confirmPassword.style.borderColor = redColor;
		} else if (confirmPassword.value != password.value) {
			warning[2] = true;
			li[2].style.color = redColor;
			span[2].innerHTML = "两次密码不一致";
			box1[2].style.display = "block";
			confirmPassword.style.borderColor = redColor;
		} else {
			//去链接ajax
			var data = "action=update&account=" + account.value + "&passWord=" + password.value;
			var url = "customerServer";
			var result = sendRequestByPost(data, url);
			if (result == true) {
				warning[1] = false;
				box1[1].style.display = "none";
				li[1].style.color = blueColor;
				window.location.href = "signIn.html";
			}
		}
	};

	/**
	 * ajax 连接数据库校验邮箱
	 *
	 * @param data 内部带有需要传给 loginServer 的数据
	 * @param url
	 * @return flag 正确:true 错误:false
	 */
	function sendRequestByPost(data, url) {
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
			if (xmlReq.readyState == 4 && xmlReq.status == 200) {
				//获取服务器的响应值
				var result = xmlReq.responseText;
				//后续操作
				alert("resu1t1:" + result);
				if (result == "success") flag = true;
				else flag = false;
				alert("get esp:" + result);
			}
		};
		xmlReq.open("POST", url, false); //创建同步Post请求
		xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlReq.send(data); //发送请求
		alert("已向后台请求");
		return flag;
	}
};
