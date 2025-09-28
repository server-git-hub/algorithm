---
title: String的常用方法
date: 2025-06-24 23:01:06
tags:
categories: "JAVASE"
---


String(不可变字符序列)
Stringbuilder(可变字符序列，线程相对不安全，速度快)
Stringbuffer(可变字符序列，线程相对安全，速度相对慢)
Stringbuffer和Stringbuilder通用函数(方法)
append(x)   在字符串后面添加字符串x
charAt(x)   提取下标为x的字符
delete(x，y)   删除从下标为x到y之间的字符，不包含y
deleteCharAt(x)   删除下标为x的字符
insert(x，y)  把字符串y添加到下标为x的位置
reverse()   把字符串逆序输出
substring(x.y)  输出从索引x到y的字符，不包含y
indexOf(x，y)  查找数组里索引y或y后面以后有没有x，有，返回x所在索引值，无，返回-1


Comparable 接口，用于比较字符串或基本数据类型大小，给字符串或基本数据类型排序的
Compareto()   按照字典顺序比较大小的方法
Comparator()  比较器接口
Compare()  比较器方法