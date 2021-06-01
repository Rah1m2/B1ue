package main.java.server;

import main.java.utils.DB_Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/customerServers")
public class customerServer extends HttpServlet {
    private String path = "/RegisterDemo.html";
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doPost(request, response);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String op = request.getParameter("op");
        if(op.equals("register")) {
            this.doRegister(request, response);
        }

        request.getRequestDispatcher(path).forward(request, response);

    }

    private void doRegister(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String customerName = request.getParameter("customerName");
        String customerEmail = request.getParameter("customerEmail");
        String customerGender = request.getParameter("customerCender");
        String customerPassword = request.getParameter("customerPassword");
        String customerPhone = request.getParameter("customerPhone");
        String customerAddress = request.getParameter("customerAddress");
        String customerDescribe = request.getParameter("customerDescribe");
        System.out.println("customerName: "+customerName);
        System.out.println("customerEmail: "+customerEmail);
        String sql = "insert into customer values(?,?,?,?,?,?,?,?) ";
        DB_Utils.ExecuteUpdate(sql,2,customerName,customerEmail,customerPassword,customerGender,customerAddress,customerPhone,customerDescribe);
        System.out.println(sql);
    }


}
