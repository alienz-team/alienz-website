"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CategorizedProject } from "./Portfolio";
import { ArrowLeft, ArrowRight, Close } from "./Icons";

type Props = {
  project: CategorizedProject;
  position: { index: number; total: number };
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
};

/** Native <dialog> as a modal: the browser handles the focus trap, the
 *  backdrop, inert background and Escape. */
export function ProjectDialog({ project, position, onClose, onStep }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      d?.close();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // RTL: the right arrow goes back, the left arrow goes forward.
      if (e.key === "ArrowLeft") onStep(1);
      if (e.key === "ArrowRight") onStep(-1);
    };
    const d = ref.current;
    d?.addEventListener("keydown", onKey);
    return () => d?.removeEventListener("keydown", onKey);
  }, [onStep]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(100%-2rem,72rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto border border-line bg-orbit p-0 text-starlight backdrop:bg-space/85 backdrop:backdrop-blur-sm open:animate-rise"
      style={{ animationDuration: "0.35s" }}
    >
      <div className="grid lg:grid-cols-12">
        <div className="relative bg-space lg:col-span-8">
          <Image
            key={project.id}
            src={project.src}
            alt={project.alt}
            width={project.w}
            height={project.h}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-4">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-semibold text-alien">{project.categoryLabel}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-line text-haze transition-colors hover:border-alien hover:text-alien"
            >
              <Close />
            </button>
          </div>
          <h3 id="project-title" className="mt-3 text-2xl font-black sm:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-loose text-haze">{project.alt}</p>

          <a
            href="#contact"
            onClick={onClose}
            className="chamfer-sm mt-8 inline-flex items-center justify-center gap-2 bg-alien px-5 py-3.5 font-bold text-space transition-colors hover:bg-alien-bright"
          >
            اطلب عملاً مشابهاً
            <ArrowLeft className="h-4 w-4" />
          </a>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-6 max-lg:mt-8">
            <p className="text-sm text-haze" aria-live="polite">
              <span className="font-latin text-starlight">{position.index + 1}</span> من{" "}
              <span className="font-latin">{position.total}</span>
            </p>
            {position.total > 1 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  aria-label="العمل السابق"
                  className="inline-flex h-11 w-11 items-center justify-center border border-line transition-colors hover:border-alien hover:text-alien"
                >
                  <ArrowRight />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  aria-label="العمل التالي"
                  className="inline-flex h-11 w-11 items-center justify-center border border-line transition-colors hover:border-alien hover:text-alien"
                >
                  <ArrowLeft />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
