package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Manager;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.ManagerMapper;
import com.it985.dormitory.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerServiceImpl extends ServiceImpl<ManagerMapper, Manager> implements ManagerService {

    @Autowired
    ManagerMapper managerMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public Manager login(String username, String password) {
        Manager manager = managerMapper.findByUsernameAndPassword(username, password);
        if (manager != null){
            DormBuilding dormBuilding = dormBuildingMapper.findByDbid(manager.getDbid());
            manager.setDormBuilding(dormBuilding);
        }
        return manager;
    }

    @Override
    public Page<Manager> pageQuery(int current, int size, String dormBuildingName, String searchContent) {
        Page<Manager> managerPage = new Page<>(current, size);
        int total = managerMapper.findTotalCount(dormBuildingName, searchContent);
        int start = (current - 1) * size;
        List<Manager> managerList = managerMapper.findByPage(start, size, dormBuildingName, searchContent);
        for (Manager manager : managerList) {
            DormBuilding dormBuilding = dormBuildingMapper.selectById(manager.getDbid());
            manager.setDormBuilding(dormBuilding);
        }
        managerPage.setRecords(managerList);
        managerPage.setTotal(total);
        return  managerPage;
    }

    @Override
    public Manager findByMid(int mid) {
        Manager manager = managerMapper.selectById(mid);
        DormBuilding dormBuilding = dormBuildingMapper.selectById(manager.getDbid());
        manager.setDormBuilding(dormBuilding);
        return manager;
    }

    @Override
    public Manager findByUsername(String username) {
        QueryWrapper<Manager> managerQueryWrapper =  new QueryWrapper<>();
        managerQueryWrapper.eq("username", username);
        Manager manager = managerMapper.selectOne(managerQueryWrapper);
        return manager;
    }

    @Override
    public void addOne(Manager manager, Integer dbid) {
        manager.setDbid(dbid);
        managerMapper.insert(manager);
    }
}
