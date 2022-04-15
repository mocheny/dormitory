package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Repair;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.RepairMapper;
import com.it985.dormitory.service.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepairServiceImpl extends ServiceImpl<RepairMapper, Repair> implements RepairService {

    @Autowired
    RepairMapper repairMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public Page<Repair> pageQuery(int current, int size, String dormBuildingName, String searchContent) {
        Page<Repair> repairPage = new Page<>(current, size);
        int total = repairMapper.findTotalCount(dormBuildingName, searchContent);
        int start = (current - 1) * size;
        List<Repair> repairList = repairMapper.findByPage(start, size, dormBuildingName, searchContent);
        for (Repair repair : repairList) {
            DormBuilding dormBuilding = dormBuildingMapper.selectById(repair.getDbid());
            repair.setDormBuilding(dormBuilding);
        }
        repairPage.setRecords(repairList);
        repairPage.setTotal(total);
        return repairPage;
    }

    @Override
    public Repair findByRid(int rid) {
        Repair repair = repairMapper.selectById(rid);
        DormBuilding dormBuilding = dormBuildingMapper.selectById(repair.getDbid());
        repair.setDormBuilding(dormBuilding);
        return repair;
    }

    @Override
    public void addOne(Repair repair, Integer dbid) {
        repair.setDbid(dbid);
        repairMapper.insert(repair);
    }
}
