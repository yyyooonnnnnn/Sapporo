"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { accommodations } from "@/lib/data";
import type { Accommodation } from "@/lib/types";

export default function AdminAccommodationPage() {
  const initialAccommodation = accommodations[0];
  const [acc, setAcc] = useState<Accommodation>(initialAccommodation);
  const [facilitiesInput, setFacilitiesInput] = useState(
    initialAccommodation.nearby_facilities?.join("\n") || ""
  );
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof Accommodation, value: string | number) {
    setAcc((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleSave() {
    setAcc((prev) => ({
      ...prev,
      nearby_facilities: facilitiesInput
        .split("\n")
        .map((s: string) => s.trim())
        .filter(Boolean),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/admin" className="inline-flex items-center justify-center size-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <h2 className="text-lg font-bold">숙소 관리</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">숙소 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label>숙소명</Label>
            <Input
              value={acc.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </div>

          <div>
            <Label>주소</Label>
            <Input
              value={acc.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>위도</Label>
              <Input
                type="number"
                step="0.0001"
                value={acc.lat}
                onChange={(e) => updateField("lat", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>경도</Label>
              <Input
                type="number"
                step="0.0001"
                value={acc.lng}
                onChange={(e) => updateField("lng", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>체크인</Label>
              <Input
                type="datetime-local"
                value={acc.check_in.replace(" ", "T")}
                onChange={(e) =>
                  updateField("check_in", e.target.value.replace("T", " "))
                }
              />
            </div>
            <div>
              <Label>체크아웃</Label>
              <Input
                type="datetime-local"
                value={acc.check_out.replace(" ", "T")}
                onChange={(e) =>
                  updateField("check_out", e.target.value.replace("T", " "))
                }
              />
            </div>
          </div>

          <div>
            <Label>예약 URL</Label>
            <Input
              value={acc.booking_url ?? ""}
              onChange={(e) => updateField("booking_url", e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <Label>전화번호</Label>
            <Input
              value={acc.phone ?? ""}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+81-..."
            />
          </div>

          <div>
            <Label>메모</Label>
            <Textarea
              value={acc.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="숙소 관련 메모"
            />
          </div>

          <div>
            <Label>주변 시설 (줄바꿈으로 구분)</Label>
            <Textarea
              value={facilitiesInput}
              onChange={(e) => {
                setFacilitiesInput(e.target.value);
                setSaved(false);
              }}
              placeholder={"시설 1\n시설 2\n시설 3"}
            />
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={handleSave}>
        <Save className="mr-1.5 size-4" />
        {saved ? "저장 완료!" : "변경사항 저장"}
      </Button>
    </div>
  );
}
