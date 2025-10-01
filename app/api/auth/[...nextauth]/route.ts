// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // signIn 콜백은 소셜 로그인이 성공한 직후, 세션이 생성되기 전에 실행됩니다.
    async signIn({ user }) {
      try {
        // TODO: [DB] 여기서 user.email을 사용해 우리 DB의 User 테이블을 조회합니다.
        // const userExists = await db.user.findUnique({ where: { email: user.email } });
        
        // --- 현재는 임시 로직으로 시뮬레이션 ---
        const isNewUser = Math.random() > 0.5; // 50% 확률로 신규 사용자라고 가정
        console.log("신규 사용자인가?:", isNewUser);

        if (isNewUser) {
          // DB에 사용자가 없으면(신규 사용자),
          // TODO: [DB] DB에 새로운 사용자를 생성(create)합니다.
          // await db.user.create({ data: { name: user.name, email: user.email, image: user.image } });
          
          // '/quick-pick' 경로를 반환하면, NextAuth가 사용자를 해당 페이지로 리디렉션시킵니다.
          return '/quick-pick';
        } else {
          // DB에 사용자가 존재하면(기존 사용자),
          // true를 반환하여 로그인을 그대로 진행시키고, 로그인 페이지에서 설정한 callbackUrl('/main')로 이동시킵니다.
          return true;
        }
      } catch (error) {
        console.error("SignIn 콜백 오류:", error);
        return false; // 오류 발생 시 로그인 실패 처리
      }
    }
  }
});

export { handler as GET, handler as POST };