---
title: js
date: 2025-07-18 19:12:51
tags:
categories: "UI设计"
---



javascript笔记

数据类型：
    number  数字类型，包括整数和浮点数
    boolean 布尔类型，true和false
    string  字符型，包括字符和字符串和反引号
    object  对象类型
    undefined 未定义类型，没赋值
    function 函数类型

函数：
    typeof 变量名   判断变量类型

script javascript代码块标签



BOM 浏览器对象，用来操作浏览器的各个对象
DOM 文档对象，用来操作网页的各个对象(标签)


引入js的两种方式
1.直接在html页面中定义script标签
2.直接在html页面中定义script标签，设置src属性为需要引入的js文件路径


输出方式
console.log();  在浏览器控制台输出
alert();  在浏览器上弹窗显示，有阻塞效果
document.write(); 在页面上输出，显示标签内容



数据的定义
var 定义变量，作用域范围大，全局变量
let 定义变量，作用域范围小，局部变量
const   定义常量

运算符
===  绝对等于，js的==不判断类型，但===判断类型
!==  绝对不等于，js的!=不判断类型，但!==判断类型


数组的定义
var/let arr=new Array();  定义一个数组，长度为0
var/let arr=new Array(length);  定义一个数组，并指定长度
var/let arr=new Array(var a,var b,var c,...);  定义一个数组，并指定元素
var/let arr=[var a,var b,var c,...];  定义一个数组，并指定元素

数组的特点
js中的数组元素类型可不同
js中的数组长度可变
js中的数组是有函数的


数组的函数
concat(数组)   数组拼接
reverse()   数组反转
join(规则)   将一个数组通过分隔符拼接成一个字符串，与字符串中的split作用相反
sort() 排序
pop()   删除数组中最后一个元素，返回值为被删除的元素
push()  在数组末尾添加元素


字符串函数
String.fromCharCode();  将数字通过Ascii转换为字符串
字符串对象.charAt(index);  获取index下标的字符
字符串对象.charCodeAt(index); 获取index下标的字符的Ascii


数组的遍历
```javascript
第一种：
for(var i=0;i<ele.length;i++){
    console.log(ele[i]);
}
第二种
for(var val of ele){
    console.log(val);
}
```


函数的定义
命名函数：
    function 函数名(参数){

    }
匿名函数：
    function(参数){

    }
js函数没有重载,只有重写

BOM对象：浏览器对象
    confirm("确认框提示内容");  返回boolean类型，点击确认返回true，否则返回false
    window.location.href="url"   操作地址栏进行页面跳转    window可以省略
    window.localStorage     可以在浏览器存储数据，并且会话结束不会消失
DOM对象：文档对象
    getElementById("id")   根据id获取内容，获取该id的标签，要求id唯一
    getElementsByTagName("标签名")  根据标签名获取一组标签，返回数组
    getElementsByName("name")  根据name获取，获取该name的一组标签，返回数组
    getElementsByClassName("class")  根据class获取，获取该class的一组标签，返回数组
    获取标签属性：标签对象.属性名
    获取标签体:
        标签对象.innerText，只能识别文本
        标签对象.innerHTML，可以识别标签
    标签的添加和删除:
        document.createElement("标签名"); 创建元素节点并返回标签对象，但不会添加到文档中，需要使用appendChild函数将创建的标签添加到指定的标签中。
        标签对象.appendChild(ele);  将ele添加到标签对象的所有子节点后面
        parentEle.insertBefore(newEle,targetEle); 将newEle插入到targetEle前面，parentEle指的是父标签
        parentEle.replaceBefore(newEle,oldEle);  将newEle替换所有oldEle，parentEle指的是父标签
        element.remove();   删除某个标签，element表示要删除的标签对象
js事件：
    引入：
        1.直接在标签中加入事件，让此事件调用某个函数，在script中定义这个函数。
        2.使用DOM对象获取标签对象绑定事件，然后利用函数和事件绑定
    类别：
        点击事件：
            onclick 单击事件
            ondblclick 双击事件
        焦点事件：
            onfocus  获得焦点
            onblur 失去焦点
        改变事件：
            onchange 改变事件
        提交事件：
            onsubmit="return check()"   提交事件，返回true可以提交，返回false阻止提交
JSON格式：
    [key:value,key:value,key:value]

JSON与字符串的转换：
    JSON转字符串：JSON.stringify函数
    字符串转JSON：JSON.parse函数