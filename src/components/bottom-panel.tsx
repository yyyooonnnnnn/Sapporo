"use client";

import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface BottomPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomPanel({ open, onClose, title, children }: BottomPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[75vh] flex-col rounded-t-2xl bg-popover shadow-xl"
        style={{ animation: "slideUp 0.25s ease-out" }}
      >
        {/* Drag handle + close */}
        <div className="shrink-0 flex items-center justify-between rounded-t-2xl bg-popover px-4 pt-3 pb-2">
          <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-muted-foreground/20" />
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute right-3 top-3"
            onClick={onClose}
          >
            <XIcon className="size-4" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
