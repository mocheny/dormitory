package test.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import test.domain.Manage;
import test.domain.Student;
import test.util.JDBCUtils;

import java.sql.ResultSet;

@Repository
public class ManageDao {

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //添加
    public void insert(Manage manage) throws Exception{
        JDBCUtils db = JDBCUtils.getMyDb();
        //添加学生
        String sql = "insert into manage values (?,?)";

        db.cud(sql, manage.getId(), manage.getPassword());

    }


    //查找是否已存在
    public int count(Manage manage) throws Exception {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql0 = "select count(*) from manage where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, manage.getId());
        if (rs.next()) {
            c = rs.getInt(1);
        }

        //密码是否正确
        String sql1 = "select * from manage where id = ?";
        ResultSet rs2 = JDBCUtils.getMyDb().query(sql1, manage.getId());
        if (rs2.next()){

            String pa = rs2.getString("password");
            if (!pa.equals(manage.getPassword()))
                c = -2;

        }
        return c;
    }
}
