---
title: SpringMVC
date: 2025-06-25 23:25:23
tags:
categories: "SpringMVC"
---

核心组件：
    DispatcherServlet：SpringMVC提供,需要配置到web项目中，负责所有请求的接收和响应
    HandlerMapping：SpringMVC提供，需要配置到IOC容器，负责查找请求路径以及对应的controller方法的关系
    HandlerAdapter:SpringMVC提供，需要我们配置到IOC容器，负责参数简化以及响应数据简化处理
    ViewResovler：SpringMVC提供，需要我们配置到IOC容器，负责快速查找jsp这类的视图页面，直接返回json不需要配置
    Handler：我们自己定义的Conrtoller方法而已，需要将Controller加入到IOC容器以及配置对应的访问地址

基本配置：
    1.导入依赖 spring-context  servlet-api spring-webmvc
    2.配置handlerMapping，handlerAdapter以及handler到IOC容器
        <mvc:annotation-driven/>    这个配置会配置一个增强的默认配置
        <mvc:default-servlet-handler/> 这个配置会配置在找不到资源时去项目下找这个路径的资源(用于访问静态资源)
    2.5：配置视图解析器：(可选)
        <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
            <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"/>
            <!--配置前缀后缀，根据需求更改-->(前缀和后缀是通用格式提取，使用时仅需使用名称即可)
            <property name="prefix" value=""/>
            <property name="suffix" value=""/>
        </bean>
    3.配置DispatcherServlet生效，拦截所有请求处理


请求与响应：(请求)
    传参方式：
        JSON：(因为jdk不支持JSON,所以需要导入第三方依赖)
            1.导入依赖jackson-core  annotation  jackson-databind
            2.在Spring配置文件中配置<mvc:annotation-driven/>，声明使用增强版HandlerMapping和HandlerAdapter等。
            3.使用：
                可以使用String，map，实体类接收
                使用@RequestBody注解，指定要接收的类型为String,只能放在形参列表中
        Param：
            方式一：直接在参数列表声明对应的key，value会存在该变量中，如果找不到对应的key会赋值为null
            方式二：@RequestParam注解，用于接收Param参数：(只能加到形参列表中)
                        场景：1.参数名与形参名不同。2.约定必须传参  3.设置形参默认值
            方式三：使用对象类型接收参数，SpringMVC中的HandlerAdapte会将参数映射到对象的属性中(使用名称匹配)
            特殊：接收一名多值时，需要使用@RequestParam注解，会将多值整合到集合中
        Path：
            使用动态路径，指定接收参数，例如：path/{type}/{id}
            需要使用@PathVariable声明参数接收路径传参，只能放在形参列表中
    获取参数：
        cookie：(获取cookie信息)在形参列表写对应变量，默认读取Param参数，所以要加@CookieValue注解
        header：(获取请求头信息)在形参列表写对应变量，默认读取Param参数，所以要加@RequestHeader注解
        原生API：例如HttpServletRequest，HttpServletResponse，HttpServletSession等，直接在形参列表声明，SpringMVC会帮我们注入

请求与响应：(响应)
    响应页面：(可以配置视图解析器)
        在Handler中return一个字符串  配置视图解析器后格式为 前缀+返回值+后缀=完整的路径
    请求转发和重定向：
        请求转发：在返回时加个标识 forword:     例如 return "forword：/user/find";
        重定向：在返回时加个标识 redirect:     例如 return "redirect：/user/find";(不用加项目根地址)

跨域问题：
    跨域问题：
    非同源判定：
        1.评判协议地址，
        2.评判域名，
        3.评判端口
    解决：
        1.后端解决：@CrossOrigin注解，设置响应头，告诉浏览器可以访问
        2.前端解决：代理方式访问


声明式异常：(异常处理类必须要加到IOC容器)
    @ControllerAdvice注解,声明该类为声明式异常处理类
    @RestControllerAdvice注解，RestControllerAdvice=ControllerAdvice+ResponseBody
    @ExceptionHandler注解，value指定异常类，指定处理哪个异，可以注入异常类型对象，获取异常信息


拦截器：(同过滤器)
    使用：实现HandlerInterceptor接口，重写方法实现拦截：
        在Handler之前拦截，返回值为是否放行
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }

        在Handler之后拦截
        public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
            HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
        }

        在DispatcherServlet返回前端之前调用，他更靠后，类似finally的作用
        public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
            HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
        }
    配置：
        <mvc:interceptors>     //配置拦截器
            <bean class=""/>   //配置拦截器类，拦截所有请求
            <ref bean=""/>     //配置内部拦截器类，拦截所有请求
            <mvc:interceptor>  //配置部分拦截器
                <mvc:mapping path=""/>   //配置拦截请求，支持模糊匹配，/* 表示单层，/**表示多层
                <mvc:exclude-mapping path=""/>   //配置排除拦截请求，/* 表示单层，/**表示多层
                <ref bean=""/>   //配置内部拦截器类，拦截所有请求
                <bean class=""/> //配置拦截器类，拦截所有请求
            </mvc:interceptor>
        </mvc:interceptors>
        例如：
             <mvc:interceptors>
                <mvc:interceptor>
                    <mvc:mapping path="/user/find"/>
                    <bean class="com.server.controller.InterceptorController"/>
                </mvc:interceptor>
            </mvc:interceptors>
    优先级：声明的先后顺序决定，前置，之后，后置是和aop一样的执行顺序，底层使用的是ArrayList存储，正序反序遍历执行




