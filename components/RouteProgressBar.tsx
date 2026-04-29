"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setActive(false);
    // Yield one frame so the class reset is committed before re-adding
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
  }, [pathname]);

  if (!active) return null;

  return (
    <div
      key={pathname}
      className="fixed top-0 left-0 h-[3px] bg-terra z-[200] animate-progress-run"
      onAnimationEnd={() => setActive(false)}
    />
  );
}
