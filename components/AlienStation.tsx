import type { CSSProperties } from "react";

/* The hero's alien workstation. The photo sits in a 3D rig: MotionDirector
   feeds the stage --sp (scroll) and --px / --py (pointer), which tilt the
   rig, while the glow, image and HUD frame sit at different depths
   (translateZ) so they parallax against each other. Pure markup + CSS. */

type LayerVars = CSSProperties & { "--z"?: string; "--par"?: string };

export function AlienStation({ alt }: { alt: string }) {
  return (
    <div data-scroll-stage className="station relative mx-auto aspect-[1100/1035] w-full max-w-[40rem]">
      <div aria-hidden className="station-floor absolute inset-x-[8%] bottom-[-4%] h-[16%] rounded-[50%]" />
      <div className="station-in absolute inset-0">
        <div className="station-rig absolute inset-0">
          {/* Neon ambient glow behind the scene */}
          <div aria-hidden className="layer station-glow" style={{ "--z": "-80px", "--par": "50px" } as LayerVars} />

          {/* The scene. Plain <img>: no Next image optimizer needed on Workers. */}
          <div className="layer" style={{ "--z": "0px", "--par": "0px" } as LayerVars}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/aliens-hero.webp"
              alt={alt}
              width={1100}
              height={1035}
              fetchPriority="high"
              decoding="async"
              className="station-img h-full w-full object-cover object-right"
            />
          </div>

          {/* HUD corners floating in front */}
          <div aria-hidden className="layer hud opacity-70" style={{ "--z": "60px", "--par": "-40px", inset: "6%" } as LayerVars} />
        </div>
      </div>
    </div>
  );
}
