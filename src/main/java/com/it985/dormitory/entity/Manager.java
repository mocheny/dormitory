package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 宿舍管理员信息
 */
@Data
@TableName("tab_manager")
public class Manager {
    @TableId(value = "mid", type = IdType.AUTO)
    private Integer mid;        //宿管id
    private String name;        //宿管姓名
    private String gender;      //宿管性别
    private String telephone;   //宿管电话号码
    private String username;    //宿管登录用户名
    private String password;    //宿管登录密码
    private Integer dbid;       //所属宿舍楼id

    @TableField(exist = false)
    private DormBuilding dormBuilding;  //所属宿舍楼名
}