参数校验：
    @Min(10)  参数最小为10
    @Null  标注值必须为null
    @NotNull  标注值必须不为null
    @AssertTrue  标注值必须为true
    AssertFalse  标注值必须为false
    @Min(value)  标注值必须小于或大于value
    @Max(value)  标注值必须小于或等于value
    @DecimalMin(value) 标注值必须小于或大于value
    @DecimalMax(value) 标注值必须小于或等于value
    @Size(max,min) 标注值大小必须在max和min之间
    @Digits(integer,fratction) 标注值必须是一个数字，且必须在integger，fratction范围内
    @Past  标注值只能用于日期类型，且必须是过去的日期
    @Future  标注值只能用于日期类型，且必须是将来的日期
    @Pattern(value) 标注值必须符合指定的正则表达式

    Hibernate扩展注解:
        @Email 标注值必须是格式正确的Email地址
        @Length  标注值字符串大小必须在指定的范围内
        @NotEmpty 标准值字符串不能是空字符串
        @Range   标准值必须在指定范围内
    形参校验：
        @Validated   应用参数校验，@Valid 开启参数校验，二选一即可
        BindingResult  SpringMVC可以注入此对象，用于接收异常和错误信息，必须在被校验的参数后面，否则不生效
            hasErroes() 获取异常，获取到了异常返回true，否则返回false

文件上传与下载：(上传)
    1.导入依赖
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.3.3</version>
    </dependency>
    2.将StandardServletMultipartResolver文件上传处理器注册到IOC容器
        <bean id="multipartResolver" class="org.springframework.web.multipart.support.StandardServletMultipartResolver"/>(名称必须为multipartResolver)
    3.文件上传容量配置
        <multipart-config>
			<!--文件上传最大值，单位字节-->
			<max-file-size>10485760</max-file-size>
			<!--单个文件上传最大值，单位字节-->
			<max-request-size>20971520</max-request-size>
			<!--内存中最大存储字节量，超过此容量会写入到磁盘中-->
			<file-size-threshold>5242880</file-size-threshold>
		</multipart-config>
    3.5 如果使用form表单上传文件，需要设置enctype="multipart/form-data"
    4.配置好后，Spring可以注入MultipartFile对象，SpringMVC会将文件上传信息映射到MultipartFile。
        MultipartFile file 变量名与文件上传名不同时使用@RequestParam
        String getName();  获取文件的参数名称

        @Nullable
        String getOriginalFilename();   获取文件名称(重要)

        @Nullable
        String getContentType();    获取文件类型

        boolean isEmpty();    判定文件是否为空

        long getSize();    获取文件字节大小

        byte[] getBytes() throws IOException;     获取文件字节数组(重要)

        InputStream getInputStream() throws IOException;   获取文件的输入流

        default Resource getResource() {      
            return new MultipartFileResource(this);
        }

        void transferTo(File dest) throws IOException, IllegalStateException;    文件本地转存

        default void transferTo(Path dest) throws IOException, IllegalStateException {
            FileCopyUtils.copy(this.getInputStream(), Files.newOutputStream(dest));
        }

文件上传与下载：(下载)
    1读取文件的输入流
        FileInputStream fileInputStream=new FileInputStream("");
    2.设置参数
        response.setHeader("Content-Disposition", "attachment; filename=文件名称");
            Content-Disposition 含义为文件内容定位，attachment 设置为附件，filename追加文件名称
    3.使用响应字节输出流写回文件即可
        byte buffer[]=new byte[1024*8];
        int len=-1;
        while((len=fis.read(buffer))!=-1){
            ops.write(buffer,0,len);
        }































--------------------------------------------------------------------------------------------------------
controller   控制器，处理请求

字符编码过滤器
org.springframework.web.filter,CharacterEncodingFilter

视图解析器
InternalResourceViewResolver是SpringMVC 中默认的视图解析器，用来解析 JSP 视图,能将视图名映射为JSP文件。

redirect:/路径
重定向方式跳转
forword:/路径
不经过视图解析器的请求转发方式跳转


多部件解析器
org.springframework.web.multipart.commons.CommonsMultipartResolver
可以通过该组件实现文件上传与下载
多部件解析器的id必须为multipartResolver
可以注入maxUploadSize  设置文件上传总容量，默认-1，表示无上限，单位字节
defaultEncoding  配置编码格式，默认为iso-8859-1


多部件解析器会注入一个MultipartFile


拦截器 HandlerInterceptor
创建拦截器需要实现HandlerInterceptor接口，
boolean preHandle  
该方法在处理请求方法前执行，返回值为true表示继续执行处理请求方法，false表示中断执行处理请求方法
void postHandle 
该方法在处理请求方法后，视图解析之前执行，可以对视图修改
alterCompletion
该方法在处理请求方法和视图解析后执行，可以做资源清理，记录日志等操作
