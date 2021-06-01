window.onload = function () {
    var Switch = false;
    var warning = [false, false];
    var li = document.querySelectorAll("li");
    var email = document.querySelector("#email");
	var password = document.querySelector("#password");
    var box3 = document.querySelector(".box3");
	var showPass = document.querySelector(".showPass");
    var hiddenPass = document.querySelector(".hiddenPass");
	var button = document.querySelector(".button");
	var box1 = document.querySelectorAll(".box1");
	var span = document.querySelectorAll("span");
    li[0].onclick = function () {
		email.focus();
	};
	li[1].onclick = function () {
		password.focus();
	};
    email.onfocus = function () {
		li[0].style.top = "157px";
		li[0].style.fontSize = "13px";
		li[0].style.color = "rgb(0, 104, 231)";
		if (warning[0]) {
			//出错时
			li[0].style.color = "rgb(220, 69, 58)";
			email.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			//正确
			li[0].style.color = "rgb(0, 104, 231)";
			email.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	email.onblur = function () {
		if (email.value.length == 0 && !warning[0]) {
			//没错误 没内容
			li[0].style.top = "181px";
			li[0].style.fontSize = "15px";
			li[0].style.color = "rgb(95, 99, 103)";
			email.style.borderColor = "#ccc";
		} else if (email.value.length != 0 && warning[0]) {
			//有错误 有内容
			email.style.borderColor = "rgb(220, 69, 58)";
			li[0].style.color = "rgb(220, 69, 58)";
		} else if (email.value.length == 0 && warning[0]) {
			//有错误 没内容
			li[0].style.top = "181px";
			li[0].style.fontSize = "15px";
			li[0].style.color = "rgb(95, 99, 103)";
			email.style.borderColor = "rgb(220, 69, 58)";
		} else if (email.value.length != 0 && !warning[0]) {
			//没错误 有内容
			li[0].style.color = "rgb(95, 99, 103)";
			email.style.borderColor = "#ccc";
		}
	};
    password.onfocus = function () {
		li[1].style.top = "248px";
		li[1].style.fontSize = "13px";
		li[1].style.color = "rgb(0, 104, 231)";
		if (warning[1]) {
			//出错时
			li[1].style.color = "rgb(220, 69, 58)";
			password.style.outlineColor = "rgb(220, 69, 58)"; //点击边框为红色
		} else {
			//正确
			li[1].style.color = "rgb(0, 104, 231)";
			password.style.outlineColor = "rgb(0, 104, 231)"; //点击边框为蓝色
		}
	};
	password.onblur = function () {
		if (password.value.length == 0 && !warning[1]) {
			//没错误 没内容
			li[1].style.top = "272px";
			li[1].style.fontSize = "15px";
			li[1].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
		} else if (password.value.length != 0 && warning[1]) {
			//有错误 有内容
			password.style.borderColor = "rgb(220, 69, 58)";
			li[1].style.color = "rgb(220, 69, 58)";
		} else if (password.value.length == 0 && warning[1]) {
			//有错误 没内容
			li[1].style.top = "272px";
			li[1].style.fontSize = "15px";
			li[1].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "rgb(220, 69, 58)";
		} else if (password.value.length != 0 && !warning[1]) {
			//没错误 有内容
			li[1].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
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
	}
	button.onclick = function () {
		if (email.value.length == 0) {
			warning[0] = true;
			email.style.borderColor = "rgb(220,69,58)";
			box1[0].style.display = "block";
			return false;
		} else {
			warning[0] = false;
			email.style.borderColor = "#ccc";
			box1[0].style.display = "none";
			li[0].style.color = "rgb(95, 99, 103)";
		}
		if (password.value.length == 0) {
			warning[1] = true;
			span[1].innerHTML = "输入密码";
			box1[1].style.display = "block";
			password.style.borderColor = "rgb(220,69,58)";
			return false;
		} else if (password.value.length < 8) {
			warning[1] = true;
			span[1].innerHTML = "密码错误，重试或点击“忘记密码”以重置密码";
			box1[1].style.display = "block";
			password.style.borderColor = "rgb(220,69,58)";
			return false;
		} else {
			warning[1] = false;
			box1[1].style.display = "none";
			li[1].style.color = "rgb(95, 99, 103)";
			password.style.borderColor = "#ccc";
            sendRequestByPost();
			return true;
		}
	};
};

function sendRequestByPost(){
    // var name=document.forms[0].customerName.value;
    // var password=document.forms[0].customerPassword.value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    alert(email);
    //定义异步请求对象
    var xmlReq;
    //检测浏览器是否直接支持ajax
    if(window.XMLHttpRequest){//直接支持ajax
        xmlReq=new XMLHttpRequest();
    }else{//不直接支持ajax
        xmlReq=new ActiveObject('Microsoft.XMLHTTP');
    }
    console.log("test:"+xmlReq.responseText);

    //设置回调函数
    xmlReq.onreadystatechange=function(){
        if (xmlReq.readyState===4&&xmlReq.status===200) {
            //获取服务器的响应值
            var result=xmlReq.responseText;
            // console.log(result);
            //后续操作
            alert(result);
            if(result === "Welcome") {
                alert("jumping...");
                window.location.href = "MainPage.html";
            }
        }
    };

    //创建异步Post请求
    var url="loginServer";
    xmlReq.open("POST",url,true);
    xmlReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //发送请求
    var data="email="+email+"&passWord="+password;
    xmlReq.send(data);

}
