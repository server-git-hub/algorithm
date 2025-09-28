---
title: HTML
date: 2025-06-24 23:06:06
tags:
categories: "UI设计"
---


<b>html</b>

<pre>
html 根标签
head 头标签，页面及页面各种组件属性
body  体标签，页面展示内容
<！-- -->   注释





body中标签
h(1-6) 标题标签,级别1-6，数字越大字体越小
hr 水平线标签，size 分割线粗细，color 分割线颜色
font 字体标签，size  字体大小，color 字体颜色
br   换行标签


b，u，i 格式化标签，b表示加粗，u表示下划线，i表示倾斜
p   段落标签
pre 定义预格式化标签

img 图片标签，src 图片路径，alt 图片无法正常显示时显示内容，width 图片宽度，height 图片高度，title 悬停图片上时的提示信息，border 设置边框，单位像素(px)

a  超链接标签，href 超链接地址，target 设置打开方式：_blank：新窗口打开  _self：当前窗口打开

table 表格标签，broder 边框宽度，width 表格宽度，height 表格高度，bgcolor 表格背景颜色，cellspacing 单元格外边距，cellpadding 单元格内边距，align 表格对齐方式，
tr 行标签
td 列标签，colspan 单元格跨列，rowspan 单元格跨行
th 表头标签，默认居中加粗

div 块级元素标签，一个div占用一整行，搭配css使用
span 行级元素标签，不会占用一整行，搭配css使用
form  表单标签，action 服务端地址，method 提交方式
input 输入标签，name和value属性，name命名当前表单，value为输入的值，服务器指定获取name的value值，即获取输入值，placeholder 输入框的小提示
    type 输入类型，
        text 文本框，
        password 密码框，
        radio 单选框 
            checked 默认选中元素，
        checkbox 复选框 
            checked 默认选中元素，
        file 文件域
        button 普通按钮，配合js使用
        reset  重置按钮
        subbit 提交按钮
        image  图片按钮
select 下拉菜单
        multiple 取值为multiple表示多选
        size 显示多少条信息
        option 选项，设置option的value会自动赋值到select的value上











-----------------------------------------------------------------------------------------------------




网页构成的二部分
超文本: 文本信息，图片，视频，音频，超链接等
标记:标签的体现

<!DOCTYPE html>   声明当前是html5文档
<HTML> </HTML>表示 HTML根标签，双标签
<！-- -->   注释

<meta  />  单标签
charset=UTF-8   配置浏览器解析格式
name="author" content=""  author表示作者，标题，content表示搜索与该作者有关联

name="descr" content="" descr表示内容相关，content表示搜索与内容相关

nane="keywords"   content=""   keywords表示关键字，content表示搜索与关键字相关

http-equiv="refresh"  表示刷新网页
 content=5;www.baidu.com   表示五秒后刷新网页访问www.baidu.com

http-equiv="pragma"   网页缓存
content="no-cache" 表示禁止缓存
http-equiv="cache-Control" 控制 content="no-cache"表示禁止缓存
http-equiv="expires" 期望缓存  
content="0" 表示期望缓存0秒

<head> </head>  头文件，放一些浏览器配置的文件
<title>  </title>网页名称




<body>  </body> 放一些网页展现的内容
<h1 align="center"> <h1>会自动加粗加黑 h1-h6 依次变小，可以自动换行，标题标签
align表示字符对齐格式  center表示居中，right表示靠右，left表示靠左
<hr width="500px" color="red" align="left" size="20px">
hr表示分割线，width表示长度，500px表示像素，px是像素单位，color表示颜色，red表示红色，size表示宽度，20px表示像素
<p>&nbsp;<br /><p />   p表示段落标签，自动增加段间距，br表示换行，&nbsp表示空格
<pre><pre />  per表示预文本标签，会按我们指定的格式输出。
<u><u/>  下划线标签
<i><i/> 倾斜标签
<b><b/>  加黑加粗标签
<del><del/> 删除线标签
<sup><sup/> 上标标签
<sub><sub/> 下标标签
<small><small/> 字体变小标签
<big><big/> 字体变大标签
<font color="red" face="宋体"><font/> 字体标签。
<span><span/> 字体标签，内置封装过的修改选项

列表标签
有序列表
<ol type="1"><li></li></ol>  ol表示有序列表标签，li表示内容，type表示序号格式
无序列表
<ul type="" ><li><li/><ul/> ul表示无序列表，li表示内容，type表示序号格式
自定义列表
<dl><dt><dt/><dd><dd/><dl/> dl表示自定义列表，dt表示父列表，dd表示子列表
<marquee direction="left" scrollamount="40px"></marquee>  marquee表示 跑马灯标签，direction表示方向，scrollamount表示像素
超链接标签
<a href=http://www.baidu.com target="_blank">测试<a/>
href 表示跳转到哪，target 表示打开网页方式，_blank表示新页面打开
<a href="#age1" name="age">返回底部<a>
<a href="#age" name="age1">返回顶部<a>
#age1会跳转到返回顶部的位置，#age会跳转到返回底部的位置

