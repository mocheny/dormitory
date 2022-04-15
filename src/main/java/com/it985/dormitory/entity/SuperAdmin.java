package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 超级管理员信息
 */
@Data
@TableName("tab_superadmin")
public class SuperAdmin {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;     //id号
    private String username;//用户名
    private String password;//密码

}
