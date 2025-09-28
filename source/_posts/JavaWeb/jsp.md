---
title: jsp
date: 2025-06-24 23:41:20
tags:
categories: "javaWeb"
---


jsp

jsp中的四大域：
    PageContext:页面域，作用于当前页面
    request:请求域，作用于当前请求
    session:会话域，作用于当前会话
    application:应用域(全局域)，作用于整个web应用程序

el表达式：(只用于取数据)
    语法结构：${expression}
    支持. 和 [] 获取元素
    使用java代码时结构：<% java代码 %>
jstl标签库：
    使用：
        1.导入jar包
        2.引入核心标签库：<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    标签：
        <c:forEach>属性：
            items:要被循环的信息(重要)
            begin：开始的元素(0表示第一个)
            end：最后一个元素(0表示第一个)
            step：步长
            var：当前条目的变量名称(重要)
            varStatus：代表循环状态的变量名称index：当前元素的索引(从0开始)
            count:当前循环的次数(从1开始)
            first：是否是第一次循环(布尔值)
            last：是否是最后一次循环(布尔值)
        <c:if>属性：
            test:条件,必须填(重要)
            var:用于存储条件结果的变量
            scope:var属性的作用域









-----------------------------------------------------------------------------------------------------------------


声明标签 <%!  %>
脚本标签<%  %>
赋值标签<%=  %>

格式化标签的使用
<%@taglibprefix="fmt"uri="http://java.sun.com/jsp/jst/fmt"%>
对日期的格式化处理
<fmt:formatDate value="{data}" pattern="yyyy-MM-dd"/>
对数字格的式化处理
<fmt:formatNumber value="${balance}" type="currency"/>

<c:foreach> 迭代器
items  被迭代的集合
begin  迭代起始因子
end  迭代结束因子
step  迭代步长
var 代表当前迭代元素的变量名称
varstatus 代表循环状态的变量名

el表达式的隐含对象
PageScope  page作用域
RequestScope Request作用域
sessionScope   session作用域
applicationScope   application作用域
param  Request对象的参数，字符串
paramValues  Request对象的参数，字符串集合
header  Http信息头，字符串
headerValues Http信息头，字符串集合
initParam   上下文初始化参数
cookie   cookie值
pageContext   当前页面的pageContext

application 在整个应用都有效
session 在当前会话中有效
request 在当前请求中有效
page 在当前页面有效


taglib指令标签
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

page 指令标签
contentType 设置响应类型及编码
pageEncoding 设置当前页面响应编码
import  需要导入的包
langiage 设置当前jsp页面可以嵌套的语言
session 设置jsp页面是否获取session内置对象
buffer  设置jsp页面的流的缓冲区大小
autoflush  是否自动刷新
extends  声明jsp页面继承于哪个类，必须继承的是httpservlet及其子类
isEllgnored  是否忽略el表达式
errorPage  指定当前jsp页面异常时，需要跳转到的jsp页面

isErrorPage
当前 JSP 页面是否是一个错误页面。若值为 true,可以使用 JSP 页面的一个内置对象
exception。



