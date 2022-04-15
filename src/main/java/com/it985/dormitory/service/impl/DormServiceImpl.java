package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.DormMapper;
import com.it985.dormitory.service.DormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DormServiceImpl extends ServiceImpl<DormMapper, Dorm> implements DormService {

    @Autowired
    DormMapper dormMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public List<Dorm> findByDbname(String dormBuildingName) {
        return dormMapper.findByDbname(dormBuildingName);
    }

    @Override
    public Dorm findByDnameAndDbid(String dname, Integer dbid) {
        return dormMapper.findByDnameAndDbid(dname, dbid);
    }

    @Override
    public Page<Dorm> pageQuery(int current, int size, String dormBuildingName, String searchContent) {
        Page<Dorm> dormPage = new Page<>(current, size);
        int total = dormMapper.findTotalCount(dormBuildingName, searchContent);
        int start = (current - 1) * size;
        List<Dorm> dormList = dormMapper.findByPage(start, size, dormBuildingName, searchContent);
        for (Dorm dorm : dormList) {
            DormBuilding dormBuilding = dormBuildingMapper.selectById(dorm.getDbid());
            dorm.setDormBuilding(dormBuilding);
        }
        dormPage.setRecords(dormList);
        dormPage.setTotal(total);
        return dormPage;
    }

    @Override
    public void addOne(Dorm dorm, Integer dbid) {
        dorm.setDbid(dbid);
        dormMapper.insert(dorm);
        dormBuildingMapper.increaseRoomNumber(dbid);
    }

    @Override
    public Dorm findByDid(int did) {
        Dorm dorm = dormMapper.selectById(did);
        DormBuilding dormBuilding = dormBuildingMapper.selectById(dorm.getDbid());
        dorm.setDormBuilding(dormBuilding);
        return dorm;
    }

    @Override
    public boolean deleteByDid(int did) {
        Dorm dorm = dormMapper.selectById(did);
        int i = dormMapper.deleteById(did);
        if (i != 0){
            dormBuildingMapper.decreaseRoomNumber(dorm.getDbid());
            return true;
        } else {
            return false;
        }
    }
}
