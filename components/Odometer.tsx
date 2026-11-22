import type { CSSProperties } from "react";

/** Rolling-digit readout. Each digit is a 0-9 strip that rolls into place
 *  when an ancestor gets `data-inview="true"` (see MotionDirector); other
 *  characters (".", "B", "%", "/") stay static. */
export function Odometer({ value, className = "" }: { value: string; className?: string }) {
  let digit = 0;
  return (
    <span dir="ltr" className={`odo font-latin tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {[...value].map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const style = { "--d": Number(ch), "--i": digit++ } as CSSProperties;
          return (
            <span key={i} className="odo-col" style={style}>
              <span className="odo-strip">
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
