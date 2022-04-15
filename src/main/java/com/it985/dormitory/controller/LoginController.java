package com.it985.dormitory.controller;

import com.it985.dormitory.entity.Manager;
import com.it985.dormitory.entity.SuperAdmin;
import com.it985.dormitory.service.ManagerService;
import com.it985.dormitory.service.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @Autowired
    SuperAdminService superAdminService;
    @Autowired
    ManagerService managerService;

    /**
     * 前往登录页
     *
     * @return
     */
    @GetMapping({"/", "/login"})
    public String loginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String main(@RequestParam("username") String username,
                       @RequestParam("password") String password,
                       HttpSession session,
                       Model model) {
        SuperAdmin sa = superAdminService.login(username, password);
        if (sa != null) {
            session.setAttribute("superadmin", sa);
            //登录成功，重定向到smain.html，防止表单重复提交
            return "redirect:/smain.html";
        } else {
            Manager manager = managerService.login(username, password);
            if (manager != null) {
                session.setAttribute("manager", manager);
                //登录成功，重定向到omain.html，防止表单重复提交
                return "redirect:/omain.html";
            } else {
                model.addAttribute("msg", "账号密码错误");
                return "login";
            }
        }
    }

    /**
     * 防止表单重复提交，真正进入smain页面
     *
     * @return
     */
    @GetMapping("/smain.html")
    public String smainPage(HttpSession session, Model model) {
        Object superadmin = session.getAttribute("superadmin");
        if (superadmin != null) {
            return "smain";
        } else {
            model.addAttribute("msg", "未登录，请先登录");
            return "login";
        }
    }

    /**
     * 防止表单重复提交，真正进入omain页面
     *
     * @return
     */
    @GetMapping("/omain.html")
    public String omainPage(HttpSession session, Model model) {
        Object manager = session.getAttribute("manager");
        if (manager != null) {
            return "omain";
        } else {
            model.addAttribute("msg", "未登录，请先登录");
            return "login";
        }
    }

    @GetMapping("/exit")
    public String exit(HttpSession session){
        session.invalidate();
        return "login";
    }

}
