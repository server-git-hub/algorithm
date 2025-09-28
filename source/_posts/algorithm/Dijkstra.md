---
title: Dijkstra
date: 2025-06-11 19:14:09
tags:
categories: "algorithm"
---



```java

import java.util.*;
import java.io.*;

//dij
public class Main {
	static int N=(int)(1e5+10);
	public static void main(String args[]) {
		int n=in.nextInt();
		int m=in.nextInt();
		ArrayList<int[]> node[]=new ArrayList[N];
		for(int i=1;i<=m;i++) {
			int u=in.nextInt();
			int v=in.nextInt();
			int w=in.nextInt();
			if(node[u]==null) node[u]=new ArrayList<>();
			//if(node[v]==null) node[v]=new ArrayList<>();
			node[u].add(new int[] {v,w});
			//node[v].add(new int[] {u,w});
		}
		ArrayList<Integer> res=new ArrayList<>();//结果集
		res.add(1);
		PriorityQueue<int[]> pq=new PriorityQueue<>((o1,o2)->(o1[1]-o2[1]));
		pq.add(new int[] {1,0});
		boolean vis[]=new boolean[N];
		int dep[]=new int[N];
		for(int i=1;i<=n;i++) dep[i]=Integer.MAX_VALUE;
		dep[1]=0;
		while(!pq.isEmpty()) {
			int u=pq.poll()[0];
			if(vis[u]) continue;
			vis[u]=true;
			if(node[u]==null) continue;
			for(int poll[]:node[u]) {
				int v=poll[0];
				int w=poll[1];
				if(dep[u]+w<dep[v]) {
					dep[v]=dep[u]+w;
					if(!vis[v]) {
						pq.add(new int[] {v,dep[v]});
						res.add(v);
					}
				}
			}
		}
//		if(flag) {
//			for(int poll:res) {
//				out.print(poll+" ");
//			}
//		}else out.println("-1");
		if(dep[n]!=Integer.MAX_VALUE) out.println(dep[n]);
		else out.println("-1");
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