import Link from "next/link";

const articles = [
  {
    title: "Getting started",
    body: "Understand the free trial, merchant account access, and how to move from evaluation to live launch.",
  },
  {
    title: "Plans and pricing",
    body: "Review Starter, Growth, Pro Agency, and Enterprise plans with commissions, support levels, and scale options.",
  },
  {
    title: "Merchant onboarding",
    body: "See what merchants need before launch: brand details, markup policy, domain setup, and customer operations flow.",
  },
  {
    title: "Support and contact",
    body: "Use WhatsApp, phone support, and legal policy pages to resolve account, billing, or platform questions.",
  },
];

export default function KnowledgeBasePage() {
  return (
    <main className="page-shell py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#1736B6]">
            Knowledge base
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#0B1C5A] md:text-5xl">
            Merchant help, product guidance, and support entry points.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#667085]">
            This section gives merchants a clear path to pricing details, onboarding guidance,
            and support contact.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.title}
              className="rounded-[1.75rem] border border-[#DCE3F7] bg-white p-6 shadow-[0_12px_36px_rgba(13,32,93,0.05)]"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#0B1C5A]">
                {article.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#667085]">{article.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-[#DCE3F7] bg-[#F5F8FF] p-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#1736B6]">
            Need direct help?
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:08140257174"
              className="inline-flex items-center justify-center rounded-full bg-[#1736B6] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#0F2D9C]"
            >
              Call support
            </a>
            <a
              href="https://wa.me/2348140257174"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#D7DFF2] bg-white px-6 py-3.5 text-sm font-medium text-[#0B1C5A] transition hover:bg-[#EEF3FF]"
            >
              Open WhatsApp
            </a>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-full border border-[#D7DFF2] bg-white px-6 py-3.5 text-sm font-medium text-[#0B1C5A] transition hover:bg-[#EEF3FF]"
            >
              Review pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
