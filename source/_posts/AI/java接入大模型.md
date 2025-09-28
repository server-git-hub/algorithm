---
title: java接入大模型
date: 2025-09-03 10:38:36
tags:
categories: "AI"
---




LangChain4J         java接入大模型的适配器   

基本使用：
1.
    导入基础依赖
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-open-ai</artifactId>
        <version>1.4.0</version>
    </dependency>
    导入高阶依赖包(封装基础依赖中的API，使其更方便)
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j</artifactId>
        <version>1.4.0</version>
    </dependency>
2.  使用yml配置文件
    langchain4j.open-ai.chat-model.api-key=${OPENAI_API_KEY}    所属者
    langchain4j.open-ai.chat-model.model-name=gpt-4o       模型名称
    langchain4j.open-ai.chat-model.base-url=https://dashscope.aliyuncs.com/compatible-mode/v1      模型所在地址
2.1 使用配置类方式
    @Configuration
    public class ChatLanguageModelConfig {

        @Bean
        public ChatLanguageModel chatLanguageModel() {
            return OpenAiChatModel.builder()
                    .apiKey("${OPENAI_API_KEY}")
                    .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
                    .modelName("qwen-plus")
                    .build();
        }
    }
2.2 创建高阶API
    @Bean
    public ChatService chatService(ChatLanguageModel chatLanguageModel) {
        return AiServices.create(ChatService.class,chatLanguageModel);
    }
    使用AiServices.create根据ChatLanguageModel构造高阶API实现类
3.基本使用
    ChatLanguageModel     低阶API(原生API)
    AIService    高阶API(封装API)

    封装信息：
        UserMessage.from("")
4.其他配置
配置日志：
    langchain4j.open-ai.chat-model.log-requests=true     请求日志
    langchain4j.open-ai.chat-model.log-responses=true    响应日志
    需要将日志级别调整为debug
配置监听：
    创建监听实现ChatModelListener接口
        onRequest    请求时触发，请求作用域中的内容可以在响应时拿到
        onResponse   响应时触发，可以拿到请求时的内容
        onError    错误时触发
    配置监听：
        .listeners(List.of(new 实现了创建监听实现ChatModelListener接口的实现类))
配置重试：
    .maxRetries(2)    一共尝试2次
配置超时：
    .timeout(Duration.ofSeconds(10))     超时时间设置为10s


视觉：
    文申图：
        1.使用解析图片专用的大模型
        2.将图片转换为Base64，
        3.调用大冒险，并使用UserMessage.from处理转换后的Base64数据
        4.返回ChatResponse对象

流式输出：
1.导入额外依赖
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-reactor</artifactId>
        <version>1.0.0-beta3</version>
    </dependency>
2.配置
    @Configuration
    public class ChatLanguageModelConfig {

        @Bean
        public StreamingChatLanguageModel streamingChatLanguageModel() {
            return OpenAiStreamingChatModel.builder()
                    .apiKey("${OPENAI_API_KEY}")
                    .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
                    .modelName("qwen-plus")
                    .build();
        }
    }
    使用OpenAiStreamingChatModel构建StreamingChatLanguageModel对象
    API：
        StreamingChatLanguageModel      低阶API
        低阶流式返回模板
            Flux.create(stringFluxSink -> {
                streamingChatLanguageModel.chat(prompt, new StreamingChatResponseHandler() {
                    @Override
                    public void onPartialResponse(String s) {
                        stringFluxSink.next(s);
                    }

                    @Override
                    public void onCompleteResponse(ChatResponse chatResponse) {
                        stringFluxSink.complete();
                    }

                    @Override
                    public void onError(Throwable throwable) {
                        stringFluxSink.error(throwable);
                    }
                });
            });
        自定义接口，配置到Spring容器中    高阶API
        直接使用API中方法，在为接口配置时，已经实现了默认的流式动作

记忆缓存：
    @Memory   记忆标识
    @UserMessage   加到属性上，用于封装记忆内容
    构建者模式注册高阶API
    @Bean
    public ChatService chatLongService(ChatLanguageModel chatLanguageModel) {
        return AiServices.builder(ChatService.class)
                .chatLanguageModel(chatLanguageModel)
                .chatMemoryProvider(memoryId -> MessageWindowChatMemory.withMaxMessages(100))    设定memoryId存放100条记忆

                .build();
    }

    memoryId -> TokenWindowChatMemory.withMaxTokens()  设置记忆最大token数

