"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("tubc_splash_seen")) return;
    sessionStorage.setItem("tubc_splash_seen", "1");
    setVisible(true);

    const leaveTimer = setTimeout(() => setLeaving(true), 1800);
    const removeTimer = setTimeout(() => setVisible(false), 2200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-parchment ${
        leaving ? "animate-splash-fade-out" : ""
      }`}
    >
      {/* Mountain SVG */}
      <svg
        viewBox="0 0 200 120"
        width="200"
        height="120"
        fill="none"
        aria-hidden="true"
      >
        {/* Background peak — sage */}
        <path
          d="M60 100 L110 30 L160 100"
          stroke="#8FAF8A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-mountain-draw"
          style={{ animationDelay: "0s" }}
        />
        {/* Foreground peak — terra */}
        <path
          d="M20 100 L80 20 L140 100"
          stroke="#C17A56"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-mountain-draw"
          style={{ animationDelay: "0.15s" }}
        />
        {/* Sun */}
        <circle
          cx="165"
          cy="28"
          r="8"
          stroke="#C17A56"
          strokeWidth="2"
          className="animate-mountain-draw"
          style={{ animationDelay: "0.6s" }}
        />
      </svg>

    </div>
  );
}
