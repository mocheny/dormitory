package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.*;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.DormMapper;
import com.it985.dormitory.mapper.LateMapper;
import com.it985.dormitory.mapper.VisitorsMapper;
import com.it985.dormitory.service.LateService;
import com.it985.dormitory.service.VisitorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LateServiceImpl extends ServiceImpl<LateMapper, Late> implements LateService {

    @Autowired
    LateMapper lateMapper;
    @Autowired
    DormMapper dormMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public Page<Late> pageQuery(int current, int size, String dormBuildingName, String dormName, String searchContent) {
        Page<Late> latePage = new Page<>(current, size);
        int total = lateMapper.findTotalCount(dormBuildingName, dormName, searchContent);
        int start = (current - 1) * size;
        List<Late> lateList = lateMapper.findByPage(start, size, dormBuildingName, dormName, searchContent);
        for (Late late : lateList) {
            Dorm dorm = dormMapper.selectById(late.getDid());

            DormBuilding dormBuilding = dormBuildingMapper.selectById(dorm.getDbid());
            dorm.setDormBuilding(dormBuilding);
            late.setDorm(dorm);
        }
        latePage.setRecords(lateList);
        latePage.setTotal(total);
        return latePage;
    }

    @Override
    public Student findStu(String stuNumber){
        Student student = lateMapper.findByStuNumber(stuNumber);
        return student;
    }

    @Override
    public void addOne(Late late) {
        lateMapper.insert(late);
    }

    @Override
    public boolean deleteByLid(int lid)
    {
        Late late = lateMapper.selectById(lid);
        int i = lateMapper.deleteById(lid);
        if (i != 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int updateLate(Late late) {
        QueryWrapper<Late> qw = new QueryWrapper<>();
        qw.eq("lid", late.getLid());
        return lateMapper.update(late, qw);
    }

    @Override
    public Late findOne(int lid) {
        Late late = lateMapper.selectById(lid);
        return late;
    }

}
