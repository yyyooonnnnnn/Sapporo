"use client";

import {
  MapPin,
  Phone,
  ExternalLink,
  Clock,
  Building,
  Navigation,
  Moon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { accommodations } from "@/lib/data";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function AccommodationPage() {
  return (
    <div className="space-y-5">
      {/* Page title */}
      <div>
        <h2 className="text-lg font-bold" style={{ color: "var(--lavender)" }}>
          숙소 정보
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          총 {accommodations.length}곳
        </p>
      </div>

      {accommodations.map((acc) => {
        const checkInDate = new Date(acc.check_in);
        const checkOutDate = new Date(acc.check_out);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${acc.lat},${acc.lng}`;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${acc.lat},${acc.lng}`;

        return (
          <Card
            key={acc.id}
            className="overflow-hidden"
            style={{ boxShadow: "0 1px 4px rgba(124,109,175,0.09), 0 4px 16px rgba(124,109,175,0.05)" }}
          >
            {/* Colored top band with day badge */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #EEE9F8 0%, #E8F6FD 100%)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex size-9 items-center justify-center rounded-full"
                  style={{ background: "var(--lavender)", boxShadow: "0 2px 8px rgba(124,109,175,0.30)" }}
                >
                  <Moon className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none mb-0.5">숙소</p>
                  <p className="font-bold text-base leading-tight">{acc.name}</p>
                </div>
              </div>
              {/* Day badge */}
              <span className="hk-day-badge">Day {acc.day_number}</span>
            </div>

            <CardHeader className="pt-3 pb-2">
              <CardDescription className="flex items-start gap-1.5 text-sm">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                {acc.address}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Check-in / Check-out */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="rounded-xl p-3"
                  style={{ background: "var(--lavender-light)" }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                    <Clock className="size-3" />
                    체크인
                  </div>
                  <p className="text-sm font-bold leading-tight">
                    {format(checkInDate, "M월 d일 (EEE)", { locale: ko })}
                  </p>
                  <p
                    className="text-lg font-bold leading-tight mt-0.5"
                    style={{ color: "var(--lavender)" }}
                  >
                    {format(checkInDate, "HH:mm")}
                  </p>
                </div>
                <div
                  className="rounded-xl p-3"
                  style={{ background: "var(--sky-light)" }}
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                    <Clock className="size-3" />
                    체크아웃
                  </div>
                  <p className="text-sm font-bold leading-tight">
                    {format(checkOutDate, "M월 d일 (EEE)", { locale: ko })}
                  </p>
                  <p
                    className="text-lg font-bold leading-tight mt-0.5"
                    style={{ color: "#4aabcc" }}
                  >
                    {format(checkOutDate, "HH:mm")}
                  </p>
                </div>
              </div>

              <Separator style={{ background: "var(--lavender-light)" }} />

              {/* Action buttons */}
              <div className="flex gap-2">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hk-touch flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: "var(--lavender)" }}
                >
                  <Navigation className="size-4" />
                  길찾기
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hk-touch flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent active:scale-[0.98]"
                  style={{ borderColor: "var(--lavender-muted)", color: "var(--lavender)" }}
                >
                  <MapPin className="size-4" />
                  지도 보기
                </a>
              </div>

              {/* Booking link */}
              {acc.booking_url && (
                <a
                  href={acc.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hk-touch flex w-full items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent active:scale-[0.98]"
                  style={{ borderColor: "var(--lavender-muted)", color: "var(--lavender)" }}
                >
                  <ExternalLink className="size-4" />
                  예약 사이트 열기
                </a>
              )}

              <Separator style={{ background: "var(--lavender-light)" }} />

              {/* Notes */}
              {acc.notes && (
                <div
                  className="rounded-xl p-3"
                  style={{ background: "#F8F4FF", borderLeft: "3px solid var(--lavender-muted)" }}
                >
                  <h4 className="mb-1.5 font-semibold text-sm" style={{ color: "var(--lavender)" }}>
                    메모
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {acc.notes}
                  </p>
                </div>
              )}

              {/* Phone */}
              {acc.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <a href={`tel:${acc.phone}`} style={{ color: "var(--lavender)" }}>
                    {acc.phone}
                  </a>
                </div>
              )}

              {/* Nearby facilities */}
              {acc.nearby_facilities && acc.nearby_facilities.length > 0 && (
                <>
                  <Separator style={{ background: "var(--lavender-light)" }} />
                  <div>
                    <h4 className="mb-2 font-semibold text-sm" style={{ color: "var(--lavender)" }}>
                      주변 시설
                    </h4>
                    <div className="space-y-2">
                      {acc.nearby_facilities.map((facility: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Building className="size-3.5 shrink-0" style={{ color: "var(--lavender-muted)" }} />
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
