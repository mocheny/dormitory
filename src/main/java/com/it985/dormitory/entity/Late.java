package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@TableName("tab_late")
public class Late {
    @TableId(value = "lid", type = IdType.AUTO)
    private Integer lid;        //来访人id
    private String lname;       //来访人姓名
    private String gender;      //来访人性别
    private String telephone;   //来访人电话号码
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date lateTime;        //进入时间
    private String grade;         //班级
    private Integer dbid;       //所属宿舍楼id
    private Integer did;       //来访原因
    private String stuNumber;


    @TableField(exist = false)
    private Dorm dorm;
}
