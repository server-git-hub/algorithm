---
title: 线段树/懒标记线段树
date: 2025-06-03 21:35:03
tags:
categories: "algorithm"
---

<h2>线段树，支持单点修改，区间查询<h2>
```java
import java.util.*;
import java.io.*;


//线段树(单点修改，区间查询)
public class Main {
	static int a[];
	public static void main(String args[]) {
		a=new int[N];
		for(int i=1;i<=100;i++) {
			a[i]=i;
		}
		build(1,1,100);//建树区间1-100
		out.println(query(1,1,100));//区间1-100的sum和
		out.flush();
	}
	
	
	static int N=(int)(1e5+10);
	static Node node[]=new Node[4*N];
	static class Node{
		int l,r;//区间范围大小
		long sum;//维护区间sum
		Node(int l,int r){
			this.l=l;
			this.r=r;
		}
	}
	
	static void push_up(int u) {//向上推送更新结果
		node[u].sum=node[u<<1].sum+node[u<<1|1].sum;
	}
	
	static void build(int u,int l,int r) {//建树
		node[u]=new Node(l,r);
		if(l==r) {
			node[u].sum=a[l];//1用实际数据代替
		}else {
			int mid=l+r>>1;
			build(u<<1,l,mid);build(u<<1|1,mid+1,r);
			push_up(u);
		}
	}
	
	static void modify(int u,int x,long val) {//单点修改
		if(node[u].l==node[u].r&&node[u].l==x) {
			node[u].sum+=val;//将当前sum加上一个数
		}else {
			int mid=node[u].l+node[u].r>>1;
			if(mid>=x) modify(u<<1,x,val);
			else if(mid<x) modify(u<<1|1,x,val);
			push_up(u);
		}
	}
	
	
	static long query(int u,int l,int r) {//区间查询
		if(node[u].l>=l&&node[u].r<=r) {
			return node[u].sum;
		}else {
			int mid=node[u].l+node[u].r>>1;
			long sum=0;
			if(mid>=l) sum+=query(u<<1,l,r);
			if(mid<r) sum+=query(u<<1|1,l,r);
			return sum;
		}
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

<h2>带懒标记线段树，支持区间修改区间查询</h2>
```java
import java.util.*;
import java.io.*;


//带懒标记线段树(区间修改，区间查询)
public class Main7 {
	static int a[];
	public static void main(String args[]) {
		a=new int[N];
		for(int i=1;i<=10;i++) {
			a[i]=i;
		}
		build(1,1,10);//建树区间1-100
		modify(1,1,10,100);//给1-10区间每个元素加100
		out.println(query(1,1,10));//区间1-100的sum和
		out.flush();
	}
	
	
	static int N=(int)(1e5+10);
	static Node node[]=new Node[4*N];//线段树节点
	static long lan[]=new long[4*N];//懒标记
	static class Node{
		int l,r;//区间范围大小
		long sum;//维护区间sum
		Node(int l,int r){
			this.l=l;
			this.r=r;
		}
	}
	
	static void push_up(int u) {//向上推送更新结果
		node[u].sum=node[u<<1].sum+node[u<<1|1].sum;
	}
	
	static void build(int u,int l,int r) {//建树
		lan[u]=0;//初始化懒标记
		node[u]=new Node(l,r);
		if(l==r) {
			node[u].sum=a[l];//初始化sum
		}else {
			int mid=l+r>>1;//将l和r分成左边两半
			build(u<<1,l,mid);build(u<<1|1,mid+1,r);//分别构造左右节点
			push_up(u);//子节点构造后更新父节点
		}
	}
	
	static void modify(int u,int l,int r,long val) {//区间修改
		if(node[u].l>=l&&node[u].r<=r) {
			modifylan(u,val);//懒标记延迟修改
		}else {
			push_down(u);//处理当前节点懒标记
			int mid=node[u].l+node[u].r>>1;//二分查找修改区间
			if(mid>=l) modify(u<<1,l,r,val);//左区间有修改项
			if(mid<r) modify(u<<1|1,l,r,val);//右区间有修改项
			push_up(u);//子节点修改后更新父节点
		}
	}
	
	
	static long query(int u,int l,int r) {//区间查询
		if(node[u].l>=l&&node[u].r<=r) {//区间被查找区间包含时，返回内容
			return node[u].sum;
		}else {
			push_down(u);//处理当前节点懒标记
			int mid=node[u].l+node[u].r>>1;//二分查找结果区间
			long sum=0;//计算结果
			if(mid>=l) sum+=query(u<<1,l,r);//左区间有结果项
			if(mid<r) sum+=query(u<<1|1,l,r);//右区间有结果项
			return sum;//返回结果
		}
	}
	
	static void modifylan(int u,long val) {//延迟懒标记
		node[u].sum+=val*(node[u].r-node[u].l+1);//修改当前区间
		lan[u]=val;//懒标记延迟修改子区间
	}
	
	static void push_down(int u) {//懒标记修改子区间
		if(lan[u]==0) return; //无懒标记
		modifylan(u<<1,lan[u]);//懒标记下推到左子节点
		modifylan(u<<1|1,lan[u]);//懒标记下推到右子节点
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