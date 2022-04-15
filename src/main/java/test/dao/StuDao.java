package test.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import test.domain.Manage;
import test.domain.Student;
import test.util.JDBCUtils;


import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StuDao {

    private String stuid;//学生登录时保存学号,这样会有缺陷，只能单个使用，不能多个界面使用不同的学生，需要改,用Cookie保存，不过比较麻烦，需要js等来接收，  有时间再改
    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //显示列表
    public List<Student> queryAll() throws Exception {
        String sql = "select * from stu";
        ResultSet rs = JDBCUtils.getMyDb().query(sql);
        List<Student> list = new ArrayList<Student>();
        while (rs.next()) {
            // 实例化Book对象
            Student book = new Student();
            // 对id属性赋值
            book.setId(rs.getString("id"));
            // 对name属性赋值
            book.setName(rs.getString("name"));

            list.add(book);
        }
        return list;
    }

    //显示详情
    public List<Student> queryOne(String i) throws Exception {
        String sql = "select * from stu where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql, i);
        List<Student> list = new ArrayList<Student>();
        while (rs.next()) {
            Student book = new Student();
            book.setId(rs.getString("id"));
            book.setName(rs.getString("name"));
            book.setSex(rs.getString("sex"));
            book.setDor(rs.getString("dor"));
            book.setCollege(rs.getString("college"));
            book.setPhone(rs.getString("phone"));
            book.setLate(rs.getInt("late"));
            book.setLou(rs.getString("lou"));
            list.add(book);
        }
        return list;
    }

    //修改时回显
    public Student queryOne2(String i) throws Exception {
        String sql = "select * from stu where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql, i);
        Student book = new Student();
        String d = "";
        while (rs.next()) {

            book.setId(rs.getString("id"));
            book.setName(rs.getString("name"));
            book.setSex(rs.getString("sex"));
            book.setDor(rs.getString("dor"));
            book.setCollege(rs.getString("college"));
            book.setPhone(rs.getString("phone"));

            book.setLou(rs.getString("lou"));

            d = rs.getString("dor");
        }

        //在原宿舍中删除该学生
        String sql3 = "update dormitory set \n" +
                "s4 = (case when s4 = ? then null else s4 end),\n" +
                "s3 = (case when s3 = ? then null else s3 end),\n" +
                "s2 = (case when s2 = ? then null else s2 end),\n" +
                "s1 = (case when s1 = ? then null else s1 end)\n" +
                "where id = ?";
        JDBCUtils.getMyDb().cud(sql3, i,i,i,i,d);

        //空位加一
        String sql4 = "update dormitory set num = num + 1 where id = ?";
        JDBCUtils.getMyDb().cud(sql4, d);


        return book;
    }

    //删除
    public void delete(String i) throws Exception {
        //获取宿舍id
        String sql2 = "select * from stu where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql2, i);
        Student book = new Student();
        String d = "";
        while (rs.next()) {
            d = rs.getString("dor");
        }

        //在原宿舍中删除该学生
        String sql3 = "update dormitory set \n" +
                "s4 = (case when s4 = ? then null else s4 end),\n" +
                "s3 = (case when s3 = ? then null else s3 end),\n" +
                "s2 = (case when s2 = ? then null else s2 end),\n" +
                "s1 = (case when s1 = ? then null else s1 end)\n" +
                "where id = ?";
        JDBCUtils.getMyDb().cud(sql3, i,i,i,i,d);

        //空位加一
        String sql4 = "update dormitory set num = num + 1 where id = ?";
        JDBCUtils.getMyDb().cud(sql4, d);

        //删除要放在后面
        String sql = "delete from stu where id = ?";
        JDBCUtils db = JDBCUtils.getMyDb();
        db.cud(sql, i);
    }

    //修改
    public void modify(Student student) throws Exception {
        String sql = "update stu set name = ?, sex = ?, college = ?, dor = ?, phone = ?, lou = ? where id = ?";
        JDBCUtils db = JDBCUtils.getMyDb();
        db.cud(sql, student.getName(), student.getSex(), student.getCollege(), student.getDor(), student.getPhone(),student.getLou(),student.getId());



        //新宿舍修改，在新宿舍中添加该学生
        String sql2 = "update dormitory set \n" +
                "s4 = (case when (s1 is not null and s2 is not null and s3 is not null and s4 is null) then ? else s4 end),\n" +
                "s3 = (case when (s1 is not null and s2 is not null and s3 is null) then ? else s3 end),\n" +
                "s2 = (case when (s1 is not null and s2 is null) then ? else s2 end),\n" +
                "s1 = (case when s1 is null then ? else s1 end)\n" +
                "where id = ?";
        db.cud(sql2, student.getId(),student.getId(),student.getId(),student.getId(),student.getDor());

        //空位减一
        String sql3 = "update dormitory set num = num - 1 where id = ?";
        db.cud(sql3, student.getDor());
    }

    //添加
    public void insert(Student student) throws Exception{
        JDBCUtils db = JDBCUtils.getMyDb();
            //添加学生
            String sql = "insert into stu(id,name,sex,college,dor,phone,lou,account,password,late) values (?,?,?,?,?,?,?,?,?,?)";

            String a = "123456";
            int b = 0;

            db.cud(sql, student.getId(), student.getName(), student.getSex(), student.getCollege(), student.getDor(), student.getPhone(), student.getLou(),student.getId(),a,b);


            //添加学生时在宿舍表中寻找第一个空位，插入学生
            String sql2 = "update dormitory set \n" +
                    "s4 = (case when (s1 is not null and s2 is not null and s3 is not null and s4 is null) then ? else s4 end),\n" +
                    "s3 = (case when (s1 is not null and s2 is not null and s3 is null) then ? else s3 end),\n" +
                    "s2 = (case when (s1 is not null and s2 is null) then ? else s2 end),\n" +
                    "s1 = (case when s1 is null then ? else s1 end)\n" +
                    "where id = ?";
            db.cud(sql2, student.getId(), student.getId(), student.getId(), student.getId(), student.getDor());

            //空位减一
            String sql3 = "update dormitory set num = num - 1 where id = ?";
            db.cud(sql3, student.getDor());
    }

    //判断是否已经有要添加的学生
    public int count(Student student) throws Exception {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql0 = "select count(*) from stu where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, student.getId());
        if (rs.next()) {
            c = rs.getInt(1);

        }
        return c;
    }

    //判断宿舍是否满员
    public int full(Student student) throws Exception
    {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql = "select num from dormitory where id = ?";
        ResultSet rs = db.query(sql, student.getDor());
        while (rs.next()) {
            c = rs.getInt("num");
        }
        return c;
    }

    //判断寝室男女  1--相符  2--不相符
    public int sex(Student student) throws Exception
    {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String p = "", q = "";
        String sql = "select sex from dormitory where id = ?";
        ResultSet rs = db.query(sql, student.getDor());
        while (rs.next()) {
            p = rs.getString("sex");
        }
       q = student.getSex();
        if (p.equals(q))
            c = 1;
        else
            c = 0;
        return c;
    }

    //判断有无该寝室  1--有  2--无
    public int exist(Student student) throws Exception
    {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        String sql0 = "select count(*) from dormitory where id = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, student.getDor());
        if (rs.next()) {
            c = rs.getInt(1);
        }
        return c;
    }


    //查找是否已存在，密码是否正确
    public int count2(Student student) throws Exception {
        JDBCUtils db = JDBCUtils.getMyDb();
        int c = 0;
        stuid = student.getAccount();
        String sql0 = "select count(*) from stu where account = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql0, student.getAccount());
        if (rs.next()) {
            c = rs.getInt(1);
        }

        //密码是否正确
        String sql1 = "select * from stu where account = ?";
        ResultSet rs2 = JDBCUtils.getMyDb().query(sql1, student.getAccount());
        if (rs2.next()){

            String pa = rs2.getString("password");
            if (!pa.equals(student.getPassword()))
                c = -2;
        }
        return c;
    }

    //显示列表
    public List<Student> queryStu(String account) throws Exception {
        String sql = "select * from  stu where account = ?";
        ResultSet rs = JDBCUtils.getMyDb().query(sql, account);
        List<Student> list = new ArrayList<Student>();
        while (rs.next()) {
            Student book = new Student();
            book.setId(rs.getString("id"));
            book.setName(rs.getString("name"));
            book.setSex(rs.getString("sex"));
            book.setDor(rs.getString("dor"));
            book.setCollege(rs.getString("college"));
            book.setPhone(rs.getString("phone"));
            book.setLate(rs.getInt("late"));
            book.setLou(rs.getString("lou"));
            list.add(book);
        }
        return list;
    }

}

