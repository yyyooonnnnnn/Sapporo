"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ADMIN_PIN = "1234";

const adminLinks = [
  { href: "/admin/schedules", label: "일정 관리", icon: Calendar, desc: "일정 추가/수정/삭제" },
  { href: "/admin/places", label: "장소 관리", icon: MapPin, desc: "맛집, 관광지 추가/수정" },
  { href: "/admin/flights", label: "항공편 관리", icon: Plane, desc: "항공편 정보 수정" },
  { href: "/admin/accommodation", label: "숙소 관리", icon: Hotel, desc: "숙소 정보 수정" },
];

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sapporo-admin-auth");
    if (stored === "true") {
      setIsAuthed(true);
    }
  }, []);

  function handleLogin() {
    if (pin === ADMIN_PIN) {
      setIsAuthed(true);
      localStorage.setItem("sapporo-admin-auth", "true");
      setError("");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  }

  function handleLogout() {
    setIsAuthed(false);
    localStorage.removeItem("sapporo-admin-auth");
  }

  if (!isAuthed) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex size-16 items-center justify-center rounded-full bg-muted mb-6">
          <Lock className="size-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-bold mb-6">관리자 로그인</h2>
        <div className="w-full max-w-xs space-y-4">
          <div>
            <Label htmlFor="pin">비밀번호</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="4자리 비밀번호"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {error && (
              <p className="mt-1 text-xs text-destructive">{error}</p>
            )}
          </div>
          <Button className="w-full" onClick={handleLogin}>
            로그인
          </Button>
          <Link href="/" className="flex w-full items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            <ArrowLeft className="size-4" />
            돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">관리자 대시보드</h2>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <div className="grid gap-3">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Card className="transition-shadow hover:shadow-md cursor-pointer">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{link.label}</h3>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Link href="/" className="flex w-full items-center justify-center gap-1.5 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
        <ArrowLeft className="size-4" />
        메인으로 돌아가기
      </Link>
    </div>
  );
}
