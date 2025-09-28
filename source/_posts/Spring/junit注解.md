---
title: junit注解
date: 2025-06-25 23:27:28
tags:
categories: "Spring"
---


@Test 测试注解，标记一个方法可以作为一个测试用例。

@Before Before注解表示,该方法必须在类中的每个测试之前执行,以便执行某些必要的先决条件。

@BeforeClass 
BeforeClass 注解指出这是附着在静态方法必须执行一次并在类的所有测试之前，这种情
况一般用于测试计算、共享配制方法(如数据库连接)。

@After
After 注释表示，该方法在每项测试后执行（如执行每一个测试后重置某些变量，删除临
时变量等）。

@AfterClass
当需要执行所有测试在 Junit 测试用例类后执行，AlterClass 注解可以使用以清理一些资
源（如数据库连接），注意：方法必须为静态方法。

@lgnore
当想暂时禁用特定的测试执行可以使用这个注解，每个被注解为@lgnore 的方法将不再执行

@Runwith
@Runwith就是放在测试类名之前，用来确定这个类怎么运行的。也可以不标注，会使用默认运行器。(引擎)

@Parameters
用于使用参数化功能。

@SuiteClasses
用于套件测试

@ContextConfiguration
指定Spring配置文件