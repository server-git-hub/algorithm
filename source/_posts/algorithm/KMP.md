---
title: KMP
date: 2025-06-11 12:36:21
tags:
categories: "algorithm"
---

<h2>KMP算法</h2>
    
KMP核心思路
<b>性质：</b>当前字符的前缀长度一定小于等于当前长度,next[i]<=i
<b>思路：</b>当前字符的前缀长度初始化为前一个字符的前缀长度(前一个字符已经验证了当前字符以前的前缀)
匹配这个前缀长度的前缀末端下一个元素与当前元素是否相等，如果相等，长度加一，
如果不等，获取前缀末端的前缀长度继续匹配。

<b>如图</b>

![KMP](https://qq123456-1362418901.cos.ap-guangzhou.myqcloud.com/images/KMP.png)


```java

//核心代码
static void KMP(String str){
    int len=0;
    next[1]=0;
    for(int i=2;i<str.length();i++){
        while(len>0&&str.charAt(i)!=str.charAt(len+1)){
            len=next[len];
        }
        if(str.charAt(i)==str.charAt(len+1)){
            len++;
        }
        next[i]=len;
    }
}


```












<h2>KMP匹配字符串</h2>

```java
import java.util.*;
import java.io.*;


//KMP算法<匹配字符串>
public class Main {
	public static void main(String args[]) {
		int n=in.nextInt();//长度为n的字符串str
		String str=in.next();
		int m=in.nextInt();//长度为m的字符串str2
		String str2=in.next();
		String tmp=" "+str+"#"+str2;//拼接字符串用于KMP匹配
		int next[]=new int[tmp.length()+10];
		next[1]=0;//第一个字符一定没有真前后缀长度
		for(int i=2;i<tmp.length();i++) {
			int len=next[i-1];//初始化长度为前一个字符长度为前一个字符的前缀长度

            //判定在前一个字符的前缀末端的下一个元素是否与当前字符相等
			while(len>0&&tmp.charAt(i)!=tmp.charAt(len+1)) {
                //如果不相等，找到这个前缀末端的最长前缀长度，再次匹配
				len=next[len];
			}
            //判定当前字符与前缀末端下一个元素是否相等
			if(tmp.charAt(i)==tmp.charAt(len+1)) {
                //相等则长度加一
				len++;
			}
            //更新当前前缀长度
			next[i]=len;
		}
		
		//查找前缀长度等于被匹配字符串长度的起始下标
		for(int i=1;i<tmp.length();i++) {
			if(next[i]==str.length()) {
				out.print((i-2*n-1)+" ");
			}
		}
		out.flush();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	static PrintWriter out=new PrintWriter(new BufferedWriter(new OutputStreamWriter(System.out)));
	static input in=new input();
	static class input{
		static BufferedReader br;
		static StringTokenizer st;
		input(){
			br=new BufferedReader(new InputStreamReader(System.in));
		}
		String next() {
			String str="";
			while(st==null||!st.hasMoreElements()) {
				try {
					str=br.readLine();
				}catch(Exception e) {
					e.printStackTrace();
				}
				st=new StringTokenizer(str);
			}
			return st.nextToken();
		}
		int nextInt() {
			return Integer.parseInt(next());
		}
		long nextLong() {
			return Long.parseLong(next());
		}
		double nextDouble() {
			return Double.parseDouble(next());
		}
	}
}


```


<h2>KMP找最小循环长度</h2>

```java
import java.util.*;
import java.io.*;


//KMP算法<找周期>
public class Main {
	public static void main(String args[]) {
		String str=" "+in.next();//字符串
		int n=str.length()-1;//字符串长度
		int next[]=new int[str.length()+10];
		next[1]=0;//第一个字符一定没有真前后缀长度
		for(int i=2;i<str.length();i++) {
			int len=next[i-1];//初始化长度为前一个字符长度为前一个字符的前缀长度
            //判定在前一个字符的前缀末端的下一个元素是否与当前字符相等
			while(len>0&&str.charAt(i)!=str.charAt(len+1)) {
                //如果不相等，找到这个前缀末端的最长前缀长度，再次匹配
				len=next[len];
			}
            //判定当前字符与前缀末端下一个元素是否相等
			if(str.charAt(i)==str.charAt(len+1)) {
                //相等则长度加一
				len++;
			}
            //更新当前前缀长度
			next[i]=len;
		}
        //周期等于总长度减去最后一个字符的前缀长度
		out.println(n-next[n]);
		out.flush();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	static PrintWriter out=new PrintWriter(new BufferedWriter(new OutputStreamWriter(System.out)));
	static input in=new input();
	static class input{
		static BufferedReader br;
		static StringTokenizer st;
		input(){
			br=new BufferedReader(new InputStreamReader(System.in));
		}
		String next() {
			String str="";
			while(st==null||!st.hasMoreElements()) {
				try {
					str=br.readLine();
				}catch(Exception e) {
					e.printStackTrace();
				}
				st=new StringTokenizer(str);
			}
			return st.nextToken();
		}
		int nextInt() {
			return Integer.parseInt(next());
		}
		long nextLong() {
			return Long.parseLong(next());
		}
		double nextDouble() {
			return Double.parseDouble(next());
		}
	}
}



```