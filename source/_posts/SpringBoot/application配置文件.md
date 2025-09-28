---
title: application配置文件
date: 2025-06-25 23:18:35
tags:
categories: "Springboot"
---


配置文件后缀名及优先级：
    properties:(传统) 优先级高
    yaml/yml：(高级) 优先级低，采用层级关系配置，
        key:
          key: value



tomcat相关配置
  server.servlet.context.path  设置tomcat根路径
  server.port  设置访问端口号
  spring.profiles.active   多环境配置选择具体环境
  spring.web.resources   配置默认静态资源访问































-----------------------------------------------------------------------------------------------------------------


spring.resources.static.locations   配置静态资源访问路径
spring.servlet.multipart.max-file-size  配置单个文件上传大小，默认1mb
spring.servlet.multipart.max-request-size 配置一次请求中上传文件大小，默认10mb
spring.mvc.view.prefix   配置视图解析器前缀
spring.mvc.view.suffix   配置视图解析器后缀


spring.thymeleaf.prefix   配置访问thymeleaf视图前缀
spring.thymeleaf.suffix   配置访问thymeleaf视图后缀
spring.thymeleaf.mode  配置视图模板类型，默认HTML(html5以下默认，用html5或更高版本时需要配置)
spring.thymeleaf.encoding  配置编码方式默认UTF-8
spring.thymeleaf.servlet.context-type  配置响应类型 默认text/html
spring.thymeleaf.cache  配置页面缓存 默认true，false为不缓存

spring.datasource.url/username/driver-class-name/password/type   url/username/password/driver-class-name 是配置数据源信息，type是配置使用哪种类型的数据源
mybatis.mapper-locations   扫描mapper配置文件
type-aliases-package   配置包别名，使用ResultType时可省略包名