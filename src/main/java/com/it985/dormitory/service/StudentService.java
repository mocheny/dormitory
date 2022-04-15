package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.Student;

public interface StudentService extends IService<Student> {
    public Page<Student> pageQuery(int current, int size, String dormBuildingName, String dormName, String searchContent);

    public Student findOne(int sid);

    public void addOne(Student student, Integer did);

    public boolean deleteBySid(int sid);
}
