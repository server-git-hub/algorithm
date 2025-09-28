---
title: Kruskal
date: 2025-06-11 19:43:09
tags:
categories: "algorithm"
---



```java
import java.util.*;
import java.io.*;

//Kruskal最小生成树
public class Main {
	public static void main(String args[]) {
		int n=in.nextInt();
		int m=in.nextInt();
		PriorityQueue<int[]> node=new PriorityQueue<>((o1,o2)->(o1[2]-o2[2]));
		for(int i=1;i<=m;i++) {
			int u=in.nextInt();
			int v=in.nextInt();
			int w=in.nextInt();
			node.add(new int[] {u,v,w});
		}
		
		long res=0;
		int cnt=0;
		BCJ bcj=new BCJ(n);
		while(!node.isEmpty()) {
			int poll[]=node.poll();
			int u=poll[0];
			int v=poll[1];
			int w=poll[2];
			if(bcj.find(u)==bcj.find(v)) continue;
			bcj.modify(u,v);
			cnt++;
			res+=w;
		}
		if(cnt==n-1)out.println(res);
		else out.println("impossible");
		out.flush();
	}
	
	
	static class BCJ{
		int dep[],fa[];
		BCJ(int n){
			dep=new int[n+10];
			fa=new int[n+10];
			for(int i=1;i<=n;i++) {
				fa[i]=i;
				dep[i]=1;
			}
		}
		
		void modify(int x,int y){
			int fx=find(x),fy=find(y);
			if(fx==fy) return;
			if(dep[fx]>dep[fy]) {
				fa[fy]=fx;
				dep[fx]+=dep[fy];
			}else {
				fa[fx]=fy;
				dep[fy]+=dep[fx];
			}
		}
		
		int find(int x) {
			return fa[x]==x ? x:(fa[x]=find(fa[x]));
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