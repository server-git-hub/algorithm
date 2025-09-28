---
title: Mybatis注解
date: 2025-06-25 17:52:33
tags:
categories: "Mybatis"
---


@SelectProvider，@insertProvider，@updataProvider，@deleteProvider统称为SqlProvider分别对应查询，新增，修改，删除操作


@Results 对应<ResultMap> 
id   唯一标识
value 通过@Result注解配置映射关系

@Result   代替了<id>和<result>标签
id   是否为主键
column  数据库列
property   需要装配的属性名
@one 需要使用注解@One注解(@Result(one=@One())) 
@Many 需要使用@Many注解(@Result(many=@Many())) 


@ResultMap  复用Results配置
value  指定Results的id



