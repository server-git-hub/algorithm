---
title: vue
date: 2025-09-10 15:20:59
tags:
categories: "前端"
---





Vite工具：
特点：
    快速构建项目
    统一工程化规范
    代码模板和组件库
    自动化构建和部署
常用命令：
    npm create vite  构建vite项目


目录结构
    public/     存放公共资源，如HTML文件，图像，字体等
    src/    存放项目的源代码，如JavaScript，CSS，Vue组件，图像和字体等资源，开发过程中，这些文件会被Vite实时编译和处理，以下文件夹是src内部划分建议
        assets/     存放项目静态资源，如图片，字体，样式文件等
        comonents/    存放组件相关的文件
        layouts/      存放布局组件的文件
        pages/        存放页面级别的组件文件
        plugins/      存放Vite插件相关的文件
        router/        存放Vue.js的路由配置文件，负责管理视图和URL之间的映射关系
        store/     存放Vuex状态管理相关的文件
        utils/     存放一些通用的工具函数，如日期处理，字符串操作函数等
    vite.config.js    Vite的配置文件，可以通过该文件配置项目的参数，插件，打包优化等，该文件可以使用CommonJS或ES6模块的语法进行配置
    package.json    标准的Node.js项目配置文件，包含了项目的基本信息和依赖关系，可以通过scripts配置命令，如dev，build，serve等，用于启动开发，构建和本地服务器等操作


vite.config.js
    server:{
        port:8800,    配置端口号
    },


SFC(单文件组件)
    Vue规范了
        <script>    代表组件的js代码部分
        <style>     代表组件的css代码部分
        <template>  代表组件的html代码部分

语法糖：setup：
    在script标签中加入这个属性可以省略以下结构
    export default{
        setup(){
            return{
            }
        }
    }
    直接写核心代码，也不用写return了


css样式导入
    在main.js中导入，全局引入
    import './style/reset.css'  
    vue文件script代码引入
    import './style/reset.css'
    vue文件style代码引入[不推荐]
    @import './style/reset.css'


渲染：
    插值表达式：
        {{元素}}   可以使用js运算表达式
    文本渲染：
        t-text="元素"   识别为纯文本   
        t-html="元素"   可以解析html标签
    Attribute属性渲染：v-bind
        v-bind:value="元素"    渲染数据到属性上,value可以是其他属性
        可以简写成:value="元素" 
        如果属性名和元素名一样可以省略赋值写:value
    绑定事件：
        v-on:click=""    绑定单击事件
            .once=""   只能触发一次
            .prevent=""  阻止触发事件，但当前设置的事件不阻止
        v-on:change=""   绑定改变事件
        v-on:focus=""    绑定获取焦点事件
        v-on:blur=""     绑定失去焦点事件
        可以省略v-on:   用@代替，比如@click=""
    条件渲染：
        v-if="条件表达式"     满足条件执行
        v-else       不满足条件执行
        v-show=""    满足条件时显示，不满足时隐藏
    列表渲染：
        v-for="(每个元素,索引) in 对象"
    双向绑定：
        响应式变量变化，更新dom，dom变化，更新响应式变量
        v-model:value="元素"    可以简写成v-model=""   固定只能给value赋值，用于表单

响应式编程：ref和reactive
    ref：
        vue中的组件，用于声明响应式变量，在script中使用需要.value进行引用，一般用于声明简单类型的响应式变量，也可以声明对象类型的响应式变量
        特殊：如果是对象类型的响应式变量，可以修改对象引用，也可以修改对象属性
    reactive：
        vue中的组件，用于声明响应式变量，直接使用元素即可，一般用于声明对象类型的响应式变量，也可以声明简单类型的响应式变量
        特殊：如果是对象类型的响应式变量，不可以修改对象引用，但对象属性可以修改


