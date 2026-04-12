"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { useStudio } from "@/components/studio-provider";
import { optionsByAction } from "@/lib/studio-config";

export default function ResultPage() {
  const router = useRouter();
  const {
    originalUrl,
    generatedUrl,
    action,
    option,
    resetSession,
    setOption,
  } = useStudio();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!originalUrl || !generatedUrl || !action || !option) {
      router.replace("/");
    }
  }, [action, generatedUrl, option, originalUrl, router]);

  const handleDownload = async () => {
    if (!generatedUrl) {
      return;
    }

    setDownloading(true);

    try {
      const response = await fetch(generatedUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = "studio-image.png";
      anchor.click();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setDownloading(false);
    }
  };

  const handleRestart = () => {
    resetSession();
    router.push("/");
  };

  if (!originalUrl || !generatedUrl || !action || !option) {
    return null;
  }

  const retryOptions = optionsByAction[action];

  return (
    <main className="page-shell flex items-center justify-center py-10 md:py-14">
      <motion.div
        className="page-transition flex w-full max-w-5xl flex-col items-center space-y-8"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="space-y-3 text-center">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
            Result
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0A0A0A] md:text-4xl">
            This looks better already
          </h1>
        </div>

        <div className="surface-card w-full p-4 md:p-6">
          <BeforeAfterSlider beforeSrc={originalUrl} afterSrc={generatedUrl} />
        </div>

        <div className="surface-card w-full p-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-[#0A0A0A]">
                Keep improving it
              </h2>
              <p className="text-sm text-gray-500">
                Switch options quickly without starting over.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {retryOptions.map((retryOption) => (
                <button
                  key={retryOption.id}
                  type="button"
                  onClick={() => {
                    setOption(retryOption.id);
                    router.push("/editor");
                  }}
                  className={[
                    "rounded-lg border px-4 py-2 text-sm font-medium transition",
                    retryOption.id === option
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-[#0A0A0A] hover:bg-gray-50",
                  ].join(" ")}
                >
                  {retryOption.title}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading ? "Preparing..." : "Download image"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/editor")}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition hover:bg-gray-50"
              >
                Make another change
              </button>
              <button
                type="button"
                onClick={() => router.push("/editor")}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition hover:bg-gray-50"
              >
                Try another look
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition hover:bg-gray-50"
              >
                Start New Upload
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
