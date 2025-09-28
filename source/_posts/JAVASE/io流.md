---
title: io流
date: 2025-06-24 22:58:11
tags:
categories: "JAVASE"

---


字节流(侧重文件复制，所有文件都是字节，都可以用字节流读取)
OutputStream   字节输出流->抽象基类
    FileOutputStream   文件字节输出流
        构造
        FileOutputStream(String path) 指定路径
        FileOutputStream(File file)  指定文件
        FileOutputStream(String path,boolean append)  指定路径并指定追加(true)还是覆盖(false)
        方法
        write(int i)  一次写入一个字节
        write(Byte[] byte)  一次写入一个字节数组
        write(Byte[] byte,int offset,int length)  一次写入一个字节数组的一部分，从offset所有开始，每次写入length个
        close()   关闭流
    ObjectOutputStream  序列化流
        构造
        ObjectOutputStream(OutputStream out)   指定输出流对象
        方法
        writeObject(Object obj)
        特殊
        被序列化对象需要实现Serializable接口
        transient  加上该修饰表示该属性不被序列化
    PrintStream   打印流
        构造
        PrintStream(String path)    指定文件路径
        PringStream(OutputStream os)   指定字节输出流(可以在字节输出流中指定追加)
        方法
        print()     原样输出，不换行
        println()   原样输出，自动换行
        特殊：System类
        System.setOut(PringStream ps)     切换打印流
InputStream    字节输入流->抽象基类
    FileInputStream  文件字节输入流
        构造
        FileInputStream(String path) 指定路径
        FileInputStream(File file)  指定文件
        方法
        read(int i)  一次读入一个字节
        read(Byte[] byte)  一次读入一个字节数组
        read(Byte[] byte,int offset,int length)  一次读入一个字节数组的一部分，从offset所有开始，每次读入length个
    ObjectInputStream  反序列化流
        构造
        ObjectInputStream(InputStream in)   指定输入流对象
        方法
        Object readObject();
字符流(读取文本内容的)
Writer  字节输出流->抽象基类
    FileWriter   字符输出流
        构造
        FileWriter(String path) 指定路径
        FileWriter(File file)  指定文件
        FileWriter(String path,boolean append)  指定路径并指定追加(true)还是覆盖(false)
        方法
        write(int i)  一次写入一个字符
        write(char[] chars)  一次写入一个字符数组
        write(char[] chars,int offset,int length)  一次写入一个字符数组的一部分，从offset所有开始，每次写入length个
        wirte(String s)  一次写入一个字符串
        flush()   刷新缓冲区
        close()   关闭流
Reader  字节输入流->抽象基类
    FileReader   字符输入流
        构造
        FileReader(String path) 指定路径
        FileReader(File file)  指定文件
        方法
        read(int i)  一次读入一个字符
        read(char[] chars)  一次读入一个字符数组
        read(char[] chars,int offset,int length)  一次读入一个字符数组的一部分，从offset所有开始，每次读入length个
        close()   关闭流


Properties结合io使用
Properties.load(InputStream is)










-------------------------------------------------------------------------------------

<b>io流</b>
FileInputStream  文件字节输入流，属于节点流
FileOutputStream  文件字节输出流，属于节点流
//缓冲流中的byte数组默认长度为8192
BufferedInputStream  文件字节输入缓冲流，属于处理流
BufferedOutputStream  文件字节输出缓冲流，属于处理流
FileReader   字符输入流，此为节点流
FileWriter    字符输出流，此为节点流
FileWriter中构造方法(路径，append)，append默认为false覆盖，给定true为追加
BufferedReader  字符缓冲输入流
BufferedWriter   字符缓冲输出流
newLine()   缓冲区换行方法
FileInputStreamReader   字节转换输入流(字节流转换为字符流)
FileOutputStreamWriter  字节转换输出流(字节流转换为字符流)
PrintWirter   字符输入流，自带flush方法，缓冲流，通过println方法实现自动换行，此为节点流
ByteArrayInputStream   字节数组输入流，此为节点流
ByteArrayOutputStream 字节数组输出流，此为节点流
DataInputStream   数据字节输入流
DataOutputStream   数据字节输出流
输入输出需一致，不然会错误

序列化和反序列化
ObjectInputStream  对象字节输入流
ObjectOutputStream  对象字节输出流
Serializable是一个空接口，用作标记，只有实现Serializable接口才能被序列化
RandomAccessFile   随机访问流
RandomAccessFile(String name,String mode) name用来确定文件，mode取r或rw，r表示只读，rw表示可读可写，通过mode确定流对文件的访问权限
seek(long a)   用来定位流对象读写文件的位置，a确定读写位置距离文件开头的字节个数
getFilePointer() 获取流的当前读写位置