相对路径加载图片，目标图片的引用位置
<img str=""/>
本地访问支持绝对路径，Hbuilder运行时会模拟服务器访问，不支持绝对路径
绝对路径加载图片，目标图片的物理位置
<img str=""/>
网络路径，网络中的图片地址
<img str=""/>

<img str="" title="图片" witer="200px" height="150px" border="2px" alt="图片显示错误" align="left"/>  title表示图片的标题，witer表示长度，height表示宽度，border表示边框宽度，alt
当图片无法正常显示时，输出alt，align表示图片对齐方式，align必须有参照物，才能有效
表格标签
<table border="1px" width="300px" height="200px" cellpadding="20px" cellspacing="20px"><tr><td<td/><th><th/><tr/><table/>
table 表示表格
border表示表格可见度，默认为0
tr  表示行
td  表示列
th  表示标题列，自动居中，加黑加粗
cellpadding 表示内容与单元格距离
cellspacing 表示单元格与单元格距离
colspan   列合并，默认向右合并
rowspan  行合并，默认向下合并
bgcolor   背景颜色

表单标签
value表示默认显示

<form action="http://www.baidu.com/s"  method="get">
form   表单标签
action 表单提交的位置
method 表单提交的方式 get/post

<input type="text" name="wd" placeholder="手机号/用户名" autofocus="autofocus"/>
<input type="submit" value="百度一下"/>
input表示普通文本框
placeholder 表示输入提示
autofocus 表示默认光标位置
type表示文本框格式
checkbox   表示复选框
text表示文本框输入
submit是提交按钮
name表示 键
value表示 值 

<password> 密码框，输入的字符会变成圆点
<radio checked="checked"> 圆形选择框，name值相同可以变成单选框
checked表示默认勾选
<checkbox > 方形选择框，name值相同可以变成单选框
<textarea row="15" cols="20"><textarea/> textarea  是多行文本框。
row  表示是行数
cols  表示列数
<input type="file" name=""> 
file是文件选择框

<input type="hidden">
hidden是隐藏框，需要用到但又不想让用户看到时，比较好用

<select><option selected="selected"><option><select/>
select是下拉框
option是下拉框中内容
selected表示下拉框默认显示

<input type="reset" value="清除"> 
reset是清除按钮，把页面回复默认状态

<input type="button" value="按钮">
button是普通按钮，结合事件，使按按钮之后触发事件

get 依附于URL地址后面，不安全，有长度限制

post 值会被封装后发送到服务器，比较安全，没有限制

URL示例 http://www.baidu.com/s?键1=值1&键2=值2

框架标签
<iframe width="1000" height="500"  src="http://www.baidu.com"></iframe>  iframe是框架标签，width表示长度，height表示高度，src表示默认访问地址

<frameset rows="150，*，100" cols="10%，*"><frame src="" noresize="noresize"><frameset/>
frameset  框架标签
rows 横向划分
cols 纵向划分
noresize 大小固定
src   页面引用
frame  划分后的页面实现


<div class=""><div/>  
div是模块划分标签，本身无作用
class="hm"  将名字为hm的代码块引入

<head>下的标签
<style>.im{background-color:red; position relative;  left:950px; top 10px;}<style/>  
style表示样式
.im表示给im设置样式
background-color   表示背景颜色
postition:realtive  表示相对定位
left 表示距离左侧大小
top 表示距离上侧大小

<input type="enail">  邮箱表单，增强表单，具有简单校验功能，@符后面不为空

<imput type="number" min="0" max="100" minlength="1" maxlength="5">  数字表单，增强表单，具有简单校验功能，框内只能输入数字，min和max表示校验最大最小值，minlength和maxlength表示校验最大最小长度。

<imput type="range">  滑动器表单，增强表单，可以滑动选择内容

<imput type="search">  搜索表单，增强表单，具有删除功能。

<imput type="date">  日期表单，增强表单，可以选择输入内容

HTML5中增强结构标签
头部模块<header>
中间模块<nav>
底部模块<footer>

音频标签
<audio src=""><source src=""><source><audio/>
audio  表示audio音频标签
source 表示source音频标签
src 表示音频路径
controls="conteols" 表示控制条

视频标签
<video src="" controls="controls"><source><source></video>

多媒体标签
<embed src=""><source><source></embed>

增强列表标签
<figure><figcaption><figcaption><figure/>
figure是列表标签
figcaption 
增强下拉框标签
<details><summary>请选择<summary>
<p><mark><mark><p><details>
details是增强下拉框标签，内容默认详细信息
summary 表示默认选项信息
p  表示选项信息
mark 表示着重突出的
刻度标签
<meter max="" min="" value="" low="" high=""><meter>
meter是刻度标签
max 表示规定的最大值
min 表示规定的最小值
value 表示当前值
low 表示定义的最小值
high 表示定义的最大值
进度条标签
<progress max=""  value=""><progress/>
progress 是进度条标签
max表示规定的最大值
value 表示当前值
画笔标签
<canvas><canvas/> 可以绘制图形
需要JavaScript技术实现

<link><link/>  加载资源标签
</pre>