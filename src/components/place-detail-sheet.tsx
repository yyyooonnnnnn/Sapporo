"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Star,
  MapPin,
  Phone,
  Globe,
  Clock,
  Navigation,
} from "lucide-react";
import type { Place } from "@/lib/types";

interface PlaceDetailSheetProps {
  place: Place | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PriceLevel({ level }: { level: number }) {
  return (
    <span className="text-sm">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className={i < level ? "text-foreground" : "text-muted-foreground/30"}
        >
          ¥
        </span>
      ))}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export function PlaceDetailSheet({
  place,
  open,
  onOpenChange,
}: PlaceDetailSheetProps) {
  if (!place) return null;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <ScrollArea className="h-full">
          <SheetHeader className="p-4 pb-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <SheetTitle className="text-lg">{place.name}</SheetTitle>
                <SheetDescription className="mt-1">
                  <Badge variant="secondary" className="mr-2">
                    {place.category}
                  </Badge>
                  {place.recommendation_reason && (
                    <Badge variant="outline" className="text-[10px]">
                      {place.recommendation_reason.length > 20
                        ? place.recommendation_reason.slice(0, 20) + "..."
                        : place.recommendation_reason}
                    </Badge>
                  )}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="space-y-4 p-4">
            {/* Rating & Price */}
            {(place.rating || place.price_level) && (
              <div className="flex items-center gap-4">
                {place.rating && <StarRating rating={place.rating} />}
                {place.price_level && (
                  <PriceLevel level={place.price_level} />
                )}
              </div>
            )}

            <Separator />

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-lg border bg-muted">
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 size-8 text-muted-foreground/50" />
                  <p>Google Maps API 키를 설정하면</p>
                  <p>지도가 표시됩니다</p>
                </div>
              </div>
            </div>

            {/* Direction button */}
            <div className="flex gap-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Navigation className="size-4" />
                길찾기
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MapPin className="size-4" />
                지도 보기
              </a>
            </div>

            {/* Main Menu */}
            {place.main_menu && place.main_menu.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 font-semibold">대표 메뉴</h4>
                  <div className="flex flex-wrap gap-2">
                    {place.main_menu.map((menu, i) => (
                      <Badge key={i} variant="outline">
                        {menu}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Recommendation */}
            {place.recommendation_reason && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 font-semibold">추천 이유</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {place.recommendation_reason}
                  </p>
                </div>
              </>
            )}

            {/* Reviews */}
            {place.key_reviews && place.key_reviews.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-2 font-semibold">주요 리뷰</h4>
                  <div className="space-y-2">
                    {place.key_reviews.map((review, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-muted/50 p-3 text-sm leading-relaxed"
                      >
                        &ldquo;{review}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Info */}
            <Separator />
            <div className="space-y-3">
              <h4 className="font-semibold">상세 정보</h4>

              {place.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{place.address}</span>
                </div>
              )}

              {place.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <a href={`tel:${place.phone}`} className="text-primary">
                    {place.phone}
                  </a>
                </div>
              )}

              {place.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="size-4 shrink-0 text-muted-foreground" />
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary truncate"
                  >
                    {place.website}
                  </a>
                </div>
              )}

              {place.opening_hours && place.opening_hours.length > 0 && (
                <div className="flex items-start gap-2 text-sm">
                  <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    {place.opening_hours.map((h, i) => (
                      <p key={i}>{h}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom padding for safe area */}
            <div className="h-4" />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
