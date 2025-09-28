---
title: javaweb
date: 2025-06-24 23:41:06
tags:
categories: "javaWeb"
---


javaweb
telmet 远程登录服务的标准协议和主要方式

ftp   文件传输协议，是网络上进行文件传输是一套标准协议

http  请求-响应协议

snmp 设计用于在up网络管理网络节点

smtp 传输文本的协议

dns (Domain name System域名系统)  万维网上作为域名和IP地址相互映射嗯一个分布式数据库

传输协议，tcp和udp

<webapp></webapp>   webxml头文件
<servlet></servlet>   创建servlet对象
<servlet-name></servlet-name>  servlet对象名字
<servlet-class></servlet-class>  servlet对象位置
<servlet-mapping></servlet-mapping>  建立servlet与URL的映射关系
<url-pattern></url-pattern>   指定url

全局servlet配置信息，通过param-name获取param-value
<servlet-param> 
<param-name>key</param-name> 
<param-value>value</param-value>
</servlet-param>
servlet独有配置信息，，通过param-name获取param-value
<init-param> 
<param-name>key</param-name> 
<param-value>value</param-value>
</init-param>

<session-config>
<session-timeout>1</session-timeout>
</session-config>
session-comfig标签，用于销毁HttpSession对象，session-timeout指失效时间，单位为分钟

<load-on-startup>1<load-on-startup>在servlet中加入该标签会使serclet自启动，参数为启动顺序



<filter></filter>   创建filter对象
<filter-name></filter-name>  filter对象名字
<filter-class></filter-class>  filter对象位置

<filter-mapping></filter-mapping>  建立filter与URL的映射关系
<url-pattern></url-pattern>   指定url

<init-param></init-param>  配置参数，结构，key与value
<filter-name></filter-name>   key
<filter-value></filter-value>   value

<listener></listener> 配置监听器
<listener-class></listener-class>  listener对象位置