vue生命周期：
    beforeCreate    初始化之前
    created         初始化之后
    beforeMount     初始渲染之前
    mounted         初始渲染之后
    beforeUpdate    重新渲染之前
    updated         重新渲染之后
    beforeUnmount   取消挂载之前
    unmounted       取消挂载之后
    常见钩子函数(回调函数)
        onMounted()    注册一个回调函数，在组件挂载完成后执行
        onUpdated()    注册一个回调函数，在组件因为响应式状态变更而更新其DOM树之后调用
        onUnmounted()  注册一个回调函数，在组件实例被卸载之后调用
        onBeforeMount()  注册一个回调函数，在组件挂载之前被调用
        onBeforeUpdate()  注册一个回调函数，在组件即将因为响应式状态变更而更新其DOM树之前调用
        onBeforeUnmount()  注册一个回调函数，在组件实例被卸载之前调用


组件之间的数据共享：
    父组件传递参数到子组件：
        1.在子组件中使用defineProps定义模型参数
        2.在父组件中导入子组件
        3.使用子组件，并设置属性=""
    子组件传递参数到父组件：
        1.在子组件中使用defineEmits定义要发送给父组件的函数,返回对象引用
        2.使用defineEmits的对象引用设置参数，可以设置多个
        3.在父组件中导入子组件
        4.在父组件中使用子组件通过@key='函数名'形式将子组件传递参数获取到
vue中的组件：
    defineProps   是一个函数,用于设置当前模型
    基本使用：
        defineProps(
            {
                massage:String,
                number:Number
            }
        )
    defineEmits   是一个函数，用于指定需要传递的函数
    基本使用：
        let emit=defineEmits(
            [
                'add',
                'sub'
            ]
        )
        emit('add','3') 设置参数，可以设置多个

路由机制：Router
    npm install vue-router@4
        --save    增加到dependencies中
        --save-dev   增加到devDependencies中
    声明式路由：
        <router-link to="/路径"></router-link>    路由切换
        <router-link to="/路径/路径"></router-link>   拼接路径传参数
    编程式路由：
        介绍：
            使用userRouter方法进行动态路由设置，返回值为router对象，用于跳转，传参
            使用userRoute方法进行路由信息获取，返回值为route对象，用于获取路由信息
        使用：
            通过useRouter()  拿到router对象，使用router对象操作
            router.push(`路径?key:value&key:value`)   拼接路径，且携带参数，key-value传参
            router.push({path:"路径",query:{key:value,key:value}})    访问路径，且携带参数，key-value传参
            router.push(`path:"路径/${路径}"`)    拼接路径，且携带参数，path路径传参
            router.push({name:"路由名称",params:{key:value,key:value}})   访问路径，且携带参数，path路径传参
    路由视图
      <router-view to=""></router-view>    路由对应的视图
    获取参数：
        通过useRouter()  拿到router对象，使用router对象操作
        router.params.id()   获取路径参数，参数名为id
        router.path          获取路径
        router.query.id()    获取问号key-value参数，参数名为id
    配置：
        1.新建文件
        2.导入import {creatrRouter,createWebHashHistory} from 'vue-router'
        3.配置creatrRouter
        import {createRouter,createWebHashHistory} from 'vue-router'
        import son from './son.vue';
        import test2 from './test2.vue';
        export default createRouter({
            history:createWebHashHistory(),  //记录历史路由
            routes:[
                {
                    path:'/',     //访问路由
                    name:'',      //路由名称   
                    components:{
                        default:test,     //默认跳转路由，(跳转到未命名的路由位置)
                    }
                },
                {
                    path:'/son:id/:age',     //访问路由,:id为路径传参，:age为路径传参
                    name:'',      //路由名称   
                    component: son,  //跳转的路由,跳转到默认的路由位置
                },
                {
                    path:'/test2',   //访问路由
                    name:'',      //路由名称   
                    components:{     
                        view1: test2,   //跳转的路由位置  路由视图:组件
                    }
                },
                {
                    path:'/list',     //访问路由
                    name:'',      //路由名称   
                    redirect:'/son',  //重定向路由
                },
            ],
        });
        4.在main.js中添加createApp(App).use(router)   使用路由
    路由守卫：
        全局前置路由守卫   在路由切换之前执行操作
        全局后置路由守卫   在路由切换之前执行操作
        router.beforeEach((to,from,next)=?{})
            to   可以获取目标的包装对象
            from  可以获取来源的包装对象
            next  拦截方法，不调用默认拦截
                next()  放行
                next("地址")  可以转发到其他地址
        router.afterEach((to,from)=>{})
            to   可以获取目标的包装对象
            from  可以获取来源的包装对象
        在路由信息中添加

