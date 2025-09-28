---
title: Maven常用插件
date: 2025-06-25 17:53:48
tags:
categories: "Maven"
---


JBLJavaToWeb  快速构建javaweb项目
maven search  快速查找maven资源






---------------------------------------------------------------------------


上传项目时，以源码方式打包成一起上传
<groupId>  org.apache.maven.plugins
<artifactId> maven-source-plugin
<executions> 额外配置信息
 <execution> 具体配置信息
<id> 唯一标识
<goals> 以什么方式打包
<goal> 具体以什么方式打包


MybatisGenerator插件    用于生成mypper接口，配置文件，pojo类  用法固定
插件坐标 <groupid>org.mybatis.generator
<artifactid>mybatis-generator-maven-plugin
注入数据库驱动
<configuration> 额外配置信息
<configurationFile> 指定generator配置文件路径

project.basedir  project表示取当前项目名称，basedir表示取根路径