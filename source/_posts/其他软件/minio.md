---
title: minio
date: 2025-08-16 21:09:13
tags:
categories: "其他软件"
---


将minio交给systemd启动：
    编写配置文件：vim /etc/systemd/system/minio.service(配置文件必须位于/etc/systemd/system/ 或 /usr/lib/systemd/system)
        [Unit]
        Description=MinIO
        Documentation=https://min.io/docs/minio/linux/index.html
        Wants=network-online.target
        After=network-online.target
        AssertFileIsExecutable=/usr/local/bin/minio

        [Service]
        WorkingDirectory=/usr/local
        ProtectProc=invisible
        EnvironmentFile=-/etc/default/minio
        ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
        ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES
        Restart=always
        LimitNOFILE=65536
        TasksMax=infinity
        TimeoutStopSec=infinity
        SendSIGKILL=no

        [Install]
        WantedBy=multi-user.target
    编写EnvironmentFile文件：vim /etc/default/minio
        MINIO_ROOT_USER=minioadmin
        MINIO_ROOT_PASSWORD=minioadmin
        MINIO_VOLUMES=/data
        MINIO_OPTS="--console-address:9001"


minio的管理页面端口 9001
minio的资源端口  9000



java代码部分：
Maven依赖：
    <dependency>
        <groupId>io.minio</groupId>
        <artifactId>minio</artifactId>
        <version>8.5.3</version>
    </dependency>

基本使用：
    public void test01() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        String username="minioadmin";   //账号
        String password="minioadmin";   //密码
        String point="http:192.168.6.100:9000";   //连接的minio服务器地址
        String tong="lease";    //存储到哪个桶
        MinioClient minioClient=MinioClient.builder().credentials(username,password).endpoint(point).build();   //构建连接对象(minio全部采用构建器模式)，指定连接地址和账号密码
        boolean flag = minioClient.bucketExists(BucketExistsArgs.builder().bucket(tong).build());  //检查桶是否存在，指定桶名称
        if(!flag){
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(tong).build());  //创建桶，指定桶名称
            String policy= """
            {
                "Statement" : [ {
                "Action" : "s3:GetObject",
                        "Effect" : "Allow",
                        "Principal" : "*",
                        "Resource" : "arn:aws:s3:::test/*"
            } ],
                "Version" : "2012-10-17"
            } """;      //权限配置
            minioClient.setBucketPolicy(SetBucketPolicyArgs.builder().bucket(tong).config(policy).build());   //设置权限，指定设置权限的桶和权限配置
        }

        minioClient.uploadObject(UploadObjectArgs.builder()
                .bucket(tong)
                .object("sg.png")
                .filename("C:\\Users\\ASUS\\Pictures\\sg.png")
                .build());  //上传文件，指定上传到哪个桶，上传的文件名称，上传的文件路径
        String url=String.join("/",point,tong,"sg.png");    //上传后资源的访问地址，(拼接的访问路径)
        System.out.println(url);
    }


spring.servlet.multipart.max-file-size:100MB     设置单个上传文件大小     Servlet
spring.servlet.multipart.max-request-size:150MB  设置一次请求上传文件大小     Servlet

springdoc.default-flat-param-object:true   将接收参数不做优化处理。(不会把参数误当做json)

BeanUtils.copyProperties(Object source,Object target)  将源对象的同名属性赋值给目标对象





