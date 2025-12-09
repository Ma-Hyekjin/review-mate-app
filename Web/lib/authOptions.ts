// @/lib/authOptions.ts (새로 생성)

import { type NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import db from "@/lib/db";
import { DEFAULT_MATE_NAME, DEFAULT_MATE_PERSONA } from "@/constants/defaultMate";
import { logError } from "@/lib/logger"; 

// 이 파일을 다른 라우트 파일에서 import 할 수 있도록 export 합니다.
export const authOptions: NextAuthOptions = { 
  
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

  // [5] Callbacks 설정 (session.user.id를 위한 필수 코드 + 기본 메이트 생성)
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id; 
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // 사용자가 처음 로그인할 때만 기본 메이트 생성
      if (user && user.id) {
        try {
          // 이미 기본 메이트가 있는지 확인
          const existingDefaultMate = await db.mate.findFirst({
            where: {
              userId: user.id,
              isDefault: true,
            },
          });

          // 기본 메이트가 없으면 생성
          if (!existingDefaultMate) {
            await db.mate.create({
              data: {
                name: DEFAULT_MATE_NAME,
                personaJson: JSON.stringify(DEFAULT_MATE_PERSONA),
                isDefault: true,
                userId: user.id,
              },
            });
          }
        } catch (error) {
          // 기본 메이트 생성 실패해도 로그인은 진행
          logError("기본 메이트 생성 실패", error, { userId: user.id });
        }
      }
      return true;
    },
  },

  // [6] (선택) 로그인 페이지 커스텀
  // pages: { signIn: '/login', }
};