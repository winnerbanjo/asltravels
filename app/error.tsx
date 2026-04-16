"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[2rem] border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#2563EB]">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0B1C2C]">
          The page could not be loaded.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#6B7280]">
          {error.message || "An unexpected error occurred while rendering this page."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#0B1C2C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#132d46]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
