package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.Manager;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ManagerMapper extends BaseMapper<Manager> {

    @Select("select * from tab_manager where username=#{username} and password=#{password}")
    public Manager findByUsernameAndPassword(String username, String password);

    public List<Manager> findByPage(int start, int size, String dormBuildingName, String searchContent);

    public int findTotalCount(String dormBuildingName, String searchContent);
}
