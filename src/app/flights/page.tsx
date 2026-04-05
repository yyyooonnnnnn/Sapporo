"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FlightCard } from "@/components/flight-card";
import { flights } from "@/lib/data";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: "passport", label: "여권 (유효기간 6개월 이상)", checked: false },
  { id: "wifi", label: "포켓 와이파이 / eSIM", checked: false },
  { id: "exchange", label: "환전 (엔화)", checked: false },
  { id: "insurance", label: "여행자보험 가입", checked: false },
  { id: "charger", label: "충전기 & 보조배터리", checked: false },
  { id: "adapter", label: "돼지코 어댑터 (일본 110V)", checked: false },
  { id: "clothes", label: "여벌 옷 & 겉옷 (홋카이도는 서늘)", checked: false },
  { id: "medicine", label: "상비약 (소화제, 진통제, 밴드)", checked: false },
  { id: "booking", label: "숙소 예약확인서 출력", checked: false },
  { id: "app", label: "항공사 앱 설치 & 모바일 탑승권", checked: false },
];

export default function FlightsPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);

  useEffect(() => {
    const stored = localStorage.getItem("sapporo-flight-checklist");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChecklistItem[];
        setChecklist(parsed);
      } catch {
        // ignore invalid stored data
      }
    }
  }, []);

  function toggleItem(id: string) {
    setChecklist((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      localStorage.setItem("sapporo-flight-checklist", JSON.stringify(next));
      return next;
    });
  }

  const departureFlight = flights.find((f) => f.type === "departure");
  const arrivalFlight = flights.find((f) => f.type === "arrival");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">항공편 정보</h2>

      {departureFlight && <FlightCard flight={departureFlight} />}
      {arrivalFlight && <FlightCard flight={arrivalFlight} />}

      <Separator />

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">출발 전 체크리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center gap-3 text-left text-sm"
              >
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                    item.checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background"
                  }`}
                >
                  {item.checked && <Check className="size-3" />}
                </div>
                <span
                  className={
                    item.checked
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            체크한 항목은 자동으로 저장됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
