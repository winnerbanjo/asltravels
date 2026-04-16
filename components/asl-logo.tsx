"use client";

import clsx from "clsx";

type AslLogoProps = {
  className?: string;
  compact?: boolean;
  light?: boolean;
};

export function AslLogo({ className, compact = false, light = false }: AslLogoProps) {
  const color = light ? "text-white" : "text-[#1736B6]";
  const subColor = light ? "text-white/92" : "text-[#1736B6]";

  return (
    <div className={clsx("inline-flex items-center gap-3", className)}>
      <div className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-black uppercase tracking-[-0.08em]",
            compact ? "text-[2.1rem]" : "text-5xl md:text-6xl",
            color,
          )}
        >
          ASL
        </span>
        <span
          className={clsx(
            "font-medium tracking-[-0.08em] lowercase",
            compact ? "mt-[-0.38rem] text-[2rem]" : "mt-[-0.7rem] text-[3.5rem] md:text-[4.25rem]",
            subColor,
          )}
        >
          travel
        </span>
      </div>
    </div>
  );
}
