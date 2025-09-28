---
title: JDBC
date: 2025-06-21 21:36:43
tags:
categories: "JDBC"
---

<b>JDBC技术</b>


常用：
//注册驱动
Class.forName("com.Mysql.jdbc.Driver");
//获取链接
Connection connection=DriverManager.getConnection(url,user,password);  url,user,password     jdbc:数据库厂商名://ip/端口/数据库名称，账号，密码
//编写sql语句
String sql="select * from biao1 where user=? and password=?";
//创建PreparedStatement
PreparedStatement ps=connection.PreparedStatement(sql);
//占位符赋值
ps.SetObject(1,user);
ps.SetObject(2,password);
//发送sql语句，并返回结果
ResultSet resultSet=ps.executeQuery();
//解析结果集
while(resultSet.next()){
    int id=resultSet.getInt("");
    String str=resultSet.getString("");
}
//关闭资源
resultSet.close();
statement.close();
connection.close();


----
//用于获取列信息
ResultSetMetaData resmd=res.getMetaData();   //res为ResultSet

特殊：主键回显
插入时获取自增长主键到PreparedStatement：在创建PreparedStatement时，额外给个ps.RETURN_GENERATED_KEYS参数
ps.getGeneratedKeys() 获取自增长主键

特殊：批量插入(结构：insert into biao1(...) values(...),values(...),values(...))
url加上参数：rewriteBatchedStatements=true
占位符赋值后使用ps.addBatch() 追加values后面
ps.executeBatch()   批处理插入语句


特殊：事务
connection.setAutoCommit(false);  关闭失事务自动提交

特殊：连接池(druid)
Properties pt=new Properties();   //创建Properties对象
InputStream is=类名.class.getclassLoader.getResourceAsStream("druid.properties");   //使用类加载器加载配置文件
pt.load(is);   //将配置文件读入Properties对象
DataSource ds=DruidDataSourceFactory.createDataSource(pt);  //使用连接池的工具类的工厂模式创建连接池




-----------------------------------------------------------


Driver     是JDK提供给数据库的连接接口。
URL  格式  JDBC:Mysql://localhost:3306/ku1?useSSL=false
JDBC  表示主协议
Mysql 要连接的数据库
localhost  连接的真实地址
3306   端口号 
ku1   被连接的数据库中的库的库名
?   表示参数
useSSL 是安全协议，默认开启状态，开启不用在执行时会有警告，如果不用，就给flase关闭他

Driver下的connect(URL，properties info)方法，给定连接数据库时需要的参数



lianxi1.class.getClassLoader().getResourceAsStream("text.properties")
表示获取加载lianxi1这个类的类加载器，使用这个类的类加载器加载text.properties文件，这个方法返回inputstream类型的参数

实例化properties工具类
properties下的load(Stream st)方法，通过放入的输入流对象读取properties并解析他

properties下的Property(key k)方法，通过给定的key获取对应的value




properties文件，常用于作为配置文件，结构为key=value

Connection   是数据库连接对象
DriverManager   类是实现driver接口的接口实现类
getconnection(String URL，String user，String password)

利用反射技术加载driver类，driver内置静态块，静态块中包含实例化driver的代码
Class.forname("com.mysql.jdbc.driver")
DriverManager.getConnection(url，用户名，密码)    用于获取数据库的连接对象


Properties工具类
位于java.util包中，该工具类继承自Hashtable<Object,Object>。通过Properties工具类可以读取.properties类型的配置文件。
Properties工具类中常用方法
load(InputStream is)
通过给定的输入流对象读取properties文件并解析
getProperty(String key)
根据key获取对应的value


Connection接口
Connection是数据库的连接（会话）对象。对数据库的一切操作都是在这个连接基础之上进行的，我们可以通过该对象执行 sql 语句并返回结果。

createStatement()
创建向数据库发送 sql的 Statement 接口类型的对象。
preparedStatement(sql)
创建向数据库发送预编译 sql 的 PrepareSatement 接口类型的对象。
setAutoCommit(boolean autoCommit)
设置事务是否自动提交。
commit()
在链接上提交事务。
rollback()
在此链接上回滚事务。


Statement 接口
用于执行静态 SQL 语句并返回它所生成结果的对象。由 createStatement 创建，用于发送简单的 SQL 语句（不支持动态绑定）。

