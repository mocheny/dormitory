package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.Dorm;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DormMapper extends BaseMapper<Dorm> {

    public List<Dorm> findByPage(int start, int size, String dormBuildingName, String searchContent);

    public int findTotalCount(String dormBuildingName, String searchContent);

    @Select("select * from tab_dorm where dbid in (select dbid from tab_dorm_building where dbname=#{dormBuildingName})")
    public List<Dorm> findByDbname(String dormBuildingName);

    @Select("select * from tab_dorm where dname=#{dname} and dbid=#{dbid}")
    Dorm findByDnameAndDbid(String dname, Integer dbid);

    @Update("update tab_dorm set student_number=student_number-1 where did=#{did}")
    public void decreaseStudentNumber(Integer did);

    @Update("update tab_dorm set student_number=student_number+1 where did=#{did}")
    public void increaseStudentNumber(Integer did);
}
