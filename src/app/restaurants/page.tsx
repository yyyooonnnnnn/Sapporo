"use client";

import { useState } from "react";
import { Map, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RestaurantCard } from "@/components/restaurant-card";
import { PlaceDetailSheet } from "@/components/place-detail-sheet";
import { getRestaurants } from "@/lib/data";
import type { Place } from "@/lib/types";

type CategoryFilter = "전체" | "식당" | "카페" | "디저트";

const CATEGORIES: CategoryFilter[] = ["전체", "식당", "카페", "디저트"];

export default function RestaurantsPage() {
  const [view, setView] = useState<"list" | "map">("list");
  const [filter, setFilter] = useState<CategoryFilter>("전체");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const allRestaurants = getRestaurants();
  const filteredRestaurants =
    filter === "전체"
      ? allRestaurants
      : allRestaurants.filter((r) => r.category === filter);

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
            onClick={() => setView("list")}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant={view === "map" ? "default" : "outline"}
            size="icon-sm"
            onClick={() => setView("map")}
          >
            <Map className="size-4" />
          </Button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2">
        {CATEGORIES.map((cat) => (
          <Badge
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Badge>
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
            />
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              해당 카테고리에 등록된 맛집이 없습니다.
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
