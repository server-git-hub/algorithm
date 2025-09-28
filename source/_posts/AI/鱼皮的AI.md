---
title: 鱼皮的AI(对java接入大模型进行扩展)
date: 2025-09-20 13:55:52
tags:
categories: "AI"
---

官方提供SDK方式调用大模型
    去官网查看SDK调用方式
http方式调用大模型
    去官网查看http调用方式
    (curl工具：可以通过命令行构造http请求，接收响应)
SpringAI框架调用大模型(对tokenblog.cn上的内容进行补充)
    chatModel   大模型
    chatClient  对话客户端()
    chatResponse  返回结果对象
    
Langchain4J框架调用大模型



Prompt工程
    优化提示词
    减少无用的上下文节约token
    样本学习
    提供外部资源库，增加可靠性


Advisors(顾问)    拦截器
    构建时指定默认拦截器
        .builder()
        .defaultAdvisors()    //指定拦截器
        .order()     //设置优先级，越低越优先
        .build();
    
    MessageChatMemoryAdvisor(ChatMemory chatMemory)    会将对话历史作为一系列独立的消息添加到提示中
    ChatMemory    存储对话历史消息的组件，对历史消息进行增删查
        InMemoryChatMemory  内存存储
    自定义顾问：
        实现下列接口
        CallAroundAdvisor：用于处理同步请求和响应
        StreamARoundAdvisor：用于处理流式请求和响应
    官方拦截器
        日志拦截器(提供一些日志信息)
            SimpleLoggerAdvisor
        重复阅读拦截器(重复提示词信息)
            ReReadingAdvisor
    在拦截器中可以获取该链条的其他拦截器数据，使用AdvisedResponse.adviseContext().get()    类似ThreadLocal的使用方法


结构化输出
    Sprirng提供的转换器
        MapOutputConverter
        BeanOutputConverter
        ListOutputConverter
    
    .entity()   
        指定接收类型
        new ParameterizedTypeReference<Object>() {}    可以通过该抽象类实现更复杂的目标结构


对话记忆化存储
    chatMemory    记忆化存储
    自定义chatMemory
        序列化：Kryo工具



RAG(检索增强)
    步骤：
        1.将数据源存储到数据库(向量数据库或其他)
            对原始文档进行加工处理后存储到数据库：原始文档->预处理文档->文档分片->存储到数据库
        2.用户输入->AI去RAG数据库中查询(过滤条件)->查询结果进行Rank精排->最终结果作为上下文辅助AI回答问题
    混合检索策略：
        score阈值，相似度高于阈值的不会被检索，(为相似的设置一个门槛)
    1.创建数据源文件
    2.将数据源文件加载到内存中，使用SpringAI提供的ETL组件
        加载数据源(例如：Markdown)
        注册VectorStore并读取数据
        在会话客户端局部配置问答拦截器->参数为VectorStore

    特殊：QuestionAnswerAdvisor   问答拦截器(在回答之前先去进行RAG增强处理，再进行问答)

