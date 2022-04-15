package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.Visitors;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VisitorsMapper extends BaseMapper<Visitors> {

    public List<Visitors> findByPage(int start, int size, String dormBuildingName, String searchContent);

    public int findTotalCount(String dormBuildingName, String searchContent);
}
