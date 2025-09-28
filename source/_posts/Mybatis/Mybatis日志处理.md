---
title: Mybatis日志处理
date: 2025-06-25 17:51:44
tags:
categories: "Mybatis"
---


Log4j的输出格式
Log4J 采用类似 c 语言中的 printf 函数的打印格式格式化日志信息，打印参数如下:
%m 输出代码中指定的消息
%p 输出优先级既，DEBUG,INFO,WARN,ERROR,FATAL
%r 输出自应用启动到输出该log信息耗费的毫秒数
%c 输出所属的类目,通常就是所在类的全名
%t 输出产生该日志事件的线程名
%n 输出一个回车换行符，Windows 平台为“\r\n”，Unix 平台为“\n”
%d 输出日志时间点的日期或时间，默认格式为 ISO8601，也可以在其后指定格式



向数据库输出的 appender
log4j.appender.logDB=org.apache.1og4j.jdbc.JDBCAppender
log4j.appender.logDB.layout=org.apache.log4j.PatternLayout 
log4j.appender.logDB.Driver=com.mysql.jdbc.Driver
log4j.appender.logDB.URI-jdbc:mysql://1ocalhost:3306/bjsxt
log4j.appender.logDB.User=root 
log4j.appender.logDB.Password=root
log4j.appender.logDB.Sql=INSERT INTO
logs(project_name,create_date,level,category,file_name,thread_name,line，all_
category,message)values ('logDemo','&d{yyyy-MM-ddHH:mm:ss}','
%p','%c','%f','%t','%l','%i','%m)




Log4j中的appender
org.apache.log4j.ConsoleAppender(输出到控制台)
org.apache.log4j.FileAppender(输出到文件)
org.apache.log4j.DailyRollingFileAppender(每天产生一个日志文件)
org.apache.log4j.RollingFileAppender(文件大小到达指定尺寸的时候产生一个新的文件)
org.apache.log4j,.WriterAppender(将日志信息以流格式发送到任意指定的地方)
org.apache.log4j.jdbc.JDBCAppender(将日志信息添加数据库中)


Log4j.rootLogger=[level],name1,name2...
level是定义日志级别
name是指日志输出到哪
log4j.logger.com.it=error
通过包名控制日志级别


appender.console 输出到控制台
log4j.appender.console=org.apache.1og4j.ConsoleAppender 
log4j.appender.console.layout=org.apache.1og4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=<%d> %5p (%F:%L) [%t] (%c) -%m%n
log4j.appender.console.Target=System.out

appender.logfile 输出到日志文件
log4j.appender.logfile=org.apache.log4j.RollingFileAppender
log4j.appender.logfyle.File=SysLog.log
log4j.appender.logfile.MaxFileSize=500KB
log4j.appender.logfile.MaxBackupIndex=7
log4j.appender.logfile.layout=org.apache.1og4j.PatternLayout
log4j.appender.logfile.layout.ConversionPattern=<8d>8p (8F:8L)[8t] 8c - 8m&n


