---
title: Mybatis中sql标签
date: 2025-06-25 17:52:02
tags:
categories: "Mybatis"
---


<insert id="insertuser" useGeneratedKeys="true" keyproperty="username">

useGeneratedKeys 获取自增长主键
keyproperty   映射自增长主键值到哪个属性


CDATA "<![CDATA["内容"]]>"  
在CDATA区域中的内容不会被解析

通配符
&lt;   同<
&gt;  同>
&amp; 同&
&apos;  同'
&quot; 同"


RowBounds  Mybatis提供的分页查询对象
offset   偏移量，从0开始
limit   限制条数

<select id="selectuser" resultTye="user">
<bind id="likename" value="'%'+name+'%'"/>
</select>
bind标签 可以通过ID获取value


set标签 应用于updata，可以自动去掉if语句最后一个逗号

foreach标签 可以遍历集合，数组
collection  指定集合类型或名称，名称需用@param指定
item 表示本次获取的元素
open  表示语句从什么开始，可以设定前缀
close  表示语句以什么结束，可以设定后缀
separator  每次循环后可添加的字符串，最后一次不添加
index   在list，set，数组中表示索引，在map中表示key


