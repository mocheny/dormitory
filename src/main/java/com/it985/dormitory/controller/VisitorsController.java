package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.entity.Visitors;
import com.it985.dormitory.service.DormBuildingService;
import com.it985.dormitory.service.VisitorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class VisitorsController {

    @Autowired
    VisitorsService visitorsService;
    @Autowired
    DormBuildingService dormBuildingService;

    /**
     * 分页查询所有访客信息
     * @param current
     * @param dormBuildingName
     * @param searchContent
     * @return
     */
    @GetMapping("/allVisQuery")
    public Page<Visitors> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                    String dormBuildingName,
                                    String searchContent){
        Page<Visitors> page = visitorsService.pageQuery(current, 10, dormBuildingName, searchContent);
        return page;
    }

    /**
     * 查找一个访客所有信息
     * @param vid
     * @return
     */
    @GetMapping("/findOneVis")
    public Visitors findOne(@RequestParam("vid") int vid){
        return visitorsService.findByVid(vid);
    }

    /**
     * 添加访客
     * @param visitors
     * @param dbname
     * @return
     */
    @PostMapping("/addVis")
    public ResultInfo addVisitor(Visitors visitors, @RequestParam("dbname") String dbname){
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null){
            visitorsService.addOne(visitors, db.getDbid());
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    /**
     * 更新访客相关信息
     * @param visitors
     * @param dbname
     * @return
     */
    @PostMapping("/updateVis")
    public ResultInfo updateVisitor(Visitors visitors, @RequestParam("dbname") String dbname){
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.findOneByDbname(dbname);
        if (db != null){
            visitors.setDbid(db.getDbid());
            visitorsService.updateById(visitors);
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return  resultInfo;
    }

    /**
     * 删除一个访客信息
     * @param vid
     * @return
     */
    @DeleteMapping("/deleteVis")
    public ResultInfo deleteVisitor(int vid){
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = visitorsService.removeById(vid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }

}
