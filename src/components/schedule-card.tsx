"use client";

import {
  MapPin,
  Utensils,
  Coffee,
  Camera,
  ShoppingBag,
  Train,
  IceCreamCone,
  Sparkles,
  Droplets,
  Hotel,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Schedule } from "@/lib/types";

const categoryConfig: Record<
  string,
  { icon: typeof MapPin; color: string; bg: string; borderClass: string; dotColor: string }
> = {
  식당:  { icon: Utensils,    color: "text-orange-600",  bg: "bg-orange-50",  borderClass: "category-border-식당",  dotColor: "#E8925A" },
  카페:  { icon: Coffee,      color: "text-amber-600",   bg: "bg-amber-50",   borderClass: "category-border-카페",  dotColor: "#C49A3C" },
  관광:  { icon: Camera,      color: "text-sky-600",     bg: "bg-sky-50",     borderClass: "category-border-관광",  dotColor: "#87CEEB" },
  쇼핑:  { icon: ShoppingBag, color: "text-pink-600",    bg: "bg-pink-50",    borderClass: "category-border-쇼핑",  dotColor: "#E075A0" },
  이동:  { icon: Train,       color: "text-slate-500",   bg: "bg-slate-50",   borderClass: "category-border-이동",  dotColor: "#9EAAB5" },
  디저트: { icon: IceCreamCone, color: "text-rose-600",  bg: "bg-rose-50",    borderClass: "category-border-디저트", dotColor: "#E07575" },
  체험:  { icon: Sparkles,    color: "text-purple-600",  bg: "bg-purple-50",  borderClass: "category-border-체험",  dotColor: "#7C6DAF" },
  온천:  { icon: Droplets,    color: "text-cyan-600",    bg: "bg-cyan-50",    borderClass: "category-border-온천",  dotColor: "#5BB8C4" },
  숙소:  { icon: Hotel,       color: "text-indigo-600",  bg: "bg-indigo-50",  borderClass: "category-border-숙소",  dotColor: "#7087AF" },
};

interface ScheduleCardProps {
  schedule: Schedule;
  isLast?: boolean;
  onClick?: () => void;
}

export function ScheduleCard({ schedule, isLast, onClick }: ScheduleCardProps) {
  const config = categoryConfig[schedule.category] ?? categoryConfig["관광"];
  const Icon = config.icon;

  return (
    <div className="flex gap-3">
      {/* Timeline column */}
      <div className="flex flex-col items-center">
        {/* Icon dot with category color ring */}
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            config.bg
          )}
          style={{
            boxShadow: `0 0 0 2px ${config.dotColor}40, 0 1px 4px ${config.dotColor}30`,
          }}
        >
          <Icon className={cn("size-5", config.color)} />
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div
            className="mt-1 w-px flex-1"
            style={{
              background: `linear-gradient(to bottom, ${config.dotColor}60, #e5e7eb40)`,
              minHeight: "1.25rem",
            }}
          />
        )}
      </div>

      {/* Content card */}
      <div
        className={cn(
          "mb-4 flex-1 rounded-xl bg-white px-3 py-2.5 transition-shadow",
          config.borderClass,
          schedule.place_id && "cursor-pointer hover:shadow-md active:scale-[0.99]"
        )}
        style={{
          boxShadow: "0 1px 4px rgba(124,109,175,0.07), 0 2px 8px rgba(124,109,175,0.04)",
        }}
        onClick={schedule.place_id ? onClick : undefined}
        {...(schedule.place_id
          ? {
              role: "button",
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: config.dotColor }}>
            {schedule.time}
          </span>
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 h-4"
            style={{
              background: `${config.dotColor}18`,
              color: config.dotColor,
              border: `1px solid ${config.dotColor}30`,
            }}
          >
            {schedule.category}
          </Badge>
        </div>
        <h3 className="mt-1 font-semibold leading-snug">{schedule.title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
          {schedule.description}
        </p>
        {schedule.place_id && (
          <div className="mt-1.5 flex items-center gap-1 text-xs" style={{ color: "var(--lavender)" }}>
            <MapPin className="size-3" />
            <span>상세 정보 보기</span>
          </div>
        )}
      </div>
    </div>
  );
}
