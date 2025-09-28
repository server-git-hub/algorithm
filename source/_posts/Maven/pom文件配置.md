---
title: pom文件配置
date: 2025-06-25 17:54:48
tags:
categories: "Maven"
---





<packageing></packageing>   配置构建，jar，war，pom

<scope></scope>:指定依赖作用范围
                main    test     打包运行
    compile       1      1         1
    provided      1      1         0
    runtime       0      0         1
    text          0      1         0



构建命令：
    clean    清理
    compile  编译
    test     测试
    site     报告
    package  打包
    install  运行
    deploy   部署到私服
周期：
    清理周期：clean
    构建周期：compile test package install deploy
    报告周期：site

<dependencies>  配置引入依赖
<build>  构建配置，配置maven


解决打包和报告时jdk和maven版本不兼容问题：
    <build>
        <plugins>  //配置maven插件
        <plugin>   //具体单个配置
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-site-plugin</artifactId>
            <version>3.9.1</version>
        </plugin>
        </plugins>


        <resources>  //配置文件构建
            <resource>   //具体配置
                <directory>src/main/java</directory>   //指定目录
                <includes>   //选择文件
                    <include>**/*.*</include>   //具体选择文件      
                </includes>
                <excludes>   //排除文件
                    <exclude>**/*.java</exclude>  //具体排除文件
                </excludes>
            </resource>
        </resources>
        //将src/main/java下任意文件构建到项目中，排除.java文件
    </build>

依赖传递：自动下载依赖的依赖，尽量使用依赖传递，1.保证依赖链的完整简化依赖导入，2.保证版本没冲突
传递终止：1.到了尽头，2.非compile依赖，3.依赖冲突(依赖重复)
依赖冲突：(依赖重复) 1.避免依赖重复，2.避免循环依赖
重复依赖选择：1.谁短谁优先，2.谁上谁优先，3.手动排除(排除后依然走前两个原则)


继承和聚合：
    继承：语法：
        <parent>
            <groupId></groupId>
            <artifactId></artifactId>
            <version></version>
        </parent>
    只继承父工程pom文件
        <dependencyManagement>  
            <dependencies>
                <dependency>
                    <groupId></groupId>
                    <artifactId></artifactId>
                    <version></version>
                </dependency>
            </dependencies>
        </dependencyManagement>
        用于声明dependency版本，子工程用的时候不用写版本了
    聚合：父工程中聚合了哪些工程
        <modules>
            <module></module>
        </modules>












----------------------------------------------------------------------------------
<dependencies> 配置maven坐标
<dependency> 配置具体的maven坐标
<groupId><artifactid><Version> 具体坐标
<type>  指定项目类型
<scope>  指定依赖作用(import为引入)
<exclusions>  排除jar包依赖的jar包
<exclusion>  具体排除jar包依赖的jar包
<groupId><artifactId>  jar包坐标

compile 默认值，编译，运行，打包时都会引入依赖
provided   编译，测试，运行，但打包时不会引入依赖
runtime   编译时不会引入依赖，运行时会引入依赖
system  当依赖不是maven结构，不在maven体系中时，可以用system引入，但是会中断依赖传递
text    只在编译测试和运行测试时引入依赖

<dependencyManagement>  与dependencies标签作用相同，但不会引入依赖
<properties>   可以自定义标签，标签名为key，值为value，外部用el表达式引用
<parent>   项目继承标签，给定需要继承的父项目坐标
<modules> 需要聚合的模块，聚合项目需要继承聚合点
<module>  具体聚合的模块

<build> 构建配置
<pluginManagement>  pluginManagement中的插件不会被引入
<plugins> 配置插件信息
<plugin> 配置具体的插件信息，放入插件坐标


<configuration>  配置其他信息，例如jdk版本
<source>  配置jdk版本
<target>   配置编译器版本
<encoding> 配置编码格式
<port>  配置端口
<path>  配置路径

<resources> 配置拷贝插件的读取位置
<resource> 配置拷贝插件的读取位置的具体信息
<directory>  指定需要拷贝的目录
<includes>  指定需要拷贝的文件特征
<include>  指定具体需要拷贝的文件特征，如，**/*.xml 表示所以目录及子目录下的所有以xml为后缀的文件


<distributionManagement> 配置上传时仓库信息
<repository>  配置仓库信息
<snapshostRepository> 配置snapshost仓库信息
<id>  选择settings.xml中的server的id(选择一个server做为访问仓库的用户)
<name>  唯一名称
<url>  指定上传的具体仓库地址