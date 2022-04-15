package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Repair;

public interface RepairService extends IService<Repair> {

    public Page<Repair> pageQuery(int current, int size, String dormBuildingName, String searchContent);

    public Repair findByRid(int rid);

    public void addOne(Repair repair, Integer dbid);
}
