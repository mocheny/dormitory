package com.it985.dormitory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it985.dormitory.entity.SuperAdmin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SuperAdminMapper extends BaseMapper<SuperAdmin> {

    @Select("select * from tab_superadmin where username=#{username} and password=#{password}")
    public SuperAdmin findByUsernameAndPassword(String username, String password);
}
