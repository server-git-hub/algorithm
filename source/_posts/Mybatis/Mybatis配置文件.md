---
title: Mybatis配置文件
date: 2025-06-25 17:51:29
tags:
categories: "Mybatis"
---
mybatis配置头文件：
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE configuration
            PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
            "http://mybatis.org/dtd/mybatis-3-config.dtd">



<configuration>   mabatis配置根标签
<environments default="development">   环境配置，default为选择应用哪一个环境
<environment id="development">  配置环境
<transactionManager type="JDBC"/>   Mybatis内置的事务管理器
<dataSource type="POOLED">   配置数据源
<property name="" value=""/>   配置具体参数
    例：
    <!-- environments表示配置Mybatis的开发环境，可以配置多个环境，在众多具体环境中，使用default属性指定实际运行时使用的环境。default属性的取值是environment标签的id属性的值。 -->
    <environments default="development">
        <!-- environment表示配置Mybatis的一个具体的环境 -->
        <environment id="development">
            <!-- Mybatis的内置的事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 配置数据源 -->
            <dataSource type="POOLED">
                <!-- 建立数据库连接的具体信息 -->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ku1"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    
引入映射文件
    <mappers>
        <!-- Mapper注册：指定Mybatis映射文件的具体位置 -->
        <!-- mapper标签：配置一个具体的Mapper映射文件 -->
        <!-- resource属性：指定Mapper映射文件的实际存储位置，这里需要使用一个以类路径根目录为基准的相对路径 -->
        <!--    对Maven工程的目录结构来说，resources目录下的内容会直接放入类路径，所以这里我们可以以resources目录为基准 -->
        <mapper resource="mappers/studentMapper.xml"/>    //单独指定
        <mapper resource="mappers/fenshuMapper.xml"/>     //单独指定
        <package name="" />   //批量指定，需要指定映射文件和接口同时所在的包，并且接口名称与映射文件名称要相同
    </mappers>



<settings>   设置一些功能的开关,(xml配置文件有声明顺序)
    <setting name="logImpl" value="STDOUT_LOGGING"/>   设置日志，在控制台输出，name为功能名称，value表示功能参数
    <setting name="autoMappingBehavior" value="FULL"/>  设置resultMap自动映射，FULL可以为嵌套属性自动映射
    <setting name="lazyLoadingEnabled" value="true"/>  设置分布查询的延迟加载，相当于延迟加载总开关
    <setting name="aggressiveLazyLoading" value="true"/>  设置积极延迟加载(会将下一层的查询提前执行)
    <setting name="mapUnderscoreToCamelCase" value="true"/>  设置自动映射，例如带_，或者驼峰命名规则可以进行自动映射
    
</settings>

<typeAliases>   配置类型别名
    <package name=""/>   为整个包下起别名，规则为首字母小写，可以使用@Alias注解搭配使用起别名
    <typeAlias type="" alias=""/>   type为类型，alias为别名
</typeAliases>








mybatis的mapper配置文件：
mapper配置头文件：
    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.server.Dao.UserDao">   //根标签 namespace指定接口
    <select id="selectUserById" resultType="com.server.pojo.User">  //select   id为接口的方法名，resultType为映射实体类
        select name,age from user where id=#{id}        // sql语句
    </select>
</mapper>

占位符：
    #{key} 占位+赋值，避免sql注入，但只能用于值的部分
    ${key} 字符串拼接，可以用于任何地方，但会有sql注入风险，避免外部输入

传参：
    一个参数：建议名称与形参名称一致，但只有一个参数，所以名称任意，都会匹配唯一的这个参数
    多个参数：
        1.mybtais默认命名 arg(0-n)  或 param(1-n) 可以混用，但不推荐，推荐注解
        2.在形参列表上加@Param("")注解，指定名称 
    map参数：只能用map的key做为名称
    实体类参数：只能用属性名称做为名称
    特殊：
        嵌套：使用  "." 逐级访问

