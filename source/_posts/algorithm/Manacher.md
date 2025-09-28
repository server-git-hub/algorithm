---
title: Manacher算法
date: 2025-06-11 00:54:35
tags:
categories: "algorithm"
---




<h2>Manacher回文串高效算法</h2>
```java
import java.util.*;
import java.io.*;


//Manacher算法
public class Main{
	public static void main(String args[]) {
		int n=in.nextInt();//n长度的字符串
		String str=in.next();//字符串
		StringBuilder sb=new StringBuilder();//可修改字符串
		for(int i=0;i<str.length();i++) {//变成#字符串#格式去除奇偶性
			sb.append("#");
			sb.append(str.charAt(i));
		}
		sb.append("#");
		str=sb.toString();
		int r=0,cent=0;
		int cnt[]=new int[str.length()+10];
		for(int i=0;i<str.length();i++) {//Manacher核心算法
			if(i<r) {//当前在最长回文半径中
				//半径初始化为回文对称点的半径和i到r的距离的最小值(因为对称所以在回文半径内相同，超出部分不确定)
				cnt[i]=Math.min(cnt[2*cent-i], r-i);
			}else {
				//超过最长半径，需要枚举判定
				cnt[i]=0;
			}
			//枚举以i为中心距离cnt[i]后的对称位置，构成回文半径长度加一
			while(i-cnt[i]-1>=0&&i+cnt[i]+1<str.length()&&str.charAt(i-cnt[i]-1)==str.charAt(i+cnt[i]+1)) {
				cnt[i]++;
			}
			
			//判定当前i的r是否大于之前最长的回文半径r，如果大于就更新
			if(i+cnt[i]>r) {
				r=i+cnt[i];
				cent=i;
			}
			
		}
		long res=0;
		//枚举每个位置的最长回文半径,找最长回文半径
		for(int i=0;i<str.length();i++) {
			res=Math.max(res,cnt[i]);
		}
		out.println(res);
		
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