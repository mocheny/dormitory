package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Dorm;

import java.util.List;

public interface DormService extends IService<Dorm> {
    public List<Dorm> findByDbname(String dormBuildingName);

    public Dorm findByDnameAndDbid(String dname, Integer dbid);

    public Page<Dorm> pageQuery(int current, int size, String dormBuildingName, String searchContent);

    public void addOne(Dorm dorm, Integer dbid);

    public Dorm findByDid(int did);

    public boolean deleteByDid(int did);
}
