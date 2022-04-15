package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.List;

/**
 * 宿舍楼信息
 */
@Data
@TableName("tab_dorm_building")
public class DormBuilding {
    @TableId(value = "dbid", type = IdType.AUTO)
    private Integer dbid;           //宿舍楼id
    private String dbname;          //宿舍楼名
    private Integer roomNumber;     //拥有房间数
    private Integer studentNumber;  //拥有学生数
}
