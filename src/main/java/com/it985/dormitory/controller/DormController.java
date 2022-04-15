package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.DormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DormController {

    @Autowired
    DormService dormService;
    @Autowired
    DormBuildingService dormBuildingService;

    /**
     * 分页查询所有寝室信息
     *
     * @param current
     * @param dormBuildingName
     * @param searchContent
     * @return
     */
    @GetMapping("/allDormQuery")
    public Page<Dorm> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                String dormBuildingName,
                                String searchContent) {
        Page<Dorm> page = dormService.pageQuery(current, 10, dormBuildingName, searchContent);
        return page;
    }

    /**
     * 查找一个寝室所有信息
     *
     * @param did
     * @return
     */
    @GetMapping("/findOneDorm")
    public Dorm findOne(@RequestParam("did") int did) {
        return dormService.findByDid(did);
    }

    /**
     * 查询所有宿舍信息，用于小菜单展示名字
     *
     * @param dbName
     * @return
     */
    @GetMapping("/allD")
    public List<Dorm> allDorm(String dbName) {
        return dormService.findByDbname(dbName);
    }

    /**
     * 添加寝室
     *
     * @param dorm
     * @param dbname
     * @return
     */
    @PostMapping("/addDorm")
    public ResultInfo addDorm(Dorm dorm, @RequestParam("dbname") String dbname) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null) {
            Dorm d = dormService.findByDnameAndDbid(dorm.getDname(), db.getDbid());
            if (d != null) {
                resultInfo.setErrorMsg("该寝室已存在");
                resultInfo.setFlag(false);
            } else {
                dormService.addOne(dorm, db.getDbid());
                resultInfo.setFlag(true);
            }
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 更新寝室相关功能
     *
     * @param dorm
     * @param dbname
     * @return
     */
    @PostMapping("/updateDorm")
    public ResultInfo updateDorm(Dorm dorm, @RequestParam(value = "dbname") String dbname) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null) {
            Dorm d = dormService.findByDnameAndDbid(dorm.getDname(), db.getDbid());
            if (d != null) {
                dorm.setDbid(db.getDbid());
                dormService.updateById(dorm);
                resultInfo.setFlag(true);
            } else {
                resultInfo.setErrorMsg("该寝室号不存在");
                resultInfo.setFlag(false);
            }
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 删除一个寝室信息
     *
     * @param did
     * @return
     */
    @DeleteMapping("/deleteDorm")
    public ResultInfo deleteDorm(int did) {
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = dormService.deleteByDid(did);
        resultInfo.setFlag(flag);
        return resultInfo;
    }
}
