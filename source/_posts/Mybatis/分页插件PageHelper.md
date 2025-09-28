---
title: 分页插件PageHelper
date: 2025-06-25 17:53:18
tags:
categories: "Mybatis"
---

1.导入依赖
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.11</version>
</dependency>
2.在mybatis主配置文件中配置插件
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="mysql"/>
    </plugin>
</plugins>
3.不要写分号，分页插件会自动帮我们添加
使用：
    PageHelper.startPage(1,2);   设置当前第几页，每页几条数据，必须在查询方法之前设置
    List<Student> students = sm.find();   目标方法
    PageInfo<Student> info=new PageInfo<>(students); 设置将哪些数据进行分页，将结果放入PageInfo
        getList()  返回结果集数据
        getTotal() 返回总条数
        getPageNum()  返回当前页数
        getPages()  返回总页数











-------------------------------------------------------------------------------------------------------------

PageHelper,startPage(int pageNum,int pageSize);
给定分页参数，该方法需要在执行查询之前调用
pageNum：起始的页数，从 1 开始计算。
pageSize：每页显示的条数。
Pagelnfo对象
存放分页结果对象
pagelnfo.getList()获取分页查询结果。
pagelnfo.getTotal()获取查询总条数。
pagelnfo.getPages(）获取总页数。
pagelnfo.getSize()获取每页显示的条数。


PageHelper,startPage(1，2);
第一页，每页两条
PageInfo<user> pageInfo=new PageInfo(list)
将查询结果放入分页插件中
pageInfo.getList();  获取结果集