提示词工程：
    第一种(推荐)
    @SystemMessage      设置限定词，相当于在回答问题前，约束大模型
    @UserMessage    加到方法上，指定提示词(问题)，可以使用{{value}}添加占位符，使用@V使用属性赋值占位符
    第二种
    使用@StructuredPrompt注解
    定义实体类，添加@StructuredPrompt注解并指定限定词，可以使用{{value}}添加占位符，使用实体类属性赋值，使用时输入该实体类，@StructuredPrompt注解会将实体类属性注入到占位符
    第三种
    使用PromptTemplate模板，提示词模板渲染
    PromptTemplate promptTemplate=PromptTemplate.from("");   提示词
    Prompt prompt=promptTemplate.apply("");   为占位符赋值


Tools(Function calling)
    方法一：编码式实现
    指定了工具说明和工具逻辑
        @Bean
        public FunctionService functionService(ChatLanguageModel chatLanguageModel) {
            //工具说明ToolSpecification
            ToolSpecification toolSpecification=ToolSpecification.builder()
                    .name("assistant")
                    .description("根据信息开具发票")
                    .parameters(JsonObjectSchema.builder()
                            .addStringProperty("companyName","公司名称")
                            .addStringProperty("dutyNumber","税号")
                            .addStringProperty("amount","金额")
                            .build())
                    .build();
            //业务逻辑ToolExecutor
            ToolExecutor toolExecutor=(toolExecutionRequest,memoryId) ->{
                System.out.println(toolExecutionRequest.id());
                System.out.println(toolExecutionRequest.name());
                System.out.println(toolExecutionRequest.arguments());
                return "开具成功";
            };
            return AiServices.builder(FunctionService.class)
                    .chatLanguageModel(chatLanguageModel)
                    .tools(Map.of(toolSpecification, toolExecutor))
                    .build();
        }
    方法二：注解式实现
    @Tool(工具说明)   工具的说明信息
    @P(参数信息)    工具所需参数信息


GraalVm函数
    拥有调用第三方语言的能力，支持javascript，python
    1.导入依赖
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-code-execution-engine-graalvm-polyglot</artifactId>
        <version>1.4.0-beta10</version>
    </dependency>
    2.API
    CodeExecutionEngine javascript=new GraalVmJavaScriptExecutionEngine();  javascript的API
    CodeExecutionEngine python=new GraalVmPythonExecutionEngine();    python的API
    GraalVmJavaScriptExecutionTool   javascript的tool工具
    GraalVmPythonExecutionTool       python的tool工具


向量存储  (特征：相似度计算)
    向量通用API：
        EmbeddingModel   向量模型API(用于文申向量)
        EmbeddingSearchRequest    向量操作API(用于对向量进行操作，增删改查)

    基本使用：
        导入依赖(例如使用Qdrant)
        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-qdrant</artifactId>
        </dependency>
    添加文申向量模型
    @Bean
    public EmbeddingModel embeddingModel() {
        return OpenAiEmbeddingModel.builder()
                .apiKey(System.getenv("aliQwen-api"))
                .modelName("text-embedding-v3")
                .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
                .build();
    }
    添加向量数据库Qdrant客户端
    @Bean
    public QdrantClient qdrantClient() {
        QdrantGrpcClient.Builder grpcClientBuilder =
                QdrantGrpcClient.newBuilder("127.0.0.1",
                        6334, false);
        return new QdrantClient(grpcClientBuilder.build());
    }
    添加向量操作模型
    @Bean
    public EmbeddingStore<TextSegment> embeddingStore() {
        return QdrantEmbeddingStore.builder()
                .host("127.0.0.1")
                .port(6334)
                .collectionName("test-qdrant")
                .build();
    }

    基本使用
    文本向量化
    public String embed(@RequestParam(value = "prompt",defaultValue = "") String prompt)
    {
        Response<Embedding> embeddingResponse = embeddingModel.embed(prompt);

        System.out.println(embeddingResponse);

        return embeddingResponse.content().toString();
    }
    创建向量数据库实例
    public void createCollection()
    {
        var vectorParams = Collections.VectorParams.newBuilder()
                .setDistance(Collections.Distance.Cosine)
                .setSize(1024)
                .build();
        qdrantClient.createCollectionAsync("test-qdrant", vectorParams);
    }
    新增数据库记录
    public String add(@RequestParam(value = "prompt",defaultValue = "") String prompt)
    {
        TextSegment segment1 = TextSegment.from(prompt);
        segment1.metadata().put("author", "zzyy");   //添加更多信息
        segment1.metadata().put("UserId", "1111");   //添加更多信息
        Embedding embedding1 = embeddingModel.embed(segment1).content();
        String result = embeddingStore.add(embedding1, segment1);

        System.out.println(result);

        return result;
    }
    对数据库进行向量相似度查找
    public void query1(){
        Embedding queryEmbedding = embeddingModel.embed("咏鸡现代诗").content();
        EmbeddingSearchRequest embeddingSearchRequest = EmbeddingSearchRequest.builder()
                .queryEmbedding(queryEmbedding)
                .maxResults(1)
                .build();
        EmbeddingSearchResult<TextSegment> searchResult = embeddingStore.search(embeddingSearchRequest);
        System.out.println(searchResult.matches().get(0).embedded().text());
    }

    API：
        QdrantEmbeddingStore
        EmbeddingModel   文本向量化模型
        QdrantClient     向量数据库客户端
        EmbeddingStore<TextSegment>   对向量数据库操作
        EmbeddingSearchRequest    向量查找模板

