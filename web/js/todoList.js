window.onload = function () {
	var addToDo = false; //是否处于新增页面
	var isSendEmail = true; //默认关闭提醒
	var showTime = false; //默认关闭提醒
	var currentLabel = "inbox";  //判断当前在哪个标签上
	var enableAlarm = document.querySelector(".enableAlarm");
	var disableAlarm = document.querySelector(".disableAlarm");
	var schedule = document.querySelector(".schedule");
	var time = document.querySelector("#time");
	var add = document.querySelector(".add");
	var dialogMask = document.querySelector(".dialog-mask");
	var addList = document.querySelector(".addList");
	var button = document.querySelector(".button");
	var addTitle = document.querySelector(".add-title");
	var postscript = document.querySelector(".postscript");
	var Function = document.querySelector(".function");
	var signOut = document.querySelector(".signOut");
	var profile = document.querySelector(".profile");
	var box = document.querySelector(".box");
	var inbox = document.querySelector(".inbox");
	var today = document.querySelector(".today");
    var xmlReq;
    var url;
    var result;
    var jsonResult;
    //从后端读入数据并且显示在前端
    initAjax();
    readInData();
    displayData();

	profile.onclick = function () {
		// window.location.href="userProfile.html?backurl="+window.location.href; 
		window.location.href="./userProfile.html"; 
	}
	box.onmouseenter = function () {
		signOut.style.display = "block";
		profile.style.display = "block";
		Function.style.transform = "scale(1.15,1.15)";
		setTimeout(function () {
			Function.style.transform = "scale(1,1)";
		}, 200);
	};
	box.onmouseleave = function () {
		signOut.style.display = "none";
		profile.style.display = "none";
	};
	signOut.onclick = function () {
		window.location.replace("signIn.html");
	};

	today.onclick = function () {
		if (currentLabel != "today") {
			document.querySelector(".welcome").style.display = "block";
			inbox.style.backgroundColor = "rgb(245, 246, 247)";
			today.style.backgroundColor = "rgb(225, 227, 230)";
			var underline = document.querySelectorAll(".underline");
			for(var i = 0; i<underline.length; i++) {
				if (underline[i].innerHTML != "Today") {
					underline[i].parentNode.style.display = "none";
				}
			}
			setTimeout(function () {
				document.querySelector(".welcome").style.display = "none";
			}, 900);
			currentLabel = "today";
		}
	}
	inbox.onclick = function () {
		if (currentLabel != "inbox") {
			document.querySelector(".welcome").style.display = "block";
			today.style.backgroundColor = "rgb(245, 246, 247)";
			inbox.style.backgroundColor = "rgb(225, 227, 230)";
			var underline = document.querySelectorAll(".underline");
			for(var i = 0; i<underline.length; i++) {
				underline[i].parentNode.style.display = "block";
			}
			setTimeout(function () {
				document.querySelector(".welcome").style.display = "none";
			}, 900);
			currentLabel = "inbox";
		}
	}
	today.onmouseenter = function () {
		today.style.backgroundColor = "rgb(225, 227, 230)";
	}
	inbox.onmouseenter = function () {
		inbox.style.backgroundColor = "rgb(225, 227, 230)";
	}
	today.onmouseout = function () {
		if (currentLabel != "today")
			today.style.backgroundColor = "rgb(245, 246, 247)";
	}
	inbox.onmouseout = function () {
		if (currentLabel != "inbox")
			inbox.style.backgroundColor = "rgb(245, 246, 247)";
	}
	// var trashcan = document.querySelectorAll(".trashcan");
	// var list = document.querySelectorAll(".list");
	// var checkbox = document.querySelectorAll(".checkbox");
	// for (var i = 0; i < list.length; i++) {
	// 	checkbox[i].onclick = function () {
	// 		var list = this.parentNode;
	// 		var h3 = list.querySelector("h3");
	// 		var p = list.querySelector("p");
	// 		if (this.checked) {
	// 			h3.style.textDecoration = "line-through";
	// 			p.style.textDecoration = "line-through";
	// 		} else {
	// 			h3.style.textDecoration = "none";
	// 			p.style.textDecoration = "none";
	// 		}
	// 	};
	// 	list[i].onmouseenter = function () {
	// 		this.querySelector(".trashcan").style.display = "inline-block";
	// 	};
	// 	list[i].onmouseleave = function () {
	// 		this.querySelector(".trashcan").style.display = "none";
	// 	};
	// 	trashcan[i].onclick = function () {
	// 		alert("delete from front page directly");
	// 		var pNode = this.parentNode; //list
	// 		var gpNode = pNode.parentNode; //singleDay
	// 		gpNode.removeChild(pNode);
     //        var data = "action=deleteRecord&Id=" + pNode.id;
     //        if (pNode.id != undefined)
     //        	setAjax(data, true);
	// 		if (gpNode.querySelectorAll(".list").length == 0)
	// 			gpNode.remove();
	// 	};
	// }

	add.onclick = function () {
		if ((addToDo = !addToDo)) {
			dialogMask.style.display = "block";
			addList.style.display = "block";
			add.style.transform = "rotate(135deg)";
			add.style.backgroundColor = "rgb(220, 69, 58)";
		} else {
			dialogMask.style.display = "none";
			addList.style.display = "none";
			add.style.transform = "rotate(0deg)";
			add.style.backgroundColor = "rgb(90, 156, 245)";
			schedule.style.right = "110px";
			time.style.width = "0px";
			time.style.paddingLeft = "0px";
			showTime = false;
		}
	};
	schedule.onclick = function () {
		//日程
		if ((showTime = !showTime)) {
			schedule.style.right = "230px";
			time.style.display = "block";
			time.style.width = "115px";
			time.style.paddingLeft = "35px";
			setTimeout(function () {
				time.focus();
			}, 600);
		} else {
			schedule.style.right = "110px";
			time.style.width = "0px";
			time.style.paddingLeft = "0px";
		}
	};
	enableAlarm.onclick = function () {
		enableAlarm.style.display = "none";
		disableAlarm.style.display = "inline-block";
		isSendEmail = false;
	};
	disableAlarm.onclick = function () {
		disableAlarm.style.display = "none";
		enableAlarm.style.display = "inline-block";
		isSendEmail = true;
	};

	/**
	 * 添加一条记录
	 */
	button.onclick = function () {
		if (time.value == 0 || addTitle.value == 0) {
			alert("时间和标题不能为空");
			return;
		}
		var data =
			"action=postToBack&Title=" + encodeURIComponent(encodeURIComponent(addTitle.value)) +
			"&Content=" + encodeURIComponent(encodeURIComponent(postscript.value)) +
			"&Time=" + time.value +
			"&isSendEmail=" + isSendEmail;
        setAjax(data, false);
        var id = result;
		var timeSub = time.value.substring(8, 10);
		var h1 = document.querySelectorAll("h1"); //获取所有的h1逐个遍历
		var inboxCount = inbox.querySelector("p").innerHTML;
		inbox.querySelector("p").innerHTML = Number(inboxCount) + 1;
		var i = 0;
		for (; i < h1.length; i++) {
			if (timeSub == h1[i].innerHTML) {
				var pNode = h1[i].parentNode;
				addSingleList(pNode, id, false, addTitle.value, isSendEmail, time.value.substring(11, 16), postscript.value);
				break;
			}
		}
		if (i == h1.length) {
			var createSingleDay = addSingleDay(time.value);
			addSingleList(createSingleDay, id, false, addTitle.value, isSendEmail, time.value.substring(11, 16), postscript.value);
		}
		// alert("正在存储数据...");
		add.onclick();
		addTitle.value = "";
		postscript.value = "";
		time.value = "";
		isSendEmail = false;
		// location.reload();
	};

	/**
	 * 从后端读入数据
	 */
	function readInData() {
		var data = "action=postToFront";
		setAjax(data, false);
		if (result != undefined)
			jsonResult = JSON.parse(result);
		else
			jsonResult = "";
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
		url = "mainPageServer";
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
	 * 把数据展示到前端
	 */
	function displayData() {
		var createSingleDay; //一整天内的待办事项
		var isCrossOut;
        var id;
        var title;
        var isSendEmail;
        var content;
        var time;
        inbox.querySelector("p").innerHTML = jsonResult.length; //inbox的总条数
		for (var i = 0, singleDay; i < jsonResult.length; ) {
			//singleDay是取一天的日期
			createSingleDay = addSingleDay(jsonResult[i].Time);
			singleDay = jsonResult[i].Time.substring(0, 10);
			while (i < jsonResult.length && singleDay == jsonResult[i].Time.substring(0, 10)) {
				isCrossOut = jsonResult[i].isCrossOut;
				id = jsonResult[i].Id;
				title = decodeURIComponent(decodeURIComponent(jsonResult[i].Title));
				isSendEmail = jsonResult[i].isSendEmail;
				content = decodeURIComponent(decodeURIComponent(jsonResult[i].Content));
				time = jsonResult[i].Time.substring(11, 16);
				addSingleList(createSingleDay, id, isCrossOut, title, isSendEmail, time, content);
				i++;
			}
		}
		setTimeout(function () {
			document.querySelector(".welcome").style.display = "none";
		}, 600);
	}

	/**
	 * 创建大标题
	 *
	 * @param {String} dateTime 待办事项时间
	 * @returns {Document} 返回今天的日期所对应的标签
	 */
	function addSingleDay(dateTime) {
		var content = document.querySelector(".content");
		var createH1, createUnderline, createSingleDay;
		content.appendChild((createSingleDay = document.createElement("div")));
		createSingleDay.className = "SingleDay";
		createSingleDay.appendChild((createH1 = document.createElement("H1")));
		createSingleDay.appendChild((createUnderline = document.createElement("div")));
		createUnderline.className = "underline";
		createH1.innerHTML = dateTime.substring(8, 10);
		var date = new Date(dateTime);
		if (date.toDateString() == new Date().toDateString()) {
			createUnderline.innerHTML = "Today"; //今天
		} else if (
			date.toDateString() == new Date(new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000)).toDateString()
		) {
			createUnderline.innerHTML = "Tomorrow"; //明天
		} else if (1 == date.getDate()) {
			createUnderline.innerHTML = date.getMonth() + 1 + "月"; //与日期相同
		}
		return createSingleDay;
	}

	/**
	 * 创建一条 to-do List
	 *
	 * @param {Document} singleDay 当天日期
	 * @param {Number} id 唯一标识id
	 * @param {String} isCrossOut 是否完成: 1开启，0关闭
	 * @param {String} title todo的标题
	 * @param {String} isSendEmail 是否提醒: 1开启，0关闭
	 * @param {String} time 时间
	 * @param {String} content 备注
	 */
	function addSingleList(singleDay, id, isCrossOut, title, isSendEmail, time, content) {
		var createList, createCheckbox, createRemind, createTime, createTrashcan, createH3, createP;
        if (singleDay.querySelector(".underline").innerHTML == "Today") {
            var todayCount = today.querySelector("p").innerHTML;
            today.querySelector("p").innerHTML = Number(todayCount) + 1; //today的个数加1
        }
		singleDay.appendChild((createList = document.createElement("div")));
		createList.className = "list";
		createList.appendChild((createCheckbox = document.createElement("input")));
		createCheckbox.type = "checkbox";
		createCheckbox.className = "checkbox";
		if (isCrossOut == 1) createCheckbox.checked = true;
		createList.appendChild((createH3 = document.createElement("H3")));
		if (isSendEmail == 1) {
			createList.appendChild((createRemind = document.createElement("div")));
			createRemind.className = "remind";
		}
		createList.appendChild((createTime = document.createElement("div")));
		createTime.className = "time";
		createTime.innerHTML = time;
		createList.appendChild((createTrashcan = document.createElement("div")));
		createTrashcan.className = "trashcan";
		createList.appendChild((createP = document.createElement("p")));
		createH3.innerHTML = title;
		createList.id = id;
		createP.innerHTML = content;
		interact(createCheckbox, createList, createTrashcan);
		createCheckbox.onclick();
	}

	/**
	 * 交互事件，实现删除记录，划线，悬浮显示垃圾桶
	 *
	 * @param {Document} checkbox
	 * @param {Document} list
	 * @param {Document} trashcan
	 */
	function interact(checkbox, list, trashcan) {
		checkbox.onclick = function () {
			var list = this.parentNode;
			var h3 = list.querySelector("h3");
			var p = list.querySelector("p");
			checkbox.onchange = function () {
				var data = "action=updateCrossOut&isCrossOut=" + this.checked + "&id=" + list.id;
				setAjax(data, true);
			};
			if (checkbox.checked) {
				h3.style.textDecoration = "line-through";
				p.style.textDecoration = "line-through";
			} else {
				h3.style.textDecoration = "none";
				p.style.textDecoration = "none";
			}
		};
		list.onmouseenter = function () {
			this.querySelector(".trashcan").style.display = "inline-block";
		};
		list.onmouseleave = function () {
			this.querySelector(".trashcan").style.display = "none";
		};
		trashcan.onclick = function () {
			var pNode = this.parentNode;
			var gpNode = pNode.parentNode;
			gpNode.removeChild(pNode);
            var data = "action=deleteRecord&Id=" + pNode.id;
            setAjax(data, true);
            var inboxCount = inbox.querySelector("p").innerHTML;
            inbox.querySelector("p").innerHTML = inboxCount - 1;
            //TODO: 同步删除today的显示条数
			//TODO：给判断备注是否为空，空的话调整checkbox的高度
			//TODO：给忘记密码新增转转转，避免发送邮箱时间过长
            if (gpNode.querySelectorAll(".list").length == 0)
            	gpNode.remove();
		};
	}
};
