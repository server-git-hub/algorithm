---
title: Sql
date: 2025-06-24 12:18:44
tags:
categories: "数据库"
---


<b>DCL语言</b>
grant 权限/角色 to 用户
grant后面加需要授予的权限/角色，to后面加需要被授予权限的用户
create session   登录权限
create table  表权限
create sequence 序列权限
create view 视图权限
ceeate procedure 创建存储过程权限
unlimited tablespace  使用永久表空间权限
----------------------------
撤销权限 
revoke 权限/角色 from 用户

create role name 创建角色 角色名叫name
----------------------------
执行计划
sql语句执行过程，怎么执行的，称为执行计划
执行顺序
缩进最多的最先执行，缩进相同的上面的先执行


<b>DDL语言(数据定义语言)</b>
create 创建数据库对象
drop   删除数据库对象
alter 修改数据库对象
rename 修改数据库对象名称

alter biao biao1
biao 表示你要对表操作
biao1 表示你要对biao1这个表操作
add  添加
modify   修改
drop column 删除

modify(列名，类型，默认值)
rename 列名 to 新列名

truncate table   截断表
只清空表内数据，表结构和表不动
截断时隐式事物

drop table 删除表

约束类型
not null  指定列不能包含空值(非空约束)

unique 指定列的值或列的组合的值对于表中所有的行必须是唯一的(唯一约束)

primary key 表的每行的唯一性标识(主键约束)

foreign key 在列和引用表的一个列之间建立并且强制一个外键关系(外键约束)

references biao(lie)  指定列作为外键参考

check 指定一个必须为真的条件

autoincrement  自增长

id not null   给id这个列定义非空约束

id uniqye   给id这个列定义唯一性约束

constraint yueshuname yueshu    给定约束名定义字


查看约束
constraint_name   查看约束名字
constraint_type   查看约束类型
search_condition   查看检查约束

禁用/启用约束
disable/enable

disable/enable constraintaint yueshuname 启用/禁用约束

视图
view

拒绝DML操作   with read only

创建视图   create VIEW view as select
删除视图 DROP VIEW view
内键视图   select子查询生成内键视图。

Top-N分析
可以用来做排行
rownum 伪列 它为从子查询返回的每一行指定一个从1开始的连续的值
where rownum>=3   取前三个   投影时大于3的会被舍弃

create sequence name  
创建序列(Oracle)
increment by n
序列号以每次加n递增
start with n 
第一个序列号为n
maxvalue 
指定序列最大值
nomaxvalue 
 对于升序序列指定最大值为10∧27，降序最大为-1(这是默认选项)
minvalue 
指定序列最小值
nominvalue 
对于升序序列指定最小值为1，降序最大为-(10∧26)(这是默认选项)
cycle/nocycle
序列达到最大或最小值后是否继续产生(nocycle是默认选项)
cache n/nocache  
指定Oracle服务器预先分配多少值，并且保持在内存中，(默认情况，Oracle服务器缓冲20个值)

创建序列结构 create sequence 序列名称 递增
 初始值  最大值  达到最大值/最小值是否继续  是否缓存

nextval 返回下一个可用的序列值，他每次返回一个唯一的被引用值，即使对于不同的用户也是如此
currval 获得当前的序列值，在currval获取值之前，nextval至少使用一次

alter sequence 修改序列
alter sequence语句 start with 不能被修改，并且修改只能影响以后的序列
----------------------------
create INDEX index on biao(lie1…lie999) 创建索引
单行索引    为一个列添加索引
复合索引    为多个列添加索引
函数索引    为一个做函数运算过的列添加索引
删除索引  drop INDEX index
----------------------------
同义词    为表或列，视图，序列，对象 起别名
create synonym name for biao
给biao起别名叫name

删除同义词   drop synonym name
将同义词name删除
----------------------------
create User user identified by 123456 创建用户
identified by 给用户设置密码
default tablespace biao1 给用户设定永久表空间 biao1
temporary tablespace biao2 给用户设定临时表空间 biao2

删除用户 drop User user
cascaed 将用户下的其他对象一起删除



<b>DML语言</b>
insert into user values 插入行
update set修改行
delete 删除行
insert into biao(column) values()
biao(column)表示向哪个表的哪个列插入
values表示需要插入的值
只能添加一行

commit   事务提交

update biao set column=x  where 修改已存在的行
biao 表示指定哪个表
lie表示指定哪个列
x表示需要修改的数据

delete from biao where   删除指定行
truncate  table biao 删除整个表的数据
truncate会重置自动增长的值


<b>DQL语言</b>
连字符  ||
desc table 查看指定表结构
select语句
select  执行操作
from table   table为来源

*选择所有的列
DISTINCT关键字表示禁止重复
column/expression 选择指定的字段或表达式
alias 给所选择的列不同的标题
FROM table 指定包含列的表
escape   指定转义符号
order by asc/desc  用于排序


<b>TCL 事务处理语言</b>
commit 事物提交
rollback  事物回滚
savepoint 设置回滚点
savepoint设置回滚点，rollback to 回滚到回滚点
start transaction 在Mysql数据库中关闭自动事物提交(只影响当前事务)
set autocommit=off   在Mysql数据库中关闭自动事务提交(只影响当前连接)


<b>数据库范式</b>
第一范式   保证列的原子性，不带有子项或父项

第二范式   使用多对多的方式解决冗余的数据，使主键与列相关

第三范式   使用一对多的方式确保表的相关性，使列与主键直接相关