---
title: Mybatis
date: 2025-06-25 12:09:09
tags:
categories: "Mybatis"
---


基本操作：
    InputStream ips = Resources.getResourceAsStream("config/mybatis.xml");   //读取配置文件的文件流
    SqlSessionFactory ssf = new SqlSessionFactoryBuilder().build(ips);    //使用SqlSessionFactoryBuilder的build构造SqlSessionFactory对象
    SqlSession sqlSession = ssf.openSession();    //使用SqlSessionFactory获取连接
    UserDao userDao = sqlSession.getMapper(UserDao.class);   //指定连接使用的mapper接口
    User user = userDao.selectUserById(6);   //使用该接口中的方法
    System.out.println(user.toString());    


api：
    SqlSessionFactoryBuild  用来制造SqlSessionFactory对象
    使用：
        SqlSessionFactory sqlSessionFactory=new SqlSessionFactoryBuild(ips) ips为配置文件的文件流
    SqlSessionFactory  相当于连接池对象，缓存了mybatis和mapper的配置信息
    SqlSession  操作数据库的对象，不是线程安全的，不要跨线程使用，最好每次请求完成就关闭
    Mapper代理对象：通过SqlSession的getMapper获取，为某个mapper接口创建的代理对象，用完就扔，栈自动释放



mybatisX插件(逆向生成pojo和mapper映射文件)











-----------------------------------------------------------------------------------------------------------------

SqlSessionFactory和SqlSession  
SqlSessionFactory相当于连接池，SqlSession相当于连接池中的一个连接(Connection对象)

SqlSessionFactoryBean 
作用是使用构建者模式创建SqlSessionFactory接口对象

Mapper
Myvatis中的映射配置文件，配置sql语句和映射关系发送SQL语句并接收结果
<select>，<updata>，<insert>，<delete>
定义SQL语句
<sql>
定义部分SQL语句，可以插入其他SQL语句中
<cache> 
给定命名空间的缓存配置
<cache-ref>
其他命名空间缓存配置的引用
<resultMap>
配置映射关系
<collection ofType="" select="" column=""> 
是resultMap中配置一对多映射的标签，ofType是指定映射到list中的元素类型
<association javaType="">
是resultMap中配置一对一或多对一映射的标签，javaType表示映射的类型
select表示执行一个新的查询
column表示选择哪个列的值为新查询的条件

association和collection标签中fectType属性开启延迟加载，仅对当前标签生效，lazy表示开启延迟加载，eager表示开启立即加载
<setting name="lazyLoadingEnabled" value="true"/>   在全局配置文件中开启延迟加载，所有association和collection都生效，
<setting name="" value="addyser">
lazyLoadTriggerMethods 配置实体对象的哪个方法触发立即加载


Myvatis中默认是手动事物处理
SqlSessionFackory下的openSession(true/false)
true表示自动事物提交，false表示手动事物提交
