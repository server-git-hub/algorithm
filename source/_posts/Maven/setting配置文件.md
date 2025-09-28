---
title: setting配置文件
date: 2025-06-25 17:55:11
tags:
categories: "Maven"
---


配置本地仓库位置
<localrepository>  配置本地仓库位置

maven有两个配置文件：
    用户级settings(优先使用)
    全局settings

配置阿里镜像：
    <mirror>
        <id>alimaven</id>
        <mirrorOf>central</mirrorOf>
        <name>aliyun maven</name>
        <url>maven.aliyun.com/nexus/content/groups/public</url>
    </mirror>
配置构建时使用的jdk版本：
    <profile>
        <id>jdk-8</id>
        <activation>
          <activeByDefault>true</activeByDefault>
          <jdk>8</jdk>
        </activation>
        <properties>
          <maven.compiler.source>8</maven.compiler.source>
          <maven.compiler.target>8</maven.compiler.target>
          <maven.compiler.compilerVersion>8</maven.compiler.compilerVersion>
        </properties>
    </profile>
GAVP特性：(规范)构建时存到maven仓库的综合名称
    G：公司域名，最多四级
    A:项目名-模块名
    V:版本号，一般使用三级版本号，例如：1.0.0
    P:当前是什么文件，有jar，war，pom
    



-----------------------------------------------------------------------------------------------


<localrepository>  配置本地仓库位置
<mirrors>  配置镜像仓库，默认访问中央仓库
<mirror><id><mirrorOf><name><url>    配置具体镜像仓库
id 表示镜像id
mirrorOf 表示匹配中央仓库
name 表示镜像名称
url表示镜像路径

<profiles>  配置信息
<profile>  具体配置信息
<id>  全局唯一的id
<activation>    插件标记
<activeByDefault>   默认编译器
<jdk>   jdk提供的编译器版本
<properties>   自定义key与value
<maven.compiler.source>
<maven.compiler.target>
<maven.compiler.compilerVersion>  
配置具体的jdk信息

<server>   添加仓库的用户认证
<id>  唯一标识
<username>  访问仓库的用户名
<password> 访问仓库的密码

<profile>  具体配置信息
<id> 唯一标识
<activation>  指定激活条件
<activeByDefault> 参数 true 当没有profile被激活时激活此profile，false 不开启
<jdk>   指定jdk版本
<repositories>  配置依赖仓库
<repository> 具体配置信息
<id>  唯一标识
<url>  私服地址(指定依赖仓库地址)
<releases>  配置releases仓库信息
<enabled>   仓库是否支持releases版本
<snapshost>  配置snapshost仓库信息
<enabled>  仓库是否支持snapshost版本

<pluginRepositories>  配置插件仓库
<pluginReppsitory>  具体配置信息
<id> 唯一标识
<url> 私服地址(指定插件仓库地址)
<releases>  配置releases仓库信息
<enabled>   仓库是否支持releases版本
<snapshost>  配置snapshost仓库信息
<enabled>  仓库是否支持snapshost版本

<activeprofiles> 配置激活profile
<activeprofile> 具体配置激活profile