接收返回值：
    resultType属性：设定返回值类型
        简单类型：类型的全限定符
        优化类型：(mybatis的简化名称)，为java自带的常用类型简化名称
            自定义类型别名：(Mybatis主配置文件中配置)
                1.为自定义类起别名
                <typeAliases>
                    <typeAlias type="" alias=""/>  type为类型，alias为别名
                </typeAliases>
                2.为整个包下所有自定义类起别名，规则为首字母小写
                <typeAliases>
                    <package name=""/>
                </typeAliases>
        特殊：
            map：1.将列名作为key，值作为value
                 2.使用@MapKey("")注解，声明实体类的属性作为map的key，值作为value，此时resultType类型为map的value类型
            list：rusultType为list泛型的类型
    resultMap属性：指定resultMap的id，设定高级映射(重要)
        <resultMap id="result" type="">  id为唯一标识，type为结果集类型
            <id column="" property=""/>  主键映射关系，column为列名，property为实体类属性
            <result column="" property=""/>  其他映射关系，column为列名，property为实体类属性
            <association property="" javaType="">  对象类型赋值，property指定对象引用(变量名),javaType为对象类型 
                <id column="" property=""/>   主键映射关系，column为列名，property为实体类属性
                <result column="" property=""/>  其他映射关系，column为列名，property为实体类属性
            </association>
            <collection property="" ofType="">   集合类型赋值，property指定集合引用(变量名)，ofType为集合泛型类型 
                <id column="" property=""/>  主键映射关系，column为列名，property为实体类属性
                <result column="" property=""/>  其他映射关系，column为列名，property为实体类属性
            </collection>
        </resultMap>






特殊：(主键回显)
    在映射文件中的insert标签中设置属性
        keyProperty=""  设置装配到实体类的属性
        keyColumn=""    设置被回显的列名
        useGeneratedKeys=""  设置是否开启主键回显
    Mybatis维护主键：
        定义映射文件中的insert标签的子标签
        <selectKey keyProperty="" resultType="" order=""> keyProperty="" //装配到实体类的属性，resultType="" 返回值，order="" 在插入之前还是之后
            select replace(uuid(),"-","");
        </selectKey>


嵌套结果：使用resultMap高级映射将多表结果嵌套装载

嵌套查询：查询出的结果使用resultMap映射之后，根据第二次查询的预期结果使用collection或association并设置select属性指定下一次查询，指定column作为下一次查询的条件



动态sql：
    if  满足条件执行代码块，test参数为条件表达式
    where 进行动态添加和省略where关键字，可以自动识别并去掉多余的and和or
    set  在update中使用，用于添加set条件
    trim 
        prefix  指定要动态添加的前缀
        suffix  指定要动态添加的后缀
        prefixOverrides  指定要动态删除的前缀，使用 | 分隔可以有多个值
        suffixOverrides  指定要动态删除的后缀，使用 | 分隔可以有多个值
    choose when otherwise   
        choose中只有一个生效，具有优先级
        when   满足when的条件表达式使所属代码块生效
        otherwise 相当于default，且必须有otherwise
        foreach 循环
            collection  循环的集合
            item  每次遍历的变量
            separator 两次遍历之间的字符，开始和结束不添加
            open  开始循环添加的字符
            close 结束循环添加的字符
特殊：执行多条sql语句需要配置数据库参数 allowMultiQueries=true
特殊：
    <sql id="">   提取sql片段
        
    </sql>
    <include refid=""/> 引入sql片段















------------------------------------------------------------------------------------------------------------


Mybatis配置文件

全局配置文件
全局配置文件头文件
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

</configuration>
configuration为根节点

properties 标签
Mybatis 配置文件中的属性定义。properties 标签中允许内部定义属性，也可以是外部的
properties 文件定义属性。无论是内部定义还是外部定义，都可以使用${name}获取值。
配置文件中内部定义
<properties>
<property name="name" value="value"/>
</properties>
配置文件中外部定义
<properties resource="db.properties"></properties>


settings标签
setting 标签的配置是配置 MyBatis 框架运行时的一些行为的，例如缓存、延迟加载、
结果集控制、执行器、分页设置、命名规则等一系列控制性参数，其所有的 setting 配置都
放在父标签 settings 标签中。


typeAliases标签
类型别名可为 Java 类型设置一个缩写名字。
<typeAliases>
<typeAlias alias="user" type="com.bjsxt.pojo.User"/>
</typeAliases>
也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean
<typeAliases>
<package name="com.bjsxt.pojo"/>
</typeAliases>

