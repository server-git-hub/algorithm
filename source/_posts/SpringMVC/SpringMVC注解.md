---
title: SpringMVC注解
date: 2025-06-25 23:26:09
tags:
categories: "SpringMVC"
---


@Controller   SpringMVC只认Controller为表诉层Bean
@ResponseBody   直接响应回去字符串
@RequestMapping("")   
    1.给handler配置访问地址 | handler和地址对向handlerMapping中注册，
    2.可以省略前置和后置 /     
    3.可以模糊匹配：* 单层模糊，** 可以多层模糊   
    4.可以设置多个地址
    5.可以加在类上，为所有方法添加前置路径
    属性：
        method  设置请求方式
            get
            post
            ...
    子注解
        @PostMapping   等同于@RequestMapping设置method为post，是@RequestMapping的子注解
        @GetMapping    等同于@RequestMapping设置method为get，是@RequestMapping的子注解
        使用场景：
            PostMapping    增
            DeleteMapping  删
            PutMapping     改
            GetMapping     查
        只能限制单个请求，多个请求还是用RequestMapping




@RequestParam注解，用于接收Param参数：
    场景：1.参数名与形参名不同。2.约定必须传参  3.设置形参默认值
    特殊：接收一名多值时，需要使用@RequestParam注解，会将多值整合到集合中

@PathVariable注解，用于声明接收Path参数，不加默认接收Param参数

@RequestBody注解，指定要接收的类型为json字符串

@CookieValue注解，指定接收Cookie类型参数

@CrossOrigin注解，解决跨域问题，在响应头上设置可以访问，加在访问资源上，

@ControllerAdvice注解,声明该类为声明式异常处理类
@RestControllerAdvice注解，RestControllerAdvice=ControllerAdvice+ResponseBody

@ExceptionHandler注解，value指定异常类，指定处理哪个异常

















----------------------------------------------------------------------------------------
@Component  基本注解，注册该类为bean
@Controller   配置该类为控制器
@Service 注册业务层
@Repository  注册持久层
@RequestMapping   用于将uri绑定到类或方法上
@RequestParam 将请求参数绑定到控制器的方法参数上(将请求参数注入到方法中)
value 参数名
required  是否包含该参数，默认为true，表示请求中必须包含该参数，否则报错
defaultValue 默认参数值，如果设置该值，required自动为false，如果没传该参数值，使用默认值

@ExceptionHandler  集中异常处理，只能处理该类下的异常
class[] clazz   需要给定异常的class对象

@ControllerAdvice   全局异常处理

@RequestBody
可以讲JOIN格式转换为Java对象，要求content-type不是默认的application/x-www-from-urlcoded，一般处理application/json类型，如果方法返回值类型为String类型，RequestBody不会进行转换，响应的Context-type为text/plain;charset=iso-8859-1，如果返回值不是String类型，ResquestBody会转换为JSON格式，响应的Context-type为applocation/json

注解的produces参数可以修改响应类型

@RequestHeader
将请求头的数据映射到处理请求的方法参数上
name   指定请求头name

@CookieValue
主要是将请求的Cookie数据映射到处理请求的方法参数上。
name  指定CookieName

@CrossOrigin  用于处理跨域请求访问
origins  允许访问的域列表
maxAge  准备响应前的缓存持续的最大时间(单位为秒)
