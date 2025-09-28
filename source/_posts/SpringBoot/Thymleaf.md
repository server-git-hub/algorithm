---
title: Thymleaf
date: 2025-06-25 23:19:38
tags:
categories: "Springboot"
---


<span th:text><span/>  th:text是Thymleaf中的一个标记，用于输出文本信息，可用el表达式
th:value  th:vlaue可以替换input标签中value，可以使用表达式
th:if  th:if=""  判断语句
th:switch=""   选择语句 th:case th:case只执行满足的第一个值，th:case="*" 表示deafult
th:each  迭代器 语法 th:each="u,i:${list}"
u表示当前迭代对象，i表示状态变量对象，${list}表示使用表达式取key为list的value值。
状态变量有
index  当前迭代器的索引，从0开始
count 当前迭代对象的计数，从1开始
size  当前集合的长度
odd/even 布尔值，当前循环是否是偶数/奇数次，从0开始
first  当前循环是否是第一次，是返回true，否返回false
last 当前寻思是否是最后一次，是返回true，否返回false


内置对象
#strings #dates #numbers 和jdk中的方法基本一致
#httpServletRequest
#httpSession
#ServletContext

URL表达式
th:href/src=""  可以给绝对路径/相对路径