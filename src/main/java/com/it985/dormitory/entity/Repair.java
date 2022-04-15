package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Date;

/**
 * 报修信息
 */
@Data
@TableName("tab_repair")
public class Repair {
    @TableId(value = "rid", type = IdType.AUTO)
    private Integer rid;            //报修id
    private String repairName;      //报修人姓名
    private String repairDormName;  //报修人寝室名
    private String repairTelephone; //报修人电话号码
    private String instructions;    //报修原因
    private Date repairTime;        //报修时间
    private Integer dbid;           //所属宿舍楼id

    @TableField(exist = false)
    private DormBuilding dormBuilding;  //所属宿舍楼信息
}
