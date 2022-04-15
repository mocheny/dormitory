package test.controller;

import javafx.scene.web.WebEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import test.dao.DorDao;
import test.dao.ManageDao;
import test.dao.StuDao;
import test.dao.SuperDao;
import test.domain.Dormitory;
import test.domain.Manage;
import test.domain.Student;
import test.domain.Super;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Controller
public class HelloController {
    @Autowired
    private StuDao stuDao;

    @Autowired
    private DorDao dorDao;

    @Autowired
    private ManageDao manageDao;


    @Autowired
    private SuperDao superDao;

    //首页
    @RequestMapping(value = "/", produces = "test/html;charset=UTF-8")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "/function", produces = "test/html;charset=UTF-8")
    public String function(){
        return "function";
    }

    @RequestMapping(value = "/helloworld", produces = "test/html;charset=UTF-8")
    public String functiosn(){
        return "helloworld";
    }

    @RequestMapping(value = "/stufunction",  produces = "test/html;charset=UTF-8")
    public String stufunction(){
        return "stuFunction";
    }

    @RequestMapping(value = "/superfunction",  produces = "test/html;charset=UTF-8")
    public String superfunction(){
        return "superFunction";
    }



    //学生管理界面，全部学生
    @RequestMapping(value = "/allStu", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String allStu(Model model) throws Exception {
        Collection<Student> employeeList = stuDao.queryAll();
        model.addAttribute("employeeList", employeeList);


        return "AllStu";
    }

    //宿舍管理界面，全部宿舍
    @RequestMapping(value = "/allDor", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String allDor(Model model) throws Exception
    {
        Collection<Dormitory> employeeList = dorDao.queryAll();
        model.addAttribute("employeeList", employeeList);
        return "AllDor";
    }

    //管理员管理界面,全部管理员
    @RequestMapping(value = "/allmana", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String allMana(Model model) throws Exception {
        Collection<Manage> employeeList = superDao.queryAll();
        model.addAttribute("employeeList", employeeList);


        return "super";
    }

    //学生详情
    @RequestMapping(value = "/stu/{id}", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String stu(@PathVariable("id") String id, Model model) throws Exception {
        Collection<Student> em = stuDao.queryOne(id);
        model.addAttribute("em",em);
        return "Stu";
    }

    //学生详情
    @RequestMapping(value = "/stustu", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String stustu(Model model,HttpServletRequest request) throws Exception {

        Object a = request.getSession().getAttribute("account");

        String account =  String.valueOf(a);

        Collection<Student> em = stuDao.queryStu(account);
        model.addAttribute("em",em);
        return "stuStu";
    }

    //宿舍详情
    @RequestMapping(value = "/dor/{id}", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String dor(@PathVariable("id") Integer id, Model model) throws Exception {
        Collection<Dormitory> em = dorDao.queryOne(id);
        model.addAttribute("em",em);
        return "Dor";
    }

    //删除学生
    @RequestMapping(value = "/allStu/{id}", method = RequestMethod.DELETE, produces = "test/html;charset=UTF-8")
    public String delStu(@PathVariable("id") String id) throws Exception {
        stuDao.delete(id);
        return "redirect:/allStu";
    }

    //删除管理员
    @RequestMapping(value = "/allmana/{id}", method = RequestMethod.DELETE, produces = "test/html;charset=UTF-8")
    public String delMana(@PathVariable("id") String id) throws Exception {
        superDao.delete(id);
        return "redirect:/allmana";
    }

    //修改学生时回显页面
    @RequestMapping(value = "/modStu/{id}", method = RequestMethod.GET, produces = "test/html;charset=UTF-8")
    public String modStu1(@PathVariable("id") String id, Model model) throws Exception {
        Student employee = stuDao.queryOne2(id);
        model.addAttribute("employee",employee);
        return "ModStu";
    }

    //修改学生
    @RequestMapping(value = "/modStu", method = RequestMethod.PUT, produces = "test/html;charset=UTF-8")
    public void modStu2(Student student, HttpServletResponse response) throws Exception {

     //   return "redirect:/allStu";



        int c = stuDao.full(student);
        int d = stuDao.sex(student);
        int e = stuDao.exist(student);

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //先判断有无该学生，然后有无该寝室，然后寝室满员，最后性别

        //返回路径不对，需要修改  ????
            if (e == 0)
            {
                out.print("<script type  = 'text/javascript'>alert('没有该寝室，请重新修改'); location.href='allStu'</script>");


            }
            else {
                if (c == 0)
                    out.print("<script type  = 'text/javascript'>alert('该寝室已满员，请重新修改'); location.href='allStu'</script>");


                else {
                    if (d == 0)
                        out.print("<script type  = 'text/javascript'>alert('与所添加寝室的性别不相符，请重新修改'); location.href='allStu'</script>");

                    else {
                        stuDao.modify(student);
                        out.print("<script type  = 'text/javascript'>alert('修改成功');  location.href = 'allStu'</script>");
                    }
                }
            }

        out.flush();
        out.close();
    }

    /*
    //修改宿舍时回显
    @RequestMapping(value = "/modDor/{id}", method = RequestMethod.GET)
    public String modDor1(@PathVariable("id") Integer id, Model model) throws Exception {
        Dormitory employee = dorDao.queryOne2(id);
        model.addAttribute("employee",employee);
        return "ModDor";
    }

    //修改宿舍
    @RequestMapping(value = "/modDor", method = RequestMethod.PUT)
    public String modDor2(Dormitory dormitory) throws Exception {
        dorDao.modify(dormitory);
        return "redirect:/allDor";
    }


     */

    //添加学生转换界面
    @RequestMapping(value = "/addStu", produces = "test/html;charset=UTF-8")
    public String addStu(){
        return "AddStu";
    }

    //添加学生操作
    @RequestMapping(value = "/addStu2", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void addStu2(Student student, HttpServletResponse response) throws Exception {
   //     stuDao.insert(student);
        int b = stuDao.count(student);
        int c = stuDao.full(student);
        int d = stuDao.sex(student);
        int e = stuDao.exist(student);

       response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //先判断有无该学生，然后有无该寝室，然后寝室满员，最后性别
        if (b == 0) {//学生
            if (e == 0)
            {
                out.print("<script type  = 'text/javascript'>alert('没有该寝室，请重新添加'); location.href='addStu'</script>");


            }
            else {
                if (c == 0)
                    out.print("<script type  = 'text/javascript'>alert('该寝室已满员，请重新添加'); location.href='addStu'</script>");


                else {
                    if (d == 0)
                        out.print("<script type  = 'text/javascript'>alert('与所添加寝室的性别不相符，请重新添加'); location.href='addStu'</script>");

                    else {
                        stuDao.insert(student);
                        out.print("<script type  = 'text/javascript'>alert('添加新学生成功');  location.href = 'allStu'</script>");
                    }
                }
            }
        } else
        {
            out.print("<script type  = 'text/javascript'>alert('已有该学生，请重新添加'); location.href='addStu'</script>");
        }
        out.flush();
        out.close();
    }

    //添加管理员转换界面
    @RequestMapping(value = "/addMana", produces = "test/html;charset=UTF-8")
    public String addMana(){
        return "superAdd";
    }

    //添加管理员操作
    @RequestMapping(value = "/addMana2", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void addMana2(Manage manage, HttpServletResponse response) throws Exception {
        //     stuDao.insert(student);
        int b = superDao.count2(manage);

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        //先判断有无该学生，然后有无该寝室，然后寝室满员，最后性别
        if (b == 0) {//学生


            superDao.insert(manage);
            out.print("<script type  = 'text/javascript'>alert('添加新管理员成功');  location.href = 'allmana'</script>");

        } else
        {
            out.print("<script type  = 'text/javascript'>alert('已有该管理员，请重新添加'); location.href='addMana'</script>");
        }
        out.flush();
        out.close();
    }



    //管理员登录转换界面
    @RequestMapping(value = "/login2", produces = "test/html;charset=UTF-8")
    public String login2(){
        return "newlogin";
    }

    //管理员登录
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void login(Manage manage, HttpServletResponse response) throws Exception {
        //     stuDao.insert(student);
        int b = manageDao.count(manage);


        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //判断有无该用户
        if (b == 0) {
           // out.print("<script type  = 'text/javascript'>alert('没有该用户，请前往注册'); location.href='regis2'</script>");

            out.print("<script type  = 'text/javascript'>alert('没有该管理员'); location.href='login2'</script>");
        }
        else if (b == -2)
        {
            out.print("<script type  = 'text/javascript'>alert('密码错误');location.href='login2'</script>");
        }
        else
        {
            out.print("<script type  = 'text/javascript'>alert('成功登录'); location.href='function'</script>");
        }
        out.flush();
        out.close();
    }


    //学生登录转换界面
    @RequestMapping(value = "/stulogin2", produces = "test/html;charset=UTF-8")
    public String stulogin2(){
        return "stuLogin";
    }

    //学生登录
    @RequestMapping(value = "/stulogin", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void stulogin(Student student, HttpServletResponse response,HttpServletRequest request) throws Exception {
        //     stuDao.insert(student);
        int b = stuDao.count2(student);

        request.getSession().setAttribute("account", student.getAccount());

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //判断有无该用户
        if (b == 0) {
            // out.print("<script type  = 'text/javascript'>alert('没有该用户，请前往注册'); location.href='regis2'</script>");

            out.print("<script type  = 'text/javascript'>alert('没有该学生'); location.href='stulogin2'</script>");
        }
        else if (b == -2)
        {
            out.print("<script type  = 'text/javascript'>alert('密码错误');location.href='stulogin2'</script>");
        }
        else
        {
            out.print("<script type  = 'text/javascript'>alert('成功登录'); location.href='stufunction'</script>");
        }
        out.flush();
        out.close();
    }



    //超管登录转换界面
    @RequestMapping(value = "/superlogin2", produces = "test/html;charset=UTF-8")
    public String superlogin2(){
        return "superLogin";
    }

    //超管登录
    @RequestMapping(value = "/superlogin", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void superlogin(Super s, HttpServletResponse response, HttpServletRequest request) throws Exception {
        //     stuDao.insert(student);
        int b = superDao.count(s);



        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //判断有无该用户
        if (b == 0) {
            // out.print("<script type  = 'text/javascript'>alert('没有该用户，请前往注册'); location.href='regis2'</script>");

            out.print("<script type  = 'text/javascript'>alert('没有该超管'); location.href='superlogin2'</script>");
        }
        else if (b == -2)
        {
            out.print("<script type  = 'text/javascript'>alert('密码错误');location.href='superlogin2'</script>");
        }
        else
        {
            out.print("<script type  = 'text/javascript'>alert('成功登录'); location.href='superfunction'</script>");
        }
        out.flush();
        out.close();
    }


    //注册转换界面
    @RequestMapping(value = "/regis2", produces = "test/html;charset=UTF-8")
    public String regis2(){
        return "regis";
    }

    //注册，添加管理员
    @RequestMapping(value = "/regis", method = RequestMethod.POST, produces = "test/html;charset=UTF-8")
    public void regis(Manage manage, HttpServletResponse response) throws Exception {
        //     stuDao.insert(student);
        int b = manageDao.count(manage);


        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //判断有无该用户
        if (b != 0) {
            out.print("<script type  = 'text/javascript'>alert('已存在该用户，请勿重复注册'); location.href='regis2'</script>");
        }
        else
        {
            manageDao.insert(manage);
            out.print("<script type  = 'text/javascript'>alert('注册成功'); location.href='login2'</script>");
        }
        out.flush();
        out.close();
    }

}
