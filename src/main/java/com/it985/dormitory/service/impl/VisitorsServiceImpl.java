package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Visitors;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.VisitorsMapper;
import com.it985.dormitory.service.VisitorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorsServiceImpl extends ServiceImpl<VisitorsMapper, Visitors> implements VisitorsService {

    @Autowired
    VisitorsMapper visitorsMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public Page<Visitors> pageQuery(int current, int size, String dormBuildingName, String searchContent) {
        Page<Visitors> visitorsPage = new Page<>(current, size);
        int total = visitorsMapper.findTotalCount(dormBuildingName, searchContent);
        int start = (current - 1) * size;
        List<Visitors> visitorsList = visitorsMapper.findByPage(start, size, dormBuildingName, searchContent);
        for (Visitors visitors : visitorsList) {
            DormBuilding dormBuilding = dormBuildingMapper.selectById(visitors.getDbid());
            visitors.setDormBuilding(dormBuilding);
        }
        visitorsPage.setRecords(visitorsList);
        visitorsPage.setTotal(total);
        return visitorsPage;
    }

    @Override
    public Visitors findByVid(int vid) {
        Visitors visitors = visitorsMapper.selectById(vid);
        DormBuilding dormBuilding = dormBuildingMapper.selectById(visitors.getDbid());
        visitors.setDormBuilding(dormBuilding);
        return visitors;
    }

    @Override
    public void addOne(Visitors visitors, Integer dbid) {
        visitors.setDbid(dbid);
        visitorsMapper.insert(visitors);
    }
}
