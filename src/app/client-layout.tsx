"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import { FontSizeToggle } from "@/components/font-size-toggle";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* Header */}
      <header className="hk-header sticky top-0 z-40 relative">
        <div className="mx-auto flex h-13 max-w-md items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            {/* Mountain silhouette icon via CSS */}
            <span
              aria-hidden="true"
              className="inline-block text-lg leading-none"
              style={{ filter: "drop-shadow(0 1px 2px rgba(124,109,175,0.25))" }}
            >
              🏔️
            </span>
            <div>
              <h1 className="text-sm font-bold leading-tight tracking-tight" style={{ color: "var(--lavender)" }}>
                홋카이도 가족여행
              </h1>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                2025 · 삿포로 &amp; 후라노
              </p>
            </div>
          </div>
          <FontSizeToggle />
        </div>
        {/* Lavender-to-sky gradient accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, #7C6DAF 0%, #87CEEB 50%, #7C6DAF 100%)", opacity: 0.65 }}
          aria-hidden="true"
        />
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-22 pt-4">
        {children}
      </main>

      {/* Bottom navigation - hide on admin pages */}
      {!isAdmin && <BottomNav />}
    </>
  );
}
