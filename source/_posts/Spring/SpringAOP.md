---
title: SpringAOP
date: 2025-06-25 23:28:08
tags:
categories: "Spring"
---


代理技术：(了解即可)
    jdk：需要有接口
    cglib：无需接口

专业名词：
    横切关注点：aop负责的非核心代码管理
    通知(增强)：提取要插入的非核心代码
        前置通知：在核心代码前切入
        返回通知：在核心代码返回时切入
        异常通知：在核心代码异常时切入
        后置通知：在核心代码结束时切入
    目标：要被动态代理的对象
    连接点：目标对象可能被织入的方法
    织入：配置文件的编写过程
    切入点：被选中的连接点
    切面：切入点+通知(增强)组成的
    代理：被增强后的目标对象


@Aspect 声明切面类注解
    @Before("切入点表达式")  声明该方法为前置通知(增强)
    @AfterReturning("切入点表达式") 声明该方法为返回通知(增强)
    @AfterThrowing("切入点表达式") 声明该方法为异常通知(增强)
    @After("切入点表达式")  声明该方法为后置通知(增强)
    @Around() 环绕通知：前置通知,返回通知,异常通知,后置通知 四合一

XML配置：
    <aop:aspectj-autoproxy />  开启aspectj aop注解的支持

获取目标方法信息：
    1.在通知方法的参数中添加固定类型的对象即可，aop会自动给你传递,需要在注解或配置中指定注入到参数的哪个变量中，argNames=""
    2.所有通知中都可以传递JoinPoint对象，可以获取目标方法的信息(类，方法名，参数...)
    3.返回通知@AfterReturning可以额外获取方法的返回值，只需要在参数中添加Object对象，需要在注解或配置中指定返回值注入到参数的哪个变量中，returning=""
    4.异常通知@AfterThrowing可以获取本次异常信息，参数中添加Throwable对象即可，需要在注解或配置中指定异常变量注入到参数的哪个变量中，throwing=""



JoinPoint：
    getTarget() 获取当前对象所属的目标对象
    getArgs() 获取参数


execution 切点表达式：(找到切入点)
    格式：execution(public int com.server.UserService div(int,String))
    含义：表达式声明，访问修饰符，返回值类型，包名.类名，方法名，参数列表类型
    特殊：1.当不考虑访问你修饰符和返回值类型时，可以写 *
         2.包名.* 表示当前包下任意包或类
         3.  ..  表示当前包下任意层任意包或类
    例：execution(public int com..*.*(..))   如果是包下任意再去指定类时不需要写...而是省略写成..
@Pointcut()  用来存储切点表达式



@Around() 环绕通知：前置通知,返回通知,异常通知,后置通知 四合一
    返回值必须为Object，因为是四合一，所以包含返回值
    Spring会注入一个ProceedingJoinPoint proceedingJoinPoint对象，
    环绕通知基本结构：
        @Around("")  //通知类型和指定切入点的execution表达式
        public Object notify(ProceedingJoinPoint proceedingJoinPoint){ //返回值必须为Object类型，类名任意，参数可以有 
                                                                       //ProceedingJoinPoint,Spring会自动注入
            Object[] args = proceedingJoinPoint.getArgs();             //获取参数列表所有参数
            Object target=null;                                        //定义个返回值
            try{
                target= proceedingJoinPoint.proceed(args);             //proceedingJoinPoint.proceed(args);为调用目标
                                                                       //方法，传入参数
            }catch (Throwable throwable){
                throwable.printStackTrace();
            }finally{
                
            }
            return target;                                             //返回
        }

@Order(1) 指定切面优先级，数字越小优先级越高















-----------------------------------------------------------------------------------------------
aop   面向切面编程
专业术语
Joinpoint  连接点
Pointcut   切入点
Advice   通知
Target  目标
Weaving  织入点
Proxy  代理
Aspect  切面

通知类型 
org.springframework.aop.MethodBeforeAdvice  前置通知
org.springframework.aop.AfterReturningAdvice  后置通知
org.springframework.aop.MethodInterceptor环绕通知
org.springframework.aop.ThrowsAdvice 异常通知

配置切面
proxyInterfaces  配置目标对象实现的接口
target  配置目标对象
interceptorNames 配置装载切面对象 
proxyTargetClass 配置如何生成代理对象 true表示使用CGLIB，false表示使用JDK的proxy