environments标签
MyBatis 可以配置多个环境。这可以帮助你 sQL 映射对应多种数据库等。比如说，想为
开发、测试、发布产品配置不同的环境。
<environments default="development">
<environment id="development">
<transactionManager type="JDBC"/>
<dataSource type="POOLED">
<property name="driver" value="${jdbc.driver}"/>
<property name="url" value="${jdbc.url}"/>
<property name="username" value="${jdbc.username}"/>

default表示执行哪个environment

transactionManager节点
事务处理器。
在 MyBatis 中有两种类型的事务管理器（也就是 type="[JDBC/MANAGED]")
JDBC ：这个配置直接使用了 JDBC 的提交和回滚设施，它依赖从数据源获得的连接来
管理事务作用域。
MANAGED ：不做事务处理。

dataSource标签
dataSource 元素使用标准的 JDBC 数据源接口来配置 JDBC 连接对象的资源.
UNPOOLED：使用直连。
POOLED：使用池连。
JNDI ：使用 JNDI 方式连接

mapper标签
指定映射配置文件
使用相对于类路径指定映射配置文件
网

使用相对路径
<mappers>
<mapper resource="com/bjsxt/mapper/UserMapper.xml"/>
</mappers>
使用 filter:///协议指定映射配置文件
<mappers>
<mapper
url="file:///D:\code\mybatis\src\com\bjsxt\mapper\UserMapper.xml"/>
</mappers>
指定映射接口
<mappers>
<mapper class="com.bjsxt.mapper.UserMapper"/>
</mappers>
通过包名指定映射接口
<mappers>
<package name="com.bjsxt.mapper"/>
</mappers>



映射配置文件
头文件
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//2EN"
"http://mybatis.org/atd/mybatis-3-mapper.dtd">
<mapper namespace="com.bjsxt,mapper Userkapper">
</mapper>

mapper namespace表示命名空间，输入文件路径不带后缀

resultMap标签
指定查询结果集与对象的映射关系，是最复杂也是最强大的标签。
id：唯一标识。
type：指定被映射的类

<resultMap id="userMapper" type="com.bjsxt.pojo.User">
<id property="userid" column="user_id"/>
<result property="username" column="user_name"/>
</resultMap>

property表示被映射的属性，column表示需要映射的列
id标签
指定主键中的值，用于标识一个结果映射。
result标签
指定非主键中的值，用于标识一个结果映射。
association 标签
通常用来映射一对一的关系。
collection 标签
通常用来映射一对多的关系。


select标签
查询语句。
id：当前查询语句的唯一标识，该属性的值不能重复。
parameterType：指定参数类型。该属性是可选属性。因为 MyBatis 可以通过类型处理
器（TypeHandler）推断出具体传入语句的参数。
resultType：指定结果需要被映射到哪个类
resultMap：使用 resultMap 标签来处理结果集映射。
<select id="selectuser" parameterType="int" resultType="u"或resultMap="id">
select * from users where userid =#{userid}
</select>

insert标签
添加语句。
id：当前添加语句的唯一标识，该属性的值不能重复。
parameterType：指定参数类型，可以给定别名。该属性是可选属性。
<insert_id="insertuser" parameterType="com.bjsxt.pojo.User">
insert into users values(default,#{username},#{usersex})
</insert>

update标签
更新语句。
id：当前更新语句的唯一标识，该属性的值不能重复。
parameterType>指定参数类型，可以给定别名。该属性是可选属性。
<update id="updateuser" parameterType-"com.bjsxt,pojo.User">
update users set username=#lusername},usersex=#{usersex} where
userid =#{userid}
</update>

delete标签
删除语句。
id：当前删除语句的唯一标识，该属性的值不能重复。
parameterType：指定参数类型，可以给定别名。该属性是可选属性。
<delete id="deleteuser" parameterType="int">
delete from users where userid =#{userid}
</delete>

sql标签
可以用来定义可重用的 sQL 代码片段。通过<include>标签引入该片段。
id：当前 SQL 片段的唯一标识，该属性的值不能重复。
<sql id="userColumns">
userid,username,usersex
</sql>
<select id="selectuser" parameterType="int" resultType="u">
select <include refid="userColumns"/> from users
</select>
sql标签使用<include refid="id"/>导入。






