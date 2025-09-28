---
title: Ajax中JavaScript部分
date: 2025-06-24 23:40:29
tags:
categories: "javaWeb"
---


Ajax技术 javaScript部分

new XmlHttpRequest 返回一个JavaScript对象
用于发送异步请求
open("get"，"ajax.do")  open是发送异步请求的函数，get表示请求方式，ajax.do表示请求目标
send("2")，send会在open执行完立即执行，用于传递数据，2表示被传递的数据
onreadystatechange 是XmlHttpRequest中处理响应的函数指针，被赋予一个方法，在被请求时执行

状态码
0表示open没有被调用
1表示open正在被调用
2表示send正在被调用
3表示服务器正在返回结果
4表示请求结束，服务端停止发送数据给客户端



javaScript中内置对象JSON提供的方法(函数)
stringify() 将JavaScript对象转换成json格式对象
parse()   将json对象转换成JavaScript对象


Ajax在javaScript中的使用
$.ajax(JavaScript) 放入JavaScript对象，
type 表示请求方式 
url  请求地址
同open(type，url)
dataType，将json格式对象转换为JavaScript类型，同json.parse()
data 需要提交的数据，同send()中的数据
success  作用同onreadystatechange

$.get(url，data，function(){})  ajax的简化版，使用get方式请求
url 表示需要请求的url
data 表示需要传递的数据
function(){} 表示处理响应信息的函数

$.getjson(url，data，function(){})  $.get的强化版，自动将响应回来的json对象转换成javascript对象，响应回来的数据只能是json类型

$.post(url，data，function(){}) $.ajax的post简化版



serialize()  将form表单中数据自动拼接成key=value&key=value结构



Jackson常用注解
@JsonProperty   将属性或方法名称序列化成指定名称
@JsonLgnore  将属性或方法忽略，若属性或方法上存在其他注解，则忽略所有注解
@JsonFormat   将属性或方法中的date类型转换成指定格式



