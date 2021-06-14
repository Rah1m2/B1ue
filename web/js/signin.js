window.onload = function () {
	var grayColor = "#ccc";
	var redColor = "rgb(220, 69, 58)";
	var blueColor = "rgb(95, 99, 103)";
	var deepBlueColor = "rgb(0, 104, 231)";
	var Switch = false;
	var warning = [false, false];
	var li = document.querySelectorAll("li");
	var account = document.querySelector("#account");
	var password = document.querySelector("#password");
	var box3 = document.querySelector(".box3");
	var showPass = document.querySelector(".showPass");
	var hiddenPass = document.querySelector(".hiddenPass");
	var button = document.querySelector(".button");
	var box1 = document.querySelectorAll(".box1");
	var span = document.querySelectorAll("span");
	li[0].onclick = function () {
		account.focus();
	};
	li[1].onclick = function () {
		password.focus();
	};
	account.onfocus = function () {
		li[0].style.top = "157px";
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
			li[0].style.top = "181px";
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
	password.onfocus = function () {
		li[1].style.top = "248px";
		li[1].style.fontSize = "13px";
		li[1].style.color = deepBlueColor;
		if (warning[1]) {
			//出错时
			li[1].style.color = redColor;
			password.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[1].style.color = deepBlueColor;
			password.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	password.onblur = function () {
		if (password.value.length == 0) {
			//没内容
			li[1].style.top = "272px";
			li[1].style.fontSize = "15px";
			li[1].style.color = blueColor;
			if (warning[1]) li[1].style.color = blueColor;
			else password.style.borderColor = grayColor;
		} else if (warning[1]) {
			//有错误 有内容
			password.style.borderColor = redColor;
			li[1].style.color = redColor;
		} else {
			//没错误 有内容
			li[1].style.color = blueColor;
			password.style.borderColor = grayColor;
		}
	};
	box3.onclick = function () {
		if ((Switch = !Switch)) {
			//显示密码
			showPass.style.display = "block";
			hiddenPass.style.display = "none";
			password.type = "text";
		} else {
			//隐藏密码
			showPass.style.display = "none";
			hiddenPass.style.display = "block";
			password.type = "password";
		}
	};
    password.onkeydown = function () {
        if (window.event.keyCode === 13) button.onclick();
    };
	button.onclick = function () {
		if (account.value.length == 0) {
			warning[0] = true;
			span[0].innerHTML = "请输入电子邮件地址或手机号";
			account.style.borderColor = redColor;
			box1[0].style.display = "block";
			return;
		} else {
			warning[0] = false;
			account.style.borderColor = grayColor;
			box1[0].style.display = "none";
			li[0].style.color = blueColor;
		}
		if (password.value.length == 0) {
			warning[1] = true;
			span[1].innerHTML = "输入密码";
			box1[1].style.display = "block";
			password.style.borderColor = redColor;
		} else {
			//去链接ajax
			var loading = document.querySelector(".loading");
            button.style.display = "none";
            loading.style.display = "block";
			var data = "action=login&account=" + account.value + "&passWord=" + password.value;
			var result = sendRequestByPost(data);
            setTimeout(function () {
            	button.style.display = "block";
            	loading.style.display = "none";
            }, 1000);
			// alert(result);
			if (result == 0) {
				//登录成功
                // alert("alert:"+result);
                warning[1] = false;
                box1[1].style.display = "none";
                li[1].style.color = blueColor;
                password.style.borderColor = grayColor;
                setTimeout(function () {
                    window.location.href = "todoList.html";
                }, 1000);

                // alert("登录成功");
			} else if (result == 1) {
				//帐号不存在
				warning[0] = true;
				box1[0].style.display = "block";
				span[0].innerHTML = "找不到您的账号";
				li[0].style.color = redColor;
				account.style.borderColor = redColor;
			} else {
				//密码错误
				warning[1] = true;
				box1[1].style.display = "block";
				span[1].innerHTML = "密码错误，重试或点击“忘记密码”以重置密码";
				li[1].style.color = redColor;
				password.style.borderColor = redColor;
			}
		}
	};
};

/**
 * ajax 连接数据库校验账号密码
 *
 * @param data 内部带有需要传给 loginServer 的数据
 * @return result 正确:0，帐号错误:1，密码错误:2
 */
function sendRequestByPost(data) {
	console.log("建立请求");
	//定义异步请求对象
	var xmlReq;
	var result;
	var flag;
	//检测浏览器是否直接支持ajax
	if (window.XMLHttpRequest) {
		//直接支持ajax
		xmlReq = new XMLHttpRequest();
	} else {
		//不直接支持ajax
		xmlReq = new ActiveObject("Microsoft.XMLHTTP");
	}
	console.log("test:" + xmlReq.responseText);
	//设置回调函数
	xmlReq.onreadystatechange = function () {
		if (xmlReq.readyState === 4 && xmlReq.status === 200) {
			//获取服务器的响应值
			result = xmlReq.responseText;
            if(result === "success")
                flag = 0;
            else if(result === "Incorrect:Ac")
                flag = 1;
            else if(result === "Incorrect:Pw")
                flag = 2;
		}
	};
	var url = "customerServer";
	xmlReq.open("POST", url, false); //创建异步Post请求
	xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//发送请求
	xmlReq.send(data);
	// alert("已向后台请求");
	return flag; //正确:0，帐号错误:1，密码错误:2
}
