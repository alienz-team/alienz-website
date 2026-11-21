import { about, method } from "@/lib/content";
import { Hex } from "./Icons";

// Process steps as Hexwall-style tactical cards, then the tool stack.
export function Method() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="hexgrid pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p dir="ltr" className="text-right font-latin text-sm font-medium text-alien">How we work</p>
            <h2 id="process-title" className="mt-2 text-4xl font-black sm:text-5xl">{method.title}</h2>
          </div>
          <div className="space-y-3 text-lg text-haze lg:col-span-6 lg:pt-8">
            <p className="text-starlight">{about.lead}. {about.paragraphs[1]}</p>
            <p>{method.intro}</p>
          </div>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {method.steps.map((s, i) => (
            <li key={s.title} data-spot className="spot hud chamfer relative border border-line bg-orbit/80 p-6">
              <div className="flex items-center justify-between">
                <span className="relative inline-flex h-12 w-12 items-center justify-center text-alien">
                  <Hex className="absolute inset-0 h-12 w-12" strokeWidth={1.2} />
                  <span className="font-latin text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                </span>
                {/* Progress ticks: how far through the process this step is. */}
                <span aria-hidden className="flex gap-1">
                  {method.steps.map((_, j) => (
                    <span key={j} className={`h-1 w-4 ${j <= i ? "bg-alien" : "bg-line"}`} />
                  ))}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-haze">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-line pt-10">
          <h3 className="text-xl font-bold">أدوات نعمل بها</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {method.stack.map((g) => (
              <div key={g.group}>
                <dt className="text-sm font-semibold text-haze">{g.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <span
                      key={t}
                      dir="ltr"
                      className="chamfer-sm border border-line bg-orbit px-3 py-1.5 font-latin text-sm text-starlight"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
