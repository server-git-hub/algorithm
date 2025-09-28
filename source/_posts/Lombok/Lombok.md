---
title: Lombok
date: 2025-06-24 23:39:35
tags:
categories: "Lombok"
---



@getter
@setter(AccessLevel.NONE)
为属性添加get，set方法，不会为static生成，final修饰的属性只会生成get方法，accesdlevel.none属性会取消添加方法

@ToString(exclude={})
会为生成所有属性的toString方法，exclude中的属性不会被生成

@EqualsAndHsahCode(exclude={}，of={})
会生成equals，hashcode，canEqual方法，exclude中的属性不会被生成，of表示只生成of中的属性

@NonNull
会判断方法参数或属性是否为空，为空会抛出异常

@NoArgsConstructor
为类生成一个无参的构造方法
@RequiredArgsConstructor
为类生成一个无参/有参的构造方法，final和@NonNull会被初始化值和添加到构造方法的参数中

@AllArgsConstructor
为类生成一个全参的构造方法

@Data
生成getter,setter,toString,equalsAndHashCode,reqiruredArgsConstructor注解

@Builder
创建对象时可直接调用builder方法调用类属性并初始化值，结尾调用build方法

@Log
@Log4j
创建Log对象，Log4j对象，和其他日志对象

val字段
类似泛型，，，没啥用

@Cleanup
自动释放资源，常用于io流

