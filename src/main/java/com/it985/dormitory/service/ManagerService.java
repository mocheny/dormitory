package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Manager;

public interface ManagerService extends IService<Manager> {

    public Manager login(String username, String password);

    public Page<Manager> pageQuery(int current, int size, String dormBuildingName, String searchContent);

    public Manager findByMid(int mid);

    public Manager findByUsername(String username);

    public void addOne(Manager manager, Integer dbid);
}
