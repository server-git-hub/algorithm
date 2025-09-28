---
title: MVC命名空间
date: 2025-06-25 23:24:19
tags:
categories: "SpringMVC"
---


<mvc:annotation-driven/>  配置注解驱动
<mvc:resources mapping="" location="">
配置静态资源解析器 mapping为请求的uri，location为映射路径
<mvc:default-servlet-handler> 处理静态资源
配置后会在SpringMVC中定义一个org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler，遇到静态资源，就交由web应用服务器默认的servlet处理，如果不是静态资源才由DispatcherSerlvet处理
<mvc:interceptors>
<mvc:interceptor>
<mvc:exclude-mapping path=""> 配置需要拦截的路径
<mvc:exclude-mapping path=""> 配置不需要拦截的路径
<bean class="">  装配拦截器
</mvc:interceptor>
</mvc:interceptors>