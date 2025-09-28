---
title: 关于数据校验(Vilidate)
date: 2025-06-25 23:22:05
tags:
categories: "Springboot"
---


@NotNull  对基本类型的对象类型做非空校验
@NotBlank  对字符串类型做非空校验
@NotEmpty 对数组/集合类型做非空校验
massage=""参数，定义错误信息，可以用{}获取配置文件中的参数配置
可以绑定到方法的参数上，但不会有BindingResult
@Validated  开启用对象的数据校验
BindingResult 对象校验不合法的信息
hasErrors  判断BindingResult对象是否为空
getAllErrors  获取所有不合法信息，返回一个FieldError的父类集合，但存放的是子类FieldError类型。
FieldRrror.getField()  获取不合法参数
FieldRrror.getDefaultMessage()  获取不合法参数对应的信息

错误信息是用错误参数的类名首字母小写加参数做为key，value为错误信息 
th:errors可以获取错误信息，获取方式为，输入key 获取value

默认读取配置文件为 ValidationMessages.properties
properties配置文件的字符编码是iso西文字符编码，当用到汉字时可以用jdk中的native2ascii工具将汉字转换为unicode使用

@ModelAttribute("")  给当前对象类型定义key与value，key为自定义参数，value为对象类型

@Length 判断字符长度，最大或最小
@Min  判断数值最小值
@Max  判断数值最大值
@Email  判断邮箱是否合法
