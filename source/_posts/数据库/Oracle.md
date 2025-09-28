---
title: Oracle
date: 2025-06-24 23:00:32
tags:
categories: "数据库"
---


<b>Oracle数据库</b>

UNICODE，字符编码格式
字母数字为1字节
汉子为3字节

字符类型
CHAR类型 定长字符串，会用空格填充来达到最大长度，最大存储2000字节，当未给定长度，默认为1
VARCHAR2类型 变长字符串，他不会用空格填充，最多存储4000字节。
NVARCHAR2类型，包含UNICODE格式数据的变长字符串，最多存储4000字节

数字类型
NUMBER类型
NUMBER(P，S)是最常见的数字类型，P是Precison的缩写，即精度缩写，表示有效数字的位数，最多不能超过38个有效数字，S是Scale的缩写，表示小数点数字的位数。

INTEGER类型
INTEGER是NUMBER的子类型，他等同于NUMBER(38，0)，用于存储整数，若插入，更新的数值有小叔，则会被四舍五入。

浮点数
BINARY_FLOAT类型
BINARY_FLOAT是32位，单精度浮点数字数据类型，可以支持至少6位精度，每个BINARY_FLOAT的值需要5个字节，包括长度字节。

BINARY_DOUBLE类型
BINARY_DOUBLE是64位，双精度浮点数字数据类型，可以支持至少6位精度，每个BINARY_DOUBLE的值需要9个字节，包括长度字节。

日期类型
DATE 类型
DATE是最常用的数据类型，日期数据类型存储日期和时间信息。虽然可以用字符或数字类型表示日期和时间信息,但是日期数据类型具有特殊关联的属性。为每个日期值，Oracle存储以下信息：世纪、年、月、日期、小时、分钟和秒。一般占用 7个字节的存储空间。

TIMESTAMP 类型
这是一个 7字节或 12 字节的定宽日期时间数据类型。它与 DATE数据类型不同，因为TMESTAMP 可以包含小数秒，带小数秒的 TMESTANP 在小数点右边最多可以保留9位。

TIMESTAMP WITH TIME ZONE 类型
这是 TTIMESTANP 类型的变种，它包含了时区偏移量的值。

TIMESTAMP WITH LOCAL TIME ZONE 类型
将时间数据以数据库时区进行规范化后进行存储。

LOB 类型
CLOB 类型(Character Large Object)
二进制数据，存储单字节和多字节字符数据。最大长度 4G。

BLOB 类型(Binary Large Object)
它存储非结构化的二进制数据大对象，它可以被认为是没有字符集语义的比特流，一般是图像、声音、视频等文件。最大长度 4G。

NCLOB 数据类型
存储 UNICODE 类型的数据，最大长度4G。

LONG & RAW & LONG RAW 类型
L0NG类型
它存储变长字符串(超长字符串)，最多达 2G 的字行数据（2GB 是指 2千兆字节，而不是2千兆字符）。

LONG RAW 类型
能存储 2GB 的原始二进制数据，可存放多媒体图象声音等。

RAW 类型
用于存储二进制或字行类型数据，必须制定长度。这种数据类型存储的数据不会发生字符集转換。可存放多媒体图象声音等。

dual   伪表。   当数据来源不存在表中，可以拿伪表填充语法
lower()   转换为小写字符串
upper()   转换为大写字符串
initcap()   转换为首字母大写，其余小写字符串

单行函数

字符函数
concat(x，y)    将x和y拼接到一起

substr(x，1，5)  将x字符串从左向右从第一个字符截取到第五个

substr(x，5)  将x字符串从左向右从第五个字符截取到末尾

length(x)   获取字符串的长度

instr(x，y)  查找y字符在x字符串的哪个位置

instr(x，y，1，2) 查找y字符在x字符串的哪个位置，从1开始查找，查找第2次出现y字符的位置

lpad(x，10，y)  将y字符串填充到x字符串的左侧，填充完的字符串总长度为10