状态管理Pinia
    在main.js中声明：
        import {createPinia} from 'pinia';
        let pinia=createPinia();
        createApp(App).use(pinia).mount('#app')
    import {defineStore} from 'pinia'
    defineStore:
        id   唯一标识
        state   完整模型
        getters  获取存储数据
        actions   操作的方法
    使用示例：(一处定义，到处使用)
        import {defineStore} from 'pinia'         
        export const Bean=defineStore('Bean',{       //'Bean' 为唯一标识
            state:()=>{                         //声明数据,是一个函数
                return :{

                }
            },
            getters:{                           //获取数据，是一个json

            },
            actions:{                            //操作数据，是一个json

            }
        })
    
    defineStore返回的Bean对象的方法：
        $reset()    恢复默认值，恢复到初始化状态
        $patch()    重写对象(同名的覆盖，不同的增加)

Axios框架(Ajax异步处理)
    基本使用：
    import axios from 'axios';    //导入axios
    let res=()=>{
    axios({   //使用axios构造异步请求
        method:"get",    //设置请求方式
        url:"https://api.umg.com/api/rand.qinghua?format=json",    //请求的url
        params:{     //设置?key=value参数
            username:"zhangsan",
        },
        data:{    //设置请求体参数
            username:"zhangsan",
        }
    }).then(function(response){      //请求成功执行的方法
        console.log(response);
    }).catch(function(error){        //请求失败执行的方法
        console.log(error);
    })

    简化版本：
    get请求    axios.get("url","config其他配置参数")
    axios.get("url",{
        params:{
            username:"zhangsan"
        }
        headers:{
            token:"token"
        }
    })
    post请求    axios.post("url","请求体参数","config其他配置参数")
    axios.post("url",{
        username="zhangsan"
    },
    {
        params:{
            age:"22"
        }
        headers:{
            token:"token"
        }
    })


    可以直接返回Promise对象，暂不处理，让调用者获取Promise处理
    
    注意：响应的数据结构：
        data:{},       由服务器提供的响应数据
        status:200,    来自服务器响应的Http状态码
        statusText:'ok',  来自服务器响应的状态信息
        hearers:{},    服务器的响应头，所有的header名称都是小写，而且可以使用方括号语法访问
        config:{},    axios请求的配置信息
        request:{},   是生成此响应的请求，在node.js中他是最后一个ClientRequest实例，在浏览器中则是XMLHttpRequest实例
    
    特殊：配置代理
        server:{    
            proxy:{    //配置代理
            '/':{      //为哪个路径配置代理
                target:"",     //代理访问地址
                changeOrigin:true   //支持跨域
            }
            }
        },
    拦截器：
        //添加请求拦截器，在请求发送之前
        axios.interceptors.request.use(
            function(config){
                //在发送请求之前做些什么
                return config;
            },
            function(error){
                //在请求错误时做些什么
                return Promise.reject(error);
            }
        );
        //添加响应拦截器，数据响应之后
        axios.interceptors.response.use(
            function(config){
                //2xx范围内的状态码都会触发
                //对响应数据做些什么
                return config;
            },
            function(error){
                //非2xx范围的状态码都会触发
                //对响应错误做些什么
                return Promise.reject(error);
            }
        )
        //对axios进行配置
        axios.create({
            baseURL:"https://api.uomg.com",    //配置前置url路径
            timeout:10000   //配置超时时间
        })

element-plus：预定义的UI设计方案
    使用：
    1.npm install element-plus
    2.在main.js中导入：
        import {elementplus} from 'element-plus';
        createApp(App).use(elementplus).mount('#app')
    3.去官网或其他文档中查询预定义的UI方案，粘贴使用，进行自定义修改