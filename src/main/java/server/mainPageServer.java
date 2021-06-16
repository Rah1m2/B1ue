package main.java.server;

import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONArray;
//import com.alibaba.fastjson.JSONObject;
import com.mysql.cj.Session;
import com.mysql.cj.xdevapi.JsonArray;
import jdk.nashorn.internal.objects.NativeUint8Array;
import main.java.utils.DB_Utils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
//import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static jdk.nashorn.internal.runtime.GlobalFunctions.decodeURI;
import static jdk.nashorn.internal.runtime.GlobalFunctions.encodeURIComponent;


@WebServlet("/mainPageServer")
public class mainPageServer extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        System.out.println(action);
        switch (action) {
            case "postToBack" : doGetFront(request, response);
                break;
            case "postToFront" : doPostFront(request, response);
                break;
            case "deleteRecord" : doDelete(request, response);
                break;
            case "updateCrossOut" : doUpdate(request,response);
        }
    }

    /**
     * 接收从前端传来的数据（单条待办事项数据）
     *
     * @param request 用于请求前端的数据
     * @param response 用于向前端反馈结果
     * @throws ServletException 抛出Servlet异常
     * @throws IOException 抛出读写文件异常
     */
    protected void doGetFront(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Map<String,String>> list;
        PrintWriter out = response.getWriter();
        String Title = request.getParameter("Title");
        Title = java.net.URLDecoder.decode(Title,"UTF-8");
        String Content = request.getParameter("Content");
        Content = java.net.URLDecoder.decode(Content,"UTF-8");
        String Time = request.getParameter("Time");
        String isSendEmail = request.getParameter("isSendEmail");
        String isCrossOut = request.getParameter("isCrossOut");
        String Id = request.getParameter("Id");
        int id = 0;

        boolean isEnable = false;
        if(isSendEmail.equals("true"))
            isEnable = false;
        else if(isSendEmail.equals("false"))
            isEnable = true;

        /*解析JSON对象数组*/
//        JSONArray jsonArray = JSONArray.fromObject(Arry1);
//        System.out.println("Newest:"+jsonArray.getJSONObject(0).get(0));
        /*解析JSON数组*/
//        JSONObject jsonObject = JSONObject.fromObject(Arry1);
//        System.out.println("Newest:"+jsonObject.get("id"));
//        System.out.println("Newest:"+jsonObject.get("courseID"));
//        System.out.println("Newest:"+java.net.URLDecoder.decode((String) jsonObject.get("title"),"UTF-8"));

        /*在session中获得账户信息*/
        HttpSession session = request.getSession();
        String accountToken = (String) session.getAttribute("customerAccount");
        System.out.println("test:"+accountToken);

        /*从数据库中读取数据，并且编码为JSON数组*/
//        String sql = "select * from customer";
//        list = DB_Utils.ExecuteQuery(sql);
//        String jsonString = JSON.toJSONString(list,true);


        String sqlInsert = "insert into todolist VALUE(?,?,?,?,?,?,?)";
        String sqlUpdate = "update todolist set Title=?,Content=?,Time=?,isSendEmail=?,isSendEmail=? where customerAccount=?";
        String sqlSelect = "select max(id) from todolist";
        /*如果数据库中无记录则用插入*/
//        String sqlQuery = "select * from todolist where id="+id;
//        list = DB_Utils.ExecuteQuery(sqlQuery);
//        if(list.isEmpty())
//            DB_Utils.ExecuteUpdate(sqlInsert,null,Title,Content,Time,isEnable,accountToken);
        int flag = DB_Utils.ExecuteUpdate(sqlInsert,null,Title,Content,Time,isCrossOut,accountToken,isEnable);
        list = DB_Utils.ExecuteQuery(sqlSelect);
        list.get(0).get("max(id)");
        if(flag == 0)
            out.write("failed");
        else
            out.write(list.get(0).get("max(id)"));
        out.flush();
        out.close();
    }

    /**
     * 向前端传输数据（读取数据库的待办事项数据并发送到前端）
     *
     * @param request null
     * @param response 用于返回编码好的json数组
     * @throws ServletException 抛出Servlet异常
     * @throws IOException 抛出读写文件异常
     */
    protected void doPostFront(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Map<String,String>> list;
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String accountToken = (String) session.getAttribute("customerAccount");
        String sql = "select * from todolist where CustomerAccount='"+accountToken+"' ORDER BY Time";
        list = DB_Utils.ExecuteQuery(sql);
//        System.out.println(list.get(0).get("Title"));
//        System.out.println("编码："+encodeURIComponent("UTF-8","中文"));
//        System.out.println("编码："+decodeURI("UTF-8",str));
        for (Map<String,String> hp : list) {
            hp.put("Title",(String) encodeURIComponent("UTF-8",hp.get("Title")));
            hp.put("Content",(String) encodeURIComponent("UTF-8",hp.get("Content")));
        }
        String jsonString = JSON.toJSONString(list,true);
        out.write(jsonString);
        out.flush();
        out.close();
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String Id = request.getParameter("Id");
        String sql = "delete from todolist where Id=?";
        int result = DB_Utils.ExecuteUpdate(sql,Id);
        if(result == 0)
            System.out.println("删除异常");
        out.write("success");
        out.flush();
        out.close();
    }

    protected void doUpdate(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String isCrossOut = request.getParameter("isCrossOut");
        String id = request.getParameter("id");
        boolean isEnable = false;
        if(isCrossOut.equals("true"))
            isEnable = true;
        String sql = "update todolist set isCrossOut=? where Id=?";
        int result = DB_Utils.ExecuteUpdate(sql,isEnable,id);
        if(result == 0)
            System.out.println("异常");
        out.write("success");
    }
}