rpad(x，10，y)  将y字符串填充到x字符串的右侧，填充完的字符串总长度为10

trim(x)   去掉首或尾字符，去掉的字符与原字符串需要用from连接，默认去掉头尾二测字符， 去掉尾字符 trailing
去掉首字符 leading
去掉首尾字符 both

replace(x，y，z) x为原字符串，y为需要被替换的字符串，z为需要替换字符串

数字函数
round(x，y)   将x保留y位小数，并四舍五入，输出

trunc(x，y)  将x保留y位小数，输出

trunc(x)  将x保留整数，输出

mod(x，y)  输出x除以y的余数

日期函数
sysdate   返回数据库服务器的日期和时间

date+1   date日期加上一天之后的日期

date-1   date日期减去一天之后的日期

date-date   date减去date后的天数

date+number/24  date+小时数，返回一个日期，附带小时

转换函数

to_char(x，y) 将一个日期或者数字转换为字符类型。带格式化样式y

to_number(x，y) 将x转换成数值型的格式，带格式化样式y

to_date(x，y)  将x转换成日期类型的格式，带格式化样式y

通用函数 

nvl(x，y)   将值x转换为值y，x可为空值。x和y类型必须一致

nvl2(x，y，z)  若x为空则转换为值y，若x不为空则转换为值z，类型不一样时没有显式转换则会隐式转换

nullif(x，y)   比较两个表达式，如果相等，返回空，如果不相等，返回第一个表达式，第一个表达式不能为null

coalesce(x，y，…z)  返回参数中第一个非空表达式的值

if then else表达式
(1)  case x when  then 
           when  then
            else
end
判断x与when后面的语句相等，则返回对应的then语句，如果都不相等则返回else的语句，end表示结束

(2)   decode(x，y，z，y1，z1，default)
x同case x
y同when
z同then
default同else

外连接
使用  on 给定连接条件

孤儿数据   被连接的列中，为空值的数据。
左外连接   left outer join      包含左表的孤儿数据
右外连接   right outer join     包含右表的孤儿数据
全外连接   full outer join    包含左表和右表的孤儿数据

Oracle扩展的外连接 

  有(+) 的一侧只显示符合条件的数据，另一侧显示符合条件的数据和孤儿数据

using   匹配唯一的列，多表中有多个相同名称的列，，，用using指定连接列，using连接条件为等值连接

inner join   内连接，使用inner join连接多个表，on给定连接条件

组函数

AVG(arg)函数:对分组数据做平均值运算。
arg:参数类型只能是数字类型。

SUM(arg)函数：对分组数据求和。
arg:参数类型只能是数字类型。

MIN(arg)函数:求分组中最小数据。
arg:参数类型可以是字符、数字、日期。

MAX(arg)函数:求分组中最大数据。
arg:参数类型可以是字符、数字、日期。

使用 COUNT 函数
COUNT 函数：返回一个表中的行数。
COUNT函数有三中格式:
•COUNT(*)
•COUNT(expr)
•COUNT(DISTINCT expr)

COUNT(*)
返回表中满足 SELECT 语句标准的行数，包括重复行，包括有空值列的行。如果WHERE 子句包括在 SELECT 语句中,COUNT(*)返回满足 WHERE 子句条件的行数。

COUNT(expr)函数
返回在列中的由 expr 指定的非空值的数。

COUNT(DISTINCT expr)
使用 DISTINCT 关键字禁止计算在一列中的重复值。

GROUP by 创建分组

having   过滤分组后的数据

z = in(x，y)   通z=x or z=y，只能做等值判断

any(x，y)  同in(x，y)，any可以做不等值判断

z>all(x，y)  通z>x and z>y   不可做等值判断

SQL99
cross join   交叉连接   返回两个表的笛卡尔乘积
natural join 自然连接   连接两个表中名字相同的列，用using可指定连接列
inner join 内连接 ，(与等值连接和不等值连接相似)

