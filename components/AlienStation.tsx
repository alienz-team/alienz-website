import type { CSSProperties } from "react";
import { ShowcaseSlides } from "./ShowcaseSlides";

/* The hero's alien workstation. The showcase sits in a 3D rig: MotionDirector
   feeds the stage --sp (scroll) and --px / --py (pointer), which tilt the
   rig, while the glow, slides and HUD frame sit at different depths
   (translateZ) so they parallax against each other. 4:3 on phones keeps
   the scene tall enough; 16:9 from sm up matches the widescreen scenes. */

type LayerVars = CSSProperties & { "--z"?: string; "--par"?: string };

export function AlienStation({ alts }: { alts: readonly string[] }) {
  return (
    <div data-scroll-stage className="station relative mx-auto aspect-[4/3] w-full max-w-[52rem] sm:aspect-video">
      <div aria-hidden className="station-floor absolute inset-x-[8%] bottom-[-4%] h-[16%] rounded-[50%]" />
      <div className="station-in absolute inset-0">
        <div className="station-rig absolute inset-0">
          {/* Neon ambient glow behind the scene */}
          <div aria-hidden className="layer station-glow" style={{ "--z": "-80px", "--par": "50px" } as LayerVars} />

          <div className="layer" style={{ "--z": "0px", "--par": "0px" } as LayerVars}>
            <ShowcaseSlides alts={alts} />
          </div>

          {/* HUD corners floating in front */}
          <div aria-hidden className="layer hud opacity-70" style={{ "--z": "60px", "--par": "-40px", inset: "5%" } as LayerVars} />
        </div>
      </div>
    </div>
  );
}
