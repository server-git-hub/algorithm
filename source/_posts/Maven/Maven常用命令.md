---
title: Maven常用命令
date: 2025-06-25 17:54:06
tags:
categories: "Maven"
---


clean  删除已编译信息，默认删除工程中的target目录
vaildate 校验项目是否正确
compile   编译项目，同javac命令
text   如果在text目录中有测试代码，在执行install时会先进行测试，如果执行失败，终止打包
package   编译，并打包 
verify   校验包是否正确并达到质量标准
install   编译，打包，本地安装
site   生成项目文档，该命令需要配置
deploy   远程部署命令，部署服务器或私服