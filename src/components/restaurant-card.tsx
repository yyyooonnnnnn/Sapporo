"use client";

import { Star, MapPin, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ImageCarousel } from "@/components/image-carousel";
import type { Place } from "@/lib/types";

interface RestaurantCardProps {
  place: Place;
  onClick?: () => void;
}

function PriceLevel({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className="text-sm font-bold"
          style={{ color: i < level ? "var(--food-accent)" : "#d1d5db" }}
        >
          ¥
        </span>
      ))}
    </span>
  );
}

/* Category-to-icon emoji for the image placeholder */
const categoryEmoji: Record<string, string> = {
  식당:  "🍜",
  카페:  "☕",
  디저트: "🍮",
  쇼핑:  "🛍️",
  관광:  "📸",
  체험:  "✨",
  온천:  "♨️",
  숙소:  "🏨",
  이동:  "🚂",
};

export function RestaurantCard({ place, onClick }: RestaurantCardProps) {
  const emoji = categoryEmoji[place.category] ?? "📍";

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
      style={{ boxShadow: "0 1px 4px rgba(124,109,175,0.08), 0 4px 16px rgba(124,109,175,0.05)" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Photo carousel */}
      <div className="relative h-36 overflow-hidden">
        {place.photos && place.photos.length > 0 ? (
          <ImageCarousel photos={place.photos} alt={place.name} className="h-36" />
        ) : (
          <div
            className="flex h-36 items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #F8F4FF 0%, #EEF7FD 60%, #FDF0E8 100%)",
            }}
          >
            <div className="text-center">
              <div className="text-4xl leading-none mb-1">{emoji}</div>
              <span className="text-xs text-muted-foreground font-medium">{place.category}</span>
            </div>
          </div>
        )}
        {place.recommendation_reason && (
          <Badge
            className="absolute top-2 left-2 max-w-[200px] truncate text-[10px]"
            style={{ background: "var(--lavender)", color: "#fff", border: "none" }}
          >
            {place.recommendation_reason}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-1 pt-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">{place.name}</CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 text-[10px]"
            style={{
              background: "#E8925A18",
              color: "var(--food-accent)",
              border: "1px solid #E8925A30",
            }}
          >
            {place.category}
          </Badge>
        </div>

        <CardDescription>
          <div className="flex items-center gap-3 mt-1.5">
            {/* Star rating — larger and more prominent */}
            {place.rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className="size-3.5"
                    style={{
                      fill: i < Math.round(place.rating!) ? "#FBBF24" : "transparent",
                      color: i < Math.round(place.rating!) ? "#FBBF24" : "#d1d5db",
                    }}
                  />
                ))}
                <span className="ml-0.5 text-sm font-bold" style={{ color: "#92400e" }}>
                  {place.rating.toFixed(1)}
                </span>
              </div>
            )}
            {place.price_level && <PriceLevel level={place.price_level} />}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2.5 pt-0 pb-3">
        {/* Main menu badges */}
        {place.main_menu && place.main_menu.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {place.main_menu.slice(0, 3).map((menu, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] rounded-full"
                style={{ borderColor: "var(--lavender-muted)", color: "var(--lavender)" }}
              >
                {menu}
              </Badge>
            ))}
          </div>
        )}

        {/* Review excerpt */}
        {place.key_reviews && place.key_reviews.length > 0 && (
          <p
            className="text-xs leading-relaxed line-clamp-2 px-2.5 py-2 rounded-lg"
            style={{ background: "#F8F4FF", color: "#5b5071", borderLeft: "2px solid var(--lavender-muted)" }}
          >
            &ldquo;{place.key_reviews[0]}&rdquo;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
