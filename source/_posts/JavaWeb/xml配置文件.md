---
title: xml配置文件
date: 2025-06-24 23:41:57
tags:
categories: "javaWeb"
---


xml









首行声明 
<?xml version="1.0" encoding="utf-8"?>
version 表示版本号
encoding 表示编码格式

<![CDATA[]]>

CDATA区中的数据原样展示


DTD 约束
引入：
    本地：<!DOCTYPE 根标签名 SYSTEM "dtd 文件的位置">
    网络：<!DOCTYPE 根标签名 PUBLIC "dtd 文件的位置""dtd 文件路径">




Sxhema约束

(1)写入xml 文档的根标签
(2）引入 xsi前缀：确定 Schema 文件的版本。
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
(3)引入 Schema 文件
xsi:schemaLocation="Schema 文件定义的命名空间 Schema 文件的具体路径"
(4）为 Schema 约束的标签声明前缀
xmlns:前缀="Schema 文件定义的命名空间"
