---
title: ECMA6Script
date: 2025-09-10 20:53:47
tags:
categories: "前端"
---


let关键字：
    不能重复声明
    有作用域范围
    不会预解析进行变量提升
    定义的全局变量不会作为window的属性
    es6中推荐优先使用
特殊:js是单线程模型，如果使用定时任务setTimeout，var定义的循环中会在循环完成执行定时任务，let定义的循环中会每次执行定时任务

const关键字：定义常量(被const修饰的东西不能更改)

模板字符串：
    语法 `字符串`
    支持表达式  `${}` 

解构：
    解构数组
    var [a,b,c]=[1,2,3]  建立映射
    var [a ...c]=[1,2,3] 建立映射，...为可变列表
    可以使用a获取1，b获取2，c获取3
    解构对象
    let user[name:n,age]={name:"张三",age:22}
    解构名称必须与属性名一致，可以使用别名，例如name:n,可以指定默认值
    解构参数
    function add([a,b]){}   解构数组中第一个和第二个元素

箭头函数
    (参数列表)=>{}

扩展运算符
    ...    可变参数

链式判断
    错误写法
    emp.name || `default`     表示判断emp的name属性，如果为空表达式的值为`default`
        链式判断会先校验前面的emp是否为空，如果有空就会报错
    正确写法 emp && emp.name || `default`
    链式写法 emp?.name || `default`   等价 emp && emp.name || `default`

模块化：
    分别导出
        在需要导出的元素前加 export 关键字，表示导出该元素
    统一导出
        export{需要导出的元素}
    默认导出
        export default 元素
    导入
        import {导入的元素} from 模块名
        import * as res from 模块名      导入所有元素，将所有元素组成的集合命名为res

Promise对象：
    介绍：
        用于处理异步操作
    使用：
        const bean=new Promise(函数)参数是一个函数，函数的参数中，第一个参数是返回成功结果的，第二个参数是返回失败结果的
        const bean=new Promise(function(resolve,reject)=>{

        })
        Promise的then方法用来处理结果，第一个参数为value的函数处理成功结果，第二个参数为error的函数处理失败结果
        1.bean.then(function(value)=>{},function(error)={})
        Promise的then方法用来处理成功结果，参数为函数，函数的参数为接收的数据，catch方法用来处理失败结果，参数为函数，函数的参数为接收的数据
        2.bean.then(function(value)=>{}).catch(function(error)={})
    async和await
        async：(返回Primise对象，简化Primise对象获取，是异步操作)
        在函数声明前加async修饰符，表示这个函数返回Promise对象，如果不返回Promise对象，会将返回结果封装为Promise对象
        await:(等待返回结果后继续执行)
        在调用函数时，希望返回结果后再继续执行，使用await关键字修饰，但await必须在async函数中使用