---
title: Restful
date: 2025-06-25 23:24:59
tags:
categories: "SpringMVC"
---

RESTFul风格
规范化设计接口：
    url(uri)是资源的标识，使用名词
    method 是资源的动作，get 查询  post 增加 delete 删除 put 更新
    参数：如何选择参数传递(Param,Path,json),
        Param:规范用于范围或模糊参数，Path：规范用于唯一标识参数，json：规定用于请求体传参  
        get:Path | Param
        post:json
        put:json
        delete:Path | Param
    响应：如何选择响应参数(json)



跨域问题：
    非同源判定：
        1.评判协议地址，
        2.评判域名，
        3.评判端口
    解决：
        1.后端解决：设置响应头，告诉浏览器可以访问   加上这个注解就可以解决 @CrossOrigin
        2.前端解决：代理方式访问




















---------------------------------------------------------------------------------------------------------------------


风格格式
将请求的uri放在{}中，称为占位符
@PathVaribale  可以将uri中的占位符参数，注入到方法中