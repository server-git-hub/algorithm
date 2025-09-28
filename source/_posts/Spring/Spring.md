---
title: Spring
date: 2025-06-25 23:27:49
tags:
categories: "Spring"
---




BeanFactory 是springIOC容器标准化超接口
ClassPathXmlApplicationContext  通过读取类路径下的xml格式的配置文件创建IOC容器对象
FileSystemApplicationContext 通过文件系统路径读取的xml格式的配置文件创建IOC容器对象
AnnotationConfigApplicationContext 通过读取java配置类创建IOC容器对象
WebApplicationContext 专门为web应用准备，基于web环境创建IOC容器对象，并将对象引入存入ServletContext域中


组件管理的配置方式：
    1.xml文件配置
    2.注解配置：
    3.配置类配置(完全注解)











------------------------------------




Core Container(核心容器)
由各种模块构成

Beans模块   提供BeanFactory，是工厂模式都经典体现，Spring将管理对象称为bean
Core 核心模块：提供了 Spring 框架的基本组成部分，包括 IoC 和 D1 功能。
Context 上下文模块：建立在核心和 Beans 模块的基础之上，它是访问定义和配置任何对象的媒介。ApplicationContext 接口是上下文模块的焦点。
Expression Language 模块：是运行时查询和操作对象图的强大的表达式语言。是对JSP2.1 规范中规定的统一表达式语言（Unified EL）的扩展。



ApplicationContext
是BeanFactory的子接口
该接口的全路径为org.springframework.context.ApplicationContext
增强了BeanFactory，添加了对国际化，资源访问，事件传播等方面的良好支持

BeanFactory
是基础类型的ioc容器
全名org.springframework.beans.factory.BeanFactory

ClassPathXmlApplicationContext
该类从ClassPath目录中找指定的xml文件，完成装载并实例化ApplicationContext

FileConfigLocation参数用于指定Spring配置文件的名称和位置


