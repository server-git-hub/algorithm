---
title: Servlet
date: 2025-06-24 23:41:40
tags:
categories: "javaWeb"
---


servlet

实现方式：
    1.实现Servlet接口，
        重写所有抽象方法，(其中service特别重要)，
        在service中写处理响应和请求相关代码
        在web.xml中配置servlet
        启动tomcat，运行web项目，通过浏览器访问servlet
    2.继承HttpServlet：
        (其中doGet和doPost特别重要)
    3. 注解方式：
        @WebServlet("/url")


web.xml配置文件：
    <servlet>
        <servlet-name>servlet1</servlet-name>    命名
        <servlet-class>com.web.servlet</servlet-class>   指定servlet文件
    </servlet>

    <servlet-mapping>
        <servlet-name>servlet1</servlet-name>    指定servlet配置
        <url-pattern>/servlet1</url-pattern>   访问servlet地址
    </servlet-mapping>


三种匹配方式：
    精确匹配：/servlet/servlet1   必须精确路径才能访问
    目录匹配：/servlet/*    必须带指定目录才能访问
    后缀匹配：*.action     必须是指定后缀名才能访问

让servlet提前创建
<load-on-startup>数字</load-on-startup>    数字越小优先级越高，越先被创建(放在servlet配置中)

初始化配置信息
<init-param>
    <param-name></param-name>   key
    <param-value></param-value>   value
</init-param>    (放在servlet配置中)

ServletConfig对象：(用于操作web.xml参数的)
    getServletContext()   获取ServletContext对象(重要)，代表整个web程序的对象 
    getServletName()       获取<servlet-name></servlet-name>定义的servlet名称
    getInitParameter(String key)   获取配置servlet时配置的[初始化参数]，根据名字获取值
    getInitParameterNames()  获取所有初始化参数名组成的Enumeraction对象


ServletContext对象:
    获取：getServletContext()  父类中有此方法
    作用：当做2域对象使用
    方法：
        getInitParameter(String key)   根据设置的<param-name>获取<param-value>
        getRealPath("web目录下的web资源的相对路径")   获取web程序下任意资源的绝对路径
        getContextPath()   获取web程序的名字(部署项目时application context中设置的web名字)
        getMimeType("xxx.文件后缀名")   获取文件的MIME类型(此MIME是给浏览器看的，浏览器把web.xml中规定了每一个扩展名对应的MIME类型)
        setAttribute(String key,Object val)  存储key,value对
        getAttribute(String key)        根据key获取value
        removeAttribute(String key)     删除key对应的value

HttpServletRequest对象：
    作用：
        1.用于获取请求报文内容
        2.请求转发
        3.当做域对象存储数据(请求域)
    方法：
        请求行：
            getMethod()  获取请求方式(会用)
            getContextPath() 获取当前应用上下文路径(在application context中射手座的名字)(会用)
            getRequestURI()  获取请求地址，不带主机名
            getRequestURL()  获取请求地址，带主机名
        请求头：
            getHeader(String key)  根据key获取value
        请求体：(重要)
            request.getParameter("请求参数的name属性值")   根据提交参数的name获取value
            request.getParameterValues("请求参数的name属性名")  根据提交参数的name获取多个value
            request.getParameterMap()  获取提交请求的所有参数，以键值对方式存储到map中
        设置请求编码：
            request.setCharacterEncoding("utf-8");
        请求转发：
            RequestDispacher getRequestDispacher(String path)  获取请求转发器对象，参数：path指的是要转到哪个servlet上就写对应的url.pattern，如果要转发到某一个页面上就写页面路径。
            forward(request对象,response对象) 实现请求转发方法，此方法是RequestDispacher对象的方法。
        做为域对象：
            setAttribute(String key,Object val)  存储key,value对
            getAttribute(String key)        根据key获取value
            removeAttribute(String key)     删除key对应的value
HttpServletResponse对象：
        设置响应状态码：
            setStatus(状态码)
        设置响应头信息：
            setHeader(key,value)
        设置响应体：
            getWrite.Write("")
        设置响应编码：
            setContextType("text/html;charset=utf-8")
        重定向：
            sendRedirect("重定向的资源路径")

会话技术：
    Cookie：(客户端会话技术)
        在服务端创建，保存在浏览器
        使用：
            创建Cookie对象，保存数据，将Cookie对象响应给浏览器，再次访问服务器，可以拿到浏览器携带的Cookie
        方法：
            new Cookie(String key,String value)  创建cookie对象，存储数据
            response.addCookie(cookie对象) 将创建好的cookie对象响应给浏览器，保存到浏览器上
            request.getCookies()  获取Cookie对象，返回Cookie数组
            String getName()  获取Cookie中的key
            String getValue()  获取Cookie中的value
        设置存活时间：
            setMaxAge()  秒
    Session：(服务器会话技术)
        服务端的会话技术,主要用于域对象存储数据
        getSession()   获取session对象
        setAttribute(String key,Object o) 往session域中存储数据
        Object getAttribute(String name) 取数据
        void removeAttribute(String name) 删除数据
        生命周期方法：
            setMaxInactiveInterval(秒) 设置session闲置超时时间
            invalidate()  强制session立即失效
Filter过滤器：
    使用：
        配置文件：
            1.实现Filter接口，并实现doFilter方法，doFilter方法会传入FilterChain对象。
            2.继承HttpFilter，重写doFilter方法，doFilter方法会传入FilterChain对象。
                filterChain.doFilter(servletRequest,servletResponse) 放行(重要)
        注解方式：
            @WebFilter("")   一个参数时为配置url
    配置：
        <filter>
            <filter-name></filter-name>
            <filter-class></filter-class>
        </filter>
        <filter-mapping>
            <filter-name></filter-name>
            <url-pattern></url-pattern>
        </filter-mapping>
    设置编码：
        servletRequest.setCharacterEncoding("utf-8");
    生命周期方法：
        init() 初始化(web项目启动时调用)
        doFilter(ServletRequest servletRequest,ServletResponse servletResponse,FilterChain filterChain)(重要)
        destroy()  销毁
    匹配规则：
        精准匹配：精确写出路径
        模糊匹配：* 表示任意路径，模糊匹配路径，例如/user/*
        扩展名匹配：.com  表示匹配扩展名为com的路径
        servlet名称匹配：把<url-pattern>换成<servlet-name> 匹配servlet的name
    过滤器执行顺序：
        1.如果使用的是<url-patern>，先配置谁就先走谁。
        2.如果有<url-pattern>和<servlet-name>，先走<url-pattern>
        3.如果是注解方式实现，根据名字比较先后顺序，如果有xml配置先走xml配置的Filter
Listener监听器：
    使用：
        实现Listener接口
        在web.xml中配置
            <listener>
                <listener-class></listener-class>
            </listener>
    分类：
        ServletContextListener:监听ServletContext对象的创建与销毁
            contextInitialized(ServletContextEvent sce)  ServletContext创建时调用
            contextDestroyed(ServletContextEvent sce) ServletContext销毁时调用
        HttpSessionListener:监听HttpSession对象的创建与销毁
            sessionCreated(HttpSessionEvent hse) HttpSession创建时调用
            sessionDestroyed(HttpSessionEvent hse) HttpSession销毁时调用
        ServletResquestListener：监听ServletRequest对象的创建与销毁
            requestInitialized(ServletRequestEvent sre)  ServletResquest创建时调用
            requestDestroyed(ServletRequestEvent sre) ServletResquest销毁时调用
        ServletContextAttributeListener：监听ServletContext中属性的添加、移除和修改
            attributeAdded(ServletContextAttributeEvent scab) 向ServletContext中添加属性时调用
            attributeRemoved(ServletContextAttributeEvent scab)   从ServletContext中移除属性时调用  
            attributeReplaced(ServletContextAttributeEvent scab)  当ServletContext中的属性被修改时调用
                ServletContextAttributeEvent对象代表属性变化事件：
                    getName()            获取修改或添加的属性名   
                    getValue()           获取被修改或添加的属性值 
                    getServletContext()  获取ServletContext对象
        HttpSessionAttributeListener：监听HttpSession中属性的添加、移除和修改
            attributeAdded(HttpSessionBindingEvent se)     向HttpSession中添加属性时调用     
            attributeRemoved(HttpSessionBindingEvent se)   从HttpSession中移除属性时调用     
            attributeReplaced(HttpSessionBindingEvent se)  当HttpSession中的属性被修改时调用 
                HttpSessionBindingEvent对象代表属性变化事件，它包含的方法如下：
                    getName()     获取修改或添加的属性名        
                    getValue()    获取被修改或添加的属性值      
                    getSession()  获取触发事件的HttpSession对象 
        ServletRequestAttributeListener：监听ServletRequest中属性的添加、移除和修改
            attributeAdded(ServletRequestAttributeEvent srae)     向ServletRequest中添加属性时调用     
            attributeRemoved(ServletRequestAttributeEvent srae)   从ServletRequest中移除属性时调用     
            attributeReplaced(ServletRequestAttributeEvent srae)  当ServletRequest中的属性被修改时调用
                ServletRequestAttributeEvent对象代表属性变化事件，它包含的方法如下：
                    getName()             获取修改或添加的属性名           
                    getValue()            获取被修改或添加的属性值         
                    getServletRequest ()  获取触发事件的ServletRequest对象 
        HttpSessionBindingListener：监听某个对象在Session域中的创建与移除
            valueBound(HttpSessionBindingEvent event)    该类的实例被放到Session域中时调用 
            valueUnbound(HttpSessionBindingEvent event)  该类的实例从Session中移除时调用   
                HttpSessionBindingEvent对象代表属性变化事件，它包含的方法如下：
                    getName()     获取当前事件涉及的属性名      
                    getValue()    获取当前事件涉及的属性值      
                    getSession()  获取触发事件的HttpSession对象 
        HttpSessionActivationListener：监听某个对象在Session中的序列化(钝化)与反序列化(活化)。
            sessionWillPassivate(HttpSessionEvent se)  该类实例和Session一起钝化到硬盘时调用(序列化)   
            sessionDidActivate(HttpSessionEvent se)    该类实例和Session一起活化到内存时调用(反序列化) 
                HttpSessionEvent对象代表事件对象：
                    通过getSession()方法获取事件涉及的HttpSession对象。
Ajax异步：
    















----------------------------------------------------------------------------------------------------



组件
Server   是一个Tomcat实例，
Service  用于连接Server与Engine，连接实例与引擎
Connector  处理请求(默认只支持http协议)
Engine   Servlet中的引擎，定义在Service中
Host    兼容其他技术的虚拟平台
Context   为Host指定一个web应用。
<context path="" docbase=""/>
path表示要访问的资源，docbase表示，path所在具体位置，也可以使用相对路径，起始位置为此Context所属的Host中appbase定义的路径


编写Servlet  必须继承HttpServlet
doGet()   处理基于get的请求
doPost()   处理基于post的请求
HttpServeltRequest   请求对象
HttpServeltResponse 响应对象

HttpServletRequest中方法
getParameter("key")   通过key获取value
getParameterValues("checkboxkey")
getHeader("") 获取请求头中key对应的value
getHeaderNames("")  h获取请求头中所有的key，返回一个Enumeration<String>
setCharacterEncoding（utf-8）  指定tomcat编码格式(Tomcat默认使用iso-8859-1编码格式)
getCookies() 获取所有Cookie，返回一个Cookie数组
getSession() 获取请求时如果没有SessionID则创建HttpSession对象，如果有则返回HttpSession对象。
getSession(true/false)  如果为true和getSession() 作用相同，如果为false，获取请求时有SessionID，返回对应的HttpSession对象，如果没有SessionID，则不会创建新的HttpSession对象。
getRequestDispatcher(url).forword(request,response)  将请求发送到指定URL中，并用forword将request和response对象传递过去



HttpServletResponse中方法
sendRedirect("URL")  添加响应附加信息，响应并发送一个URL
setHeader("Content-Disposition"，"attachment;filename="+name)  ，下载文件，name是文件名
setContentType("text/html;Charset=utf-8") 指定响应类型和指定响应编码格式
setCharacterEncoding（utf-8）  指定tomcat编码格式(Tomcat默认使用iso-8859-1编码格式)
addCookie(cookie)  响应中添加cookie



Enumeration<String> enumeration=getParameterNames() 获取所有请求的key

Map(String,String[]) map=getParameterMap()  Map结构获取key与value

javac中 -classpath ""   表示导入包
set   创建临时的系统变量
echo   通过系统变量名获取系统变量值

枚举类型
hasMoreElements()  查看枚举列表是否为空
nextElement()  获取当前数据并指针下移

URLEncoder.encode(value,"utf-8") 把value以utf-8编码格式转换成字节


servlet对象
ServletContext 对象
getServletContext（） 获取web项目自动创建好的ServletContext对象
getRealPath("path")  相对路径转换成绝对路径
(servlet-param)配置信息
getInitParameter("key")  通过key获取value
getInitParameterNames("key")  获取servlet-param中所有的key
全局容器:
attribute("key"，ObkectValue)  新建key与value
attribute("key")  通过key获取value
remobeattribute("key") 通过key删除value
serverInfo()  返回Servlet的名称和版本号
MajorVersion() 返回Servlet容器所支持的Servlet的主版本号
MinorVersion() 返回Servlet容器所支持的Servlet的副版本号


ServletConfig对象
getServletConfig（） 获取web项目自动创建好的ServletConfig对象

(init-param)配置信息
getInitParameter("key")  通过key获取value
getInitParameterNames("key")  获取servlet-param中所有的key

Cookie对象
直接用new创建cookie对象，("key"，"value")
getName() 返回Cookie中的key
getValue()  返回Cookie中的value
setMaxAge(60)设置Cookie失效时间，单位为秒，设置后Cookie为持久化Cookie，Cookie将在60秒后被删除
URLEncoder.encode("content","code")
将内容按照指定的编码方式做url编码处理
URLDecoder.decode("content","code")
将内容按照指定的编码方式做url解码处理



HttpSession对象
setAttribute("key","value") 将数据存储到HttpSession对象中
Object value=session.getAttribute("key")
根据key获取HttpSession中的value，返回值为
Object类型
Enumeration[String] en=session.getAttributeNames()  获取HttpSession中所有的key
removeAttribute("key") 删除key对应的HttpSession中的value
String id=session.getId()  通过HttpSession对象获取sessionID
invalidate() 用于销毁Session对象

util包
UUID类型
randomUUID()随机生成一个字符串，返回值UUID类型

filter中方法
init()  初始化方法，在创建filter时立即调用
doFilter(ServletRequest,ServletResponse,FilterChain filtrrchain)  拦截请求与响应方法，可用于对请求和响应做预处理
filterChain下有doFilter()方法
destroy()  销毁方法，在销毁filter之前调用，用于资源释放等动作
doFIilter(servletRequest，servletResponse)  对请求做放行处理
filterConfig.getinitParameter("name") 通过key获取value，返回String类型
filterConfig.getinitParameterNames()  获取所有的key，返回Enumeration[String]类型
注解开发filter
@Webfilter()
filterName String类型，指定过滤器的name属性
urlPatterns/value String[]类型  拦截请求的url 支持多个
description String类型   过滤器描述
displayname   String类型  过滤器名称
initparams 类型WebinitParam[]  指定一组过滤器初始化参数，同<init-param>



Collection<String> getHeaderNames()
获取所有请求头名称
InputStream getInputStream() 获取上传文件的输入流

Part对象
String  getContentType()
获取上传文件的文件MME类型
long getSize()
获取上传文件大小
String getSubmittedFileName()
上传文件的原始文件名称
getName()   获取<input name=""> 中的name属性值
getHeader()  获取请求头部
<file-size-threshold>  当数据量大于该值时，内容将被写入临时文件
<location>  存放临时文件地址
<max-file-size>   允许存放的最大值(byte)，默认为-1，表示无限制
<max-request-size>  一个multipart/form-data 请求能携带的最大字节数

@WebInitParam注解
name 同 param-name
value 同 param-value
description 同description

Listener监听器对象

ServletContextListener 监听ServletContext对象生命周期的监听器接口
void contextinitialized(ServletContextEvent sce)
ServletContext对象创建时触发该方法，并将ServletContext对象传递到该方法中
void ontextDestroyed(ServletContextEvent sce)
ServletContext对象销毁之前触发该方法，并将ServletContext对象传递到该方法中


ServletContextAttributeServletListener 监听Servlet对象属性操作的监听器接口
void attributeAdded(ServletContextAttributeEvent scae)
向ServletContext对象中添加属性时触发该方法，并将ServletContext对象传递到该方法中。
void attributeRemoved(ServletContextAttributeEvent scae)
当从ServletContext对象中删除属性时触发该方法，并将ServletContext对象传递到该方法中。
voidattributeReplaced(ServletContextAttributeEvent scae)
当从ServletContext对象中属性的值发生替换时触发该方法，并将ServletContext对象传递到该方法中。

HttpSessionListener 监听HttpSession对象生命周期的监听器接口

void sessionCreated(HttpSessionEvent se)
HttpSession对象创建后会触发该监听方法，并将已创建HttpSession对象传递到该方法中
void sessionDestroyed(HttpSessionEvent se)
HttpSession对象在销毁之前会触发该监听方法，并将要销毁的HttpSession对象传递到该方法中

HttpSessionAttributeListener 监听HttpSession对象属性操作的监听器接口


void attributeAdded(HttpSessionBindingEvent se)
向HttpSession对象中添加属性时会触发该监听方法，并将HttpSession对象传递到该方法中。触发事件的方法HttpSession.setAttribute("key" ,"value")。

void attributeRemoved(HttpSessionBindingEvent se)
当从HttpSession对象中删除属性时会触发该监听方法，并将HttpSession对象传递到该方法中。触发事件方法 HttpSession.removeAttribute("key").

void attributeReplaced(HttpSessionBindingEvent se)
当从HttpSession对象中属性的值发生替换时会触发该监听方法，并将HttpSession对象传递到该方法中。触发事件的方法HttpSession.setAttribute("key" ,"value")。

HttpServletRequest 监听ServletRequest(是HttpServletRequest接口的父接口类型)对象属性操作的监听器接口

void requestlnitialized(ServletRequestEvent sre)
HttpServletRequest对象创建后会触发该监听方法，并将已创建ServletRequest对象传递到该方法中。

void requestDestroyed(ServletRequestEvent sre)
HttpServletRequest对象在销毁之前会触发该监听方法，并将要销毁的ServletRequest对象传递到该方法中。

ServletRequestAttributeListener 监听HttpServletRequest对象属性操作的监听器接口
void attributeAdded(ServletRequestAttributeEvent srae)
向HttpServletRequest对象中添加属性时会触发该监听方法,并将ServletRequest对象传递到该方法中。触发事件的方法HttpServletRequest.setAttribute("key" ,"value")
void attributeRemoved(ServletRequestAttributeEvent srae)
当从HttpServletRequest对象中删除属性时会触发该监听方法,并将ServletRequest对象传递到该方法中。触发事件方法 HttpServletRequest.removeAttribute("key")

void attributeReplaced(ServletRequestAttributeEvent srae)
当从HttpServletRequest对象中属性的值发生替换时会触发该监听方法，并将ServletRequest对象传递到该方法中。触发事件的方法 HttpServletRequest.setAttribute("key" , "value")
@WebListener 注解式开发Listener



