package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.DormBuilding;

public interface DormBuildingService extends IService<DormBuilding> {
    public DormBuilding findOneByDbname(String dbname);

    public boolean saveOne(DormBuilding dormBuilding);

    public Page<DormBuilding> pageQuery(int current, int size, String searchContent);
}
