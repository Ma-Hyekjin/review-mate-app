// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * NextAuth의 기본 Session 타입에 'id'를 추가합니다.
   */
  interface Session {
    user: {
      id: string; // DB의 User ID (cuid) 타입을 추가
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }
}