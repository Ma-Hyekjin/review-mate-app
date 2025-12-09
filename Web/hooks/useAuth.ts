// hooks/useAuth.ts
// 인증 관련 커스텀 훅

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

/**
 * 인증 관련 로직을 관리하는 커스텀 훅
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  /**
   * 로그아웃 처리
   */
  const handleLogout = () => {
    signOut({ callbackUrl: ROUTES.LOGIN });
  };

  /**
   * 인증되지 않은 사용자를 로그인 페이지로 리디렉션
   */
  const redirectIfUnauthenticated = () => {
    if (status === "unauthenticated") {
      router.replace(ROUTES.LOGIN);
      return true;
    }
    return false;
  };

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    handleLogout,
    redirectIfUnauthenticated,
  };
}

