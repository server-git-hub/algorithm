---
title: Maven私服
date: 2025-06-25 17:54:22
tags:
categories: "Maven"
---


参数
status 查看运行状态
start   启动


私服仓库类型
group  仓库组：Nexus 通过仓库组来统一管理多个仓库，这样访问仓库组就相当于访问仓库组管理的多个仓库。
hosted   宿主仓库：主要用于发布内部项目构件或第三方的项目构件（如购买商业的构件）以及无法从公共仓库获取的构件(如 oracle 的 JDBC 驱动)。
releases  发布内部的 releases 模块的仓库，所有非快照版本工程都发布到此仓库中。
snapshots  发布内部的快照模块的仓库,所有工程版本以 SNAPSHOT 结尾的都发布到此仓库中。
rd party  第三方依赖的仓库，这个数据通常是由内部人员自行下载之后发布上去
proxy  代理仓库：代理公共的远程仓库。
virtual  虚拟仓库：用于适配 Maven 1。