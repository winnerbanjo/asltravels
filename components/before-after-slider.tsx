"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={beforeSrc}
            alt="Original product photo"
            fill
            className="object-contain"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={afterSrc}
              alt="Enhanced studio product photo"
              fill
              className="object-contain"
            />
          </div>
          <div
            className="absolute inset-y-0 z-10 w-px bg-white/90"
            style={{ left: `${position}%` }}
          />
          <div
            className="absolute top-1/2 z-20 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white shadow-sm"
            style={{ left: `${position}%` }}
          />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare generated image"
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-black"
      />
    </div>
  );
}
