"use client";

import { motion } from "framer-motion";

type ProgressStatusProps = {
  progress: number;
  label: string;
  detail: string;
  hidePercentage?: boolean;
};

export function ProgressStatus({
  progress,
  label,
  detail,
  hidePercentage = true,
}: ProgressStatusProps) {
  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#0A0A0A]">{label}</p>
          <p className="text-sm text-gray-500">{detail}</p>
        </div>
        {hidePercentage ? (
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
          </div>
        ) : (
          <span className="text-sm font-medium text-gray-500">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-black"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.25 }}
        />
      </div>
    </div>
  );
}
