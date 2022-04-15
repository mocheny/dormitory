package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.Dorm;
import com.it985.dormitory.entity.DormBuilding;
import com.it985.dormitory.entity.Student;
import com.it985.dormitory.mapper.DormBuildingMapper;
import com.it985.dormitory.mapper.DormMapper;
import com.it985.dormitory.mapper.StudentMapper;
import com.it985.dormitory.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl extends ServiceImpl<StudentMapper, Student> implements StudentService {

    @Autowired
    StudentMapper studentMapper;
    @Autowired
    DormMapper dormMapper;
    @Autowired
    DormBuildingMapper dormBuildingMapper;

    @Override
    public Page<Student> pageQuery(int current, int size, String dormBuildingName, String dormName, String searchContent) {

        Page<Student> studentPage = new Page<>(current, size);
        int total = studentMapper.findTotalCount(dormBuildingName, dormName, searchContent);
        int start = (current - 1) * size;
        List<Student> studentList = studentMapper.findByPage(start, size, dormBuildingName, dormName, searchContent);
        studentPage.setRecords(studentList);
        studentPage.setTotal(total);

        for (Student student : studentList) {
            Dorm dorm = dormMapper.selectById(student.getDid());
            DormBuilding dormBuilding = dormBuildingMapper.selectById(dorm.getDbid());
            dorm.setDormBuilding(dormBuilding);
            student.setDorm(dorm);
        }

        return studentPage;
    }

    @Override
    public Student findOne(int sid) {
        Student student = studentMapper.selectById(sid);
        Dorm dorm = dormMapper.selectById(student.getDid());
        DormBuilding dormBuilding = dormBuildingMapper.selectById(dorm.getDbid());
        dorm.setDormBuilding(dormBuilding);
        student.setDorm(dorm);
        return student;
    }

    @Override
    public void addOne(Student student, Integer did) {
        student.setDid(did);
        studentMapper.insert(student);
        dormMapper.increaseStudentNumber(did);
        Dorm dorm = dormMapper.selectById(did);
        dormBuildingMapper.increaseStudentNumber(dorm.getDbid());
    }

    @Override
    public boolean deleteBySid(int sid) {
        Student student = studentMapper.selectById(sid);
        int i = studentMapper.deleteById(sid);
        if (i != 0) {
            Dorm dorm = dormMapper.selectById(student.getDid());
            dormMapper.decreaseStudentNumber(dorm.getDid());
            dormBuildingMapper.decreaseStudentNumber(dorm.getDbid());
            return true;
        } else {
            return false;
        }
    }
}
