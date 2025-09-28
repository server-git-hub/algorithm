---
title: 日期API
date: 2025-06-24 23:04:31
tags:
categories: "JAVASE"
---


日历计算
GregorianCalendar
Year年，Month月，DQY_OF_MONTH日，DATE日，DAY_OF_WEEK周几，周日是1，
get
set
x.setTime(new Date())  将x(日历对象)转换成时间对象
x.add(year，-y)  将x内的年份减y

 
关于DateFormat(不能被创建为对象)
SimpleDateFormat(能被创建为对象)
Format   对象转换成时间对象
parse    时间对象转换成字符串