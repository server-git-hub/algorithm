---
title: Oracle的导入和导出
date: 2025-06-24 23:00:02
tags:
categories: "数据库"
---


<b>Oracle导入与导出</b>
Dmp dmp是二进制文件，跨平台，可以包含权限，效率高。
Sql 可用文本编辑器查看，通用，效率不如dmp低，适合小数据量导入导出，表中不能有大字段(blob，clob，long)，否则会报错
Pde  pde格式文件，为PL/SQLdeveloper自有的文件格式，只能用PL/SQLdeveloper工具导入导出，不能用文本编辑器查看。
exp(导出)
imp(导入)
explimp用户名/密码@连接地址:端口/服务名 file=路径/文件名 .dmp
full=y/tables(tablename,tablenam...Jowner(username1,username2,username3)
exp:导出命令，导出时必写。
imp:导入命令，导入时必写,每次操作，二者只能选择一个执行。
username:导出数据的用户名，必写;
password:导出数据的密码，必写;
@地址符号，必写;
SERVICENAME:Oracle 的服务名，必写;
1521:端口号，1521 是默认的可以不写,非默认要写;
file="文件名.dmp"：文件存放路径地址，必写;
full=y:表示全库导出。可以不写，则默认为 no,则只导出用户下的对象;
tables:表示只导出哪些表;
owner:导出该用户下对象;
fulltables|owner:只能使用一种;