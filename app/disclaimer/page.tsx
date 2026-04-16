const sections = [
  "Information on this site is provided for commercial and informational purposes and may be updated without prior notice.",
  "Projected revenue examples are illustrative only and do not guarantee merchant performance.",
  "Travel merchants are responsible for local compliance, pricing policy, and service commitments made to their customers.",
];

export default function DisclaimerPage() {
  return (
    <main className="page-shell py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">Disclaimer</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0B1C5A] md:text-5xl">
          Legal disclaimer
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
