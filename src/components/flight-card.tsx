"use client";

import { Plane, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Flight } from "@/lib/types";

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const depTime = new Date(flight.departure_time);
  const arrTime = new Date(flight.arrival_time);
  const isDeparture = flight.type === "departure";

  return (
    <Card
      className="overflow-hidden"
      style={{ boxShadow: "0 1px 4px rgba(124,109,175,0.08), 0 4px 16px rgba(124,109,175,0.05)" }}
    >
      {/* Gradient header band */}
      <div
        className="px-4 py-3"
        style={{
          background: isDeparture
            ? "linear-gradient(135deg, #EEE9F8 0%, #E8F6FD 100%)"
            : "linear-gradient(135deg, #E8F6FD 0%, #EEE9F8 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-9 items-center justify-center rounded-full"
              style={{ background: "var(--lavender)", boxShadow: "0 2px 8px rgba(124,109,175,0.35)" }}
            >
              <Plane
                className="size-4 text-white"
                style={{ transform: isDeparture ? "none" : "rotate(180deg)" }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-none mb-0.5">
                {isDeparture ? "출발" : "귀국"}
              </p>
              <p className="font-bold text-base leading-tight" style={{ color: "var(--lavender)" }}>
                {isDeparture ? "출발편" : "귀국편"}
              </p>
            </div>
          </div>
          <Badge
            style={{
              background: "var(--lavender)",
              color: "#fff",
              border: "none",
              fontFamily: "monospace",
              letterSpacing: "0.06em",
            }}
          >
            {flight.flight_number}
          </Badge>
        </div>
      </div>

      <CardContent className="space-y-4 pt-4">
        {/* Route visualization */}
        <div className="flex items-center justify-between gap-2">
          {/* Departure */}
          <div className="text-center min-w-[60px]">
            <p className="text-3xl font-bold tabular-nums leading-none" style={{ color: "#1a1a2e" }}>
              {format(depTime, "HH:mm")}
            </p>
            <p className="mt-1 text-base font-bold" style={{ color: "var(--lavender)" }}>
              {flight.departure_airport_code}
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {flight.departure_airport}
            </p>
          </div>

          {/* Route line */}
          <div className="flex flex-1 flex-col items-center gap-1 px-2">
            <p className="text-[11px] font-medium text-muted-foreground">{flight.airline}</p>
            <div className="relative w-full flex items-center gap-1">
              {/* Left dot */}
              <div className="size-1.5 rounded-full shrink-0" style={{ background: "var(--lavender)" }} />
              {/* Dashed line */}
              <div
                className="flex-1 h-px"
                style={{
                  background: "repeating-linear-gradient(90deg, var(--lavender) 0, var(--lavender) 4px, transparent 4px, transparent 8px)",
                  opacity: 0.5,
                }}
              />
              {/* Plane icon in center */}
              <Plane
                className="size-3.5 shrink-0"
                style={{ color: "var(--lavender)", opacity: 0.8 }}
              />
              {/* Dashed line right */}
              <div
                className="flex-1 h-px"
                style={{
                  background: "repeating-linear-gradient(90deg, var(--lavender) 0, var(--lavender) 4px, transparent 4px, transparent 8px)",
                  opacity: 0.5,
                }}
              />
              {/* Right dot */}
              <div className="size-1.5 rounded-full shrink-0" style={{ background: "#87CEEB" }} />
            </div>
            <p className="text-[11px] text-muted-foreground">
              {format(depTime, "M월 d일 (EEE)", { locale: ko })}
            </p>
          </div>

          {/* Arrival */}
          <div className="text-center min-w-[60px]">
            <p className="text-3xl font-bold tabular-nums leading-none" style={{ color: "#1a1a2e" }}>
              {format(arrTime, "HH:mm")}
            </p>
            <p className="mt-1 text-base font-bold" style={{ color: "#87CEEB" }}>
              {flight.arrival_airport_code}
            </p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {flight.arrival_airport}
            </p>
          </div>
        </div>

        <Separator style={{ background: "var(--lavender-light)" }} />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {flight.terminal && (
            <div
              className="rounded-lg p-2.5"
              style={{ background: "var(--lavender-light)" }}
            >
              <p className="text-[11px] text-muted-foreground mb-0.5">터미널</p>
              <p className="font-semibold">{flight.terminal}</p>
            </div>
          )}
          {flight.booking_reference && (
            <div
              className="rounded-lg p-2.5"
              style={{ background: "var(--lavender-light)" }}
            >
              <p className="text-[11px] text-muted-foreground mb-0.5">예약번호</p>
              <p className="font-mono font-bold tracking-widest">{flight.booking_reference}</p>
            </div>
          )}
        </div>

        {/* Airline link */}
        {flight.airline_url && (
          <a
            href={flight.airline_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hk-touch flex w-full items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            style={{ borderColor: "var(--lavender-muted)", color: "var(--lavender)" }}
          >
            <ExternalLink className="size-4" />
            항공사 앱에서 게이트 확인
          </a>
        )}
      </CardContent>
    </Card>
  );
}
