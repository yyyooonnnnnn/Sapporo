"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Utensils, Plane, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "일정", icon: Calendar },
  { href: "/restaurants", label: "맛집", icon: Utensils },
  { href: "/flights", label: "항공", icon: Plane },
  { href: "/accommodation", label: "숙소", icon: Hotel },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="hk-bottom-nav fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hk-touch flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-1.5 text-xs transition-all duration-200",
                isActive
                  ? "font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={
                isActive
                  ? {
                      color: "var(--lavender)",
                      background: "var(--lavender-light)",
                    }
                  : {}
              }
            >
              <Icon
                className={cn("size-5 transition-all duration-200", isActive && "stroke-[2.5]")}
              />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
