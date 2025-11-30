// components/providers/ToastProvider.tsx
// 토스트 알림 Provider 컴포넌트

"use client";

import { Toaster } from "react-hot-toast";

/**
 * 토스트 알림 Provider
 * 
 * react-hot-toast의 Toaster 컴포넌트를 래핑하여
 * 앱 전체에서 토스트 알림을 사용할 수 있도록 한다.
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "#12121E",
          borderRadius: "12px",
          padding: "12px 16px",
          fontFamily: '"Spoqa Han Sans Neo", sans-serif',
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
        success: {
          iconTheme: {
            primary: "#00A0E0",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#fff",
          },
          style: {
            background: "#FEF2F2",
            color: "#991B1B",
          },
        },
      }}
    />
  );
}

