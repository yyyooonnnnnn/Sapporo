"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ADMIN_PIN = "1234";

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
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
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