execute(String sql)
执行参数中的 SQL，返回是否有结果集。
executeQuery(String sql)
运行 select 语句，返回 ResultSet 结果集。
executeUpdate(String sql)
运行 insert/update/delete 操作，返回更新的行数。
addBatch(String sql)
把多条 sql语句放到一个批处理中。
executeBatch()
向数据库发送一批 sql语句执行。




PreparedStatement接口
继承自 Statement 接口，由 preparedStatement 创建，用于发送含有一个或多个参数的 SQL 语句。PreparedStatement 对象比 Statement 对象的效率更高，由于实现了动态的参数绑定，所以可以防止 SQL 注入，所以我们一般都使用 PreparedStatement。

addBatch()
把当前 sql语句加入到一个批处理中。
execute(）
执行当前 SQL，返回个 boolean 值
executeUpdate()
运行 insert/update/delete 操作，返回更新的行数。
executeQuery()
执行当前的查询，返回一个结果集对象
setDate(int parameterIndex, Date x)
向当前SQL语句中的指定位置绑定一个java.sql.Date值
setDouble(int parameterIndex, double x)
向当前 SQL 语句中的指定位置绑定一个 double值
setFloat(int parameterIndex, float x)
向当前 SQL 语句中的指定位置绑定一个 float 值
setInt(int parameterlndex, int x)
向当前 SQL 语句中的指定位置绑定一个 int 值
setString(int parameterIndex, String x)
向当前 SQL 语句中的指定位置绑定一个 String 值




ResultSet接口
ResultSet用来暂时存放数据库查询结果的结果集的指针

getString(int index)、getString(String columnName)
获得在数据库里是 varchar、char 等类型的数据对象。
getFloat(int index)、getFloat(String columnName)
获得在数据库里是 Float 类型的数据对象。
getDate(int index)、getDate(String columnName)
获得在数据库里是 Date 类型的数据。
getBoolean(int index)、getBoolean(String columnName)
获得在数据库里是 Boolean 类型的数据。
getObject(int index)、getObject(String columnName)
获取在数据库里任意类型的数据。
getMetaData() 获取结果集信息，返回ResultSetMetaData类型参数。
ResultSetMetaData下的getColumnCount()方法获取列的个数
getColumnName(int i) 通过序号获取列名





JDBC中三种Statement对象
Statement：用于执行静态 SQL 语句。
PreparedStatement:用于执行预编译SQL语句。
火
CallableStatement:用于执行数据库存储过程。

connection.createStatement()  使用 connection对象的createStatement方法获取Statement对象

execute()   执行sql操作，有结果集返回，则返回true，没有结果集返回，则返回false
executeQuery()  执行DQL操作，返回ResultSet结果集
executeUpdate()   执行DML操作，返回更新的行数

preparedStatement 
preparedStatement继承于Statement
效率高于Statement，支持动态绑定参数，具备SQL语句预编译能力，可防止SQL注入问题
connection.prepareStatement(SQL)  通过connection创建PreparedStatement对象


Resultset 存储SQL查询的结果的结果集，采用分块加载的方式，保存数据
next() 初始在第一行之上，向下移动指针，有值返回true，没有值返回false
getInt(int x)   通过列序号获取数据
getInt(String x) 通过列名获取数据




addBatch()  把若干SQL语句装载到一起。
executeBatch()  会将装载到一起的SQL语句执行。
clearBatch() 清除addBatch()中的SQL语句。



Mysql中的URL参数说明
useUnicode   是否使用编码集，需要配合characterEncoding参数使用

characterEncoding 指定编码格式

useSSL   是否使用useSSL协议

rewriteBatchedStatements   可以重写向数据库提交的SQL语句(是否开启批处理)

事物处理
setAutoCommit()
Connection下的setAutocommit()方法能设置是否开启事物处理，默认自动提交事物。


解除文件大小限制
虽然MediumBlob允许保存最大值为16M，但MySql中默认支持的容量为4194304即4M。
我们可以通过修改Mysql的my.ini文件中max_allowed_packet属性扩大支持的容量，修改完毕后需要重启MySql服务。


blob.getBinaryStream()
从blob对象中读取二进制文件到流对象中

数据库连接池
DataSource  连接池接口
DruidDataSourceFactory 接口实现类
createDataSource(Properties p)  获取数据库连接池对象的方法

Class.Instance()   通过反射实例化对象

第三方Apache包
BeanUtils.setProperty(Object obj，String nane，String value)
obj表示被映射的对象
name表示被映射的属性
value表示映射的值



