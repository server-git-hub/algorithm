---
title: Spring注解
date: 2025-06-27 01:10:51
tags:
categories: "Spring"
---

SpringIOC相关注解----------------------------------------------------

XML+注解(自定义类和属性用注解，所有第三方都只能用XML文件配置)

<context:component-scan base-package="com.server"/>  在XMl文件中配置，声明扫描哪个包下面的注解，规范：越精准越好

@Compent  声明当前类存入IOC容器，id为类名首字母小写，也可指定value值定义id
    子注解：
        @Repository  与Compent作用相同，仅标识作用
        @Service     与Compent作用相同，仅标识作用
        @Controller  在SpringMVC中规定只识别Controller注解，其他用途与Compent作用相同，仅标识作用
@Value 为当前非引用类型赋值
@Autowired  为当前引用类型赋值    @Qualifier  当有多个同类型Bean时，该注解指定Autowired选择装配哪个Bean
@Resource   相当于@Autowired加@Qualifier，是jdk定义的注解 属于jsr-250系列(了解) 
特殊：
    <context:component-scan base-package="com.server" use-default-filters="false">  base-package="com.server"为配置需要扫描的包，use-default-filters="false"为base-package不生效
        <context:exclude-filter type="annotation" expression=""/>   exclude为排除，type为类型,annotation表示注解类型，expression为的注解类的全限定符，表示排除当前类型的注解
        <context:include-filter type="annotation" expression=""/>   include为包含，type为类型,annotation表示注解类型，expression为的注解类的全限定符，表示包含当前类型的注解
    </context:component-scan>



完全注解(完全使用注解)

@Configuration 配置类注解，在类上加上这个注解声明这是一个配置类  
@Component("")   配置注解扫描，可以配置多个包
@PropertySource("")   配置解析Properties配置文件
@Bean  作用在方法上，SpringIOC容器会将该方法返回值存到IOC容器中，id默认为方法名，可以通过设置@Bean的name或value设置id，initMethod属性可以设置初始化方法，用于初始化信息
destroyMethod可以设置销毁方法，销毁前调用
@Scope  设置对象是单例还是多例

AnnotationConfigApplicationContext  完全注解使用这个类构造IOC容器对象
使用：
    方案一:
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(javaConfig.class);
    方案二：
        AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(javaConfig.class);
        applicationContext.register(javaConfig.class);
        applicationContext.refresh();


测试环境自动创建容器(需要spring-test依赖，自动创建IOC容器后，可自由使用)
@SpringJUnitConfig(value=javaConfig.class)  根据配置类创建
@SpringJUnitConfig(locations="Spring.xml")  根据XML配置文件配置


SpringAOP相关注解----------------------------------------------------

@Aspect 声明切面类注解
    @Before("切入点表达式")  声明该方法为前置通知(增强)
    @AfterReturning("切入点表达式") 声明该方法为返回通知(增强)
    @AfterThrowing("切入点表达式") 声明该方法为异常通知(增强)
    @After("切入点表达式")  声明该方法为后置通知(增强)

@EnableAspectJAutoProxy  开启aspectj aop注解的支持

@Pointcut()  用来存储切点表达式

@Order(1) 指定切面优先级，数字越小优先级越高


Spring-tx相关注解

声明事务注解生效 @EnableTransactionManagement
@Transactional  为当前类添加事务








--------------------------------------------------------------------------------------------------------
@Configuration  声明当前类为配置类，相当于Spring的xml配置文件，该注解需要添加到类上
@Bean
注解在方法上，声明当前方法的返回值为bean，和<bean>标签作用相同，Bean的实例名称由@Qualifier注解的参数指定
