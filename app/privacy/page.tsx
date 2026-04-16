const sections = [
  "ASL Travels may collect merchant contact information, enquiry details, and support interactions for operational purposes.",
  "Customer and merchant data should be handled according to applicable privacy and commercial regulations.",
  "For privacy-related questions, merchants should contact ASL Travels directly using the support details listed on the site.",
];

export default function PrivacyPage() {
  return (
    <main className="page-shell py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0B1C5A] md:text-5xl">
          Privacy policy
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