RAG核心特性：
    文档收集和切割ETL：
        E：
        SpringAI的文档是通过Document进行存储的
            可以存储MetaData   元信息
            可以存储Media     多媒体内容
            DocumentReader   文档读取器
        T：
        TextSplitter   文本分割器，基类
            split()   分割文本的api
        TokenTextSplitter    基于token的文本分割器，实现类
        MetadataEnricher  元数据增强器，为我们的Document补充更多元信息
            KeywordMetadataEnricher    关键词元数据增强器，增加关键字元信息
            SummaryMetadataEnricher    使用AI生成文档摘要，并添加到元信息，不仅可以为当前文档生成摘要，还可以关联相邻的文档，让摘要更完整
        ContentFormatter   内容格式转换器
            DefaultContentFormatter     内容格式转换器实现类，用来统一格式，操作元信息，将内容和元信息结合，排除一些元信息。
        L：
        DocumentWriter    文档加载(写入)
            DocumentWriter实现了Consumer<List<Document>>接口，负责将处理后的文档写入到存储中
            FileDocumentWriter    将文档写入到文件系统中
            VectorStoreWriter  将文档写入到向量数据库中
    向量转换和存储
        VectorStore接口，继承DocumentWriter接口，主要实现向量的转换和存储
        SpringAI提供了SearchRequest类，可以自定义相似度搜索请求(过滤规则)
    
    特殊：批处理策略->避免一次性插入过量的数据
        SpringAI提供了BatchingStrategy接口允许基于标记计数以及分批方式处理文档
    
    模块化的RAG架构：
        预检索：优化用户查询
            SpringAI提供了多种查询处理组件
                查询转换：
                    查询重写：RewriteQueryTransformer     调用ai使问题更精确
                    查询翻译：TranslationQueryTransformer    调用ai翻译问题
                    查询压缩：CompressionQueryTransformer    调用ai压缩问题，根据对话历史和最新的查询，去除一些杂质
                    多查询扩展：MultiQueryExpander         调用ai增加一些问题的多个语义的变种，有助于检索额外的上下文，并增加找到相关结果的机会
        检索：提供用户查询的相关性
            文档搜索：
            DocumentRetriever 这是SpringAI提供的文档检索器，可以自定义文档检索器实现类
                VectorStoreDocumentRetriever   从向量存储中检索与语义相相似的文档
                    filterExpression   可以灵活指定过滤条件
                    Query   也可以构造Query对象的FILTER_EXPRESSION参数动态指定过滤表达式
            文档合并：
            ConcatenationDocumentJoiner   通过连接操作实现的文档合并器
                会将多个查询和多个检索到的文档合并成一个文档，重复的部分只保留首次出现
        检索后：优化文档处理
            优化文档，减少冗余，去除杂质
        查询增强和关联
            QuestionAnswerAdvisor    问答增强拦截器
            RetrievalAugmentationAdviosr     检索增强顾问(不允许检索的上下文为空)
                可以配合RAG架构进行，检索前，检索时，检索后的操作
            ContextualQueryAugmenter   空上下文处理器



最佳实践：
    优化原始文档，尽量结构化
    文档的分片，推荐使用智能分片，然后人工二次核验
    添加元信息
    ...待补充


高级知识
    混合检索策略：
        向量检索：根据语义检索，但关键字不够敏感
        倒排索引的全文检索：在精确匹配关键字上效果出色，但不能识别语义
        并行混合检索：
            向量检索与全文检索同时检索，最后融合结果
        级联混合检索：
            一级一级检索，多次不同检索，每次使用的检索技术可以动态优化
        动态混合检索：
            使用分析器智能选择检索技术
    大模型幻觉：
        大模型没有正确的标准，可能会胡言乱语，这和大模型的训练有关
        评估和错误改进：
            通常有一套系统用来评估大模型的幻觉，通过打分的方式，找出表现不好的地方改进
    高级RAG架构：
        自纠错RAG：能够搜集信息验证给出的答案
        自省式RAG：定义知识搜集策略，提高系统效率
        检索树RAG：根据语义拆分问题，分别检索，最后将结果合并
        多智能体RAG：将用户提问通过策略分配给擅长的智能体回答，智能体直接协同处理

