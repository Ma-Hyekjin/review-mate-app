// components/TopNav.tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-background dark:border-gray-8">
      <div className="mx-auto flex h-14 max-w-md items-center justify-center">
        <span className="text-lg font-bold text-foreground">
          ReviewMate
        </span>
      </div>
    </header>
  );
}