---
title: TypeScript
date: 2025-09-14 17:06:22
tags:
---

TypeScript是JavaScript的扩展
Vite使用TypeScript构造的Vue项目会将所有的js文件平替为ts文件
使用<script setup lang="ts">时，需要指定lang(语言)为ts(TypeScript)

类型：
    string    字符串类型      let ele:string="zhangsan"
    boolean    布尔类型       let ele:boolean=true
    number     数字类型,支持二，八，十，十六进制数字    let ele:number=10
    字面量类型   允许定义变量为某个固定值，与固定值不符，会报错   let ele:'521'='521'
    any       任意类型     let ele:any="张三"
    object    对象类型     let ele:object={}
    数组类型   let ele:number[]=[]
    类型|类型  联合类型,允许类型是联合类型其中之一   let ele:number | string="zhangsan"    
    使用：
        let ele:string=""     声明let变量，设置类型为string，属性在设置其他类型值时会有警告，但仍不影响赋值
    
    类型断言：
    方式一：
        变量 as 类型        将变量的类型指定为该类型
    方式二：
        <类型>变量          将变量的类型指定为该类型

    类型推断：
        当变量声明赋值后，会根据值推断类型
        当变量声明未赋值时，会推断为any类型
    
    函数返回值类型：
        function add(a:number,b?:number): number{}      
        指定返回值类型为number,参数类型为number，b参数为可选参数可以不传递
        语法：
            参数:类型     参数指定类型
            参数?         参数设置为可选
            ():类型{}     返回值指定类型
接口：用于限定结构和类型
    声明接口
    interface Base extend temp{   //接口继承
        name:string;
        age?:number;
        cook()=>void;

    }
    属性名?    属性设置为可选
    readonly   加入readonly修饰，设置为只读
    cook()=>void;    设置方法无参数，返回值为void(无返回值)赋值给cook
    创建对象时需要指定所有属性的值

泛型：定义接口，函数或类时，不预先指定类型，而在使用的时候再指定具体类型的一种特性
    基本使用
    function take<T>(count:number,value:T):T[]{}       在方法名后，参数前声明泛型，在参数列表，返回值和方法体中使用泛型
    take<string>(3,'100')     在使用函数时指定具体类型

类型声明：
    关键字type(为任意类型起别名)
    type str=string    使用type修饰的变量可以将变量作为一个类型，变量是什么类型，变量代表的就是什么类型
    let key:str      声明一个变量key为str类型(str为string类型，所以最终key为string类型)