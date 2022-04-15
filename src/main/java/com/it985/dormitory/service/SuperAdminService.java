package com.it985.dormitory.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.it985.dormitory.entity.SuperAdmin;

public interface SuperAdminService extends IService<SuperAdmin> {

    public SuperAdmin login(String username, String password);
}
