---
title: 鱼皮的AI(对java接入大模型进行扩展)
date: 2025-09-20 13:55:52
tags:
categories: "AI"
---

ChatModel  会话大模型
ChatClient  会话客户端->需要指定会话大模型，可以调用大模型进行会话

官方提供SDK方式调用大模型
    package com.server.demo;// 建议dashscope SDK的版本 >= 2.12.0
    import java.util.Arrays;
    import java.lang.System;
    import com.alibaba.dashscope.aigc.generation.Generation;
    import com.alibaba.dashscope.aigc.generation.GenerationParam;
    import com.alibaba.dashscope.aigc.generation.GenerationResult;
    import com.alibaba.dashscope.common.Message;
    import com.alibaba.dashscope.common.Role;
    import com.alibaba.dashscope.exception.ApiException;
    import com.alibaba.dashscope.exception.InputRequiredException;
    import com.alibaba.dashscope.exception.NoApiKeyException;
    import com.alibaba.dashscope.utils.JsonUtils;

    public class SDKtoAI {
        public static GenerationResult callWithMessage() throws ApiException, NoApiKeyException, InputRequiredException {
            Generation gen = new Generation();
            Message systemMsg = Message.builder()
                    .role(Role.SYSTEM.getValue())
                    .content("You are a helpful assistant.")
                    .build();
            Message userMsg = Message.builder()
                    .role(Role.USER.getValue())
                    .content("阿里巴巴创建多久了？")
                    .build();
            GenerationParam param = GenerationParam.builder()
                    // 若没有配置环境变量，请用百炼API Key将下行替换为：.apiKey("sk-xxx")
                    .apiKey(System.getenv("OPENAI_API_KEY"))
                    // 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
                    .model("qwen-plus")
                    .messages(Arrays.asList(systemMsg, userMsg))
                    .resultFormat(GenerationParam.ResultFormat.MESSAGE)
                    .build();
            return gen.call(param);
        }
        public static void main(String[] args) {
            try {
                GenerationResult result = callWithMessage();
                System.out.println(JsonUtils.toJson(result));
            } catch (ApiException | NoApiKeyException | InputRequiredException e) {
                // 使用日志框架记录异常信息
                System.err.println("An error occurred while calling the generation service: " + e.getMessage());
            }
            System.exit(0);
        }
    }
http方式调用大模型
(curl工具：可以通过命令行构造http请求，接收响应)
    package com.server.demo;
    import cn.hutool.http.HttpRequest;
    import cn.hutool.http.HttpResponse;
    import cn.hutool.json.JSONObject;
    import cn.hutool.json.JSONArray;
    public class HttptoAI {

        private static final String API_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
        private static final String API_KEY = System.getenv("OPENAI_API_KEY"); // 请替换为您的实际API密钥

        public static void main(String[] args) {
            // 构建请求体
            JSONObject requestBody = new JSONObject();
            requestBody.put("model", "qwen-plus");

            // 构建input对象
            JSONObject input = new JSONObject();
            JSONArray messages = new JSONArray();

            // 添加system消息
            JSONObject systemMessage = new JSONObject();
            systemMessage.put("role", "system");
            systemMessage.put("content", "You are a helpful assistant.");
            messages.add(systemMessage);

            // 添加user消息
            JSONObject userMessage = new JSONObject();
            userMessage.put("role", "user");
            userMessage.put("content", "介绍一下长城，限定50字以内");
            messages.add(userMessage);
            input.put("messages", messages);
            requestBody.put("input", input);

            // 构建parameters对象
            JSONObject parameters = new JSONObject();
            parameters.put("result_format", "message");
            requestBody.put("parameters", parameters);

            // 发送HTTP请求
            HttpResponse response = HttpRequest.post(API_URL)
                    .header("Authorization", "Bearer " + API_KEY)
                    .header("Content-Type", "application/json")
                    .body(requestBody.toString())
                    .execute();

            // 处理响应
            if (response.isOk()) {
                System.out.println("请求成功！");
                System.out.println("响应内容：" + response.body());
            } else {
                System.out.println("请求失败！");
                System.out.println("状态码：" + response.getStatus());
                System.out.println("错误信息：" + response.body());
            }
        }
    }
