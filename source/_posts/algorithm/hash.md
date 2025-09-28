---
title: 字符串哈希
date: 2025-06-10 15:06:33
tags:
categories: "algorithm"
---



<h2>字符串单哈希，单哈希有可能被卡哈希值</h2>
```java
import java.util.*;
import java.io.*;

//字符串单哈希
public class Main {
	static int mod=998244353;//哈希模数
	static int p=131;//哈希倍率
	static String str;
	public static void main(String args[]) {
		int n=in.nextInt();//长度n的字符串
		int q=in.nextInt();//q次询问
		str=" "+in.next();//从1开始的字符串
		
		init();//初始化字符串哈希
		
		while(q-->0) {
			int l1=in.nextInt(),r1=in.nextInt();
			int l2=in.nextInt(),r2=in.nextInt();
			if(check(l1,r1)==check(l2,r2)) {//比较哈希值
				out.println("YES");
			}else {
				out.println("NO");
			}
		}
		
		out.flush();
	}
	static int N=(int)(2e5+10);
	static long dev[]=new long[N];//每个位置的哈希值
	static long node[]=new long[N];//字符串哈希数组
	static void init() {
		dev[0]=1;//0位置初始化1，方便操作
		for(int i=1;i<str.length();i++) {
			dev[i]=dev[i-1]*p%mod;//每个位置为p的i次方对mod取模
			node[i]=(node[i-1]*p+(str.charAt(i)-'0'))%mod;//前一个哈希值乘哈希倍率加字符值
		}
	}
	
	static long check(int l,int r){
		return ((node[r]-node[l-1]*dev[r-l+1]%mod)%mod+mod)%mod;//运算哈希值，容斥原理
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



<h2>字符串多哈希，防卡哈希倍率</h2>
```java
import java.util.*;
import java.io.*;

//字符串多哈希
public class Main {
	static int mod[]=new int[] {0,998244353,(int)(1e9+7)};
	static int p[]=new int[] {0,131,13331};
	static String str;
	public static void main(String args[]) {
		int n=in.nextInt();
		int q=in.nextInt();
		str=" "+in.next();
		init();
		while(q-->0) {
			int l1=in.nextInt(),r1=in.nextInt();
			int l2=in.nextInt(),r2=in.nextInt();
			if(check(l1,r1,1)==check(l2,r2,1)&&check(l1,r1,2)==check(l2,r2,2)) {
				out.println("YES");
			}else {
				out.println("NO");
			}
		}
		out.flush();
	}
	static int N=(int)(2e5+10);
	static long dev[][]=new long[N][10];
	static long node[][]=new long[N][10];
	static void init() {
		dev[0][1]=1;
		for(int i=1;i<str.length();i++) {
			dev[i][1]=dev[i-1][1]*p[1]%mod[1];
			node[i][1]=(node[i-1][1]*p[1]+str.charAt(i)-'0')%mod[1];
		}
		dev[0][2]=1;
		for(int i=1;i<str.length();i++) {
			dev[i][2]=dev[i-1][2]*p[2]%mod[2];
			node[i][2]=(node[i-1][2]*p[2]+str.charAt(i)-'0')%mod[2];
		}
	}
	
	static long check(int l,int r,int idx){
		return ((node[r][idx]-node[l-1][idx]*dev[r-l+1][idx]%mod[idx])%mod[idx]+mod[idx])%mod[idx];
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