---
title: redis
date: 2025-08-14 09:45:02
tags:
categories: "redis"
---


启动和连接redis
redis-server    redis服务(默认前台启动)
redis-server 配置文件路径     redis服务(配置文件中可以配置后台启动)
redis-cli -p 6379    redis本地客户端,指定端口号
redis-cli -h ip地址     指定地址连接远程redis
redis-cli -raw          显示原内容，不进行转码

关闭redis
shutdown    在redis中关闭redis服务
redis-cli shutdown   关闭redis服务
redis-cli -p 6379 shutdown 指定端口关闭redis服务


(基本配置)
redis中有个redis.conf 的配置文件模板文件，可以将配置文件复制一份修改
    1.修改配置文件中的daemonize，将no改为yes，yes为后台运行(309行)
    2.修改配置文件中的bing，注释该配置，取消绑定仅主机登录访问(87行)
    3.修改配置文件中的protected-mode，将yes改为no，取消保护模式(111行)



五大数据类型：
    string   字符串
    hash     hashmap
    list     集合
    set      集合
    zset     有序集合


key操作的相关命令：
    keys *      查看当前库所有key
    exists key  判断某个key是否存在
    type key    查看指定key是什么类型
    del key     删除指定的key
    unlink key  非阻塞删除，仅将keys从keyspace元数据中删除，真正的删除会在后续异步操作
    expire key 10  为给定的key设置过期时间
    ttl key     查看还有多少秒过期，-1表示永不过期，-2表示已过期
    select      命令切换数据库
    dbsize      查看当前数据库key的数量
    flushdb     清空当前库
    flushall    清空全部库

String类型相关命令 
    set key value    添加键值对
        NX：当数据库中key不存在时，可以将key-value添加数据库
        XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥
        EX：key的超时秒数
        PX：key的超时毫秒数，与EX互斥
    get key          查询键对应的值
    append key value 将给定的value追加到原key对应的value的末尾
    strlen key       获取值的长度
    setnx key value  只有在key不存在时，添加键值对
    incr key         将key中存储的数字递增1，只能对数字值操作，如果为空，新增值为1
    decr key         将key中存储的数字递减1，只能对数字值操作，如果为空，新增值为-1
    incrby/decrby key 步长          将key中存储的数字值增减，自定义步长
    mset key1 value1 key2 value2... 同时设置多个键值对
    mget key1 key2 key3             同时获取多个value
    msetnx key1 value1 key2 value2  同时设置多个键值对，当且仅当所有给定的key都不存在，有一个失败则全部失败(原子性)
    getrange key 起始位置 结束位置    获取值的范围，类似java中的substring，前包，后包
    setex key 过期时间 value         设置键值的同时设置过期时间，单位秒
    getset key value                以旧换新，设置了新值的通知获得旧值




list类型相关命令
    lpush/rpush key value1 value2      从左边/右边插入一个或多个值
    lpop/rpop  key                     从左边/右边取出一个值，值在键在，值光键亡
    rpoplpush key1 key2                从key1列表右边取出一个值，插入到key2列表左边
    lrange key start stop              按照索引下标获得元素
    lindex key index                   按照索引下标获得元素，(从左到右)
    llen key                           获取列表长度
    linsert key before value newvalue   在value的前面插入newvalue值
    linsert key after value newvalue    在value的后面插入newvalue值
    lrem key n value                    从左边删除n个value(从左到右)
    lset key index value                将列表key下标为index的值替换为value 


set类型相关命令(去重)
    sadd key value1 value2  将一个或多个元素添加到集合中，已经存在的元素会被忽略
    smembers key            取出该集合的所有值
    sismember key value     判断集合key是否为含有该value值，有1，没有0
    scard key               返回该集合的元素个数
    srem  key value1 value2  删除集合中的某个元素
    spop key                 随机从该集合中取出一个值
    spop key n               随机从该集合中取出n个值
    srandmember key n        随机从该集合中查看n个值(不会删除)
    smove source destination value  把集合中一个值从一个集合移动到另一个集合
    sinter key1 key2                返回两个集合的交集元素
    sunion key1 key2                返回两个集合的并集元素
    sdiff key1 key2                 返回两个集合的差集元素(key1中有的，key2中没有的)

