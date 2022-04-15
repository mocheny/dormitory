package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Repair;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

@RestController
public class RepairController {

    @Autowired
    RepairService repairService;
    @Autowired
    DormBuildingService dormBuildingService;

    /**
     * 分页查询所有报修信息
     * @param current
     * @param dormBuildingName
     * @param searchContent
     * @return
     */
    @GetMapping("/allRepQuery")
    public Page<Repair> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                  String dormBuildingName,
                                  String searchContent){
        Page<Repair> page = repairService.pageQuery(current, 10, dormBuildingName, searchContent);
        return page;
    }

    /**
     * 查询一个报修信息
     * @param rid
     * @return
     */
    @GetMapping("/findOneRep")
    public Repair findOne(@RequestParam("rid") int rid){
        return repairService.findByRid(rid);
    }

    /**
     * 添加报修
     * @param repair
     * @param dbname
     * @return
     */
    @PostMapping("/addRep")
    public ResultInfo addRepair(Repair repair, @RequestParam("dbname") String dbname){
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null){
            repairService.addOne(repair, db.getDbid());
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 更新报修相关信息
     * @param repair
     * @param dbname
     * @return
     */
    @PostMapping("/updateRep")
    public ResultInfo updateRepair(Repair repair, @RequestParam("dbname") String dbname){
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null){
            repair.setDbid(db.getDbid());
            repairService.updateById(repair);
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 删除一个报修信息
     * @param rid
     * @return
     */
    @DeleteMapping("/deleteRep")
    public ResultInfo deleteRepair(int rid){
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = repairService.removeById(rid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }

}
