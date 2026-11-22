import type { CSSProperties } from "react";

/* The hero's alien workstation: three aliens in cybernetic headsets coding
   at a holographic console in front of a falling-code wall. It is drawn in
   layers at different depths (translateZ), and MotionDirector feeds the
   stage --sp (scroll) and --px / --py (pointer), which tilt the rig and
   shift each layer by its own parallax amount. Pure markup + CSS: nothing
   here runs on the client. */

type LayerVars = CSSProperties & {
  "--z"?: string;
  "--par"?: string;
  "--ry"?: string;
  "--rs"?: string;
  "--fd"?: string;
};

const WALL_GLYPHS = "01アイウエオカキクケコサシスセソ<>/{}=+*";

/** Seeded PRNG so the code wall is identical on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const wall = (() => {
  const rnd = seeded(7);
  return Array.from({ length: 14 }, (_, c) => ({
    x: 24 + c * 34,
    dur: 7 + Math.round(rnd() * 8),
    delay: -Math.round(rnd() * 10),
    glyphs: Array.from({ length: 20 }, () => WALL_GLYPHS[Math.floor(rnd() * WALL_GLYPHS.length)]),
  }));
})();

export function AlienStation() {
  return (
    <div
      data-scroll-stage
      role="img"
      aria-label="فضائيون بسماعات رأس يبرمجون على شاشات هولوغرافية"
      className="station relative mx-auto aspect-[5/6] w-full max-w-[34rem]"
    >
      <div aria-hidden className="station-floor absolute inset-x-[6%] bottom-[2%] h-[18%] rounded-[50%]" />
      <div className="station-in absolute inset-0">
        <div className="station-rig absolute inset-0">
          {/* Layer 1: falling-code wall */}
          <div className="layer" style={{ "--z": "-110px", "--par": "70px" } as LayerVars}>
            <svg viewBox="0 0 500 600" className="h-full w-full" aria-hidden>
              <defs>
                <clipPath id="wall-clip">
                  <rect x="10" y="20" width="480" height="440" rx="18" />
                </clipPath>
                <linearGradient id="wall-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#020806" />
                  <stop offset="1" stopColor="#04140d" />
                </linearGradient>
              </defs>
              <rect x="10" y="20" width="480" height="440" rx="18" fill="url(#wall-fade)" stroke="#00ff66" strokeOpacity="0.25" />
              <g clipPath="url(#wall-clip)" fontFamily="ui-monospace, monospace" fontSize="15" fill="#00ff66">
                {wall.map((col) => (
                  <g
                    key={col.x}
                    className="wall-col"
                    style={{ animationDuration: `${col.dur}s`, animationDelay: `${col.delay}s` }}
                  >
                    {col.glyphs.map((g, i) => (
                      <text key={i} x={col.x} y={i * 24} opacity={((i + 1) / col.glyphs.length) * 0.55}>
                        {g}
                      </text>
                    ))}
                  </g>
                ))}
              </g>
              {/* perspective floor */}
              <g stroke="#00ff66" strokeOpacity="0.18">
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`v${i}`} x1={250} y1={470} x2={-150 + i * 100} y2={600} />
                ))}
                {[480, 500, 528, 566].map((y) => (
                  <line key={`h${y}`} x1={0} y1={y} x2={500} y2={y} />
                ))}
              </g>
            </svg>
          </div>

          {/* Layer 2: cables */}
          <div className="layer" style={{ "--z": "-40px", "--par": "40px" } as LayerVars}>
            <svg viewBox="0 0 500 600" className="h-full w-full" aria-hidden fill="none">
              {[
                "M92 300 C40 380 30 470 -10 560",
                "M160 205 C120 300 150 420 120 520",
                "M340 205 C380 300 350 420 380 520",
                "M410 320 C470 390 470 470 510 560",
                "M250 560 C250 590 300 600 330 640",
              ].map((d) => (
                <g key={d}>
                  <path d={d} stroke="#0b0e17" strokeWidth="7" strokeLinecap="round" />
                  <path d={d} stroke="#1d2536" strokeWidth="5" strokeLinecap="round" />
                  <path d={d} stroke="#00ff66" strokeWidth="1.6" strokeLinecap="round" className="cable-flow" />
                </g>
              ))}
            </svg>
          </div>

          {/* Layer 3: the crew and their console */}
          <div className="layer" style={{ "--z": "0px", "--par": "0px" } as LayerVars}>
            <svg viewBox="0 0 500 600" className="h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="alien-skin" cx="0.45" cy="0.35" r="0.75">
                  <stop offset="0" stopColor="#2a8a5c" />
                  <stop offset="0.55" stopColor="#0f4a31" />
                  <stop offset="1" stopColor="#06231a" />
                </radialGradient>
                <linearGradient id="alien-suit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#111c18" />
                  <stop offset="1" stopColor="#060908" />
                </linearGradient>
                <linearGradient id="holo-cone" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#00ff66" stopOpacity="0.32" />
                  <stop offset="1" stopColor="#00ff66" stopOpacity="0" />
                </linearGradient>
                <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <Alien x={92} y={300} s={0.55} dim />
              <Alien x={410} y={318} s={0.5} dim flip />
              <Alien x={250} y={225} s={1} />

              {/* light rising off the holo keyboard */}
              <path d="M120 470 L380 470 L330 330 L170 330 Z" fill="url(#holo-cone)" className="holo-flicker" />

              {/* console */}
              <path d="M70 470 L430 470 L492 566 L8 566 Z" fill="#0b0e17" stroke="#00ff66" strokeOpacity="0.45" />
              <path d="M70 470 L430 470" stroke="#00ff66" strokeWidth="2" filter="url(#neon)" />
              <g fill="#00ff66">
                {Array.from({ length: 4 }, (_, r) =>
                  Array.from({ length: 12 }, (_, c) => {
                    // rows widen toward the viewer
                    const w = 22 + r * 2.4;
                    const x = 250 + (c - 6) * (w + 4);
                    return (
                      <rect
                        key={`${r}-${c}`}
                        x={x}
                        y={482 + r * 18}
                        width={w}
                        height={11}
                        rx={2}
                        opacity={(c * 7 + r * 3) % 5 === 0 ? 0.85 : 0.22}
                        className={(c * 7 + r * 3) % 5 === 0 ? "key-blink" : undefined}
                        style={{ animationDelay: `${((c + r * 5) % 9) * 0.35}s` }}
                      />
                    );
                  }),
                )}
              </g>
              {/* hands on the keys */}
              <ellipse cx="185" cy="488" rx="22" ry="9" fill="#13573a" stroke="#00ff66" strokeOpacity="0.5" />
              <ellipse cx="315" cy="488" rx="22" ry="9" fill="#13573a" stroke="#00ff66" strokeOpacity="0.5" />
            </svg>
          </div>

          {/* Layer 4: holographic screens, nearest the viewer */}
          <Holo
            className="top-[5%] left-[2%] w-[42%]"
            vars={{ "--z": "90px", "--par": "-50px", "--ry": "16deg", "--rs": "-14deg", "--fd": "0s" }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-alien-bright/70" />
              ))}
            </div>
            <div className="mt-2.5 space-y-1.5">
              {[78, 52, 64, 36, 70, 44].map((w, i) => (
                <div key={i} className="flex gap-1.5" style={{ paddingInlineStart: `${(i % 3) * 8}px` }}>
                  <span className="code-line h-1 rounded-full bg-alien-bright/80" style={{ width: `${w * 0.35}%`, animationDelay: `${i * 0.4}s` }} />
                  <span className="h-1 rounded-full bg-alien/40" style={{ width: `${w * 0.45}%` }} />
                </div>
              ))}
            </div>
          </Holo>

          <Holo
            className="top-[16%] right-[0%] w-[34%]"
            vars={{ "--z": "130px", "--par": "-80px", "--ry": "-18deg", "--rs": "16deg", "--fd": "-2s" }}
          >
            <p dir="ltr" className="font-latin text-[0.55rem] tracking-[0.2em] text-alien-bright/80">NEURAL LOAD</p>
            <div className="mt-2 flex h-12 items-end gap-[3px]">
              {[40, 72, 55, 90, 64, 80, 48, 96, 70, 58].map((h, i) => (
                <span
                  key={i}
                  className="bar-pulse w-full rounded-sm bg-gradient-to-t from-alien/40 to-alien-bright"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </Holo>

          <Holo
            className="bottom-[30%] left-[0%] w-[24%]"
            vars={{ "--z": "150px", "--par": "-100px", "--ry": "22deg", "--rs": "-20deg", "--fd": "-4s" }}
          >
            <svg viewBox="0 0 100 100" className="w-full" aria-hidden fill="none" stroke="#00ff66">
              <circle cx="50" cy="50" r="42" strokeOpacity="0.35" />
              <circle cx="50" cy="50" r="28" strokeOpacity="0.25" strokeDasharray="4 5" />
              <g className="radar-spin">
                <path d="M50 50 L50 8 A42 42 0 0 1 86 29 Z" fill="#00ff66" fillOpacity="0.18" stroke="none" />
                <line x1="50" y1="50" x2="50" y2="8" strokeWidth="1.5" />
              </g>
              <circle cx="68" cy="36" r="2.5" fill="#00ff66" stroke="none" />
              <circle cx="34" cy="62" r="2" fill="#00ff66" stroke="none" />
            </svg>
          </Holo>

          <Holo
            className="right-[4%] bottom-[27%] w-[30%]"
            vars={{ "--z": "110px", "--par": "-60px", "--ry": "-14deg", "--rs": "12deg", "--fd": "-1s" }}
          >
            <p dir="ltr" className="flex items-center justify-between font-latin text-[0.55rem] tracking-[0.2em] text-alien-bright/80">
              <span>SYS</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-alien-bright animate-pulse-dot" />
                ONLINE
              </span>
            </p>
            <p dir="ltr" className="mt-1 font-latin text-lg font-bold text-starlight">
              0x7F<span className="text-alien-bright">::</span>A11
            </p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-alien/15">
              <div className="load-sweep h-full w-1/3 rounded-full bg-alien-bright" />
            </div>
          </Holo>
        </div>
      </div>
    </div>
  );
}

function Holo({ className, vars, children }: { className: string; vars: LayerVars; children: React.ReactNode }) {
  return (
    <div aria-hidden className={`holo-layer absolute ${className}`} style={vars}>
      <div className="holo-float">
        <div className="holo-panel rounded-md p-2.5 sm:p-3">{children}</div>
      </div>
    </div>
  );
}

/** One crew member, drawn around the head centre. */
function Alien({ x, y, s, dim, flip }: { x: number; y: number; s: number; dim?: boolean; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={dim ? 0.6 : 1}>
      {/* body */}
      <path d="M-118 250 C-112 160 -78 124 -40 114 L40 114 C78 124 112 160 118 250 Z" fill="url(#alien-suit)" stroke="#00ff66" strokeOpacity="0.35" />
      <path d="M-40 114 L-20 156 L20 156 L40 114" fill="none" stroke="#00ff66" strokeOpacity="0.55" />
      <path d="M-70 170 L-70 230 M70 170 L70 230" stroke="#00ff66" strokeOpacity="0.25" strokeDasharray="2 6" />
      {/* arms reaching for the keys */}
      <path d="M-92 160 C-112 220 -96 252 -66 262" fill="none" stroke="#0d1512" strokeWidth="26" strokeLinecap="round" />
      <path d="M92 160 C112 220 96 252 66 262" fill="none" stroke="#0d1512" strokeWidth="26" strokeLinecap="round" />
      {/* neck */}
      <path d="M-17 64 L-15 118 L15 118 L17 64 Z" fill="#0d3a27" />
      {/* head */}
      <path
        d="M0 -108 C60 -108 82 -62 76 -16 C70 30 35 68 0 74 C-35 68 -70 30 -76 -16 C-82 -62 -60 -108 0 -108 Z"
        fill="url(#alien-skin)"
        stroke="#00ff66"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      {/* eyes, with reflected code */}
      <path d="M-60 -8 C-46 -20 -18 -16 -9 8 C-26 19 -52 13 -60 -8 Z" fill="#010403" />
      <path d="M60 -8 C46 -20 18 -16 9 8 C26 19 52 13 60 -8 Z" fill="#010403" />
      <g className="eye-scan" fill="#00ff66">
        <rect x="-48" y="-6" width="20" height="2" rx="1" opacity="0.8" />
        <rect x="-44" y="0" width="12" height="2" rx="1" opacity="0.5" />
        <rect x="26" y="-6" width="20" height="2" rx="1" opacity="0.8" />
        <rect x="30" y="0" width="12" height="2" rx="1" opacity="0.5" />
      </g>
      <path d="M-8 47 Q0 50 8 47" fill="none" stroke="#04160f" strokeWidth="2" strokeLinecap="round" />
      {/* cybernetic monocle */}
      <path d="M12 -26 L70 -26 L76 -18" fill="none" stroke="#00ff66" strokeOpacity="0.7" />
      <circle cx="70" cy="-26" r="2.5" fill="#00ff66" />
      {/* headset */}
      <path d="M-82 -8 C-88 -126 88 -126 82 -8" fill="none" stroke="#1d2536" strokeWidth="11" strokeLinecap="round" />
      <path d="M-82 -8 C-88 -126 88 -126 82 -8" fill="none" stroke="#00ff66" strokeOpacity="0.75" strokeWidth="1.6" />
      <rect x="-101" y="-38" width="28" height="58" rx="13" fill="#0b0e17" stroke="#00ff66" strokeWidth="1.6" />
      <rect x="73" y="-38" width="28" height="58" rx="13" fill="#0b0e17" stroke="#00ff66" strokeWidth="1.6" />
      <circle cx="-87" cy="-9" r="4" fill="#00ff66" className="led-pulse" />
      <circle cx="87" cy="-9" r="4" fill="#00ff66" className="led-pulse" />
      {/* mic boom */}
      <path d="M-88 18 C-88 58 -52 68 -18 58" fill="none" stroke="#1d2536" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="-16" cy="57" r="5" fill="#00ff66" filter="url(#neon)" />
    </g>
  );
}
