const sections = [
  "ASL Travels provides travel agency infrastructure, merchant onboarding surfaces, and related commercial tools.",
  "Pricing, support levels, and service availability may change as platform offerings evolve.",
  "Merchants remain responsible for their customer communications, pricing strategy, and operational compliance.",
];

export default function TermsPage() {
  return (
    <main className="page-shell py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0B1C5A] md:text-5xl">
          Terms of use
        </h1>
        <div className="mt-8 space-y-4 text-base leading-8 text-[#667085]">
          {sections.map((section) => (
            <p key={section}>{section}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
