package com.it985.dormitory.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.ResultInfo;
import com.it985.dormitory.service.DormBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DormBuildingController {

    @Autowired
    DormBuildingService dormBuildingService;

    /**
     * 分页查找所有宿舍楼信息
     *
     * @param current
     * @param searchContent
     * @return
     */
    @GetMapping("/allDbQuery")
    public Page<DormBuilding> pageQuery(@RequestParam(value = "current", defaultValue = "1") int current,
                                        String searchContent) {
        Page<DormBuilding> page = dormBuildingService.pageQuery(current, 10, searchContent);
        return page;
    }

    /**
     * 查询所有宿舍楼信息，用于小菜单展示
     *
     * @return
     */
    @GetMapping("/allDb")
    public List<DormBuilding> allDormBuilding() {
        return dormBuildingService.list();
    }

    /**
     * 查找一个宿舍楼所有信息
     *
     * @param dbid
     * @return
     */
    @GetMapping("/findOneDb")
    public DormBuilding findOne(@RequestParam("dbid") int dbid) {
        return dormBuildingService.getById(dbid);
    }

    /**
     * 添加宿舍楼
     *
     * @param dormBuilding
     * @return
     */
    @PostMapping("/addDb")
    public boolean addDormBuilding(DormBuilding dormBuilding) {
        return dormBuildingService.saveOne(dormBuilding);
    }

    /**
     * 修改宿舍楼
     * @param dormBuilding
     * @return
     */
    @PostMapping("/updateDb")
    public ResultInfo updateDormBuilding(DormBuilding dormBuilding) {
        ResultInfo resultInfo = new ResultInfo();
        DormBuilding db = dormBuildingService.getById(dormBuilding.getDbid());
        if (db != null) {
            dormBuildingService.updateById(dormBuilding);
            resultInfo.setFlag(true);
        } else {
            resultInfo.setErrorMsg("该宿舍楼不存在");
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    @DeleteMapping("/deleteDb")
    public ResultInfo deleteDormBuilding(int dbid){
        ResultInfo resultInfo = new ResultInfo();
        boolean flag = dormBuildingService.removeById(dbid);
        resultInfo.setFlag(flag);
        return resultInfo;
    }
}
