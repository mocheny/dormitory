package com.it985.dormitory.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * 学生信息
 */
@Data
@TableName("tab_student")
public class Student {
    @TableId(value = "sid", type = IdType.AUTO)
    private Integer sid;            //学生id
    private String sname;           //学生姓名
    private String stuNumber;       //学生学号
    private String gender;          //学生性别
    private String telephone;       //学生电话号码
    private String grade;           //学生班级
    private String teacherName;     //辅导员姓名
    private String teacherTelephone;//辅导员电话号码
    private Integer did;            //所属寝室id

    @TableField(exist = false)
    private Dorm dorm;
}
