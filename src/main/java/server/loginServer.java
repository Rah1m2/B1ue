package main.java.server;

import main.java.utils.DB_Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/loginServer")
public class loginServer extends HttpServlet {
    private String path = "/RegisterDemo.html";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        List<Map<String, String>> result;
        Map<String, String> tempMap = new HashMap<String, String>();
//        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String passWord = request.getParameter("passWord");
        String sql = "select * from customer where customerEmail='"+email+"' and "+"customerPassWord='"+passWord+"'";
        System.out.println("email:"+email);
        System.out.println("passWord:"+passWord);
        result = DB_Utils.ExcuteQuery(sql);

        for(Map<String,String> l:result){
            System.out.println(l.get("customerId"));
        }



        if(DB_Utils.ExcuteQuery(sql).isEmpty()){
            response.getWriter().write("WrongCode");
            System.out.println("Please check your account or password.");
        }
        else
            response.getWriter().write("Welcome");
//        request.getRequestDispatcher(path).forward(request, response);
    }

}
