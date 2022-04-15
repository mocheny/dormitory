package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.DormBuilding;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DormBuildingMapper extends BaseMapper<DormBuilding> {

    @Select("select * from tab_dorm_building where dbid=#{dbid}")
    public DormBuilding findByDbid(int dbid);

    @Select("select * from tab_dorm_building where dbname=#{dbname}")
    public DormBuilding findByDbname(String dbname);

    @Update("update tab_dorm_building set student_number=student_number-1 where dbid=#{dbid}")
    public void decreaseStudentNumber(Integer dbid);

    @Update("update tab_dorm_building set student_number=student_number+1 where dbid=#{dbid}")
    public void increaseStudentNumber(Integer dbid);

    @Update("update tab_dorm_building set room_number=room_number-1 where dbid=#{dbid}")
    public void decreaseRoomNumber(Integer dbid);

    @Update("update tab_dorm_building set room_number=room_number+1 where dbid=#{dbid}")
    public void increaseRoomNumber(Integer dbid);

    public List<DormBuilding> findByPage(int start, int size, String searchContent);

    public int findTotalCount(String searchContent);
}
