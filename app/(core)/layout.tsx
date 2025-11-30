// app/(core)/layout.tsx
import BottomNav from "@/components/layout/BottomNav";
import TopNav from "@/components/layout/TopNav";

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <TopNav />
      <main className="pt-14 pb-20 max-w-md mx-auto">{children}</main>
      <BottomNav />
    </div>
  );
}