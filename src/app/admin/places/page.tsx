"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { places as initialPlaces } from "@/lib/data";
import type { Place } from "@/lib/types";
import { AdminGuard } from "@/components/admin-guard";

const CATEGORIES: Place["category"][] = [
  "식당",
  "카페",
  "관광",
  "쇼핑",
  "디저트",
  "체험",
  "온천",
  "숙소",
  "이동",
];

export default function AdminPlacesPage() {
  const [placeList, setPlaceList] = useState<Place[]>(initialPlaces);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Partial<Place>>({
    name: "",
    address: "",
    lat: 43.0,
    lng: 141.35,
    category: "식당",
    rating: undefined,
    price_level: undefined,
    recommendation_reason: "",
    phone: "",
    website: "",
  });

  const [menuInput, setMenuInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");

  function resetForm() {
    setFormData({
      name: "",
      address: "",
      lat: 43.0,
      lng: 141.35,
      category: "식당",
      rating: undefined,
      price_level: undefined,
      recommendation_reason: "",
      phone: "",
      website: "",
    });
    setMenuInput("");
    setReviewInput("");
    setHoursInput("");
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(place: Place) {
    setFormData(place);
    setMenuInput(place.main_menu?.join(", ") || "");
    setReviewInput(place.key_reviews?.join("\n") || "");
    setHoursInput(place.opening_hours?.join("\n") || "");
    setEditingId(place.id);
    setShowForm(true);
  }

  function handleSave() {
    if (!formData.name) return;

    const placeData: Place = {
      id: editingId || `place-new-${Date.now()}`,
      trip_id: "trip-001",
      name: formData.name || "",
      address: formData.address || "",
      lat: formData.lat || 43.0,
      lng: formData.lng || 141.35,
      category: formData.category || "식당",
      rating: formData.rating,
      price_level: formData.price_level,
      main_menu: menuInput
        ? menuInput.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
      key_reviews: reviewInput
        ? reviewInput.split("\n").map((s) => s.trim()).filter(Boolean)
        : undefined,
      opening_hours: hoursInput
        ? hoursInput.split("\n").map((s) => s.trim()).filter(Boolean)
        : undefined,
      recommendation_reason: formData.recommendation_reason || undefined,
      phone: formData.phone || undefined,
      website: formData.website || undefined,
    };

    if (editingId) {
      setPlaceList((prev) =>
        prev.map((p) => (p.id === editingId ? placeData : p))
      );
    } else {
      setPlaceList((prev) => [...prev, placeData]);
    }
    resetForm();
  }

  function handleDelete(id: string) {
    setPlaceList((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <AdminGuard>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="inline-flex items-center justify-center size-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <h2 className="text-lg font-bold">장소 관리</h2>
        </div>
        <Button
          size="sm"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="mr-1 size-3.5" />
          추가
        </Button>
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {editingId ? "장소 수정" : "장소 추가"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>장소명</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="장소 이름"
              />
            </div>

            <div>
              <Label>주소</Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, address: e.target.value }))
                }
                placeholder="주소"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>위도</Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.lat}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      lat: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <Label>경도</Label>
                <Input
                  type="number"
                  step="0.0001"
                  value={formData.lng}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      lng: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>카테고리</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) =>
                    setFormData((p) => ({
                      ...p,
                      category: v as Place["category"],
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>평점 (1-5)</Label>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={formData.rating ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      rating: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>가격대 (1-4)</Label>
                <Input
                  type="number"
                  min={1}
                  max={4}
                  value={formData.price_level ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      price_level: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    }))
                  }
                />
              </div>
              <div>
                <Label>전화번호</Label>
                <Input
                  value={formData.phone ?? ""}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+81-..."
                />
              </div>
            </div>

            <div>
              <Label>웹사이트</Label>
              <Input
                value={formData.website ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, website: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>

            <div>
              <Label>대표 메뉴 (쉼표로 구분)</Label>
              <Input
                value={menuInput}
                onChange={(e) => setMenuInput(e.target.value)}
                placeholder="메뉴1, 메뉴2, 메뉴3"
              />
            </div>

            <div>
              <Label>추천 이유</Label>
              <Input
                value={formData.recommendation_reason ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    recommendation_reason: e.target.value,
                  }))
                }
                placeholder="이 장소를 추천하는 이유"
              />
            </div>

            <div>
              <Label>주요 리뷰 (줄바꿈으로 구분)</Label>
              <Textarea
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                placeholder={"리뷰 1\n리뷰 2"}
              />
            </div>

            <div>
              <Label>영업시간 (줄바꿈으로 구분)</Label>
              <Textarea
                value={hoursInput}
                onChange={(e) => setHoursInput(e.target.value)}
                placeholder={"매일 10:00 - 20:00"}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={handleSave}>
                {editingId ? "수정 완료" : "추가하기"}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Place list */}
      <div className="space-y-2">
        {placeList.map((place) => (
          <Card key={place.id} size="sm">
            <CardContent className="flex items-center gap-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] h-4">
                    {place.category}
                  </Badge>
                  {place.rating && (
                    <span className="text-[10px] text-muted-foreground">
                      {place.rating.toFixed(1)}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium truncate">{place.name}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="수정"
                  onClick={() => handleEdit(place)}
                >
                  <Pencil className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label="삭제"
                  onClick={() => handleDelete(place.id)}
                >
                  <Trash2 className="size-3 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </AdminGuard>
  );
}
