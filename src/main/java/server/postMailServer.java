package main.java.server;

import main.java.utils.DB_Utils;
import main.java.utils.Mail_Utils;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.security.GeneralSecurityException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@WebServlet("/postMailServer")
public class postMailServer extends HttpServlet {
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
            case "send" : doSendEmail(request, response);
                break;
            case "verification" : doVerifyKey(request, response);
                break;
            case "sendKey" : doSendKey(request, response);
                break;
        }

    }

    protected void doSendEmail(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Map<String, String>> Customerlist;
        String action = request.getParameter("action");
        String sql = "select * from todolist where isSendEmail=false";
        String update = "update todolist set isSendEmail=? where Id=?";
        Customerlist = DB_Utils.ExecuteQuery(sql);

        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, +1);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String dateStr = df.format(calendar.getTime());
        dateStr = dateStr.substring(0,10);

        for(Map<String,String> l : Customerlist){
            if(l.get("Time").substring(0,10).equals(dateStr)) {
                try {
                    Mail_Utils.sendEmail(l.get("CustomerAccount"),"Come with me if u wanna live.I'm T-800 model 101.");
                    DB_Utils.ExecuteUpdate(update,true,l.get("Id"));
                } catch (GeneralSecurityException | MessagingException e) {
                    e.printStackTrace();
                }
            }
        }
        response.sendRedirect("./signIn.html");
    }

    protected void doSendKey(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        String sessionId = session.getId();
        String Address = request.getParameter("Address");
        int randomKey = (int)((Math.random()*9+1)*1000);
        try {
            Mail_Utils.sendEmail(Address,"Your retrievable code is:" + randomKey);
        } catch (GeneralSecurityException | MessagingException e) {
            e.printStackTrace();
            out.write("failed");
        }
        session.setAttribute("Key", randomKey);
        System.out.println("getting test:"+session.getAttribute("Key"));
//        System.out.println("getting test:"+session.getAttribute(""));
        out.write("success");
        out.flush();
        out.close();
    }

    protected void doVerifyKey(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String inputKey = request.getParameter("key");
        HttpSession session = request.getSession();
        System.out.println("getting:"+session.getAttribute("Key"));
        String key = session.getAttribute("Key").toString();
        if(inputKey.equals(key)) {
            out.write("failure");
            System.out.println("shenmejbsbcw");
        }
        else {
            out.write("success");
        }
        out.flush();
        out.close();
    }
}