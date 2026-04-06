"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScheduleCard } from "@/components/schedule-card";
import { PlaceDetailSheet } from "@/components/place-detail-sheet";
import { trip, getSchedulesByDay, getPlaceById, getDayDate } from "@/lib/data";
import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import type { Place } from "@/lib/types";

const DAYS = [1, 2, 3, 4];

export default function SchedulePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const defaultDay = useMemo(() => {
    for (const day of DAYS) {
      if (isToday(getDayDate(day))) {
        return day;
      }
    }
    return 1;
  }, []);

  function handleScheduleClick(placeId?: string) {
    if (!placeId) return;
    const place = getPlaceById(placeId);
    if (place) {
      setSelectedPlace(place);
      setSheetOpen(true);
    }
  }

  return (
    <div>
      {/* Page title */}
      <div className="mb-4">
        <h2 className="text-lg font-bold" style={{ color: "var(--lavender)" }}>
          여행 일정
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {trip.destination} · {format(new Date(trip.start_date), "M월 d일", { locale: ko })} ~{" "}
          {format(new Date(trip.end_date), "M월 d일", { locale: ko })}
        </p>
      </div>

      <Tabs defaultValue={String(defaultDay)}>
        {/* Day tabs */}
        <TabsList
          className="w-full !h-auto p-1 gap-1"
          style={{ background: "var(--lavender-light)", borderRadius: "0.875rem" }}
        >
          {DAYS.map((day) => {
            const date = getDayDate(day);
            const today = isToday(date);
            return (
              <TabsTrigger
                key={day}
                value={String(day)}
                className="flex-1 rounded-xl py-2 transition-all duration-200 data-[state=active]:shadow-sm"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs font-bold">Day {day}</span>
                  <span
                    className="text-[10px] leading-none"
                    style={{
                      color: today ? "var(--lavender)" : undefined,
                      fontWeight: today ? 700 : undefined,
                    }}
                  >
                    {format(date, "M/d(EEE)", { locale: ko })}
                  </span>
                  {today && (
                    <span
                      className="text-[8px] leading-none font-bold tracking-wide"
                      style={{ color: "var(--food-accent)" }}
                    >
                      오늘
                    </span>
                  )}
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {DAYS.map((day) => {
          const daySchedules = getSchedulesByDay(day);
          const date = getDayDate(day);
          return (
            <TabsContent key={day} value={String(day)} className="mt-4">
              {/* Day header */}
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="hk-day-badge"
                >
                  Day {day}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {format(date, "M월 d일 EEEE", { locale: ko })}
                </span>
              </div>

              <div>
                {daySchedules.map((schedule, index) => (
                  <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    isLast={index === daySchedules.length - 1}
                    onClick={() => handleScheduleClick(schedule.place_id)}
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <PlaceDetailSheet
        place={selectedPlace}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
