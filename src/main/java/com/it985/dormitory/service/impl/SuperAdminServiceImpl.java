package com.it985.dormitory.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it985.dormitory.entity.SuperAdmin;
import com.it985.dormitory.mapper.SuperAdminMapper;
import com.it985.dormitory.service.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuperAdminServiceImpl extends ServiceImpl<SuperAdminMapper, SuperAdmin> implements SuperAdminService {

    @Autowired
    SuperAdminMapper superAdminMapper;

    @Override
    public SuperAdmin login(String username, String password){
        return superAdminMapper.findByUsernameAndPassword(username, password);
    }
}
