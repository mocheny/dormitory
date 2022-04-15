package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.Repair;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RepairMapper extends BaseMapper<Repair> {
    public List<Repair> findByPage(int start, int size, String dormBuildingName, String searchContent);

    public int findTotalCount(String dormBuildingName, String searchContent);
}
