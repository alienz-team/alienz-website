"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Tripoli",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Local time in Tripoli. Rendered after mount to avoid a hydration mismatch. */
export function TripoliClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <time dir="ltr" className="font-latin tabular-nums" suppressHydrationWarning>
      {now ?? "--:--:--"}
    </time>
  );
}
