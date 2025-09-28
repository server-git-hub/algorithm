---
title: File
date: 2025-06-24 22:57:03
tags:
categories: "JAVASE"
---



<b>File类</b>
System.getProperty("user.dir")  获取当前所在项目的目录
createNewFile   创建文件
mkdir  创建一个目录，中间缺失目录，停止创建
mkdirs 创建多个目录，中间缺失目录，给你补上
listFiles   返回所有子文件和子路径到一个file数组
list   返回字符串数组，包含目录中的文件和目录的路径名
getAbsolutePath()   获取绝对路径
getpath()   获取相对路径
delete()  删除文件


exists  是否存在
isDirectory  是否是目录
isFile 是否是文件
new Date(lastModified())  最后修改时间   long类型用Date封装成对象
length  文件大小
getName   文件名
getPath 目录路径