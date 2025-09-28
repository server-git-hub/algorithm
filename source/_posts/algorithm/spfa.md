---
title: spfa
date: 2025-06-11 19:20:20
tags:
categories: "algorithm"
---


```java
import java.util.*;
import java.io.*;
//复习spfa
public class Main{
	static int n,m,k;
	static int N=(int)(2e5+10);
	public static void main(String[] args) {
		n=in.nextInt();
		m=in.nextInt();
		//k=in.nextInt();
		for(int i=1;i<=m;i++) {
			int a=in.nextInt();
			int b=in.nextInt();
			int c=in.nextInt();
			add(a,b,c);
		}
		int base[]=new int[N];
		Arrays.fill(base,Integer.MAX_VALUE);
		base[1]=0;
		boolean val[]=new boolean[N];
		Queue<Integer> qu=new LinkedList<>();
		qu.add(1);
		boolean flag=true;
		int cnt[]=new int[N];
		while(!qu.isEmpty()) {
			int i=qu.poll();
			val[i]=false;
			if(node[i]==null) continue;
			for(int poll[]:node[i]) {
				int v=poll[0],w=poll[1];
				if(base[v]>base[i]+w) {
					base[v]=base[i]+w;
					cnt[v]=cnt[i]+1;
					if(cnt[v]>=n) {
						qu.clear();
						flag=false;
						break;
					}
					if(!val[v]) {
						qu.add(v);
						val[v]=true;
					}
				}
			}
		}
		if(flag&&base[n]==Integer.MAX_VALUE) out.println("impossible");
		else out.println(base[n]);
		out.flush();
    }
    
	static ArrayList<int[]> node[]=new ArrayList[N];
	public static void add(int a,int b,int c) {
		if(node[a]==null) node[a]=new ArrayList<>();
		node[a].add(new int[] {b,c});
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
