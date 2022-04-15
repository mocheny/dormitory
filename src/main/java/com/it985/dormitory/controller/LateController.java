package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.*;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.DormService;
import com.it985.dormitory.service.LateService;
import com.it985.dormitory.service.StudentService;
import javafx.scene.control.Alert;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.GregorianCalendar;

@Slf4j
@RestController
public class LateController {

    @Autowired
    StudentService studentService;
    @Autowired
    DormBuildingService dormBuildingService;
    @Autowired
    DormService dormService;
    @Autowired
    LateService lateService;

    /**
     * 分页查询所有与学生相关的信息
     *
     * @param current
     * @param dormBuildingName
     * @param searchContent
     * @return
     */
    @GetMapping("/allLatQuery")
    public Page<Late> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                String dormBuildingName,
                                String dormName,
                                String searchContent) {
        Page<Late> page = lateService.pageQuery(current, 10, dormBuildingName, dormName, searchContent);
        return page;
    }

    @PostMapping("/addLat")
    public ResultInfo addLate(Late late,
                              @RequestParam(value = "dbname") String dbname,
                              @RequestParam(value = "stuNumber") String stuNumber) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (stuNumber != null) {
            QueryWrapper<Late> lateQueryWrapper = new QueryWrapper<>();
            Student stu = lateService.findStu(stuNumber);
            late.setDorm(stu.getDorm());
            late.setGender(stu.getGender());
            late.setGrade(stu.getGrade());
            late.setTelephone(stu.getTelephone());
            late.setLname(stu.getSname());
            late.setDid(stu.getDid());

            Calendar calendar = new GregorianCalendar();
            calendar.setTime(late.getLateTime());
            calendar.add(calendar.DAY_OF_MONTH, 1);
            late.setLateTime(calendar.getTime());

            Dorm dorm = dormService.findByDid(stu.getDid());
            DormBuilding dormBuilding = dorm.getDormBuilding();

            late.setDbid(dormBuilding.getDbid());
            lateService.addOne(late);
            resultInfo.setFlag(true);

        }
        return resultInfo;
    }


    @DeleteMapping("/deleteLat")
    public ResultInfo deleteLate(int lid) {
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = lateService.deleteByLid(lid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }

    @PostMapping("/updateLate")
    public ResultInfo updateLate(Late late,
                                 @RequestParam(value = "stuNumber") String stuNumber) {
        ResultInfo resultInfo = new ResultInfo();
        if (stuNumber != null) {
            QueryWrapper<Late> lateQueryWrapper = new QueryWrapper<>();
            Student stu = lateService.findStu(stuNumber);
            late.setDorm(stu.getDorm());
            late.setGender(stu.getGender());
            late.setGrade(stu.getGrade());
            late.setTelephone(stu.getTelephone());
            late.setLname(stu.getSname());
            late.setDid(stu.getDid());

            Calendar calendar = new GregorianCalendar();
            calendar.setTime(late.getLateTime());
            calendar.add(calendar.DAY_OF_MONTH, 1);
            late.setLateTime(calendar.getTime());


            Dorm dorm = dormService.findByDid(stu.getDid());
            DormBuilding dormBuilding = dorm.getDormBuilding();

            late.setDbid(dormBuilding.getDbid());
            lateService.updateById(late);
            resultInfo.setFlag(true);

        }
        return resultInfo;
    }

    @GetMapping("/findOneLate")
    public Late findOne(@RequestParam("lid") int lid) {
        return lateService.findOne(lid);
    }

}
