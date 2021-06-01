package main.java.utils;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DB_Utils {

	private static final String url = "jdbc:mysql://localhost:3306/service?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC";
	private static final String driver = "com.mysql.cj.jdbc.Driver";
	private static final String userName = "root";
	private static final String password = "724462";
    private static final int ERROR = 65535;

	static {
		try {
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
            System.out.println("ERROR：驱动初始化失败");
		}
	}

	public DB_Utils() {
	}

	/**
	 * 创建数据库连接
	 * 
	 * @return con 连接成功的数据库连接
	 */
	public static Connection getConnection() {
		Connection con = null;
		try {
			con = DriverManager.getConnection(url, userName, password);
		} catch (SQLException e) {
			e.printStackTrace();
            System.out.println("exception：数据库连接失败，请检查账号密码或者其他配置");
		}
		System.out.println("数据库引用值："+con);
		return con;
	}

	/**
	 * 关闭数据的相关连接
	 * 
	 * @param con   数据库练级
	 * @param pstmt 数据库声明
	 * @param rs    数据集
	 *
	 */
	public static void close(Connection con, Statement pstmt, ResultSet rs) {
		try {
			if (rs != null) {
				rs.close();
				rs = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
            System.out.println("exception：结果集关闭异常");
		} finally {
			try {
				if (pstmt != null) {
					pstmt.close();
					pstmt = null;
				}
			} catch (SQLException e) {
				e.printStackTrace();
                System.out.println("exception：statement对象关闭异常");
			} finally {
				try {
					if (con != null) {
						con.close();
						con = null;
					}
				} catch (SQLException e) {
					e.printStackTrace();
                    System.out.println("exception：连接对象关闭异常");
				}
			}
		}
	}

	/**
	 * 数据库增加、删除、修改操作的封装方法
     *
	 * @param sql sql增删改语句
	 * @param s  sql语句中对应的参数（参数个数不定）
	 * @return
	 */
	public static int ExecuteUpdate(String sql, Object ...s){
		int result=0;
		Connection connection=null;
		PreparedStatement preparedStatement=null;
        if ((connection = getConnection()) == null)
            return ERROR;

		try {
			preparedStatement = connection.prepareStatement(sql);
			for (int i = 0; i < s.length; i++) {
				preparedStatement.setObject(i+1,s[i]);
			}
			result = preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
            System.out.println("exception：SQL语句有误");
		}finally {
			close(connection, preparedStatement, null);
		}
		return result;
	}

    /**
     * 数据库查询操作封装方法
     *
     * @param sql sql查询语句
     * @return 查询出的结果ArrayList
     */
    public static List<Map<String, String>> ExcuteQuery(String sql){
        List<Map<String, String>> entityList = new ArrayList<>(); //存储结果
        Map<String, String> mapList = null;   //存储查询到的单条数据
        Connection connection = null;    //数据库连接
        PreparedStatement preparedStatement = null; //
        ResultSet resultSet = null; //结果集
        ResultSetMetaData resultSetMetaData = null;  //
        String[] ColNames = null; //列名，自动获取
        if ((connection = getConnection()) == null)
            return entityList;

        try {
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            resultSetMetaData = resultSet.getMetaData();
            ColNames = new String[resultSetMetaData.getColumnCount()];
            for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
                ColNames[i] = resultSetMetaData.getColumnName(i + 1);
            }
        }catch (SQLException e){
            System.out.println("Exception：SQL语句有误");
        }

        try {
            while (resultSet.next()){
                mapList = new HashMap<>();
                for (Object col : ColNames)
                    mapList.put((String) col,resultSet.getString((String) col));
                entityList.add(mapList);
            }
            System.out.println("test");
//            resultSet.getObject(ColNames[0]);
        }catch (SQLException e){

        }
        return entityList;
    }


	public static void main(String[] args) {
		String sql = "update customer set customerPassword=? where customerId=?";
		ExecuteUpdate(sql,"010501",1);
		ExcuteQuery("select * from customer");
	}
}






//    public static void ExcuteQuery(String sql){
//        Connection connection = null;
//        PreparedStatement preparedStatement = null;
//        String[] ColNames;
//        connection = getConnection();
//        try {
//            preparedStatement = connection.prepareStatement(sql);
//            ResultSet resultSet = preparedStatement.executeQuery();
//            ResultSetMetaData resultSetMetaData = resultSet.getMetaData();
//            ColNames = new String[resultSetMetaData.getColumnCount()];
//            for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
//                ColNames[i] = resultSetMetaData.getColumnName(i + 1);
//            }
//            while (resultSet.next())
//                resultSet.getObject(ColNames[0]);
//        }catch (Exception e){}
////	for (int i = 0; i < resultSetMetaData.getColumnCount(); i++) {
////		resultSet.getObject(ColNames[i]);
////	}
//    }
