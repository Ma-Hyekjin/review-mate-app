import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

// 'process.env.XXX'는 3단계에서 설정할 .env.local 파일의 값입니다.
export const authOptions = {
  // [1] 로그인 제공자 설정
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

  // [2] NextAuth 보안 비밀키 설정
  // (터미널에서 'openssl rand -hex 32' 명령어로 생성)
  secret: process.env.NEXTAUTH_SECRET,

  // [3] (선택) 로그인 페이지 커스텀
  // pages: {
  //   signIn: '/login',
  // }
};

const handler = NextAuth(authOptions);

// Next.js 13+ (App Router)에서는 이 두 가지를 export 해야 합니다.
export { handler as GET, handler as POST };