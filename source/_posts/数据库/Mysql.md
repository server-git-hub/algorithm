---
title: Mysql
date: 2025-06-24 22:59:27
tags:
categories: "数据库"
---


<b>Mysql数据库</b>
数据类型

Blob类型
TinyBlob  最大255字节
Blob   最大65k
MediumBlob   最大16M
LongBlob  最大4G



浮点数类型
float(m，d)   单精度浮点型，8位精度(4字节)，m总个数，d小数位
double(m.d)   双精度浮点型，16位精度(8字节)，m总个数，d小数位
字符类型
char(n) 固定长度，最多255个字符。
varchar(n)  可变长度，最多65535个字符。
tinytext  可变长度，最多255个字符
text   可变长度，最多65535个字符
mediumtext  可变长度，最多2的24次方-1个字符
longtext   可变长度，最多2的32次方-1个字符

char 和 varchar
(1)char(n)若存入字符数小于 n，则以空格补于其后，查询之时再将空格去掉。所以 char类型存储的字符串末尾不能有空格,varchar 不限于此。
(2)char 类型的字符串检索速度要比 varchar 类型的快。

varchar 和 text
(1)varchar 可指定 n，text 不能指定，内部存储 varchar 是存入的实际字符数+1个字节（n<=255)或 2 个字节(n>255), text 是实际字符数 +2 个字节。
(2)text 类型不能有默认值。
(3)varchar可直接创建索引，text 创建索引要指定前多少个字符。varchar 查询速度快于 text,在都创建索引的情况下,text 的索引似乎不起作用。

日期类型
3.4日期类型
日以留
MySQL数据类型
date  日期‘2008-12-2'
time  时间'12:25:36'
datetime  日期时间‘2008-12-2 22:06:44'
timestamp   自动存储记录修改时间

二进制数据
二进制数据(BLOB)
(1)BLOB 和 TEXT 存储方式不同,TEXT 以文本方式存储,英文存储区分大小写,而Blob是以二进制方式存储，不分大小写。
(2)BLOB 存储的数据只能整体读出。
(3)TEXT 可以指定字符集，BLOB 不用指定字符集。


创建数据库
create database 数据库名 default character set 字符编码

show databases 查看数据库

use 数据库名称      选择数据库

information_shcema.schemata  表内存储库信息
Mysql中汉字占3个字节

修改表名
alter table 旧表名 rename 新表名

修改列名
alter table 表名 change column 旧列名 新列名 类型

修改列类型
alter table 表名 modify 列名 新类型

添加新列
alter table 表名 add column 新列名 新类型

删除列
alter table 表名 drop column 列名

查询表的约束信息
show keys from biao

自动增长
自动增长列必须是唯一的，不为空的。自动增长列只能有一个，不能为字符类型，日期类型
自动增长 auto_increment
带有自动增长的主键，需先删除自动增长才能删除主键。


创建外键会自动生成一个名字相同的索引，删除外键也需删除索引
删除主键: alter table 表名 drop primary key
删除外键: alter table 表名 drop foreign key 约束名
删除索引 alter table 表名 drop index 索引名

Mysql中 like 的占位符号用_
Mysql中 uqdate中的set和where后面不能用更新的列做子查询，但可以在uqdate后面用

字符函数  区别于Oracle的函数
concat(x1，x2…x)    拼接多个字符
trim()   删除字符串首尾空格
ltrim()   删除字符串左侧的空格
rtrim()  删除字符串右侧的空格


日期函数 区别于Oracle的函数

sysdate()或now() 获取系统当前时间
curdate()   获取系统当前日期
curtime()  获取系统当前时间
dayofmonth(date)   返回该date日期是本月的第几天
dayofweek(date) 返回该date日期是星期几，星期日为1
dayofyear(date) 返回该date日期是今年的第几天
dayname(date) 返回该日期的本月最后一天

转换函数  区别于Oracle的函数
date_format(date，format) 将日期类型转换为字符串(同Oracle中的to_char)
str_to_date(str，date)   将字符串转换为日期类型

通用函数   区别于Oracle的函数
ifnull(x1，x2)  判断x1是否为空，如果为空，则返回x2，x1不为空则返回x1 (同Oracle中的nvl())
if(x1，x2，x3)   判断x1，如果不为空则返回x2，如果为空则返回x3    (同Oracle中的nvl2())

union 将两个查询结果集合并，去除重复行。
union all 将两个查询结果集合并，不去除重复行。

SQL99
cross join   交叉连接   返回两个表的笛卡尔乘积
natural join 自然连接   连接两个表中名字相同的列，用using可指定连接列
inner join 内连接 ，(与等值连接和不等值连接相似)

Mysql中正则表达式
regexp 为正则表达式关键字
binary 区分大小写
<n$> 表示以n结尾
'^n' 表示以n开头
<.>  表示任意字符
* 表示0个或多个字符
+ 表示1个或多个字符
? 表示0个或1个字符
|   表示或者
^[n] 表示以n开头
[^n] 表示对[n]取反
n{2} 表示连续的2次n

索引

直接创建 
create index index_name on table(colimn(length))  colomn(length)表示哪个列，长度多少。

修改表添加索引
alter table biao add index index_name colimn(length)

删除索引
drop index index_name on biao

创建唯一索引
create unique index index_name on
biao(lie(length))

alter table biao add unique index_name(lie(length))

create table biao(lie，unique(lie(length)))

全文索引
fulltext  数据量大的表不建议创建
alter table biao add fulltext fulltext_name(lie(length))

使用全文索引
match(lie)   全文索引的列名
against('内容')   搜索内容
with parser ngram   更换全文解析器 换成ngram

创建用户
create user user_name identified by '密码'
权限分配
grant 权限 on 数据库.表 to 用户名@登录位置 identified by "密码"
刷新权限
flush privileges
删除用户
drop user user_name@登录地址

分页查询
limit 字句   放在查询语句最后侧，limit 开始位置，查询数量
limit offset  放在查询语句最后侧，limit 查询数量 offset 开始位置

执行计划
explain  测试执行计划

查看数据库存储引擎
show engines

修改表级存储引擎
alter table biao engine=引擎名称



