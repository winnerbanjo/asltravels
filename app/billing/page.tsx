import Link from "next/link";

export default function BillingPage() {
  return (
    <main className="page-shell py-10 md:py-14">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="space-y-2">
          <span className="rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
            Billing
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0A0A0A]">
            Credits and usage
          </h1>
          <p className="text-sm text-gray-500">
            Every signed-in user gets 100 free credits each month. Add a paid credits flow here when you are ready to connect payments.
          </p>
        </div>

        <div className="surface-card p-6">
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-[#0A0A0A]">Free monthly allowance</p>
              <p className="mt-1 text-sm text-gray-500">100 credits reset automatically each month.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm font-medium text-[#0A0A0A]">Paid credits</p>
              <p className="mt-1 text-sm text-gray-500">
                Connect Stripe or Paystack next and replace this placeholder with a real top-up checkout.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Back to studio
              </Link>
              <a
                href="mailto:barber@nile.ng?subject=Nile%20AI%20Studio%20credit%20top-up"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition hover:bg-gray-50"
              >
                Request credit top-up
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
