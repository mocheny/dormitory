package test.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import test.domain.Manage;
import test.domain.Student;
import test.domain.Super;
import test.util.JDBCUtils;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SuperDao {


    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    //查找是否已存在，密码是否正确
    public int count(Super s) throws Exception {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql0 = "select count(*) from super where account = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, s.getAccount());
        if (rs.next()) {
            c = rs.getInt(1);
        }

        //密码是否正确
        String sql1 = "select * from super where account = ?";
        ResultSet rs2 = JDBCUtils.getMyDb().query(sql1, s.getAccount());
        if (rs2.next()){

            String pa = rs2.getString("password");
            if (!pa.equals(s.getPassword()))
                c = -2;

        }
        return c;
    }

    //显示列表
    public List<Manage> queryAll() throws Exception {
        String sql = "select * from manage";
        ResultSet rs = JDBCUtils.getMyDb().query(sql);
        List<Manage> list = new ArrayList<Manage>();
        while (rs.next()) {
            // 实例化Book对象
            Manage book = new Manage();
            // 对id属性赋值
            book.setId(rs.getString("id"));
            // 对name属性赋值
            book.setPassword(rs.getString("password"));

            list.add(book);
        }
        return list;
    }

    //添加
    public void insert(Manage manage) throws Exception{
        JDBCUtils db = JDBCUtils.getMyDb();
        //添加学生
        String sql = "insert into manage(id,password) values (?,?)";


        db.cud(sql, manage.getId(), manage.getPassword());



    }

    //判断是否已经有要添加的管理员
    public int count2(Manage manage) throws Exception {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql0 = "select count(*) from manage where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, manage.getId());
        if (rs.next()) {
            c = rs.getInt(1);

        }
        return c;
    }

    //删除
    public void delete(String i) throws Exception {


        //删除要放在后面
        String sql = "delete from manage where id = ?";
        JDBCUtils db = JDBCUtils.getMyDb();
        db.cud(sql, i);
    }

}
