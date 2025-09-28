---
title: 关于SpringBoot
date: 2025-06-25 23:20:52
tags:
categories: "Springboot"
---


1.继承springboot项目(所有不需要写的配置都在这个父工程里面了)
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.5</version>
</parent>

场景启动器：
    核心启动器：(所有启动器都依赖这个核心启动器)
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    web：
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    aop：
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
    redis：
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
    Knifej:
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
            <version>4.3.0</version>
        </dependency>



基本使用：
    1.@SpringBootApplication  配置启动类，加上该注解表示这是一个SpringBoot启动类
    2.SpringApplication.run(Run.class,args);   启动SpringBoot
    2.5.测试类不在启动类的包或子包下需要指定启动类

@ConfigurationProperties   批量读取配置
    prefix 配置读取前缀，只要最终的后缀与属性名相同就可以注入

多环境配置：
    1.配置文件名称规范 application-XXX.yml/yaml/properties
    2.
        1.在application.yml/yaml/properties中配置读取
        2.运行时激活配置：java -jar -Dspring.profiles.active=动态部分...多个

静态资源目录：
    默认：
        classpath:/META_INF/resources/
        classpath:/resources/
        classpath:/static/
        classpath:/public/


整合SpringMVC
    配置拦截器：
        使用配置类方式：
            实现WebMvcConfigurer接口(MVC特殊配置类接口，包含所有MVC配置)
                重写其中的addInterceptors方法，其中的参数InterceptorRegistry用来配置拦截
                            addInterceptor("拦截器对象")
                            addPathPatterns("拦截地址")
                            excludePathPatterns("排除地址")
                            order("优先级问题")


整合Mybatis
    必选配置：
        spring.datasource.username  配置数据库用户名
        spring.datasource.password  配置密码
        spring.datasource.url   配置数据库连接url
        spring.datasource.driver-class-name 配置driver(数据库驱动)
        spring.datasource.type 配置连接池类型
        mybatis.mapper-locations   配置mapper映射文件位置
    可选配置：
        mybatis.type-aliases-package   自定义省略包名
        mybatis.configuration.map-underscore-to-camel-case  配置列名驼峰映射和下划线映射
        mybatis.configuration.auto-mapping-behavior   配置自动映射，full为开启嵌套映射
        mybatis.configuration.log-impl  配置日志信息
        mybatis.configuration.lazy-loading-enabled  配置延迟加载(总开关)
        mybatis.configuration.aggressive-lazy-loading  配置积极加载
    1.在启动类上添加@MapperScan("") 注解，加载mapper接口(映射mapper文件和mapper接口是分开加载的)
      也可以单独配置扫描，在每个mapper接口上添加@Mapper


整合redis
    1.添加场景启动器SpringDataRedis
    2.必要配置：
        spring.data.redis.host=192.168.6.100
        spring.data.redis.port=6385
      其他配置：
        配置客户端类型(springboot2以后,默认切换到lettuce)
        spring.data.redis.client-type=lettuce
        redis连接池配置
        含义：这个属性指定是否启用 Lettuce 连接池。
        spring.data.redis.lettuce.pool.enabled=true
        含义：这个属性定义了连接池中允许的最大活动连接数。
        spring.data.redis.lettuce.pool.max-active=8
        含义：这个属性定义了连接池中允许的最大空闲连接数。
        spring.data.redis.lettuce.pool.max-idle=5
        含义：这个属性定义了在获取连接时最长的等待时间（以毫秒为单位）。
        spring.data.redis.lettuce.pool.max-wait=100
        切换jedis
        spring.data.redis.client-type=jedis
        spring.data.redis.jedis.pool.enabled=true
        spring.data.redis.jedis.pool.max-active=8
    3.核心对象 RedisTemplate
        opsForValue()   操作字符串
        opsForList()   操作list
        opsForSet()   操作set
        opsForZSet()   操作zset
        opsForHash()   操作hash
    4.序列化器(重要)
        三种序列化器：
            jdk：JdkSerializationRedisSerializer
            string：StringRedisSerializer
            json：GenericJackson2JsonRedisSerializer(需要导入依赖jackson)
        key 一般使用string序列化器
        value 一般使用json序列化器
        使用(将RedisTemplate自定义注册到IOC容器中，使用工厂构建，并指定序列化器)
            @Bean
            public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
            // 创建RedisTemplate对象
            RedisTemplate<String, Object> template = new RedisTemplate<>();
            // 设置连接工厂
            template.setConnectionFactory(connectionFactory);
            // 创建JSON序列化工具
            GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();
            // 设置Key的序列化
            template.setKeySerializer(RedisSerializer.string());
            template.setHashKeySerializer(RedisSerializer.string());
            // 设置Value的序列化
            template.setValueSerializer(jsonRedisSerializer);
            template.setHashValueSerializer(jsonRedisSerializer);
            // 返回修改的模板对象
            return template;
            }











