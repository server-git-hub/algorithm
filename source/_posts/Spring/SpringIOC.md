---
title: SpringIOC
date: 2025-06-25 23:28:22
tags:
categories: "Spring"
---


BeanFactory(接口)  组件工厂springIOC的超接口，规定了容器最基本的创建组件，获取组件
ApplicationContext(接口)  容器工厂，继承BeanFactory扩展了组件管理的方法


使用springIOC需要导入依赖：
    导入Spring Context，进行依赖传递即可(Spring Context Sprint Beans Spring core Spring expression)
    

创建并使用SpringIOC容器：
    方案一：
        ApplicationContext applicationContext=new ClassPathXmlApplicationContext("Spring.xml");
    方案二：
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext();
        applicationContext.setConfigLocation("Spring.xml");
        applicationContext.refresh();
获取Bean对象：
    getBean()
        1.通过id获取，不知道类型，返回Object
        2.通过类型获取，直接返回该类型对象
        3.通过id和类型获取，通过名称和类型返回该类型的对象，(是1.通过查找名称后强制类型转换得到的)


FactoryBean接口(用于将复杂对象放入IOC容器的接口)：(实现了FactoryBean接口的对象的id值为配置的id值前面加&，getObject()返回的对象的id值为配置的id)
    过程：
        实现FactoryBean接口，必须实现getObject()方法，在getObject()方法中写复杂对象的构造过程，然后将这个复杂对象返回，Spirng检测到实现了FactoryBean接口的类会调用getObject()并把getObject()返回的对象放入容器
    使用：
        实现FactoryBean接口，实现getObject()方法，在getObject()方法中写复杂对象的构造过程，然后将这个复杂对象返回，在Spring配置文件中加入当前对象。
    实现FactoryBean接口需要实现的方法：
        T getObject() 返回此工厂创建对象的实例，该返回值会被存到IOC容器
        Boolean isSingleton() 如果此FactoryBean返回单例，则返回true，否则返回false，此方法默认实现返回true(注意，lombok插件使用，可能影响效果)
        Class<?> getObjectType() 返回getObject()方法返回的对象类型，如果事先不知道类型，返回null

容器中对象的作用域：
    bean标签中有个属性 scope 指定对象创建单例或多例
        singleton   默认单例
        prototype   多例

Bean的周期：(重要)
    阶段一：加载Bean定义
        1.Spring容器读取XML配置文件或其他配置文件，解析配置信息
        2.将解析后的配置信息转换为Spring内部数据结构(BeanDefinition对象)
        3.存储BeanDefinition对象，待进行组件实例化
    阶段二：实例化Bean组件
        1.根据BeanDefinition中的信息，实例化Bean对象
        2.如果有依赖其他Bean的情况，先实例化被依赖的Bean
        3.此步骤单纯实例化Bean和依赖的Bean组件，不会进行属性赋值
    阶段三：设置Bean属性
        1.Spring容器将根据BeanDefinition中的配置，通过setter方法或字段直接注入属性值
        2.Spring容器属性和实例化过程是分离的，所有在配置的时候，组件声明和引用部分先后顺序
    阶段四：调用Bean的初始化方法(可选)
        1.如果Bean实现了InitializingBean接口，Spring将调用其afterPropertiesSet()方法
        2.如果在XML配置中定义了init-method，则执行该方法
        3.如果Bean使用了@PostConstruct注解，则执行被注解的方法
        4.此阶段调用自定义初始化方法，可以进行相关的初始化工作，类似：Servlet的init()方法
    阶段五：Bean的使用
        此时Bean已经完成初始化，可以被其他Bean引用或容器直接使用
    阶段六：调用Bean的销毁方法(仅作用于单例Bean)(可选)
        1.如果Bean实现了DisposableBean接口，Spring将调用其destroy()方法
        2.如果在XML配置中定义了destroy-method，则执行该方法
        3.如果Bean使用的@PreDestroy注解,则在销毁之前执行被注解的方法
        4.此阶段地道有自定义销毁方法，可以进行相关的资源释放工作，类似：Servlet的destroy()方法


