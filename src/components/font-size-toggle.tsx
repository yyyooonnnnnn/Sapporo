"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function FontSizeToggle() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sapporo-large-font");
    if (stored === "true") {
      setIsLarge(true);
      document.documentElement.classList.add("large-font");
    }
  }, []);

  function handleToggle(checked: boolean) {
    setIsLarge(checked);
    if (checked) {
      document.documentElement.classList.add("large-font");
      localStorage.setItem("sapporo-large-font", "true");
    } else {
      document.documentElement.classList.remove("large-font");
      localStorage.setItem("sapporo-large-font", "false");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="font-toggle" className="text-xs whitespace-nowrap">
        큰 글씨
      </Label>
      <Switch
        id="font-toggle"
        size="sm"
        checked={isLarge}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
