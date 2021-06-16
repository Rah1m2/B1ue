window.onload = function () {
	var grayColor = "#ccc";
	var redColor = "rgb(220, 69, 58)";
	var blueColor = "rgb(95, 99, 103)";
	var deepBlueColor = "rgb(0, 104, 231)";
	var warning = [false, false, false];
	var li = document.querySelectorAll("li");
	var oldPass = document.querySelector(".oldPassword");
	var newPassword = document.querySelector(".password");
	var confirmPassword = document.querySelector(".confirmPassword");
	var confirm = document.querySelector("#confirm");
	var changePassword = document.querySelector("#changePassword");
	var box1 = document.querySelectorAll(".box1");
	var span = document.querySelectorAll("span");
	var result;
	var jsonResult;
    var url;
    var xmlReq;

    initAjax();
    readInData();

	li[0].onclick = function () {
		oldPass.focus();
	};
	li[1].onclick = function () {
		newPassword.focus();
	};
	li[2].onclick = function () {
		confirmPassword.focus();
	};
	oldPass.onfocus = function () {
		li[0].style.top = "168px";
		li[0].style.fontSize = "13px";
		li[0].style.color = deepBlueColor;
		if (warning[0]) {
			//出错时
			li[0].style.color = redColor;
			oldPass.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[0].style.color = deepBlueColor;
			oldPass.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};

	oldPass.onblur = function () {
		if (oldPass.value.length == 0) {
			//没内容
			li[0].style.top = "199px";
			li[0].style.fontSize = "15px";
			li[0].style.color = blueColor;
			if (warning[0]) oldPass.style.borderColor = redColor;
			else oldPass.style.borderColor = grayColor;
		} else if (warning[0]) {
			//有错误 有内容
			oldPass.style.borderColor = redColor;
			li[0].style.color = redColor;
		} else {
			//没错误 有内容
			li[0].style.color = blueColor;
			oldPass.style.borderColor = grayColor;
		}
	};
	newPassword.onfocus = function () {
		li[1].style.top = "102px";
		li[1].style.fontSize = "13px";
		li[1].style.color = deepBlueColor;
		if (warning[1]) {
			//出错时
			li[1].style.color = redColor;
			newPassword.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[1].style.color = deepBlueColor;
			newPassword.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	newPassword.onblur = function () {
		if (newPassword.value.length == 0) {
			//没内容
			li[1].style.top = "134px";
			li[1].style.fontSize = "15px";
			li[1].style.color = blueColor;
			if (warning[1]) newPassword.style.borderColor = redColor;
			else newPassword.style.borderColor = grayColor;
		} else if (warning[1]) {
			//有错误 有内容
			newPassword.style.borderColor = redColor;
			li[1].style.color = redColor;
		} else {
			//没错误 有内容
			li[1].style.color = blueColor;
			newPassword.style.borderColor = grayColor;
		}
	};
	confirmPassword.onfocus = function () {
		li[2].style.top = "192px";
		li[2].style.fontSize = "13px";
		li[2].style.color = deepBlueColor;
		if (warning[2]) {
			//出错时
			li[2].style.color = redColor;
			confirmPassword.style.outlineColor = redColor; //点击边框为红色
		} else {
			//正确
			li[2].style.color = deepBlueColor;
			confirmPassword.style.outlineColor = deepBlueColor; //点击边框为蓝色
		}
	};
	confirmPassword.onblur = function () {
		if (confirmPassword.value.length == 0) {
			//没内容
			li[2].style.top = "224px";
			li[2].style.fontSize = "15px";
			li[2].style.color = blueColor;
			if (warning[2]) confirmPassword.style.borderColor = redColor;
			else confirmPassword.style.borderColor = grayColor;
		} else if (warning[2]) {
			//有错误 有内容
			confirmPassword.style.borderColor = redColor;
			li[2].style.color = redColor;
		} else {
			//没错误 有内容
			li[2].style.color = blueColor;
			confirmPassword.style.borderColor = grayColor;
		}
	};

	/**
	 * 验证密码是否正确
	 */
	confirm.onclick = function () {
		if (oldPass.value.length == 0) {
			warning[0] = true;
			span[0].innerHTML = "请输入密码";
			oldPass.style.borderColor = redColor;
			box1[0].style.display = "block";
			return;
		} else {
			// var data = "action=login&account="+jsonResult.customerAccouont+"&newPassword=" + oldPass.value;
			// var url = "customerServer";
			// setAjax(data,false);    //去查找账号密码
			// if (result == "sucess")
			// 	result = true;
			// else
			// 	result = false;
			alert("json:"+jsonResult[0].customerPassword);
            alert("pw:"+oldPass.value);
            if (oldPass.value == jsonResult[0].customerPassword)
            	result = true;
            else
            	result = false;
			if (result) {
				document.querySelector("p").style.display = "none";
					warning[0] = false;
					oldPass.style.borderColor = grayColor;
					box1[0].style.display = "none";
					oldPass.style.display = "none";
					li[0].style.display = "none";
					confirm.style.display = "none";
                    newPassword.style.display = "block";
                    li[1].style.display = "block";
                    confirmPassword.style.display = "block";
                    li[2].style.display = "block";
                    changePassword.style.display = "block";
				} else {
				warning[0] = true;
				box1[0].style.display = "block";
				li[0].style.color = redColor;
				oldPass.style.borderColor = redColor;
				span[0].innerHTML = "密码错误";
			}
		}
	};

	/**
	 * 修改密码
	 */
	changePassword.onclick = function () {
		if (newPassword.value.length == 0) {
			warning[1] = true;
			span[1].innerHTML = "请输入新密码";
			newPassword.style.borderColor = redColor;
			box1[1].style.display = "block";
			return;
		} else if (newPassword.value.length < 8) {
			warning[1] = true;
			li[1].style.color = redColor;
			span[1].innerHTML = "密码长度不得少于 8 个字符";
			newPassword.style.borderColor = redColor;
			box1[1].style.display = "block";
			return;
		} else {
			warning[1] = false;
			newPassword.style.borderColor = grayColor;
			box1[1].style.display = "none";
			li[1].style.color = blueColor;
		}
		if (confirmPassword.value.length == 0) {
			warning[2] = true;
			span[2].innerHTML = "请确认密码";
			box1[2].style.display = "block";
			confirmPassword.style.borderColor = redColor;
		} else if (confirmPassword.value != newPassword.value) {
			warning[2] = true;
			li[2].style.color = redColor;
			span[2].innerHTML = "两次密码不一致";
			box1[2].style.display = "block";
			confirmPassword.style.borderColor = redColor;
		} else {
			//去链接ajax
			var data = "action=update&account=" + jsonResult[0].customerAccount + "&passWord=" + newPassword.value;
			setAjax(data,false);
			if(result == "success")
				result = true;
			else
				result = false;
			if (result == true) {
				warning[1] = false;
				box1[1].style.display = "none";
				li[1].style.color = blueColor;
				window.location.href = "signIn.html";
			}
		}
	};





    function readInData() {
        var data = "action=postToFront";
        setAjax(data, false);
        if (result != undefined)
            jsonResult = JSON.parse(result);
        else
            jsonResult = "";
        alert(result);
    }

    function setAjax(data,flag) {
        xmlReq.onreadystatechange = function () {
            if (xmlReq.readyState == 4 && xmlReq.status == 200) {
                //获取服务器的响应值
                result = xmlReq.responseText;
            }
        };
        xmlReq.open("POST", url, flag); //创建异步Post请求
        xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlReq.send(data);
    }

    /**
     * 初始化ajax
     */
    function initAjax() {
        if (window.XMLHttpRequest) {
            //直接支持ajax
            xmlReq = new XMLHttpRequest();
        } else {
            //不直接支持ajax
            xmlReq = new ActiveObject("Microsoft.XMLHTTP");
        }
        url = "customerServer";
    }
};
