// components/BottomNav.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/stores/uiStore";

// 네비게이션 아이템 데이터
const navItems = [
  {
    label: "전체",
    href: "/mypage",
    icon: "/assets/icons/menu.svg",
  },
  {
    label: "홈",
    href: "/main",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "마켓",
    href: "/market",
    icon: "/assets/icons/market.svg",
    disabled: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { isKeyboardOpen } = useUiStore(); // 2. 키보드 상태 가져오기

  return (
    // 3. (수정됨) 백틱(``)과 JS 변수를 사용해 'hidden' 클래스 적용
    <nav 
      className={`fixed bottom-0 left-0 z-30 w-full bg-background dark:border-gray-8 ${isKeyboardOpen ? 'hidden' : ''}`}
    >
      <div className="mx-auto flex h-20 max-w-md justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/main"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          const activeStyle = "text-primary font-medium text-base";
          const inactiveStyle = "text-gray-5 text-sm";
          const disabledStyle = "text-gray-3 dark:text-gray-7 cursor-not-allowed";

          const iconStyle = isActive ? "grayscale-0" : "grayscale";

          return (
            <Link
              key={item.label}
              href={item.disabled ? "#" : item.href}
              className={`flex flex-col items-center gap-0 justify-end pb-6 transition-colors ${
                item.disabled
                  ? disabledStyle
                  : isActive
                  ? activeStyle
                  : inactiveStyle
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <div className={`relative flex h-16 w-16 items-center justify-center ${item.disabled ? "" : iconStyle}`} >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={64}
                  height={64}
                  priority
                />
              </div>
              <span className="mt-0">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}