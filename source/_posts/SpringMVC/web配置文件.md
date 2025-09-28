---
title: 配置文件
date: 2025-07-31 11:12:17
tags:
---


配置DispatcherServlet到web中，拦截所有请求
    <servlet>
		<servlet-name>ds</servlet-name>
		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
		<init-param>
			<param-name>contextConfigLocation</param-name>  //配置初始化创建SpringIOC容器的配置位置
			<param-value>classpath:Spring.xml</param-value> //指定配置位置
		</init-param>
        <load-on-startup>1</load-on-startup>    //配置IOC容器提前启动
	</servlet>
	<servlet-mapping>
		<servlet-name>ds</servlet-name>
		<url-pattern>/</url-pattern>
	</servlet-mapping>