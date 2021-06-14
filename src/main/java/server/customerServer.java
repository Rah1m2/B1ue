package main.java.server;

import javax.mail.MessagingException;
import javax.servlet.http.*;

import main.java.utils.DB_Utils;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/customerServer")
public class customerServer extends HttpServlet {
//    private String path = "/RegisterDemo.html";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//        Map<String, String> tempMap = new HashMap<>();
        String action = request.getParameter("action");
        System.out.println(action);
        switch (action) {
            case "verification" : doVerification(request, response);
            break;
            case "register" : doRegister(request, response);
            break;
            case "login" : doLogin(request, response);
            break;
        }
    }

    /**
     * 检验注册的邮箱是否唯一
     *
     * @param request 用于获取请求数据
     * @param response 发送状态码及响应正文
     * @throws IOException 处理 getWriter() 抛出的异常
     */
    private void doVerification(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Map<String, String>> result;
        String customerAccount = request.getParameter("account");
        String sql = "select * from customer where customerAccount='" + customerAccount + "'";
        System.out.println("account:" + customerAccount);
        result = DB_Utils.ExecuteQuery(sql);
        PrintWriter pw = response.getWriter();
        if (result.isEmpty()) {   //邮箱没有被注册
            System.out.println("邮箱没有被注册");
            pw.write("success");
        } else {
            System.out.println("邮箱已存在");
            pw.write("failure");
        }
        pw.flush();   //强行刷新缓冲区，立即将数据发送到客户端
    }

    /**
     * 进行注册有关的数据库操作
     *
     * @param request 用于获取前端传来的参数
     * @param response 用于向前端返回结果
     * @throws IOException 处理 getWriter() 抛出的异常
     */
    private void doRegister(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        request.setCharacterEncoding("UTF-8");
        String customerName = request.getParameter("name");
        String customerAccount = request.getParameter("account");
        customerName = java.net.URLDecoder.decode(customerName,"UTF-8");
//        customerEmail = java.net.URLDecoder.decode(customerEmail,"UTF-8");
        String customerPassword = request.getParameter("password");
//        Customer customer = new Customer(0, customerName, customerEmail, customerPassword);
        String sql = "insert into customer VALUE(?,?,?,?)";
        System.out.println(sql);
        int result = DB_Utils.ExecuteUpdate(sql, null,customerName,customerAccount,customerPassword);
        PrintWriter pw = response.getWriter();
        if (result > 0) {
            System.out.println("注册成功");
            pw.write("success");
        } else {
            System.out.println("注册失败");
            pw.write("failure");
        }
        pw.flush();
    }

    /**
     * 进行登陆验证有关的数据库操作
     *
     * @param request 获取前端传来的参数（账号、密码）
     * @param response 用于向前端返回结果
     * @throws IOException 处理 getWriter() 抛出的异常
     */
    private void doLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        boolean flag = false;
        List<Map<String, String>> result;
        Map<String, String> tempMap = new HashMap<String, String>();
        String customerAccount = request.getParameter("account");
        String passWord = request.getParameter("passWord");
        String sql = "select * from customer where customerAccount='"+customerAccount+"'";
        System.out.println("sql"+sql);
        result = DB_Utils.ExecuteQuery(sql);
        PrintWriter pw = response.getWriter();
        HttpSession session = request.getSession();
        String sessionId = session.getId();
//        Cookie cookie = new Cookie("JSESSIONID",sessionId);
//        cookie.setPath(request.getContextPath());
//        cookie.setMaxAge(60*30);

        for(Map<String,String> l:result){
//            System.out.println(l.get("customerId"));
            if(l.get("customerPassword").equals(passWord))
                flag = true;
        }

        if(result.isEmpty()){
            response.getWriter().write("Incorrect:Ac");
            System.out.println("Please check your account.");
        }
        else if(!flag){
            pw.write("Incorrect:Pw");
        }
        else{
            session.setAttribute("customerAccount", customerAccount);
            System.out.println("getting test:"+session.getAttribute("customerAccount"));
//            response.addCookie(cookie);
            pw.write("success");
        }

        pw.flush();
    }
}
