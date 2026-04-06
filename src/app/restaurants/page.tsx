"use client";

import { useState, useMemo } from "react";
import { Map, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant-card";
import { PlaceDetailSheet } from "@/components/place-detail-sheet";
import { getRestaurants, SCHEDULE_DAYS } from "@/lib/data";
import { getOpeningStatus } from "@/lib/opening-hours";
import type { Place } from "@/lib/types";

type CategoryFilter = "전체" | "식당" | "카페" | "디저트";

const CATEGORIES: CategoryFilter[] = ["전체", "식당", "카페", "디저트"];

export default function RestaurantsPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>("전체");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const allRestaurants = getRestaurants();
  const currentDayConfig = SCHEDULE_DAYS.find((d) => d.day === selectedDay)!;

  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter((r) => {
      const matchesDay =
        r.location_tags?.includes(`Day ${selectedDay}`) &&
        r.location_tags?.some((tag) => currentDayConfig.locations.includes(tag));
      const matchesLocation =
        !selectedLocation || (r.location_tags?.includes(selectedLocation) ?? false);
      const matchesCategory = filter === "전체" || r.category === filter;
      return matchesDay && matchesLocation && matchesCategory;
    });
  }, [allRestaurants, selectedDay, currentDayConfig.locations, selectedLocation, filter]);

  function handleDayChange(day: number) {
    setSelectedDay(day);
    setSelectedLocation(null);
    setFilter("전체");
  }

  function handleCardClick(place: Place) {
    setSelectedPlace(place);
    setSheetOpen(true);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">맛집 목록</h2>
        <div className="flex gap-1">
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="icon-sm"
            aria-label="목록 보기"
            onClick={() => setView("list")}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="icon-sm"
            aria-label="지도 보기"
            onClick={() => setView("map")}
          >
            <Map className="size-4" />
          </Button>
        </div>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SCHEDULE_DAYS.map((d) => (
          <button
            key={d.day}
            onClick={() => handleDayChange(d.day)}
            className={
              selectedDay === d.day
                ? "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground"
                : "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold transition-colors border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            }
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Location sub-filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedLocation(null)}
          className={
            selectedLocation === null
              ? "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent text-white"
              : "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          }
          style={selectedLocation === null ? { background: "var(--sky, #0ea5e9)" } : {}}
        >
          전체 지역
        </button>
        {currentDayConfig.locations.map((loc) => (
          <button
            key={loc}
            onClick={() =>
              setSelectedLocation(selectedLocation === loc ? null : loc)
            }
            className={
              selectedLocation === loc
                ? "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent text-white"
                : "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            }
            style={selectedLocation === loc ? { background: "var(--sky, #0ea5e9)" } : {}}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={
              filter === cat
                ? "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground"
                : "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content */}
      {view === "list" ? (
        <div className="space-y-3">
          {filteredRestaurants.map((place) => (
            <RestaurantCard
              key={place.id}
              place={place}
              onClick={() => handleCardClick(place)}
              openingStatus={getOpeningStatus(
                place.opening_hours,
                currentDayConfig.dayOfWeek,
              )}
            />
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              해당 조건에 맞는 맛집이 없습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border bg-muted">
          <div className="text-center text-muted-foreground">
            <MapPin className="mx-auto mb-2 size-8 opacity-40" />
            <p className="text-sm font-medium">지도 뷰</p>
            <p className="text-xs mt-1">
              Google Maps API 키를 설정하면
            </p>
            <p className="text-xs">지도에서 맛집을 확인할 수 있습니다.</p>
          </div>
        </div>
      )}

      <PlaceDetailSheet
        place={selectedPlace}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
