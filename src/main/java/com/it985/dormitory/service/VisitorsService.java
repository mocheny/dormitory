package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Visitors;

public interface VisitorsService extends IService<Visitors> {
    public Page<Visitors> pageQuery(int current, int size, String dormBuildingName, String searchContent);

    public Visitors findByVid(int vid);

    public void addOne(Visitors visitors, Integer dbid);
}