RAG(检索增强生成)
    1.导入依赖
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-easy-rag</artifactId>
        <version>1.4.0-beta10</version>
    </dependency>
    2.添加InMemoryEmbeddingStore(内存向量数据库)(可选其他向量数据库)
    @Bean
    public InMemoryEmbeddingStore<TextSegment> embeddingStore() {
        return new InMemoryEmbeddingStore<>();
    }
    3.构建高阶API时加入RAG增强
    @Bean
    public ChatAssistant assistant(ChatLanguageModel chatLanguageModel, EmbeddingStore<TextSegment> embeddingStore) {
        return AiServices.builder(ChatAssistant.class)
                .chatLanguageModel(chatLanguageModel)
                .chatMemory(MessageWindowChatMemory.withMaxMessages(100))
                .contentRetriever(EmbeddingStoreContentRetriever.from(embeddingStore)) //加入增强
                .build();
    }
    关键： .contentRetriever(EmbeddingStoreContentRetriever.from(embeddingStore))  加入增强

    4.基本使用
    public String RAGhello(@RequestParam(value = "prompt",defaultValue = "我叫什么，我多少岁") String prompt){
        Document document= FileSystemDocumentLoader.loadDocument("D:\\java.docx");
        EmbeddingStoreIngestor.ingest(document, embeddingStore);
        String res=ragService.chat(prompt);
        System.out.println(res);
        return res;
    }

    EmbeddingStoreIngestor    EmbeddingStore的工具类，批量的将原始文档存储到EmbeddingStore中



SpringBoot整合
    低阶API
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-open-ai-spring-boot-starter</artifactId>
        <version>1.0.0-beta3</version>
    </dependency>
    高阶API
    <dependency>
        <groupId>dev.langchain4j</groupId>
        <artifactId>langchain4j-spring-boot-starter</artifactId>
        <version>1.0.0-beta3</version>
    </dependency>

    @AiService注解   自动将Service使用AiService通过ChatLanguageModel创建实现类，根据需求配置参数


MCP  模型上下文协议(Function calling的升级版)(重要)(基于SpringAI实现,因为LangChain4J目前对MCP支持并没有SpringAI好)
  服务端：
    导入依赖：
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-starter-mcp-server-webflux</artifactId>
        <version>1.0.0</version>
    </dependency>
    配置文件
    spring.ai.mcp.server.type=async
    基本使用
    @Tool("根据城市名称获取天气信息")
    public String weather(String city){//根据实际需求调用其他服务
        Map<String,String> map=Map.of(
                "北京","晴朗",
                "上海","雷雨",
                "南京","暴雨"
        );
        return map.getOrDefault(city,"抱歉，所查询的城市不存在");
    }
    配置类
    @Bean
    public ToolCallbackProvider toolCallbackProvider(){
        return MethodToolCallbackProvider.builder()
                .toolObjects(mcpService)   //将工具业务注入到MCP，(工具方法暴露出去)
                .build();
    }
  客户端：
    导入依赖：
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-starter-mcp-client</artifactId>
            <version>1.0.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-starter-model-openai</artifactId>
            <version>1.0.0</version>
        </dependency>
    配置文件：
        spring:
          ai:
            openai:
              api-key: ${deepseek.key}    //大模型的api-key
              base-url: https://api.deepseek.com   //大模型的url地址
              chat:
                options:
                  model: deepseek-chat     //具体模型
          mcp:
            client:
            type: async      //异步方式
            request-timeout: 30s       //请求超时时间
            toolcallback:
              enabled: true      //开启客户端发现工具，调用工具能力
            sse:             //流式
              connections:    //配置访问的服务
                mcp-server-1:       
                  url: http://localhost:8080
    #           mcp-server-2:
    #             url:
    配置类：
    public ChatClient chatClient(ChatModel chatModel, ToolCallbackProvider toolCallbackProvider) {
       return ChatClient.builder(chatModel)
               .defaultToolCallbacks(toolCallbackProvider.getToolCallbacks())    //mcp协议，详情见配置文件
               .build();
    }