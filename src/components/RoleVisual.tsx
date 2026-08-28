import { Sprout } from "lucide-react";

export default function RoleVisual({ title }: { title: string }) {
  return (
    <div
      role="img"
      aria-label={`HarvestFlow workflow illustration for ${title}`}
      className="relative flex aspect-video min-h-52 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#d3fbe4_0%,#fcfbf2_45%,#e4e1cf_100%)] p-6"
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(14,74,57,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(14,74,57,0.18)_1px,transparent_1px)] [background-size:28px_28px]" aria-hidden="true" />
      <div className="relative flex max-w-sm flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-3xl border-2 border-ink bg-lav text-ink shadow-[8px_8px_0_0_#15120d]">
          <Sprout className="size-8" aria-hidden="true" />
        </span>
        <p className="mt-7 font-display text-2xl font-semibold tracking-tight">Producer-first workflows</p>
        <p className="mt-2 text-sm leading-relaxed text-clay">Aggregate, grade, list, and confirm—even when the signal drops.</p>
      </div>
    </div>
  );
}
