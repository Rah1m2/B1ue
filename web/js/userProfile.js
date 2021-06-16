window.onload =  function() {
    var url;
    var result;
    var jsonResult;
    var box = document.querySelector(".box");
    var h3 = box.querySelector("h3");
    var email = document.querySelector(".page");

    initAjax();
    readInData();
    h3.innerHTML = "Hey, "+decodeURIComponent(jsonResult[0].customerName);
    email.innerHTML = jsonResult[0].customerAccount;



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