Spring提供的一些外置接口：
    BeanFactoryPostProcessor接口：
        1.在容器实例化任何Bean之前，允许对BeanDefinition进行修改，可以用于动态修改Bean配置，或者注册新的BeanDefinition
        2.调用时机在阶段一和阶段二之间
        3.Bean设置属性时读取外部配置就利用此接口进行扩展(${key}->替换->对应的具体参数值)
    BeanPostProcessor接口：
        1.提供了两个方法，postProcessBeforeInitialization()和postProcessAfterInitialization()，允许在Bean初始化前后进行之定义操作
        2.调用时机在阶段三四之间和阶段五之间
        3.可以进行Bean实例化后的扩展，AOP就是利用此接口进行实现
    其他接口：
        BeanDefinitionRegistryPostProcessor接口：
            用于处理Bean定义的注册过程，允许对Bean定义进行修改，补充或删除。功能与BeanFactoryPostProcessor接口类似！
        Aware系列接口：
            提供了BeanNameAware、BeanFactoryAware和ApplicationContextAware等接口，允许Bean在被容器实例化后获取与容器相关的信息！













--------------------------------------------------------




获取ApplicationContext对象
new ClassPathXmlApplicationContext("Spring.xml")

factory-method   调用静态方法
factory-bean    放入需要被调用非静态方法的bean对象的id

注入bean对象
<property name="" ref=""/value="">
ref    放入需要被注入的bean对象
value  放入字符串


IOC容器实例化bean对象
lazy-init
false(默认)  立即创建
true   延迟创建，会在调用getbean时创建bean对象

ApplicationContext下的API
getBeanDefinitionNames()  获取所有bean对象的id，返回一个String数组



注入bean对象方式
<constructor-arg type/name/index>
通过构造方法注入bean对象
type   通过类型识别
name  通过名称识别
index  通过位置识别

自动注入
自动注入的方式有两种，一种是全局配置自动注入，另一种是局部配置自动注入。
无论全局配置或局部单独配置，都有 5 个值可以选择：
no：当 autowire 设置为 no 的时候，Spring 就不会进行自动注入。
byName：在 Spring 容器中查找 id 与属性名相同的 bean，并进行注入。需要提供 set 方
法。
byType：在 Spring 容器中查找类型与属性名的类型相同的 bean，并进行注入。需要提
供set 方法。
constructor：仍旧是使用 byName 方式，只不过注入的时候，使用构造方式进行注入。
default：全局配置的 default 相当于 no，局部的 default 表示使用全局配置设置。



scope属性的值为prototype时，每次调用getBean时都会返回一个新的Bean对象，IOC容器并不会缓存该对象，所以不负责管理该对象的生命周期
scope属性的值为singleton时，SpringIOC容器启动时会实例化一次Bean对象，并被SpringIOC容器缓存，生命周期较长

jdbcTemplate.batchUpdate(sql,bpss)
批量执行sql语句，给定sql语句和BatchPreparedStatementSetter对象

BeanPropertyRowMapper
常用于数据库查询结果映射为Java对象

SqlSessionFactoryBean是初始化Mybatis框架的Bean对象，用于创建SqlSessionFactory
该对象可以配置Mybatis，如果仍想使用Mybatis配置文件，需要在SqlSessionFactoryBean中配置configLocation给定Mybatis配置文件路径和名称
在SqlSessionFactoryBean中可以注入
dataSource  数据源
typeAliasesPackage  注入pojo类
mapperLocations  注入Mybatis映射配置文件


MapperScannerConfigurer
用于自动扫描方式来配置Mybatis中映射器对象，可以通过配置包路径通过自动扫描包接口
生成映射器对象(动态代理)
需要注入basePackage   指定一个包名



