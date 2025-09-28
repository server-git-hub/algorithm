---
title: Mybatis-plus
date: 2025-08-17 12:14:04
tags:
categories: "Mybatis-plus"
---


Maven依赖：
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.3.2</version>
    </dependency>

基本使用：
    1.导入场景启动器
    2.正常编写数据库配置
    3.定义mapper接口，继承BaseMapper<T>
    4.正常启动类扫描mapper接口

mybatis-plus在SpringBoot的配置文件前缀统一为mybatis-plus


实体类相关注解
@TableName    指定对应数据库表,加到实体类上
@TableID    指定数据库主键，加到属性上
    value属性指定主键
    type属性指定类型
        auto   数据库id自增
        none   无状态，该类型为未设置主键类型(注解里等于跟随全局，全局里约等于INPUT)
        input   insert前自行set主键值
        assign_id   分配id(主键类型为Number(Long和Integer)或String)(sincee 3.3.0),使用接口IdentifierGenerator方法的nextId(默认实现类为DefaultIdentifierGenerator雪花算法)
        assign_uuid   分配uuid，主键类型为String(since3.3.0)，使用接口IdentifierGenerator的方法nextUUID(默认default方法)
        ID_worker  分布式全局唯一ID 长整型类型
        uuid     32位UUID字符串
        id_worker_str    分布式全局唯一ID 字符串类型
@TableField  指定其他属性，加到属性上




条件构造器 wrapper
    AbstractWrapper   抽象基类(规定了Wrapper的方法)
        QueryWrapper   DQL类型(只能装条件)
        UpdateWrapper  DML类型(可以装条件和数据值)
            条件方法：
                eq    相等
                gt    大于
                ge    大于等于
                lt    小于
                le    小于等于
                ne    不等于
                like   模糊查询
                isnull   非空判断
                in   范围取值  
            数据方法：
                set   存储数据值
    Lambda表达式扩展Wrapper(简化条件构造)
        LambdaQueryWrapper：替换QueryWrapper
        LambdaUpdateWrapper：替换UpdateWrapper
    Condition扩展(等于动态sql语句)
        Condition是布尔值变量，可以传入表达式替代if

逻辑删除：
    配置方式一：
    mybatis-plus.global-config.db-config.logic-delete-field: deleteed   逻辑删除列名
    mybatis-plus.global-config.db-config.logic-delete-value:1    逻辑已删除值
    mybatis-plus.global-config.db-config.logic-not-delete-value:0   逻辑未删除值
    配置方式二：
    属性上添加注解@TableLogic  0未删除 1已删除

插件：
    mybatis-plus有一个插件主体MybatisPlusInterceptor，只需要在主体中添加插件即可
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {    //将插件主体注册到IOC容器
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();    //创建插件主体对象
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); // 如果配置多个插件, 切记分页最后添加
        // 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
        return interceptor;
    }
    分页插件：
        IPage接口和Page实现类
            1.定义分页条件，第几页和每页多少条数据
            2.装载分页查询结果
        自定义方法使用分页插件：
            模仿mybatis-plus提供的分页方法，(返回值和第一个参数必须为Ipage，其他任意，这样mybatis-plus就会当做分页方法执行)



数据层接口BaseMapper<T>

业务层接口 
    接口继承IService<T>
    实现类继承ServiceImpl<mapper接口,实体类>