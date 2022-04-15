package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Student;
import com.it985.dormitory.mapper.*;
import com.it985.dormitory.service.DormBuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DormBuildingServiceImpl extends ServiceImpl<DormBuildingMapper, DormBuilding> implements DormBuildingService {

    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public DormBuilding findOneByDbname(String dbname) {
        return dormBuildingMapper.findByDbname(dbname);
    }

    @Override
    public boolean saveOne(DormBuilding dormBuilding) {
        DormBuilding dbname = dormBuildingMapper.findByDbname(dormBuilding.getDbname());
        if (dbname != null) {
            return false;
        } else {
            dormBuildingMapper.insert(dormBuilding);
            return true;
        }
    }

    @Override
    public Page<DormBuilding> pageQuery(int current, int size, String searchContent) {
        Page<DormBuilding> dormBuildingPage = new Page<>(current, size);
        int total = dormBuildingMapper.findTotalCount(searchContent);
        int start = (current - 1) * size;
        List<DormBuilding> dormBuildingList = dormBuildingMapper.findByPage(start, size, searchContent);
        dormBuildingPage.setRecords(dormBuildingList);
        dormBuildingPage.setTotal(total);
        return dormBuildingPage;
    }
}
