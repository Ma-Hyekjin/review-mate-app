// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

// 'process.env.XXX'는 3단계에서 설정할 .env.local 파일의 값입니다.
const authOptions: NextAuthOptions = {
  // [1] Prisma Adapter 설정
  // 로그인 시, 이메일을 기준으로 DB에서 User를 찾거나 새로 생성합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,

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

  // [4] 세션 전략 설정 (Adapter 사용 시 'database' 권장)
  session: {
    strategy: "database" as const,
  },

  // [5] Callbacks 설정
  // 세션 객체에 DB의 User ID를 추가합니다.
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id; // DB의 user.id를 session.user.id에 할당
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

// Next.js 13+ (App Router)에서는 이 두 가지를 export 해야 합니다.
export { handler as GET, handler as POST };