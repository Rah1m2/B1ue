window.onload = function () {
    var addToDo = false;
    var switchAlarm = false;   //默认关闭提醒
    var showTime = false;   //默认关闭提醒
    var remind = document.querySelector(".remind");
    var schedule = document.querySelector(".schedule");
    var time = document.querySelector("#time");
    var add = document.querySelector(".add");
    var dialogMask = document.querySelector(".dialog-mask");
    var addList = document.querySelector(".addList");
    var button = document.querySelector(".button");
    var addTitle = document.querySelector(".add-title");
    var postscript = document.querySelector(".postscript");

    var xmlReq;
    // initAjax();
    // readInData();
    var list = document.querySelectorAll(".list");
    var TODO = list[0].querySelector(".TDDO");
    var h3 = TODO.querySelectorAll(".h3");
    h3[0].innerHTML = "hello test";

    add.onclick = function () {
        if (addToDo = !addToDo) {
            dialogMask.style.display = "block";
            addList.style.display = "block";
        } else {
            dialogMask.style.display = "none";
            addList.style.display = "none";
        }
    };
    schedule.onclick = function () {   //日程
        if (showTime = !showTime) {
            schedule.style.right = "230px";
            time.style.display = "block";
            time.style.width = "115px";
            time.style.paddingLeft = "35px";
            setTimeout(function () {
                time.focus();
            }, 400);
        } else {
            schedule.style.right = "110px";
            time.style.width = "0px";
            time.style.paddingLeft = "0px";
        }
    };
    remind.onclick = function () {   //开关提醒功能
        if (switchAlarm = !switchAlarm) {

        } else {

        }
    };

    button.onclick = function () {
        if (time.value == 0) {
            alert("时间不能为空");
            return;
        }
        alert("标题:" + addTitle.value);
        alert("备注:" + postscript.value);
        alert("时间:" + time.value);
        alert("闹钟开启情况:" + switchAlarm);

        // var xmlReq;
        var flag;
        var data = "action=postToBack&Title=" + addTitle.value + "&Content=" + postscript.value + "&Time=" + time.value + "&switchAlarm=" + switchAlarm;
        //检测浏览器是否直接支持ajax
        // if (window.XMLHttpRequest) {
        //     //直接支持ajax
        //     xmlReq = new XMLHttpRequest();
        // } else {
        //     //不直接支持ajax
        //     xmlReq = new ActiveObject("Microsoft.XMLHTTP");
        // }
        //设置回调函数
        xmlReq.onreadystatechange = function () {
            if (xmlReq.readyState === 4 && xmlReq.status === 200) {
                //获取服务器的响应值
                var result = xmlReq.responseText;
                alert("this:" + result);
                // var jsonResult = JSON.parse(result);
                // alert("testing result:"+jsonResult[1].customerName);
            }
        };
        // var url = "mainPageServer";
        // xmlReq.open("POST", url, false); //创建异步Post请求
        xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送请求
        xmlReq.send(data);
        // xmlReq.send('newData='+data);
        alert("正在存储数据...");
    };

    function readInData() {
        var data = "action=postToFront";
        xmlReq.onreadystatechange = function () {
            if (xmlReq.readyState === 4 && xmlReq.status === 200) {
                //获取服务器的响应值
                var result = xmlReq.responseText;
                var jsonResult = JSON.parse(result);
                alert("testing result:"+jsonResult[0].Id);
                alert("testing result:"+jsonResult[0].Title);
                alert("testing result:"+jsonResult[0].Time);
                //后续操作
            }
        };
        xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送请求

        xmlReq.send(data);
        alert("正在向后台请求...");
    }

    function initAjax(){
        if (window.XMLHttpRequest) {
            //直接支持ajax
            xmlReq = new XMLHttpRequest();
        } else {
            //不直接支持ajax
            xmlReq = new ActiveObject("Microsoft.XMLHTTP");
        }
        var url = "mainPageServer";
        xmlReq.open("POST", url, false); //创建异步Post请求
    }
};


    // function sendRequestByPost() {
    //     var Arry1={ "id" : "123", "courseID" : "huangt-test", "title" : encodeURIComponent(encodeURIComponent("提交作业")), "content" : null  };
    //     var data = JSON.stringify(Arry1);
    //     // var data = "action=whdsd";
    //     // var data = "class":[401,402,403];
    //     console.log("建立请求");
    //     //定义异步请求对象
    //     var xmlReq;
    //     var flag;
    //     //检测浏览器是否直接支持ajax
    //     if (window.XMLHttpRequest) {
    //         //直接支持ajax
    //         xmlReq = new XMLHttpRequest();
    //     } else {
    //         //不直接支持ajax
    //         xmlReq = new ActiveObject("Microsoft.XMLHTTP");
    //     }
    //     console.log("test:" + xmlReq.responseText);
    //     //设置回调函数
    //     xmlReq.onreadystatechange = function () {
    //         if (xmlReq.readyState === 4 && xmlReq.status === 200) {
    //             //获取服务器的响应值
    //             var result = xmlReq.responseText;
    //             alert("houdaoqian"+result);
    //             var jsonResult = JSON.parse(result);
    //             alert("testing result:"+jsonResult[1].customerName);
    //         }
    //     };
    //     var url = "mainPageServer";
    //     xmlReq.open("POST", url, false); //创建异步Post请求
    //     xmlReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     //发送请求
    //     xmlReq.send("newData="+JSON.stringify(Arry1));
    //     // xmlReq.send('newData='+data);
    //     alert("已向后台请求");
    //     // alert("cache test");
    //     //正确:0，帐号错误:1，密码错误:2
    // }
