---
title: floyd
date: 2025-06-11 19:27:04
tags:
categories: "algorithm"
---



```java

import java.util.*;
import java.io.*;

//floyd
public class Main {
	public static void main(String args[]) {
		int n=in.nextInt();
		int m=in.nextInt();
		int q=in.nextInt();
		long node[][]=new long[n+10][n+10];
		for(int i=1;i<=n;i++) {
			Arrays.fill(node[i],Long.MAX_VALUE);
			node[i][i]=0;
		}
		
		for(int i=1;i<=m;i++) {
			int u=in.nextInt();
			int v=in.nextInt();;
			int w=in.nextInt();
			node[u][v]=Math.min(node[u][v],w);
			node[v][u]=Math.min(node[v][u],w);
		}
		
		for(int k=1;k<=n;k++) {
			for(int i=1;i<=n;i++) {
				for(int j=1;j<=n;j++) {
					if(node[i][k]==Long.MAX_VALUE||node[k][j]==Long.MAX_VALUE) continue;
					node[i][j]=Math.min(node[i][j],node[i][k]+node[k][j]);
				}
			}
		}
		
		while(q-->0) {
			int st=in.nextInt();
			int ed=in.nextInt();
			if(node[st][ed]!=Long.MAX_VALUE) out.println(node[st][ed]);
			else out.println("-1");
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