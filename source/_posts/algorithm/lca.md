---
title: lca
date: 2025-06-11 23:17:22
tags:
categories: "algorithm"
---


```java
import java.util.*;
import java.io.*;

//lca
public class Main {
	static int N=(int)(1e5+10);
	static ArrayList<Integer> node[];
	public static void main(String args[]) {
		int n=in.nextInt();
		node=new ArrayList[n+10];
		for(int i=1;i<n;i++) {
			int u=in.nextInt();
			int v=in.nextInt();
			if(node[u]==null) node[u]=new ArrayList<>();
			if(node[v]==null) node[v]=new ArrayList<>();
			node[u].add(v);
			node[v].add(u);
		}
		int q=in.nextInt();
		init(n);
		
		
		while(q-->0) {
			int l=in.nextInt(),r=in.nextInt();
			out.println(lca(l,r));
		}
		
		out.flush();
	}
	static int dep[];
	static int fa[][];
	static void init(int n) {
		dep=new int[n+10];
		fa=new int[n+10][30];
		dfs(1,0);
		
		
	}
	
	static void dfs(int u,int f) {
		fa[u][0]=f;
		dep[u]=dep[f]+1;
		
		for(int k=1;k<=20;k++) {
			fa[u][k]=fa[fa[u][k-1]][k-1];
		}
		
		for(int v:node[u]) {
			if(v==f) continue;
			dfs(v,u);
		}
	}
	
	static int lca(int x,int y) {
		if(x==y) return x;
		if(dep[x]<dep[y]) {
			int tmp=x;
			x=y;
			y=tmp;
		}
		for(int k=20;k>=0;k--) {
			if(dep[fa[x][k]]>=dep[y]) {
				x=fa[x][k];
			}
		}
		if(x==y) return x;
		for(int k=20;k>=0;k--) {
			if(fa[x][k]!=fa[y][k]) {
				x=fa[x][k];
				y=fa[y][k];
			}
		}
		return fa[x][0];
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