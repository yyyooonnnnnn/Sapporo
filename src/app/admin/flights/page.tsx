"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { flights as initialFlights } from "@/lib/data";
import type { Flight } from "@/lib/types";

export default function AdminFlightsPage() {
  const [flightList, setFlightList] = useState<Flight[]>(initialFlights);
  const [saved, setSaved] = useState(false);

  function updateFlight(id: string, field: keyof Flight, value: string) {
    setFlightList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="inline-flex items-center justify-center size-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <h2 className="text-lg font-bold">항공편 관리</h2>
      </div>

      {flightList.map((flight) => (
        <Card key={flight.id}>
          <CardHeader>
            <CardTitle className="text-base">
              {flight.type === "departure" ? "출발편" : "도착편"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>항공사</Label>
                <Input
                  value={flight.airline}
                  onChange={(e) =>
                    updateFlight(flight.id, "airline", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>편명</Label>
                <Input
                  value={flight.flight_number}
                  onChange={(e) =>
                    updateFlight(flight.id, "flight_number", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>출발 시간</Label>
                <Input
                  type="datetime-local"
                  value={flight.departure_time.slice(0, 16)}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "departure_time",
                      e.target.value + ":00"
                    )
                  }
                />
              </div>
              <div>
                <Label>도착 시간</Label>
                <Input
                  type="datetime-local"
                  value={flight.arrival_time.slice(0, 16)}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "arrival_time",
                      e.target.value + ":00"
                    )
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>출발 공항</Label>
                <Input
                  value={flight.departure_airport}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "departure_airport",
                      e.target.value
                    )
                  }
                />
              </div>
              <div>
                <Label>출발 공항코드</Label>
                <Input
                  value={flight.departure_airport_code}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "departure_airport_code",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>도착 공항</Label>
                <Input
                  value={flight.arrival_airport}
                  onChange={(e) =>
                    updateFlight(flight.id, "arrival_airport", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>도착 공항코드</Label>
                <Input
                  value={flight.arrival_airport_code}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "arrival_airport_code",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>터미널</Label>
                <Input
                  value={flight.terminal ?? ""}
                  onChange={(e) =>
                    updateFlight(flight.id, "terminal", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>예약번호</Label>
                <Input
                  value={flight.booking_reference ?? ""}
                  onChange={(e) =>
                    updateFlight(
                      flight.id,
                      "booking_reference",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div>
              <Label>항공사 URL</Label>
              <Input
                value={flight.airline_url ?? ""}
                onChange={(e) =>
                  updateFlight(flight.id, "airline_url", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button className="w-full" onClick={handleSave}>
        <Save className="mr-1.5 size-4" />
        {saved ? "저장 완료!" : "변경사항 저장"}
      </Button>
    </div>
  );
}
