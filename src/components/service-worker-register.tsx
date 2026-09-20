"use client";

import { useEffect } from "react";
import { withBase } from "@/lib/utils";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker.register(withBase("/sw.js")).catch(() => {
      /* SW registration is a progressive enhancement — ignore failures */
    });
  }, []);
  return null;
}
