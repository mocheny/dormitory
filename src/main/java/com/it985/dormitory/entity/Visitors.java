package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Date;

/**
 * 来访人信息
 */
@Data
@TableName("tab_visitors")
public class Visitors {
    @TableId(value = "vid", type = IdType.AUTO)
    private Integer vid;        //来访人id
    private String vname;       //来访人姓名
    private String gender;      //来访人性别
    private String telephone;   //来访人电话号码
    private Date inTime;        //进入时间
    private Date outTime;       //离开时间
    private String instructions; //来访原因
    private Integer dbid;       //所属宿舍楼id

    @TableField(exist = false)
    private DormBuilding dormBuilding;  //所属宿舍楼信息
}