高级特性：
    @Import注解：汇总导入
        在指定多配置文件时可以使用@Import注解，指定实现了ImportSelector接口的实现类，实现String[] selectImports方法，将参数使用String[]返回
    @Conditional注解：条件化注入(Bean注入到IOC容器)
        在Conditional注解中指定实现Condition接口，实现boolean matches方法的实现类，配置是否要将Bean加入到IOC容器(与@Bean结合使用)
    @ConditionalOnProperty     springboot增强版，配置profix和name，检测是否有该配置，没有则不加载配置类



打包插件：
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>3.0.5</version>
            </plugin>
        </plugins>
    </build>

命令格式 java -jar -D参数 值 -D参数 值... 文件名称


特殊：spring-banner-location   指定banner.txt文件，改变运行时文字图片标识


自动配置原理():
    IOC容器在SpringApplication.run(Run.class,agrs)创建，是在配置类调用main方法的时候创建
    @SpringBootApplication
        @SpringBootConfiguration
            @Configuration  标识为配置类，(所以写了@SpringBootApplication的启动类是主配置类)
        @EnableAutoConfiguration
            @Import  指定了实现了ImportSelector接口的实现类，返回了springboot定义的第三方配置类，(springboot会将第三方依赖创建配置类，有142套)，
        @ComponentScan  不配置默认扫描当前包以及子包(包揽了包扫描工作)，可以通过scanBasePackages属性修改，但不推荐
    (springboot定义的第三方配置类加了条件注入，满足条件才会注入到IOC容器中)
    (springboot3的第三方配置类的全限定符都在META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports,可以定义和这个名称一样的文件，springboot3也会自动读取)
    exclude参数   指定排除清单中的配置类使其不加载





















----------------------------------------------------------------------------------------------------------------


@ServletComponentScan  在Spring Boot启动时会扫描@WebServlet注解，并将该类实例化
@Configuration  将类定义为配置类

@ConfigurationProperties 将类定义为属性类，是springboot中的注解，只能读取springboot配置文件， prefix 设置读取配置文件前缀，可以通过set或构造方法注入参数，可以加到方法上，会给方法中创建的对象注入参数(set或构造方法)

EnableConfigurationProperties(Class class) 指定要读取的属性类，属性类是一般配置类，不是spring配置类，无法通过spring实例化。

new (Servlet/Filter/Listener)RegistrationBean(new Servlet)
创建一个Servlet/Filter/Listener实例化对象，放入ServletRegistrationBean中
addUrlMappings("/url") 定义Servlet/Filter/Listener的请求URL

static 目录存放静态资源
templates 目录存放动态资源

@MapperScan("")   扫描包内的mapper配置文件，实例化为bean放入spring容器

@ExceptionHander(value={})  当此类中发生value中指定的异常时，该注解下的Controller会处理此异常
@ControllerAdvice   将该类定义为全局异常处理类

SimpleMappingExceptionResolver对象   通过对象中的setExceptionMappings(properties,properties)方法添加异常与视图的映射。当发生异常时跳转到相应的视图(对象应被放入spring容器中)

HandlerExceptionResolver接口，，实现接口处理全局异常。

<spring-boot-devtools> devtools工具坐标，用于springboot热部署
设置自动编译  勾选Build project automatically

设置idea的Registry   勾选complier.automake.allow.when.app.running


多环境配置
配置文件默认命名规则
application-{profile}.properties/yml   profile表示配置文件标识。
 java -jar springboot.jar --spring.profiles.active={profile}   profile输入配置文件的标识

