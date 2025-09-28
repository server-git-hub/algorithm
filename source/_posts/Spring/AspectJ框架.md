---
title: AspectJ框架
date: 2025-06-25 23:26:45
tags:
categories: "Spring"
---














AspectJ中通知类型
before  前置通知
afterReturning 后置通知
around  环绕通知
after Throwing 异常通知
after 最终通知

ProceedingJoinPoint  JoinPoint的子接口
环绕通知会注入ProceedingJoinPoint对象
主要新增调用目标方法
前置通知，后置通知会注入JoinPoint对象

JoinPoing下常用API
getTarget   获取目标对象
getSignature().getname() 获取目标方法名
getArgs()  获取目标方法参数列表
getThis()  获取代理对象

Execution表达式
基本语法execution(<修饰符模式><返回类型模式><方法名模式>(<参数模式><异常模式>))
修饰符和异常为可选

execution(public * com.service.userservice..*.*(..))

注解方式

@Before  前置通知
@AfterReturning  后置通知
@around 环绕通知
@After   最终通知
@Pointcut   配置切点
@Aspect  指定切面
@Order  执行顺序(此注解由Spring提供)