SpringAI框架调用大模型(对tokenblog.cn上的内容进行补充)
    package com.server.demo;
    import jakarta.annotation.Resource;
    import org.springframework.ai.chat.messages.AssistantMessage;
    import org.springframework.ai.chat.model.ChatModel;
    import org.springframework.ai.chat.prompt.Prompt;
    import org.springframework.boot.CommandLineRunner;

    public class SpringAItoAI implements CommandLineRunner {

        @Resource
        private ChatModel dashScopeChatClient;

        public void run(String... args) throws Exception {
            AssistantMessage output = dashScopeChatClient.call(new Prompt("你是谁"))
                    .getResult()
                    .getOutput();
            System.out.println(output.getText());
        }
    }


    chatModel   大模型
    chatClient  对话客户端()
    chatResponse  返回结果对象
    
Langchain4J框架调用大模型



Prompt工程
    优化提示词
    减少无用的上下文节约token
    样本学习：提供样本数据，让ai根据样本生成内容
    提供外部资源库，增加可靠性


Advisors(顾问)    拦截器
    构建时指定默认拦截器
     public Love(ChatModel dashScopeChatClient) {
        ChatMemory chatMemory=new InMemoryChatMemory();
        chatClient=ChatClient.builder(dashScopeChatClient)
                .defaultSystem(prompt)
                .defaultAdvisors(
                        new MessageChatMemoryAdvisor(chatMemory)     //创建使用对话记忆拦截器
//                        ,new SimpleLoggerAdvisor(0)
                )
                .build();
//        FileBaseChatMemory FileBaseChatMemory=new FileBaseChatMemory("D://tmp1");
//        chatClient=ChatClient.builder(dashScopeChatClient)
//                .defaultSystem(prompt)
//                .defaultAdvisors(
//                        new MessageChatMemoryAdvisor(FileBaseChatMemory)
////                        ,new SimpleLoggerAdvisor(0)
//                )
//                .build();
    }
    
    MessageChatMemoryAdvisor(ChatMemory chatMemory)    会将对话历史作为一系列独立的消息添加到提示中
    ChatMemory    存储对话历史消息的组件，对历史消息进行增删查
        InMemoryChatMemory  内存存储
    自定义拦截器：
        package com.server.chatMemory;
        import com.esotericsoftware.kryo.Kryo;
        import com.esotericsoftware.kryo.io.Input;
        import com.esotericsoftware.kryo.io.Output;
        import org.objenesis.strategy.StdInstantiatorStrategy;
        import org.springframework.ai.chat.memory.ChatMemory;
        import org.springframework.ai.chat.messages.Message;

        import java.io.File;
        import java.io.FileInputStream;
        import java.io.FileOutputStream;
        import java.io.IOException;
        import java.util.ArrayList;
        import java.util.List;

        /**
        * 基于文件持久化的对话记忆
        */
        public class FileBaseChatMemory implements ChatMemory {

            private final String BASE_DIR;
            private static final Kryo kryo = new Kryo();

            static {
                kryo.setRegistrationRequired(false);
                // 设置实例化策略
                kryo.setInstantiatorStrategy(new StdInstantiatorStrategy());
            }

            // 构造对象时，指定文件保存目录
            public FileBaseChatMemory(String dir) {
                this.BASE_DIR = dir;
                File baseDir = new File(dir);
                if (!baseDir.exists()) {
                    baseDir.mkdirs();
                }
            }

            @Override
            public void add(String conversationId, List<Message> messages) {
                List<Message> conversationMessages = getOrCreateConversation(conversationId);
                conversationMessages.addAll(messages);
                saveConversation(conversationId, conversationMessages);
            }

            @Override
            public List<Message> get(String conversationId, int lastN) {
                List<Message> allMessages = getOrCreateConversation(conversationId);
                return allMessages.stream()
                        .skip(Math.max(0, allMessages.size() - lastN))
                        .toList();
            }

            @Override
            public void clear(String conversationId) {
                File file = getConversationFile(conversationId);
                if (file.exists()) {
                    file.delete();
                }
            }

            private List<Message> getOrCreateConversation(String conversationId) {
                File file = getConversationFile(conversationId);
                List<Message> messages = new ArrayList<>();
                if (file.exists()) {
                    try (Input input = new Input(new FileInputStream(file))) {
                        messages = kryo.readObject(input, ArrayList.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                return messages;
            }

            private void saveConversation(String conversationId, List<Message> messages) {
                File file = getConversationFile(conversationId);
                try (Output output = new Output(new FileOutputStream(file))) {
                    kryo.writeObject(output, messages);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            private File getConversationFile(String conversationId) {
                return new File(BASE_DIR, conversationId + ".kryo");
            }
        }

    官方拦截器
        日志拦截器(提供一些日志信息)
            SimpleLoggerAdvisor
        重复阅读拦截器(重复提示词信息)
            ReReadingAdvisor
    在拦截器中可以获取该链条的其他拦截器数据，使用AdvisedResponse.adviseContext().get()    雷神ThreadLocal的使用方法


结构化输出
    Sprirng提供的转换器
        MapOutputConverter
        BeanOutputConverter
        ListOutputConverter
    //结构化输出
    public User doChatStruct(String message,String chatId){
        User user = chatClient.prompt()
                .system("每次会话要为我生成一个标题为{用户名}的恋爱报告")
                .user(message)
                .advisors(sp -> sp.param(CHAT_MEMORY_CONVERSATION_ID_KEY, chatId)
                        .param(CHAT_MEMORY_RETRIEVE_SIZE_KEY, 1))
                .call()
                .entity(User.class);   //指定接收类型，ai会将结果尽可能的转换为目标结构
        log.info(user.toString());
        return user;
    }

    .entity()   
        指定接收类型
        new ParameterizedTypeReference<Object>() {}    可以通过该抽象类实现更复杂的目标结构


对话记忆化存储
    将会话持久化
        将会话持久化到文件系统中
    package com.server.chatMemory;
    import com.esotericsoftware.kryo.Kryo;
    import com.esotericsoftware.kryo.io.Input;
    import com.esotericsoftware.kryo.io.Output;
    import org.objenesis.strategy.StdInstantiatorStrategy;
    import org.springframework.ai.chat.memory.ChatMemory;
    import org.springframework.ai.chat.messages.Message;

    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileOutputStream;
    import java.io.IOException;
    import java.util.ArrayList;
    import java.util.List;

    /**
    * 基于文件持久化的对话记忆
    */
    public class FileBaseChatMemory implements ChatMemory {

        private final String BASE_DIR;
        private static final Kryo kryo = new Kryo();

        static {
            kryo.setRegistrationRequired(false);
            // 设置实例化策略
            kryo.setInstantiatorStrategy(new StdInstantiatorStrategy());
        }

        // 构造对象时，指定文件保存目录
        public FileBaseChatMemory(String dir) {
            this.BASE_DIR = dir;
            File baseDir = new File(dir);
            if (!baseDir.exists()) {
                baseDir.mkdirs();
            }
        }

        @Override
        public void add(String conversationId, List<Message> messages) {
            List<Message> conversationMessages = getOrCreateConversation(conversationId);
            conversationMessages.addAll(messages);
            saveConversation(conversationId, conversationMessages);
        }

        @Override
        public List<Message> get(String conversationId, int lastN) {
            List<Message> allMessages = getOrCreateConversation(conversationId);
            return allMessages.stream()
                    .skip(Math.max(0, allMessages.size() - lastN))
                    .toList();
        }

        @Override
        public void clear(String conversationId) {
            File file = getConversationFile(conversationId);
            if (file.exists()) {
                file.delete();
            }
        }

        private List<Message> getOrCreateConversation(String conversationId) {
            File file = getConversationFile(conversationId);
            List<Message> messages = new ArrayList<>();
            if (file.exists()) {
                try (Input input = new Input(new FileInputStream(file))) {
                    messages = kryo.readObject(input, ArrayList.class);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return messages;
        }

        private void saveConversation(String conversationId, List<Message> messages) {
            File file = getConversationFile(conversationId);
            try (Output output = new Output(new FileOutputStream(file))) {
                kryo.writeObject(output, messages);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        private File getConversationFile(String conversationId) {
            return new File(BASE_DIR, conversationId + ".kryo");
        }
    }
    (难点：持久化存储过程中->历史记录序列化到文档中->文档中的历史记录序列化到内存中)
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
        加载数据源(例如：Markdown)：
            package com.server.rag;
            import lombok.extern.slf4j.Slf4j;
            import org.springframework.ai.document.Document;
            import org.springframework.ai.reader.markdown.config.MarkdownDocumentReaderConfig;
            import org.springframework.core.io.Resource;
            import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
            import org.springframework.core.io.support.ResourcePatternResolver;
            import org.springframework.stereotype.Component;

            import java.util.ArrayList;
            import java.util.List;

            @Component
            @Slf4j
            public class LocalRAG {


                private ResourcePatternResolver resourcePatternResolver;

                public LocalRAG(ResourcePatternResolver resourcePatternResolver) {
                    this.resourcePatternResolver = resourcePatternResolver;
                }

                List<Document> getList(){
                    List<Document> documents = new ArrayList<>();
                    try{
                        Resource[] resources = resourcePatternResolver.getResources("classpath:*.md");
                        for (Resource resource : resources) {
                            String filename = resource.getFilename();
                            MarkdownDocumentReaderConfig config=MarkdownDocumentReaderConfig.builder()
                                    .withHorizontalRuleCreateDocument(true)
                                    .withIncludeCodeBlock(false)
                                    .withIncludeBlockquote(false)
                                    .withAdditionalMetadata("filename",filename)
                                    .build();
                            MackdownDocumentReader reader=new MackdownDocumentReader(resource,config);
                            documents.addAll(reader.get());
                        }

                    }catch (Exception e){
                        log.error("文档加载失败",e);
                    }
                    return documents;
                }
            }

        注册VectorStore并存储数据：
            package com.server.rag;
            import jakarta.annotation.Resource;
            import org.springframework.ai.document.Document;
            import org.springframework.ai.embedding.EmbeddingModel;
            import org.springframework.ai.vectorstore.SimpleVectorStore;
            import org.springframework.ai.vectorstore.VectorStore;
            import org.springframework.context.annotation.Bean;
            import org.springframework.context.annotation.Configuration;

            import java.util.List;
            @Configuration
            public class LocalRAGconfig {
                @Resource
                private LocalRAG localRAG;

                @Bean
                VectorStore Load(EmbeddingModel dachscopeEmbeddingModel) {
                    VectorStore vectorStore=SimpleVectorStore.builder(dachscopeEmbeddingModel).build();
                    List<Document> list = localRAG.getList();
                    vectorStore.add(list);
                    return vectorStore;
                }
            }

        在会话客户端局部配置问答拦截器->参数为VectorStore
            //RAG增强检索
            public User doChatRAG(String message,String chatId){
                User user = chatClient.prompt()
                        .system("每次会话要为我生成一个标题为{用户名}的恋爱报告")
                        .user(message)
                        .advisors(sp -> sp.param(CHAT_MEMORY_CONVERSATION_ID_KEY, chatId)
                                .param(CHAT_MEMORY_RETRIEVE_SIZE_KEY, 1))
                        .advisors(new QuestionAnswerAdvisor(vectorStore))   //配置问答拦截器并配置需要读取的RAG检索资源(VectorStore是一个接口，用于将向量保存到存储引擎)
                        .call()
                        .entity(User.class);
                log.info(user.toString());
                return user;
            }
        测试：
            
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
        