import type { ServiceView } from "@/lib/site-data";
import { Spark } from "./Icons";

// Continuous service strip, after Hexwall's logo rail and the tool ticker
// on original-effect. Pauses on hover; hidden from screen readers because
// the same list is rendered properly in the services section.
export function Ticker({ services }: { services: ServiceView[] }) {
  const items = [...services, ...services];
  return (
    <div className="group relative overflow-hidden border-y border-line bg-orbit py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {items.map((s, i) => (
          <span key={s.id + i} className="flex items-center gap-10 whitespace-nowrap font-display text-xl font-bold text-haze sm:text-2xl">
            {s.title}
            <Spark className="h-4 w-4 text-alien" />
          </span>
        ))}
      </div>
    </div>
  );
}
