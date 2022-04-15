package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.entity.Student;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.DormService;
import com.it985.dormitory.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentsController {

    @Autowired
    StudentService studentService;
    @Autowired
    DormBuildingService dormBuildingService;
    @Autowired
    DormService dormService;

    /**
     * 分页查询所有与学生相关的信息
     *
     * @param current
     * @param dormBuildingName
     * @param dormName
     * @param searchContent
     * @return
     */
    @GetMapping("/allStuQuery")
    public Page<Student> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                   String dormBuildingName,
                                   String dormName,
                                   String searchContent) {
        Page<Student> page = studentService.pageQuery(current, 10, dormBuildingName, dormName, searchContent);
        return page;
    }

    /**
     * 查找一个学生全部信息
     *
     * @param sid
     * @return
     */
    @GetMapping("/findOneStu")
    public Student findOne(@RequestParam("sid") int sid) {
        return studentService.findOne(sid);
    }

    /**
     * 添加学生
     *
     * @param dbname
     * @param dname
     * @param student
     * @return
     */
    @PostMapping("/addStu")
    public ResultInfo addStudent(Student student,
                                 @RequestParam(value = "dbname") String dbname,
                                 @RequestParam(value = "dname") String dname) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null) {
            Dorm dorm = dormService.findByDnameAndDbid(dname, db.getDbid());
            if (dorm != null) {
                if (dorm.getAccNumber() > dorm.getStudentNumber()){
                    QueryWrapper<Student> studentQueryWrapper = new QueryWrapper<>();
                    studentQueryWrapper.eq("stu_number", student.getStuNumber());
                    Student stu = studentService.getOne(studentQueryWrapper);
                    if (stu != null) {
                        resultInfo.setErrorMsg("该学号已被占用");
                        resultInfo.setFlag(false);
                    } else {
                        studentService.addOne(student, dorm.getDid());
                        resultInfo.setFlag(true);
                    }
                } else {
                    resultInfo.setErrorMsg("该寝室已住满");
                    resultInfo.setFlag(false);
                }
            } else {
                resultInfo.setErrorMsg("该寝室不存在");
                resultInfo.setFlag(false);
            }
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 更新学生相关信息
     *
     * @param student
     * @param dbname
     * @param dname
     * @return
     */
    @PostMapping("/updateStu")
    public ResultInfo updateStudent(Student student,
                                    @RequestParam(value = "dbname") String dbname,
                                    @RequestParam(value = "dname") String dname) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null) {
            Dorm dorm = dormService.findByDnameAndDbid(dname, db.getDbid());
            if (dorm != null) {
                if (dorm.getAccNumber() > dorm.getStudentNumber()){
                    student.setDid(dorm.getDid());
                    studentService.updateById(student);
                    resultInfo.setFlag(true);
                } else {
                    resultInfo.setErrorMsg("该寝室已住满");
                    resultInfo.setFlag(false);
                }
            } else {
                resultInfo.setErrorMsg("该寝室不存在");
                resultInfo.setFlag(false);
            }
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 删除一个学生信息
     *
     * @param sid
     * @return
     */
    @DeleteMapping("/deleteStu")
    public ResultInfo deleteStudent(int sid) {
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = studentService.deleteBySid(sid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }

}
