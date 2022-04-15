package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.Late;
import com.it985.dormitory.entity.Student;
import com.it985.dormitory.entity.Visitors;

public interface LateService extends IService<Late> {
    public Page<Late> pageQuery(int current, int size, String dormBuildingName, String dormName, String searchContent);

    public Student findStu(String stuNumber);

    public void addOne(Late late);

    public boolean deleteByLid(int lid);

    public int updateLate(Late late);

    public Late findOne(int lid);

}