zset类型相关命令(有序的set)
    zadd key score1 value1 score2 value2     将一个或多个member元素及其score值加入到有序集key当中
    zrange key start stop [WITHSCORES]       升序返回有序集key中，下标在start-stop之间的元素，start和stop需要指定索引，带WITHSCORES，可以让score一起和值返回到结果集
    zrevrange  key start stio [WITHSCORES]   降序返回有序集key中，下标在start-stop之间的元素，start和stop需要指定索引，带WITHSCORES，可以让score一起和值返回到结果集
    zrangebyscore key min max withscores [limit offset count]     返回有序集key，所有score值介于min和max之间(包括min和max)的元素，有序集成员按score值递增次序排序
    zrevrangebyscore key max min withscores [limit offset count]  返回有序集key，所有score值介于min和max之间(包括min和max)的元素，有序集成员按score值递减次序排序
    zrincrby key increment value          为元素的score加上增量
    zrem key value                        删除出该集合下，指定值的元素
    zcount key min max                    统计该集合，分数区间内的元素个数
    zrank key value | zrevrank            返回该值在集合中的排名，从0开始


hash哈希类型相关命令
    hset key field value ...  将field value键值对加入到集合key中
    hget key1 field           从key1集合field取出value
    hmset key1 field1 value1 field2 value2  批量设置hash的值
    hexists key1 field       查看哈希表key中，给定域field是否存在
    hkeys key                列出该hash集合中所有field
    hvals key                列出该hash集合中所有value
    hincrby key field increment 为哈希表key中的域field的值加上增量 1，-1
    hsetnx key field value      将和西部key中的域field的值设置为value，当且仅当域field不存在






高级特性：
    事务和锁：(不具有acid属性，不是之前说的那些事务，指的是将命令打包归纳)
        事务：
            multi    开启事务
            exec     执行事务(执行开启事务后的命令)
            discard  取消事务(取消执行开启事务之后的命令)
        锁：(redis是乐观锁)
            watch key   为某个key加锁
            悲观锁：
                别人无法使用数据，我们更优先
            乐观锁：
                别人更优先，我们无法使用数据

lua脚本：
    使用：
        //加载lua脚本，设置返回值类型
        @Bean
        public RedisScript<Boolean> script() {
            Resource scriptSource = new ClassPathResource("lua/test.lua");
            return RedisScript.of(scriptSource, Boolean.class);
        }


        执行脚本
        redisTemplate.execute(redisScript,keys,"123456","654321");   分别为RedisScript对象，key集合，可变value参数

Redis的持久化：
    RDB：定时数据快照方式，记录数据快照
        bgsave  保存数据快照
    AOF：指令日志文件(手动开启)，记录操作过程日志
        bgrewriteaof 手动重写aof缓存文件，达到压缩效果，会保住恢复的最小指令集


主从复制：
    
    slaveof 127.0.0.1 6379  为当前从机指定主机

    info replication  查看当前角色和主从信息

    slaveof no one 去除从机属性，变为主机
    哨兵模式：(自动版的反客为主，自动去除从机属性，并继承之前主机的从机)
        编写配置文件：
            sentinel monitor "别名" 127.0.0.1 6379 1
            从机配置文件：replica-priority 10  值越小优先级越高(范围0-100)
            别名作用为监控对象起的服务器名称，1为至少有多少个哨兵统一迁移
        启动哨兵：(daemonize=yes为后台启动，默认为no)
            redis-sentinel 配置文件名称
        哨兵选择主机模式为：优先级->偏移量->pid

集群：
    配置文件：
        include /root/myredis/redis.conf #引用公共的配置文件
        port 6379 # 设置端口号
        pidfile "/var/run/redis_6379.pid" # 设置pid进程文件
        dbfilename "dump6379.rdb" # 设置rdb持久化问价名
        cluster-enabled yes 
        cluster-config-file nodes-6379.conf
        cluster-node-timeout 15000 
    命令搭建集群：
        redis-cli --cluster create --cluster-replicas 1 192.168.6.100:6379 192.168.6.100:6380 192.168.6.100:6381 192.168.6.100:6382 192.168.6.100:6383 192.168.6.100:6384
    连接集群：
        redis -c -p 6379     -c表示连接集群，连接集群内任意主从机器即可
    查看集群节点：
        cluster nodes  查看集群内节点关系
    特殊：使用mset系列的命令时，会随机存到某个主节点上，但集群一次只能存储一个节点。(可以在写数据时添加{标识}，集群会拿这个标识运算存储的节点，只要标识统一，一定会存储同一个节点上，[但是这样会改变key，标识也成为了key的一部分])
    slot：
        cluster keyslot key //计算key应该保存到哪个插槽
        cluster countkeysinslot slot的值  //计算某个插槽中保存的key的数量
        cluster getkeysinslot \<slot>\<count>   //返回count个slot槽中的键
    集群对于宕机的配置：
        cluster-require-full-coverage yes  整个集群都宕机
        cluster-require-full-coverage no 只有该插槽数据全部不可用，其他正常运行