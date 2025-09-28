---
title: Knife4j
date: 2025-08-17 10:06:16
tags:
categories: "其他软件"
---


嵌入到项目中，帮我我们生成一个网站用于测试
默认的访问地址在项目下的doc.html

场景启动器：
    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
        <version>4.3.0</version>
    </dependency>
配置类：(用于描述测试网站相关信息)
    @Configuration
    public class Knife4jConfiguration {
       @Bean
       public OpenAPI openAPI() {
           return new OpenAPI()
                   .info(new Info()
                           .title("hello-knife4j项目API")     //配置网站标识信息
                           .version("1.0")    //版本号
                           .description("hello-knife4j项目的接口文档"));   //对网站的描述
       }
       //用于分组管理的各模块信息
       @Bean
       public GroupedOpenApi userAPI() {
           return GroupedOpenApi.builder().group("用户信息管理").    //分组名称
                   pathsToMatch("/user/**").     //访问地址
                   build();
       }
   
       @Bean
       public GroupedOpenApi systemAPI() {
           return GroupedOpenApi.builder().group("产品信息管理").   //分组名称
                   pathsToMatch("/product/**").   //访问地址
       }
   }

注解配置：
    @Tag(name="")  注解用于对接口进行分类，相同Tag的接口会放在同一个菜单
    @Operation(summary="")  用于对接口进行描述
    @Parameter(description="")  用于对HTTP请求参数进行描述
    @Schema(description="")   注解用于描述作为接口参数或者返回值的实体类的数据结构