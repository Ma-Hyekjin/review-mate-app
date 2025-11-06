// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import db from "@/lib/db"; 

const authOptions: NextAuthOptions = {
  
  adapter: PrismaAdapter(db),

  // [2] 로그인 제공자 설정
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],

  // [3] NextAuth 보안 비밀키 설정
  secret: process.env.NEXTAUTH_SECRET,

  // [4] 세션 전략 설정
  session: {
    strategy: "database" as const,
  },

  // [5] Callbacks 설정 (session.user.id를 위한 필수 코드)
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id; 
      }
      return session;
    },
  },

  // [6] (선택) 로그인 페이지 커스텀
  // pages: {
  //   signIn: '/login',
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };