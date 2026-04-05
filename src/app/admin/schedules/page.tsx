"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { schedules as initialSchedules } from "@/lib/data";
import type { Schedule } from "@/lib/types";

const CATEGORIES: Schedule["category"][] = [
  "식당",
  "카페",
  "관광",
  "쇼핑",
  "이동",
  "디저트",
  "체험",
];

export default function AdminSchedulesPage() {
  const [scheduleList, setScheduleList] = useState<Schedule[]>(initialSchedules);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Partial<Schedule>>({
    day_number: 1,
    order: 1,
    time: "",
    title: "",
    description: "",
    category: "관광",
  });

  function resetForm() {
    setFormData({
      day_number: 1,
      order: 1,
      time: "",
      title: "",
      description: "",
      category: "관광",
    });
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(schedule: Schedule) {
    setFormData(schedule);
    setEditingId(schedule.id);
    setShowForm(true);
  }

  function handleSave() {
    if (!formData.title || !formData.time) return;

    if (editingId) {
      setScheduleList((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...s, ...formData } as Schedule : s
        )
      );
    } else {
      const newSchedule: Schedule = {
        id: `sch-new-${Date.now()}`,
        trip_id: "trip-001",
        day_number: formData.day_number || 1,
        order: formData.order || 1,
        time: formData.time || "",
        title: formData.title || "",
        description: formData.description || "",
        category: formData.category || "관광",
        place_id: formData.place_id,
        youtube_urls: formData.youtube_urls,
      };
      setScheduleList((prev) => [...prev, newSchedule]);
    }
    resetForm();
  }

  function handleDelete(id: string) {
    setScheduleList((prev) => prev.filter((s) => s.id !== id));
  }

  const groupedByDay = scheduleList.reduce(
    (acc, s) => {
      if (!acc[s.day_number]) acc[s.day_number] = [];
      acc[s.day_number].push(s);
      return acc;
    },
    {} as Record<number, Schedule[]>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="inline-flex items-center justify-center size-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <h2 className="text-lg font-bold">일정 관리</h2>
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
              {editingId ? "일정 수정" : "일정 추가"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Day</Label>
                <Select
                  value={String(formData.day_number)}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, day_number: Number(v) }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((d) => (
                      <SelectItem key={d} value={String(d)}>
                        Day {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>시간</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, time: e.target.value }))
                  }
                />
              </div>
            </div>

            <div>
              <Label>제목</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="일정 제목"
              />
            </div>

            <div>
              <Label>설명</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="일정 설명"
              />
            </div>

            <div>
              <Label>카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    category: v as Schedule["category"],
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
              <Label>순서</Label>
              <Input
                type="number"
                min={1}
                value={formData.order}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    order: Number(e.target.value),
                  }))
                }
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

      {/* Schedule list by day */}
      {Object.keys(groupedByDay)
        .sort((a, b) => Number(a) - Number(b))
        .map((day) => (
          <div key={day}>
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">
              Day {day}
            </h3>
            <div className="space-y-2">
              {groupedByDay[Number(day)]
                .sort((a, b) => a.order - b.order)
                .map((schedule) => (
                  <Card key={schedule.id} size="sm">
                    <CardContent className="flex items-center gap-3 py-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            {schedule.time}
                          </span>
                          <Badge variant="secondary" className="text-[10px] h-4">
                            {schedule.category}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium truncate">
                          {schedule.title}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleEdit(schedule)}
                        >
                          <Pencil className="size-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => handleDelete(schedule.id)}
                        >
                          <Trash2 className="size-3 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <Separator className="mt-3" />
          </div>
        ))}
    </div>
  );
}
