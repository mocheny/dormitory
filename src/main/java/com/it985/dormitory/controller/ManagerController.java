package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Manager;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ManagerController {

    @Autowired
    ManagerService managerService;
    @Autowired
    DormBuildingService dormBuildingService;

    /**
     * 分页查询所有宿管信息
     *
     * @param current
     * @param dormBuildingName
     * @param searchContent
     * @return
     */
    @GetMapping("/allDManQuery")
    public Page<Manager> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                   String dormBuildingName,
                                   String searchContent) {
        Page<Manager> page = managerService.pageQuery(current, 10, dormBuildingName, searchContent);
        return page;
    }

    /**
     * 查找一个宿管所有信息
     *
     * @param mid
     * @return
     */
    @GetMapping("/findOneDMan")
    public Manager findOne(@RequestParam("mid") int mid) {
        return managerService.findByMid(mid);
    }

    /**
     * 添加宿管
     *
     * @param manager
     * @param dbname
     * @return
     */
    @PostMapping("/addDMan")
    public ResultInfo addManager(Manager manager, @RequestParam("dbname") String dbname) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null) {
            Manager man = managerService.findByUsername(manager.getUsername());
            if (man != null) {
                resultInfo.setErrorMsg("该用户名已存在");
                resultInfo.setFlag(false);
            } else {
                managerService.addOne(manager, db.getDbid());
                resultInfo.setFlag(true);
            }
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 更新宿管相关信息
     * @param manager
     * @param dbname
     * @return
     */
    @PostMapping("/updateDMan")
    public ResultInfo updateManager(Manager manager, @RequestParam("dbname") String dbname){
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null){
            manager.setDbid(db.getDbid());
            managerService.updateById(manager);
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 删除一个宿管信息
     * @param mid
     * @return
     */
    @DeleteMapping("/deleteDMan")
    public ResultInfo deleteManager(int mid){
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = managerService.removeById(mid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }

}