Tool Calling工具调用
    AI大模型判断需不需要使用工具，需要使用时，调用我们的程序执行工具代码(有一定的校验)，而不是AI自行决定工具使用
    流程：
        工具定义->工具选择->返回意图->工具执行->结果返回->继续对话
    工具定义：
        基于Methods方法定义，使用@Tool和@ToolParam注解标记方法
            @Tool  描述什么时候使用工具
            @ToolParam   描述当前参数，可以指定descriotion指定参数描述，required指定是否必须传入参数
    工具使用：
        1.创建(create)ChatClient时，指定.tools(可以包含多个工具)，声明存在工具可以使用
        2.全局使用，在构建(build)ChatClient时，指定.defaultTools(可以包含多个工具)，声明存在工具可以使用
        3.使用ChatModel绑定工具，过程中需要使用ToolCallback工具对象和ChatOptions对话对象，最后构造Prompt，然后使用ChatModel绑定工具
        4.SpringAI提供了ToolCallbackResolver，在运行时动态解析工具
    工具示例：
        读写文件：

        网页搜索：

        网页抓取：
            其他知识：jsoup库   Java爬虫可以使用这个库

        资源下载：

        终端执行命令：

        PDF生成：
            itext库(很多PDF库对于中文的支持有限)
    
    进阶知识：(底层)
        ToolCallback接口    基础接口
            ToolDefation    工具的定义，什么时候调用工具
            ToolMetadata    工具元信息
                returnDirect   是否要立即返回
            call     执行工具并返回结果

        JsonSchemaGenerator   会解析方法签名和注解，自动生成符合JSON Schema规范的参数定义作为ToolDefation的一部分提供给AI大模型。
        ToolcallResultConverter负责将各种类型的方法返回值统一转换为字符串，便于传递给Al大模型处理。
        MethodToolcallback实现了对注解方法的封装，使其符合Toolcallback接口规范。

        ToolContext   工具上下文
            工具上下文的内容不会传递给AI大模型
        
        工具底层执行原理
            ToolCallingManager     核心组件(管理工具的整个生命周期)
                List<ToolDefinition> resolveToolDefinitions(ToolCallingChatOptions chatOptions);   解析工具的定义
                ToolExecutionResult executeToolCalls(Prompt prompt, ChatResponse chatResponse);  执行工具的调用

                ToolExecutionExceptionProcessor   自定义异常策略，需要装配到ToolCallingManager


MCP模型上下文协议
    MCP提供了许多能力，但基本只使用Tool就够用了
        下载到本地使用：将写好的MCP代码下载到本地，运行使用
        调用网络上的服务：调用编写好的MCP服务使用
    云平台使用：略(比较简单)
    其他软件中使用：略(比较简单)
    程序中使用：
        (未填写)配置文件->SpringAI自动读取->配置到应用上使用
    程序中开发：
        客户端：
            配置文件
                stdio 本地服务
                sse    远程服务
        服务端：
            配置文件
            工具定义
            注册工具



智能体构建：
    CoT思维链：良好的思维链提示词能让AI知道该如何思考
    AGent Loop 执行循环：在用户没有输入时接着思考如何解决问题
    ReAct： 结合了推理和行动的智能体架构


高级：
    智能体工作流：智能体协作完成任务
        提示链工作流：将一系列复杂的任务拆分，由擅长的智能体来完成
        路由分流工作流：使用ai控制路由
        Parallelization并行工作流：同时处理内容，提升处理速度，提高准确度
        Orchestrator-Workers协调器-执行者工作流：  增强大模型管理，任务分配，使结构更灵活
        Evaluator-Optimizer评估-优化循环工作流： 对结果进行评审，反复迭代直到达到满意的结果
    
    LangGraph   在传统工作流基础上增加了AI能力
    A2A协议：智能体与智能体之间的交互规范



响应式返回数据：
    1.
    返回值设置为Flux<String>   
    设置请求属性    produces = MediaType.TEXT_EVENT_STREAM_VALUE
    2.
    返回值设置为Flux<ServerSentEvent<String>>
    将数据转换为ServerSentEvent
    3.
    返回值设置为SseEmitter
    @GetMapping(value = "SseEmitter")
    public SseEmitter Serversentevent(String mesage, String chatId){
        SseEmitter sseEmitter = new SseEmitter(180000L);   //构造SseEmitter，设置超时时间
        //subscribe为响应式监听，当love.doChatStream(mesage,chatId)发生改变时回调第一个方法，第二个参数为失败时回调方法，第三个参数为完成时回调方法
        love.doChatStream(mesage,chatId).subscribe(chunk->{ 
            try {
                sseEmitter.send(chunk);
            } catch (IOException e) {
                sseEmitter.completeWithError(e);
            }
        },sseEmitter::completeWithError,sseEmitter::complete);
        return sseEmitter;
    }