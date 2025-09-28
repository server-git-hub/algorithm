---
title: st
date: 2025-06-11 21:54:06
tags:
categories: "algorithm"
---


```java
import java.util.*;
import java.io.*;

//st表(RMQ问题)
public class Main {
	static int n,a[];
	public static void main(String args[]) {
		
		n=in.nextInt();
		int q=in.nextInt();
		a=new int[n+10];
		for(int i=1;i<=n;i++) {
			a[i]=in.nextInt();
		}
		init(n);
		
		while(q-->0) {
			int l=in.nextInt();
			int r=in.nextInt();
			out.println(query(l,r));
		}
		
		
		out.flush();
	}
	static int N=(int)(1e5+10);
	static int f[][];
	static int log2[]=new int[N];
	static void init(int n) {
		log2[1]=0;
		for(int i=2;i<=n;i++) {
			log2[i]=log2[i>>1]+1;
		}
		f=new int[n+10][21];
		for(int k=0;k<=20;k++) {
			for(int i=1;i+(1<<k)-1<=n;i++) {
				if(k==0) {
					f[i][k]=a[i];
				}else {
					f[i][k]=Math.max(f[i][k-1],f[i+(1<<(k-1))][k-1]);
				}
			}
		}
	}
	
	static int query(int l,int r) {
		int k=log2[r-l+1];
		return Math.max(f[l][k],f[r-(1<<k)+1][k]);
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