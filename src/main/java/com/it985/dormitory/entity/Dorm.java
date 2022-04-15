package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.List;

/**
 * 单个寝室信息
 */
@Data
@TableName("tab_dorm")
public class Dorm {
    @TableId(value = "did", type = IdType.AUTO)
    private Integer did;            //寝室id
    private String dname;           //寝室名
    private Integer accNumber;      //可容纳学生数量
    private Integer studentNumber;  //居住学生数量
    private Integer resElectricity; //剩余电费
    private Integer resWater;       //剩余水费
    private Integer dbid;           //所属宿舍楼id

    @TableField(exist = false)
    private DormBuilding dormBuilding;  //所属宿舍楼信息
}
